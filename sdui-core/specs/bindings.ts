export type PrimitiveType = 'string' | 'number' | 'boolean' | 'date' | 'any';
export type ReferenceSchema = { $ref: string };
export type DataSchemaValue = {
    value?: string;    
}

export type DataSchema = {
    type: 'object' | 'array';
    properties: { 
        [name: string]: (DataSchema | { type: PrimitiveType } | ReferenceSchema) & DataSchemaValue
    };
} | ReferenceSchema;

export type BindingString = string;