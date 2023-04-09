import { GeneralControl } from './general-components/generalControl';
import { ActionMetadata } from './specs/actions';
import { SchemaDefinition } from './specs/bindings';

export type PageMetadata = {
  type: 'layout';
  title: string;
  dataBinding: SchemaDefinition<'object'>;
  page: GeneralControl[];
};
