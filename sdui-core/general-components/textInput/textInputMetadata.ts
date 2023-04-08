import { BindingString } from '../../specs/bindings';
import { ControlMetadata } from '../../specs/controls';

export type TextInputMetadata = {
  type: 'textInput';
  textInput: {
    label: BindingString;
    placeholder: string;
  };
} & ControlMetadata;
