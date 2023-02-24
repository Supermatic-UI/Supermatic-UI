import { ControlMetadata } from "../../specs/controls";
import { GeneralControl } from "./../generalControl";

export type GridLayoutMetadata = {
    type: 'gridLayout';
    gridLayout: {
        gridSettings: {
            columns: number;
            rowClassName: string;
            cellClassName: string;
        }
        layout: (GeneralControl & {row: number, cell: number, size: number})[];
    }
} & ControlMetadata;