import { ActionHandler, ActionBinding } from '../specs/actions';
import { BindingString } from '../specs/bindings';

export type HttpActionHandler = ActionHandler<{ set: Record<string, BindingString> }>;

export const set: HttpActionHandler = async (action, data, context) => {
  Object.keys(action.set).forEach((key) => {
    console.log(`[set] setting property '${key}' to '${action.set[key]}'`);
    context.setProperty(key, context.evaluateTemplate(action.set[key]));
  });
};
