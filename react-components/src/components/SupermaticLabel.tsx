import { DataBindingContainer, LabelMetadata } from "@supermatic-ui/core";
import { useTemplate } from "@supermatic-ui/react-core";

type SupermaticLabelProps = {
  metadata: LabelMetadata;
  dataBinding: DataBindingContainer;
};

const SupermaticLabel = (props: SupermaticLabelProps) => {
  const { metadata, dataBinding } = props;

  const [label] = useTemplate(dataBinding, metadata.label.text);
  const [className] = useTemplate(dataBinding, metadata.className);

  return (
    <>
      <span className={className}>{label}</span>
    </>
  );
};

export default SupermaticLabel;
