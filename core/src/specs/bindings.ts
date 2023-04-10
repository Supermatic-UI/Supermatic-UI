import { ActionBinding, ActionMetadata } from './actions';

export type PrimitiveType = 'string' | 'number' | 'boolean' | 'date';
export type ReferenceSchema = { $ref: string };
export type DataSchemaValue = {
  value?: string;
};

export type RefType = 'object' | 'array';
export type SchemaDefinition<T extends RefType = RefType> = {
  type: T;
  properties: Record<string, (DataSchema | { type: PrimitiveType } | ReferenceSchema) & DataSchemaValue>;
  actions: Record<string, ActionMetadata>;
};

export type DataSchema = SchemaDefinition | ReferenceSchema;

export type BindingString = string;
