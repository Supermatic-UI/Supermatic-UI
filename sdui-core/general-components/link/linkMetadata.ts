import { BindingString } from '../../specs/bindings';
import { ControlMetadata } from '../../specs/controls';

export type LinkMetadata = {
  type: 'link';
  link: {
    text: BindingString;
    url: BindingString;
  };
} & ControlMetadata;
