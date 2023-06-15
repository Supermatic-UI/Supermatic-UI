import { DataBindingContainer, InputMetadata } from "@supermatic-ui/core";
import { useBind, useTemplate } from "@supermatic-ui/react-core";
import { ChangeEvent, useCallback } from "react";

type SupermaticLabelProps = {
  metadata: InputMetadata;
  dataBinding: DataBindingContainer;
};

export type InputRawValue = string | number;

const SupermaticLabel = (props: SupermaticLabelProps) => {
  const { metadata, dataBinding } = props;

  const [label] = useTemplate(dataBinding, metadata.input.label);
  const [labelClassName] = useTemplate(dataBinding, metadata.className);
  const [inputClassName] = useTemplate(dataBinding, metadata.input.inputClassName);
  const [inputType] = useTemplate(dataBinding, metadata.input.inputType);
  const [placeholder] = useTemplate(dataBinding, metadata.input.placeholder);
  const [className] = useTemplate(dataBinding, metadata.className);

  const [value, setValue] = useBind<InputRawValue>(dataBinding, metadata.binding);

  const updateInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      console.log("[SupermaticLabel] setValue", newValue);
      setValue(newValue);
    },
    [setValue]
  );

  return (
    <>
      <div className={className}>
        <label className={labelClassName}>{label}</label>
        <input
          type={inputType}
          value={value || ""}
          onChange={updateInputValue}
          placeholder={placeholder}
          className={inputClassName}
        />
      </div>
    </>
  );
};

export default SupermaticLabel;
