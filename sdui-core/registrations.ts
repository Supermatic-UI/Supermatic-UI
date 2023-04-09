import { ActionHandler } from './specs/actions';

export interface RegistrationApi {
  registerComponent: (type: string, component: any) => void;
  getComponent: (type: string) => any;
  getComponentRegistrations: () => Record<string, any>;
  registerActionHandler: (type: string, handler: ActionHandler) => void;
  getActionHandler: (type: string) => ActionHandler;
}

export const buildRegistrationApi = (
  initialComponents: Record<string, any>,
  initialActions: Record<string, ActionHandler> = {}
): RegistrationApi => {
  const components = { ...initialComponents };
  const actions = { ...initialActions };

  const registry: RegistrationApi = {
    registerComponent: (type: string, component: any) => {
      components[type] = component;
    },
    getComponent: (type: string) => {
      return components[type];
    },
    getComponentRegistrations: () => {
      return components;
    },
    registerActionHandler: (type: string, handler: ActionHandler) => {
      actions[type] = handler;
    },
    getActionHandler: (type: string) => {
      return actions[type];
    }
  };

  return registry;
};
