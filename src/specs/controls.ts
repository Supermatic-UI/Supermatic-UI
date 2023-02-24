import { BindingString } from "./bindings";

export interface ControlMetadata {
    type: string;
    binding?: BindingString;
    enabled?: BindingString;
    visible?: BindingString;
}
