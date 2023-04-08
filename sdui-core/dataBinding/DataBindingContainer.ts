import { ActionBinding } from '../specs/actions';
import { DataContext } from './dataBindingBuilder';

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

  evaluateReactive(
    expression: string
  ): ReactivityContainer<any> & { updateValue: (value: any | null) => void };

  /**
   * Evaluates a template string containing expressions enclosed in double curly braces,
   * and replaces each expression with the corresponding value from the data object.
   *
   * @param template The template string to evaluate.
   * @returns The result of evaluating the template string.
   */
  evaluateTemplate(template: string): string;

  evaluateTemplateReactive(template: string): ReactivityContainer<string>;

  handleAction(actionBinding: ActionBinding | ActionBinding[]): void;
}

export type ReactivityContainer<T> = {
  value: T;
  subscribe: (callback: (value: T) => void) => void;
};
