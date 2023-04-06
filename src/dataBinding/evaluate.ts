import { DataContext } from "./dataBindingBuilder";

/**
 * Gets the value of the specified property in the dataContext.
 * Supports getting nested properties using dot notation (e.g. "objectProperty.insideProperty")
 * and array properties using square brackets (e.g. "arrayProperty[0]").
 * @param expression
 * @param dataContext
 * @returns The result of evaluating the expression.
 */

export function evaluate(expression: string, dataContext: DataContext): any {
    const expressionParts = expression.split('.');
    let value: any = dataContext;
    for (const part of expressionParts) {
        if (value == null) {
            return undefined;
        }
        if (part.includes('[')) {
            // branch for array handling
            const [propertyName, indexString] = part.split('[');
            const index = parseInt(indexString.slice(0, -1));
            value = value[propertyName]?.[index];
        } else {
            // default branch for properties
            value = value[part];
        }
    }
    return value;
}
