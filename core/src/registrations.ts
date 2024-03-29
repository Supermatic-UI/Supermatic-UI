import { http } from './actions/http';
import { set } from './actions/set';
import { ActionHandler } from './specs/actions';

export interface Registrations {
  registerComponent: (type: string, component: any) => void;
  getComponent: (type: string) => any;
  getComponentRegistrations: () => Record<string, any>;
  registerActionHandler: (type: string, handler: ActionHandler) => void;
  getActionHandler: (type: string) => ActionHandler;
}

export const createRegistrations = (
  initialComponents: Record<string, any>,
  initialActions: Record<string, ActionHandler> = {}
): Registrations => {
  const coreActions = {
    http,
    set
  };
  const components = { ...initialComponents };
  const actions = {
    ...coreActions,
    ...initialActions
  };

  const registry: Registrations = {
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
