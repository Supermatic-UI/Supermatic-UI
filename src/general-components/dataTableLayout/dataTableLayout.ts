import { ActionBinding } from "../../specs/actions";
import { BindingString } from "../../specs/bindings";
import { ControlMetadata } from "../../specs/controls";

export type DataTabeLayoutMetadata = {
    type: 'dataTable';
    dataTable: {
        add: {
            action: ActionBinding | ActionBinding[];
            navigate?: {
                text: BindingString;
                url: BindingString;
            };
        }
        delete?: {
            prompt: {
                text: BindingString;
            },
            action: ActionBinding | ActionBinding[];
        },
        open?: {
            action: ActionBinding | ActionBinding[];
            navigate: {
                text: BindingString;
                url: BindingString;
            }
        },
        pageSize?: {
            sizes: number[];
            currentSize: BindingString;
            action: ActionBinding | ActionBinding[];
        },
        columns: {
            name: string;
            label: BindingString;
            sort?: {
                enabled: boolean;
                action: ActionBinding | ActionBinding[];
            },
            filter: {
                enabled: boolean;
                placeholder: BindingString;
                useClientFilter: boolean;
            }
        }[];
    }
} & ControlMetadata;