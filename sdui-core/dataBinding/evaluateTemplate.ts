import { StringBuilder } from "./StringBuilder";
import { DataContext } from "./dataBindingBuilder";
import { evaluate } from "./evaluate";

/**
 * Evaluates a template string containing expressions enclosed in double curly braces,
 * and replaces each expression with the corresponding value from the given data context.
 *
 * @param template The template string to evaluate.
 * @param dataContext The data context to use for evaluating the expressions.
 * @returns The result of evaluating the template string.
 */
export function evaluateTemplate(template: string, dataContext: DataContext): string {
    // Use a StringBuilder to avoid creating a new string for each concatenation.
    const result = new StringBuilder();
    let startIndex = 0;
    while (true) {
        // Search for the next expression start tag "{{".
        const expressionStartIndex = template.indexOf('{{', startIndex);
        if (expressionStartIndex === -1) {
            result.append(template.slice(startIndex));
            break;
        }
        // Search for the expression end tag "}}".
        const expressionEndIndex = template.indexOf('}}', expressionStartIndex);

        // If there are no more expression end tags, append the remaining part of the template string to the result and exit the loop.
        if (expressionEndIndex === -1) {
            result.append(template.slice(startIndex));
            break;
        }
        result.append(template.slice(startIndex, expressionStartIndex));

        // Evaluate the expression using the given data context and append the result to the result string.
        const expression = template.slice(expressionStartIndex + 2, expressionEndIndex).trim();
        const value = evaluate(expression, dataContext);
        result.append(value !== null ? value.toString() : '');
        startIndex = expressionEndIndex + 2;
    }
    return result.toString();
}
