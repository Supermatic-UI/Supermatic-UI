import { ActionHandler } from './specs/actions';

export class ActionRegistry {
  constructor(private actions: Record<string, ActionHandler> = {}) {}

  registerActionHandler(type: string, handler: ActionHandler) {
    this.actions[type] = handler;
  }

  getActionHandler(type: string): ActionHandler {
    return this.actions[type];
  }
}

export class ComponentRegistry {
  private components: { [type: string]: any } = {};

  registerComponent(type: string, component: any) {
    this.components[type] = component;
  }

  getComponent(type: string): any {
    return this.components[type];
  }
}
