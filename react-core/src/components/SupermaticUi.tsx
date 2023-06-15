import {
  DataBindingContainer,
  LayoutMetadata,
  Registrations,
  SchemaDefinition,
  createRegistrations,
  dataBindingBuilder,
} from "@supermatic-ui/core";
import { ComponentType, useEffect, useState } from "react";
import { useTemplate } from "../hooks";

type SupermaticUiProps = {
  configuration?: LayoutMetadata;
  onInit?: (dataBinding: DataBindingContainer) => void;
  registrations?: Registrations;
};

const SupermaticUi = (props: SupermaticUiProps) => {
  const { configuration, onInit, registrations } = props;
  const [dataBinding, setDataBinding] = useState<DataBindingContainer | null>(null);
  const [wrapClassName] = useTemplate(dataBinding, configuration?.layout.wrapClassName);

  const [components, setComponents] = useState<Record<string, ComponentType>>({});

  useEffect(() => {
    if (configuration && configuration.type === "layout") {
      console.log("[SupermaticUi] configuration", configuration);
    } else {
      console.log("[SupermaticUi] no configuration");
    }

    if (
      configuration != null &&
      configuration.dataBinding != null &&
      typeof configuration.dataBinding["type"] === "string"
    ) {
      const schemaDefinition = configuration.dataBinding as SchemaDefinition;
      const createdDataBinding = dataBindingBuilder(
        {},
        schemaDefinition,
        registrations ||
          createRegistrations({
            // TODO: Implement SupermaticContainer
            // container: SupermaticContainer,
          })
      );
      setDataBinding(createdDataBinding);
      setComponents(createdDataBinding.registrations.getComponentRegistrations());

      if (onInit) {
        onInit(createdDataBinding);
      }
    }
    //   }, [configuration, onInit, registrations]);
  }, [configuration]);

  return (
    <>
      {configuration?.layout.components.map((item, index) => {
        if (!components[item.type]) {
          return <span key={index}>Component {item.type} not found</span>;
        }
        const Component = components[item.type];
        const componentProps = { metadata: item, dataBinding };
        if (configuration?.layout.wrap) {
          return (
            <div className={wrapClassName} key={index}>
              <Component {...componentProps} key={index} />
            </div>
          );
        } else {
          return <Component {...componentProps} key={index} />;
        }
      })}
    </>
  );
};

export default SupermaticUi;
