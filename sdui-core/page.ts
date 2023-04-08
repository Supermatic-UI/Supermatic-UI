import { GeneralControl } from './general-components/generalControl';
import { ActionMetadata } from './specs/actions';
import { DataSchema } from './specs/bindings';

export type PageMetadata = {
  type: 'layout';
  title: string;
  dataBinding: DataSchema;
  page: GeneralControl[];
};
