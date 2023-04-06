import { DataSchema } from "../specs/bindings";
import { evaluate } from "./evaluate";
import { evaluateTemplate } from "./evaluateTemplate";

export type DataContext = Record<string, any>;

const dataBindingBuilder = (dataSchema: DataSchema, data: DataContext): DataBindingContainer => {
    return new ObjectContaier(data, dataSchema);
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

    /**
     * Evaluates a template string containing expressions enclosed in double curly braces,
     * and replaces each expression with the corresponding value from the data object.
     *
     * @param template The template string to evaluate.
     * @returns The result of evaluating the template string.
     */
    evaluateTemplate(template: string): any;
}

class ObjectContaier implements DataBindingContainer {

    /**
     * 
     * @param data - The data object to set.
     * @param dataSchema - The schema for the data object.
     */
    constructor(
        private data: DataContext,
        private dataSchema: DataSchema
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

    /**
     * Evaluates a template string containing expressions enclosed in double curly braces,
     * and replaces each expression with the corresponding value from the data object.
     *
     * @param template The template string to evaluate.
     * @returns The result of evaluating the template string.
     */
    evaluateTemplate(template: string): any {
        return evaluateTemplate(template, this.data);
    }
}


