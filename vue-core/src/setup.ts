import { Ref } from "vue";
import { DataBindingContainer } from "@supermatic-ui/core/dataBinding/dataBindingBuilder";
import { ControlMetadata } from "@supermatic-ui/core/specs/controls";
import { BindingString } from "@supermatic-ui/core/specs/bindings";

type SetupBindResult<T> = { value: T; set: (value: T) => void };

export const setupTemplate = (
  dataBinding: DataBindingContainer,
  metadata: ControlMetadata,
  template: BindingString,
  vueRef: Ref<string>
) => {
  console.log(`[setup] ${metadata?.type}`);
  const reactivity = dataBinding.evaluateTemplateReactive(template);
  vueRef.value = reactivity.value;
  reactivity.subscribe((value) => {
    console.log(`[setup] ${metadata?.type} value updated to '${value}'`);
    vueRef.value = value;
  });
};

export const setupEval = <T>(
  dataBinding: DataBindingContainer,
  metadata: ControlMetadata,
  expression: BindingString,
  vueRef: Ref<T>
) => {
  console.log(`[setup] ${metadata?.type}`);
  const reactivity = dataBinding.evaluateReactive(expression);
  vueRef.value = reactivity.value;
  reactivity.subscribe((value) => {
    console.log(`[setup] ${metadata?.type} value updated to '${value}'`);
    vueRef.value = value;
  });
};

export const setupBind = <T>(
  dataBinding: DataBindingContainer,
  metadata: ControlMetadata,
  vueRef: Ref<T>
): SetupBindResult<T> => {
  console.log(`[setup] ${metadata?.type}`);
  if (metadata.binding != null) {
    const property = dataBinding.evaluateTemplate(metadata.binding);
    console.log(`[setup] ${metadata?.type} binding for '${metadata.binding}' is '${property}'`);
    if (property != null) {
      const reactivity = dataBinding.evaluateReactive(property);
      vueRef.value = reactivity.value;
      reactivity.subscribe((value) => {
        console.log(`[setup] ${metadata?.type} value updated to '${value}'`);
        vueRef.value = value;
      });
      return {
        value: reactivity.value,
        set: (value: T) => {
          console.log(`[setup] ${metadata?.type} value updated to '${value}'`);
          reactivity.updateValue(value);
        },
      };
    }
  }
  return {
    value: vueRef.value,
    set: (value: T) => {
      console.warn(`[setup] ${metadata?.type} no binding defined for setter`);
    },
  };
};
