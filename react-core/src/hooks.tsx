import type { DataBindingContainer, BindingString } from "@supermatic-ui/core";
import { SetStateAction, useEffect, useState } from "react";

type ReactState<T> = [T, (value: SetStateAction<T>) => void];

export const useTemplate = (
  dataBinding: DataBindingContainer | null,
  template: BindingString | undefined
): ReactState<string> => {
  const state = useState<string>("");

  useEffect(() => {
    if (!dataBinding) return;
    const reactivity = dataBinding.evaluateTemplateReactive(template || "");
    const [_, setValue] = state;
    setValue(reactivity.value);
    reactivity.subscribe((value) => {
      setValue(value);
    });
  }, [dataBinding, template]);

  return state;
};

export const useEval = <T,>(
  dataBinding: DataBindingContainer,
  expression: BindingString | undefined
): ReactState<T | undefined> => {
  const state = useState<T | undefined>(undefined);

  useEffect(() => {
    const [_, setValue] = state;
    const reactivity = dataBinding.evaluateReactive(expression || "");
    setValue(reactivity.value);
    reactivity.subscribe((value) => {
      setValue(value);
    });
  }, [dataBinding, expression]);

  return state;
};

export const useBind = <T,>(
  dataBinding: DataBindingContainer,
  binding: BindingString | undefined
): ReactState<T | undefined> => {
  const state = useState<T | undefined>(undefined);

  useEffect(() => {
    if (!binding) return;

    const [_, setValue] = state;
    const property = dataBinding.evaluateTemplate(binding);

    if (property == null) return;

    const reactivity = dataBinding.evaluateReactive(property);
    setValue(reactivity.value);
    reactivity.subscribe((value) => {
      setValue(value);
    });
  }, [dataBinding, binding]);

  return state;
};
