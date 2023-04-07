import { ActionRegistry } from "../registrations";
import { ActionBinding, ActionMetadata } from "../specs/actions";
import { SchemaDefinition } from "../specs/bindings";
import { evaluate } from "./evaluate";
import { evaluateTemplate } from "./evaluateTemplate";

export type DataContext = Record<string, any>;

export const dataBindingBuilder = (data: DataContext, dataSchema: SchemaDefinition, actionRegistry: ActionRegistry): DataBindingContainer => {
    return new ObjectContaier(data, dataSchema, actionRegistry);
}


export interface DataBindingContainer {

    /**
     * Sets the value of the specified property in the data object.
     * Supports getting nested properties using dot notation (e.g. "objectProperty.insideProperty")
     * and array properties using square brackets (e.g. "arrayProperty[0]").
     * 
     * @param name - The name of the property to set, can be a nested property using dot notation.
     * @param value - The value to set for the property.
     * 
     * TODO: Implement support for setting nested properties using dot notation.
     */
    setProperty(name: string, value: any): void;

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

    reactiveEvaluate(expression: string): any;

    /**
     * Evaluates a template string containing expressions enclosed in double curly braces,
     * and replaces each expression with the corresponding value from the data object.
     *
     * @param template The template string to evaluate.
     * @returns The result of evaluating the template string.
     */
    evaluateTemplate(template: string): string;


    handleAction(actionBinding: ActionBinding | ActionBinding[]): void;
}

export class ObjectContaier implements DataBindingContainer {

    private keys: Record<string, {
        proxy: any,
        stats: {
            
        }
    }> = {};

    /**
     * 
     * @param data - The data object to set.
     * @param dataSchema - The schema for the data object.
     */
    constructor(
        private data: DataContext,
        private dataSchema: SchemaDefinition,
        private actionRegistry: ActionRegistry
    ) {

    }

    /**
     * Sets the value of the specified property in the data object.
     * Supports getting nested properties using dot notation (e.g. "objectProperty.insideProperty")
     * and array properties using square brackets (e.g. "arrayProperty[0]").
     * 
     * @param name - The name of the property to set, can be a nested property using dot notation.
     * @param value - The value to set for the property.
     * 
     * TODO: Implement support for setting nested properties using dot notation.
     */
    setProperty(name: string, value: any) {
        this.data[name] = value;
    }

    /**
     * Set entire data object.
     * 
     * @param data - The data object to set.
     */
    setData(data: DataContext) {
        this.data = data;
    }

    /**
     * Gets the value of the specified property in the data object. Supports getting
     * nested properties using dot notation (e.g. "objectProperty.insideProperty").
     * 
     * @param name - The name of the property to get, can be a nested property using dot notation.
     */
    evaluate(expression: string): any {
        return evaluate(expression, this.data);
    }

    reactiveEvaluate(expression: string): any {
        // we need to wrap value into proxy to make it reactive
    }

    /**
     * Evaluates a template string containing expressions enclosed in double curly braces,
     * and replaces each expression with the corresponding value from the data object.
     *
     * @param template The template string to evaluate.
     * @returns The result of evaluating the template string.
     */
    evaluateTemplate(template: string): string {
        return evaluateTemplate(template, this.data);
    }

    handleAction(actionBinding: ActionBinding | ActionBinding[]): void {
        if (Array.isArray(actionBinding)) {
            actionBinding.forEach(action => this.handleActionInternal(action));
        } else {
            this.handleActionInternal(actionBinding)
        }
    }

    handleActionInternal(actionBinding: ActionBinding): void {
        if (typeof actionBinding === 'string') {
            // action reference with name
            console.log('[data-binding] action call by reference')
            if (this.dataSchema.actions[actionBinding] != null) {
                this.handleActionInternalByDefinition(this.dataSchema.actions[actionBinding]);
            }
        } else {
            // action definition
            console.log('[data-binding] action call by definition')
            this.handleActionInternalByDefinition(actionBinding);
        }
    }

    handleActionInternalByDefinition(action: ActionMetadata) {
        const handler = this.actionRegistry.getActionHandler(action.type);
        if (handler != null) {
            console.log(`[data-binding] action call type ${action.type}`);
            handler(action, this.data, this);
        } else {
            console.warn(`[data-binding] no action handler registered for action type ${action.type}`);
        }
    }

}


