import { ControlMetadata } from '../specs/controls';
import { ButtonkMetadata } from './button/buttonMetadata';
import { CheckboxMetadata } from './checkbox/checkboxMetadata';
import { DataTabeLayoutMetadata } from './dataTableLayout/dataTableLayout';
import { GridLayoutMetadata } from './gridLayout/gridLayoutMetadata';
import { LabelMetadata } from './label/labelMetadata';
import { LinkMetadata } from './link/linkMetadata';
import { TextInputMetadata } from './textInput/textInputMetadata';

export type GeneralControl =
  | ControlMetadata
  | ButtonkMetadata
  | CheckboxMetadata
  | DataTabeLayoutMetadata
  | GridLayoutMetadata
  | LabelMetadata
  | LinkMetadata
  | TextInputMetadata;
