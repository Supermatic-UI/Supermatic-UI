import { ActionBinding, ActionMetadata } from "./actions";

export type PrimitiveType = 'string' | 'number' | 'boolean' | 'date' | 'any';
export type ReferenceSchema = { $ref: string };
export type DataSchemaValue = {
    value?: string;
}

export type SchemaDefinition = {
    type: 'object' | 'array';
    properties: {
        [name: string]: (DataSchema | { type: PrimitiveType } | ReferenceSchema) & DataSchemaValue
    };
    actions: Record<string, ActionMetadata>;
}

export type DataSchema = SchemaDefinition | ReferenceSchema;

export type BindingString = string;