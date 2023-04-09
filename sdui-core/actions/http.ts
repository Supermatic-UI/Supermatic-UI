import { ActionHandler, ActionBinding } from '../specs/actions';
import { BindingString } from '../specs/bindings';

export type HttpActionHandler = ActionHandler<{
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string;
  body?: BindingString;
  bindBody: BindingString;
  headers?: Record<string, string>;
  onResponse?: ActionBinding | ActionBinding[];
}>;

export const http: HttpActionHandler = async (action, data, context) => {
  const { url, method, body, headers, onResponse, bindBody } = action;
  const initHeaders = headers || {};
  const sendHeders = Object.keys(initHeaders).reduce((acc, key) => {
    acc[key] = context.evaluateTemplate(initHeaders[key]);
    return acc;
  }, {});
  let payload: String;
  if (data) {
    payload = JSON.stringify(data);
  } else if (body) {
    const json = context.evaluateTemplate(body);
    payload = json;
  } else if (bindBody) {
    const obj = context.evaluate(bindBody);
    payload = obj != null ? JSON.stringify(obj) : '';
  }

  const response = await fetch(url, {
    method,
    headers: sendHeders,
    body: body
  });
  const content = await response.json();
  if (onResponse) {
    context.handleAction(onResponse, { response: content });
  }
};
