import { ActionBinding } from '../specs/actions';
import { BindingString, SchemaDefinition } from '../specs/bindings';
import { ComponentMetadata } from '../specs/components';

export type GeneralComponentExtension = Record<string, any>;

export type GeneralComponent =
  | ComponentMetadata
  | ButtonkMetadata
  | CheckboxMetadata
  | DataTabeLayoutMetadata
  | GridLayoutMetadata
  | LabelMetadata
  | LinkMetadata
  | InputMetadata;

// ------------------------------
// Components
// ------------------------------

export type ButtonkMetadata<Extend extends GeneralComponentExtension = {}> = {
  type: 'button';
  button: {
    text: BindingString;
    action: ActionBinding | ActionBinding[];
  } & Extend;
} & ComponentMetadata;

export type CheckboxMetadata<Extend extends GeneralComponentExtension = {}> = {
  type: 'checkbox';
  checkbox: {
    label: BindingString;
  } & Extend;
} & ComponentMetadata;

export type LabelMetadata<Extend extends GeneralComponentExtension = {}> = {
  type: 'label';
  label: {
    text: BindingString;
  } & Extend;
} & ComponentMetadata;

export type LinkMetadata<Extend extends GeneralComponentExtension = {}> = {
  type: 'link';
  link: {
    text: BindingString;
    url: BindingString;
  } & Extend;
} & ComponentMetadata;

export type InputMetadata<Extend extends GeneralComponentExtension = {}> = {
  type: 'input';
  input: {
    label: BindingString;
    labelClassName: BindingString;
    inputClassName: BindingString;
    inputType: BindingString;
    placeholder: string;
  } & Extend;
} & ComponentMetadata;

export type BaseContainer = {
  wrap: boolean;
  wrapClassName: BindingString;
};

// ------------------------------
// Container and Layout
// ------------------------------

export type LayoutMetadata<Extend extends GeneralComponentExtension & BaseContainer = BaseContainer> = {
  type: 'layout';
  title: string;
  dataBinding: SchemaDefinition<'object'>;
  layout: {
    components: GeneralComponent[];
  } & Extend;
} & ComponentMetadata;

export type ContainerMetadata<Extend extends GeneralComponentExtension & BaseContainer = BaseContainer> = {
  type: 'container';
  title: string;
  dataBinding: SchemaDefinition<'object'>;
  container: {
    components: GeneralComponent[];
  } & Extend;
} & ComponentMetadata;

export type DataTabeLayoutMetadata<Extend extends GeneralComponentExtension = {}> = {
  type: 'dataTable';
  dataTable: {
    add: {
      action: ActionBinding | ActionBinding[];
      navigate?: {
        text: BindingString;
        url: BindingString;
      };
    };
    delete?: {
      prompt: {
        text: BindingString;
      };
      action: ActionBinding | ActionBinding[];
    };
    open?: {
      action: ActionBinding | ActionBinding[];
      navigate: {
        text: BindingString;
        url: BindingString;
      };
    };
    pageSize?: {
      sizes: number[];
      currentSize: BindingString;
      action: ActionBinding | ActionBinding[];
    };
    columns: {
      name: string;
      label: BindingString;
      sort?: {
        enabled: boolean;
        action: ActionBinding | ActionBinding[];
      };
      filter: {
        enabled: boolean;
        placeholder: BindingString;
        useClientFilter: boolean;
      };
    }[];
  } & Extend;
} & ComponentMetadata;

export type GridLayoutMetadata<Extend extends GeneralComponentExtension = {}> = {
  type: 'gridLayout';
  gridLayout: {
    gridSettings: {
      columns: number;
      rowClassName: string;
      cellClassName: string;
    };
    layout: (ComponentMetadata & { row: number; cell: number; size: number })[];
  } & Extend;
} & ComponentMetadata;
