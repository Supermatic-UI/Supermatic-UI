export interface ActionMetadata {
    type: string;
}

export interface ActionHandler {
    handleAction(action: ActionMetadata): PromiseLike<void> | void;
}

export type ActionName = string;

export type ActionBinding = ActionMetadata | ActionName;