import type { DataBindingContainer, BindingString } from "@supermatic-ui/core";
import { SetStateAction, useCallback, useEffect, useState } from "react";

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
      console.log("[useTemplate] updating value change from context", value);
      setValue(value);
    });
  }, [dataBinding, template, state]);

  return state;
};

export const useEval = <T,>(
  dataBinding: DataBindingContainer,
  expression: BindingString | undefined
): ReactState<T | null> => {
  const state = useState<T | null>(null);

  useEffect(() => {
    const [_, setValue] = state;
    const reactivity = dataBinding.evaluateReactive(expression || "");
    setValue(reactivity.value);
    reactivity.subscribe((value) => {
      setValue(value);
    });
  }, [dataBinding, expression, state]);

  return state;
};

export const useBind = <T,>(
  dataBinding: DataBindingContainer,
  binding: BindingString | undefined
): ReactState<T | null> => {
  const [stateValue, setValue] = useState<T | null>(null);
  const [reactivity, setReactivity] = useState<ReturnType<typeof dataBinding.evaluateReactive> | null>(null);

  useEffect(() => {
    if (!binding) return;

    const property = dataBinding.evaluateTemplate(binding);

    if (property == null) return;

    const evaluationReactivity = dataBinding.evaluateReactive(property);
    setReactivity(evaluationReactivity);
    setValue(evaluationReactivity.value);
    evaluationReactivity.subscribe((value) => {
      setValue(value);
    });
  }, [dataBinding, binding, stateValue]);

  const setStateValue = useCallback(
    (arg: SetStateAction<T | null>) => {
      setValue(arg);
      if (reactivity) {
        const newValue = typeof arg === "function" ? (arg as (v: T | null) => T | null)(stateValue) : arg;
        console.log("[useBind] setting value", newValue);
        reactivity.updateValue(newValue);
      }
    },
    [reactivity]
  );

  return [stateValue, setStateValue];
};
