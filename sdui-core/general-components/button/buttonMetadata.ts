import { ActionBinding } from "../../specs/actions";
import { BindingString } from "../../specs/bindings";
import { ControlMetadata } from "../../specs/controls";

export type ButtonkMetadata = {
    type: 'button';
    button: {
        text: BindingString;
        action: ActionBinding | ActionBinding[];
    }
} & ControlMetadata;