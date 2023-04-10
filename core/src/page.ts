import { GeneralControl } from './general-components/generalControl';
import { SchemaDefinition } from './specs/bindings';

export type PageMetadata = {
  type: 'layout';
  title: string;
  dataBinding: SchemaDefinition<'object'>;
  page: GeneralControl[];
};