import { BindingString } from './bindings';

export interface ComponentMetadata {
  type: string;
  binding?: BindingString;
  enabled?: BindingString;
  visible?: BindingString;
  className?: BindingString;
}
