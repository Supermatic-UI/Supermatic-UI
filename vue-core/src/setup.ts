import type { Ref } from "vue";
import { ref } from "vue";
import type { DataBindingContainer, ComponentMetadata, BindingString } from "@supermatic-ui/core";

type SetupBindResult<T> = { value: T; set: (value: T) => void };

export const setupTemplate = (
  dataBinding: DataBindingContainer,
  template: BindingString | undefined,
  vueRef?: Ref<string>
): Ref<string> => {
  const useRef = vueRef || ref("");
  const reactivity = dataBinding.evaluateTemplateReactive(template || "");
  useRef.value = reactivity.value;
  reactivity.subscribe((value) => {
    useRef.value = value;
  });
  return useRef;
};

export const setupEval = <T>(
  dataBinding: DataBindingContainer,
  expression: BindingString | undefined,
  vueRef?: Ref<T>
): Ref<T | undefined> => {
  const useRef = vueRef || ref<T>();
  const reactivity = dataBinding.evaluateReactive(expression || "");
  useRef.value = reactivity.value;
  reactivity.subscribe((value) => {
    useRef.value = value;
  });
  return useRef;
};

export const setupBind = <T>(
  dataBinding: DataBindingContainer,
  binding: BindingString | undefined,
  vueRef: Ref<T>
): SetupBindResult<T> => {
  if (binding) {
    const property = dataBinding.evaluateTemplate(binding);
    if (property != null) {
      const reactivity = dataBinding.evaluateReactive(property);
      vueRef.value = reactivity.value;
      reactivity.subscribe((value) => {
        vueRef.value = value;
      });
      return {
        value: reactivity.value,
        set: (value: T) => {
          reactivity.updateValue(value);
        },
      };
    }
  }
  return {
    value: vueRef.value,
    set: () => {},
  };
};
