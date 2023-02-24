import { BindingString } from "../../specs/bindings";
import { ControlMetadata } from "../../specs/controls";

export type LabelMetadata = {
    type: 'label';
    label: {
        text: BindingString;
    }
} & ControlMetadata;