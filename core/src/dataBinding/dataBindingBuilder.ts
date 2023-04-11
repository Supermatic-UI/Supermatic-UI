import { ActionBinding, ActionMetadata } from '../specs/actions';
import { PrimitiveType, RefType, SchemaDefinition } from '../specs/bindings';
import { evaluate, EvaluationResult } from './evaluate';
import { evaluateTemplate } from './evaluateTemplate';
import { createBindingStore, BindingStore } from './bindingStore';
import { Registrations, createRegistrations } from '../registrations';
import { combinePath } from '../utils/combinePath';

export type DataContext = Record<string, any>;

type RendererReactivitySubscriptionHandler<T> = (value: T) => void;

export type DataBindingContainer = {
  /**
   * Sets the value of the specified property in the data object.
   * Supports getting nested properties using dot notation (e.g. "objectProperty.insideProperty")
   * and array properties using square brackets (e.g. "arrayProperty[0]").
   *
   * @param path - path of the property to set, can be a nested property using dot notation.
   * @param value - The value to set for the property.
   *
   * TODO: Implement support for setting nested properties using dot notation.
   */
  setProperty(path: string, value: any): void;

  /**
   * Set entire data object.
   *
   * @param data - The data object to set.
   */
  setData(data: DataContext): void;

  /**
   * Gets the value of the specified property in the data object. Supports getting
   * nested properties using dot notation (e.g. "objectProperty.insideProperty").
   *
   * @param name - The name of the property to get, can be a nested property using dot notation.
   */
  evaluate(expression: string): any;

  evaluateReactive(expression: string): ReactivityContainer<any> & { updateValue: (value: any | null) => void };

  /**
   * Evaluates a template string containing expressions enclosed in double curly braces,
   * and replaces each expression with the corresponding value from the data object.
   *
   * @param template The template string to evaluate.
   * @returns The result of evaluating the template string.
   */
  evaluateTemplate(template: string): string;

  evaluateTemplateReactive(template: string): ReactivityContainer<string>;

  handleAction(actionBinding: ActionBinding | ActionBinding[], applyContext?: Record<string, any>): void;

  registrations: Registrations;
};

export type ReactivityContainer<T> = {
  value: T;
  subscribe: (callback: (value: T) => void) => void;
};

type InternalDataBindingContainer = DataBindingContainer & {
  schema: SchemaDefinition;
  context: DataContext;
  bindingStore: BindingStore;
  internalEvaluate: (expression: string) => EvaluationResult;
};

const dataBindingWrapperBuilder = (
  container: InternalDataBindingContainer,
  context: DataContext
): InternalDataBindingContainer => {
  const wrappedContainer: InternalDataBindingContainer = {
    ...container,
    // wrap container with new context
    context,
    // we need to recreate all functions that uses evaluate to make wrapped calls
    evaluate: (expression: string) => {
      console.log(`[inner-container] evaluating expression: ${expression} on context`, context);
      const expressionParts = expression.split('.');
      if (Object.keys(context).some((key) => key.includes(expressionParts[0]))) {
        const evaluateResult = evaluate(expression, context);
        return evaluateResult.value;
      }
      const evaluateResult = evaluate(expression, wrappedContainer);
      return evaluateResult.value;
    },
    evaluateReactive: (expression) => {
      console.log(`[inner-container] evaluating reactive expression: ${expression} on context`, context);
      return evaluateReactive(wrappedContainer, expression);
    },
    evaluateTemplate: (template) => {
      console.log(`[inner-container] evaluating template: ${template} on context`, context);
      const result = internalEvaluateTemplate(wrappedContainer, template);
      console.log(`[inner-container] evaluated template: result`, result);
      return result;
    },
    evaluateTemplateReactive: (template) => {
      console.log(`[inner-container] evaluating reactive template: ${template} on context`, context);
      return evaluateTemplateReactive(wrappedContainer, template);
    }
  };
  return wrappedContainer;
};

export const dataBindingBuilder = (
  initial: DataContext,
  schema: SchemaDefinition,
  registrations?: Registrations
): DataBindingContainer => {
  const bindingStore: BindingStore = createBindingStore();

  const context = bindingStore.createMainProxy(initial);

  const dataBinding: DataBindingContainer = {
    setProperty: (name, value) => setProperty(internalContainer, name, value),
    setData: (data) => setData(internalContainer, data),
    evaluate: (expression) => internalEvaluate(internalContainer, expression).value,
    evaluateReactive: (expression) => evaluateReactive(internalContainer, expression),
    evaluateTemplate: (template) => internalEvaluateTemplate(internalContainer, template),
    evaluateTemplateReactive: (template) => evaluateTemplateReactive(internalContainer, template),
    handleAction: (actionBinding, applyContext) => handleAction(internalContainer, actionBinding, applyContext),
    registrations: registrations ?? createRegistrations({})
  };
  const internalContainer = {
    ...dataBinding,
    schema,
    context,
    bindingStore,
    internalEvaluate: (expression) => internalEvaluate(internalContainer, expression)
  };

  initializeDefaults(internalContainer, schema, '');

  return dataBinding;
};

const handleActionInternal = (
  container: InternalDataBindingContainer,
  actionBinding: ActionBinding,
  applyContext: Record<string, any>
): void => {
  if (typeof actionBinding === 'string') {
    // action reference with name
    console.log('[data-binding] action call by reference');
    if (container.schema.actions[actionBinding] != null) {
      handleActionInternalByDefinition(container, container.schema.actions[actionBinding], applyContext);
    }
  } else {
    // action definition
    console.log('[data-binding] action call by definition');
    handleActionInternalByDefinition(container, actionBinding, applyContext);
  }
};

const handleActionInternalByDefinition = (
  container: InternalDataBindingContainer,
  action: ActionMetadata,
  context: Record<string, any>
) => {
  const handler = container.registrations.getActionHandler(action.type);
  if (handler != null) {
    console.log(`[data-binding] action call type ${action.type}`);
    handler(action, container.context, container);
  } else {
    console.warn(`[data-binding] no action handler registered for action type ${action.type}`);
  }
};

const setProperty = (container: InternalDataBindingContainer, path: string, value: any) => {
  const evaluateResult = container.internalEvaluate(path);
  evaluateResult.setter(value);
};

const setData = (container: InternalDataBindingContainer, data: DataContext) => {
  // TODO: Omplement proxy replacement
};

const internalEvaluate = (container: InternalDataBindingContainer, expression: string) => {
  const evaluateResult = evaluate(expression, container.context);
  return evaluateResult;
};

const evaluateReactive = (container: InternalDataBindingContainer, expression: string) => {
  const evaluateResult = container.internalEvaluate(expression);
  const subscriptions: RendererReactivitySubscriptionHandler<any>[] = [];
  // Use wrapper object to pass reference and reactively update value
  const wrapper = {
    value: evaluateResult.value,
    subscribe: (callback: (value: any) => void) => {
      console.log(`[data-binding] renderer subscribe changes for expression ${expression}`);
      subscriptions.push(callback);
    },
    updateValue: (value: any) => {
      console.log(`[data-binding] renderer update expression ${expression} value to ${value}`);
      evaluateResult.setter(value);
    }
  };
  // Subscribe for dependencies changes
  container.bindingStore.subscribe(expression, () => {
    console.log(`[data-binding] detected depndence ${expression} changed. Updating expression ${expression}`);
    const innerEvaluateResult = container.internalEvaluate(expression);
    wrapper.value = innerEvaluateResult.value;
    console.log(`[data-binding] expression new value ${wrapper.value}`);
    console.log(`[data-binding] notify subscribers of ${subscriptions.length}`);
    subscriptions.forEach((subscription) => {
      console.log(`[data-binding] renderer update expression ${expression}`);
      subscription(wrapper.value);
    });
  });
  return wrapper;
};

const internalEvaluateTemplate = (container: InternalDataBindingContainer, template: string) => {
  return evaluateTemplate(template, container.context);
};

const evaluateTemplateReactive = (container: InternalDataBindingContainer, template: string) => {
  // Evaluate template with collecting dependencies
  const dependencies: string[] = [];
  const result = evaluateTemplate(template, container.context, dependencies);
  const subscriptions: RendererReactivitySubscriptionHandler<string>[] = [];

  // Use wrapper object to pass reference and reactively update value
  const wrapper = {
    value: result,
    subscribe: (callback: (value: string) => void) => {
      console.log(`[data-binding] renderer subscribe changes for template ${template}`);
      subscriptions.push(callback);
    }
  };
  // Subscribe for dependencies changes
  dependencies.forEach((dependency) => {
    console.log(`[data-binding] subscribe to ${dependency} changes for template ${template}`);
    container.bindingStore.subscribe(dependency, () => {
      console.log(`[data-binding] detected depndence ${dependency} changed. Updating template ${template}`);
      wrapper.value = evaluateTemplate(template, container.context);
      console.log(`[data-binding] template new value ${wrapper.value}`);
      console.log(`[data-binding] notify subscribers of ${subscriptions.length}`);
      subscriptions.forEach((subscription) => {
        console.log(`[data-binding] renderer update template ${template}`);
        subscription(wrapper.value);
      });
    });
  });
  return wrapper;
};

const handleAction = (
  container: InternalDataBindingContainer,
  actionBinding: ActionBinding | ActionBinding[],
  context?: Record<string, any>
) => {
  let useContainer: InternalDataBindingContainer = container;
  if (context) {
    console.log('[data-binding] action call with context, wrapping contexts');
    useContainer = dataBindingWrapperBuilder(container, context);
  }
  if (Array.isArray(actionBinding)) {
    actionBinding.forEach((action) => handleActionInternal(useContainer, action, context || {}));
  } else {
    handleActionInternal(useContainer, actionBinding, context || {});
  }
};

const getTypedefinition = (schema: SchemaDefinition, ref: string) => {
  throw new Error('Not implemented');
};

const initializeDefaults = (container: InternalDataBindingContainer, schema: SchemaDefinition, path: string) => {
  Object.keys(schema.properties).forEach((property) => {
    const definition = schema.properties[property];
    if (typeof definition['type'] === 'string') {
      const type = definition['type'] as PrimitiveType & RefType;
      let value;
      let typeFound = true;
      switch (type) {
        case 'string':
          value = definition.value || '';
          break;
        case 'number':
          value = Number(definition.value || 0);
          break;
        case 'boolean':
          value = Boolean(definition.value || false);
          break;
        case 'date':
          value = new Date(definition.value || 0);
          break;
        case 'any':
          value = JSON.parse(definition.value || '[]');
          break;
        default:
          typeFound = false;
      }
      if (!typeFound) {
        if (type === 'object') {
          if (definition.value) {
            value = JSON.parse(definition.value);
          } else {
            // Recursive initialize defaults for object SchemaDefinition
            initializeDefaults(container, getTypedefinition(schema, type), combinePath(path, property));
          }
        } else if (type === 'array') {
          value = JSON.parse(definition.value || '[]');
        }
      }
      container.setProperty(combinePath(path, property), value);
    }
  });
};
