import { DataBindingContainer } from "../dataBinding/dataBindingBuilder";

export type ActionMetadata = { type: string } & Record<string, any>;

export type ActionHandler = (action: ActionMetadata, data: any, context: DataBindingContainer) => PromiseLike<void> | void;

export type ActionName = string;

export type ActionBinding = ActionMetadata | ActionName;
