import { ActionRegistry } from '../registrations';
import { ActionBinding, ActionMetadata } from '../specs/actions';
import { SchemaDefinition } from '../specs/bindings';
import { DataBindingContainer } from './DataBindingContainer';
import { evaluate } from './evaluate';
import { evaluateTemplate } from './evaluateTemplate';
import { createBindingStore, BindingStore } from './bindingStore';

export type DataContext = Record<string, any>;

type RendererReactivitySubscriptionHandler<T> = (value: T) => void;

export const dataBindingBuilder = (
  initial: DataContext,
  dataSchema: SchemaDefinition,
  actionRegistry: ActionRegistry
): DataBindingContainer => {
  const bindingStore: BindingStore = createBindingStore();

  const mainProxy = bindingStore.createMainProxy(initial);

  const handleActionInternal = (actionBinding: ActionBinding): void => {
    if (typeof actionBinding === 'string') {
      // action reference with name
      console.log('[data-binding] action call by reference');
      if (dataSchema.actions[actionBinding] != null) {
        handleActionInternalByDefinition(dataSchema.actions[actionBinding]);
      }
    } else {
      // action definition
      console.log('[data-binding] action call by definition');
      handleActionInternalByDefinition(actionBinding);
    }
  };

  const handleActionInternalByDefinition = (action: ActionMetadata) => {
    const handler = actionRegistry.getActionHandler(action.type);
    if (handler != null) {
      console.log(`[data-binding] action call type ${action.type}`);
      handler(action, mainProxy, dataBinding);
    } else {
      console.warn(
        `[data-binding] no action handler registered for action type ${action.type}`
      );
    }
  };

  const dataBinding = {
    setProperty: (name: string, value: any) => {
      mainProxy[name] = value;
    },
    setData: (data: DataContext) => {
      // TODO: Omplement proxy replacement
    },
    evaluate: (expression: string) => {
      const evaluateResult = evaluate(expression, mainProxy);
      return evaluateResult.value;
    },
    evaluateReactive: (expression: string) => {
      const evaluateResult = evaluate(expression, mainProxy);
      const subscriptions: RendererReactivitySubscriptionHandler<any>[] = [];
      // Use wrapper object to pass reference and reactively update value
      const wrapper = {
        value: evaluateResult.value,
        subscribe: (callback: (value: any) => void) => {
          console.log(
            `[data-binding] renderer subscribe changes for expression ${expression}`
          );
          subscriptions.push(callback);
        },
        updateValue: (value: any) => {
          console.log(
            `[data-binding] renderer update expression ${expression} value to ${value}`
          );
          evaluateResult.setter(value);
        }
      };
      // Subscribe for dependencies changes
      bindingStore.subscribe(expression, () => {
        console.log(
          `[data-binding] detected depndence ${expression} changed. Updating expression ${expression}`
        );
        const innerEvaluateResult = evaluate(expression, mainProxy);
        wrapper.value = innerEvaluateResult.value;
        console.log(`[data-binding] expression new value ${wrapper.value}`);
        console.log(
          `[data-binding] notify subscribers of ${subscriptions.length}`
        );
        subscriptions.forEach((subscription) => {
          console.log(
            `[data-binding] renderer update expression ${expression}`
          );
          subscription(wrapper.value);
        });
      });
      return wrapper;
    },
    evaluateTemplate: (template: string) => {
      return evaluateTemplate(template, mainProxy);
    },
    evaluateTemplateReactive: (template: string) => {
      // Evaluate template with collecting dependencies
      const dependencies: string[] = [];
      const result = evaluateTemplate(template, mainProxy, dependencies);
      const subscriptions: RendererReactivitySubscriptionHandler<string>[] = [];

      // Use wrapper object to pass reference and reactively update value
      const wrapper = {
        value: result,
        subscribe: (callback: (value: string) => void) => {
          console.log(
            `[data-binding] renderer subscribe changes for template ${template}`
          );
          subscriptions.push(callback);
        }
      };
      // Subscribe for dependencies changes
      dependencies.forEach((dependency) => {
        console.log(
          `[data-binding] subscribe to ${dependency} changes for template ${template}`
        );
        bindingStore.subscribe(dependency, () => {
          console.log(
            `[data-binding] detected depndence ${dependency} changed. Updating template ${template}`
          );
          wrapper.value = evaluateTemplate(template, mainProxy);
          console.log(`[data-binding] template new value ${wrapper.value}`);
          console.log(
            `[data-binding] notify subscribers of ${subscriptions.length}`
          );
          subscriptions.forEach((subscription) => {
            console.log(`[data-binding] renderer update template ${template}`);
            subscription(wrapper.value);
          });
        });
      });
      return wrapper;
    },
    handleAction: (actionBinding: ActionBinding | ActionBinding[]) => {
      if (Array.isArray(actionBinding)) {
        actionBinding.forEach((action) => handleActionInternal(action));
      } else {
        handleActionInternal(actionBinding);
      }
    }
  };
  return dataBinding;
};
