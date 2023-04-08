import { BindingString } from '../../specs/bindings';
import { ControlMetadata } from '../../specs/controls';

export type CheckboxMetadata = {
  type: 'checkbox';
  checkbox: {
    label: BindingString;
  };
} & ControlMetadata;
