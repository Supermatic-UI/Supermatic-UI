import { DataContext } from './dataBindingBuilder';

export type EvaluationResult<T = any> = {
  value: T;
  setter: (value: T) => void;
};

const emptySetter = () => {};
/**
 * Gets the value of the specified property in the dataContext.
 * Supports getting nested properties using dot notation (e.g. "objectProperty.insideProperty")
 * and array properties using square brackets (e.g. "arrayProperty[0]").
 * @param expression
 * @param context
 * @returns The result of evaluating the expression.
 */

export const evaluate = (expression: string, context: DataContext): EvaluationResult<any> => {
  const expressionParts = expression.split('.');
  let value: any = context;
  let parent: any;
  let accessor: any;
  for (const part of expressionParts) {
    if (value == null) {
      return {
        value: undefined,
        setter: emptySetter
      };
    }
    if (part.includes('[')) {
      // branch for array handling
      const [propertyName, indexString] = part.split('[');
      const index = parseInt(indexString.slice(0, -1));
      parent = value[propertyName];
      accessor = index;
    } else {
      // default branch for properties
      parent = value;
      accessor = part;
    }
    console.log(`[evaluate] accessor: ${accessor}, parent:`, parent);
    value = parent?.[accessor];
    console.log(`[evaluate] accessor: ${accessor}, value:`, value);
  }
  const setter = (value: any) => {
    if (parent != null) {
      parent[accessor] = value;
    }
  };
  return {
    value,
    setter
  };
};
