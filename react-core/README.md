## @supermatic-ui/react-core

Supermatic UI is a project that aims to provide a simple way to create web frontend UIs using a server-driven UI approach and a low-code editor, enhancing the productivity of web developers.

The best use cases for this project are:

* Internal web applications, such as admin panels and dashboards
* Dynamic web applications with complex UI logic controlled by the server
* Low-code and no-code applications

Supermatic UI stems from the abstract idea of composing UIs from metadata. It is not a framework; rather, it offers a framework-agnostic approach to creating UIs.

This package, `@supermatic-ui/react-core`, is implementation of `@supermatic-ui/core` in React. Additionally, we have the [@supermatic-ui/react-components](https://www.npmjs.com/package/@supermatic-ui/react-components) package, which offers a simple HTML-based component library that you can restyle.

To provide the best experience, you can clone the components to your repository and override everything to suit your needs.

Full documentation available at [Supermatic-UI GitHub repository](https://github.com/Supermatic-UI/Supermatic-UI/tree/main/docs).

## Quick Start

This tutorial is applicable to developers who want to implement Supermatic UI in a web framework that is not supported or in a vanilla JavaScript web application.

1. Install the `@supermatic-ui/react-core` package using your package manager.


2. Use `SupermaticUi` component in your page

```ts
// App.tsx
import React from "react";
import { SupermaticUi } from "@supermatic-ui/react-core";

// Implement your components
import MyLabelComponent from "./MyLabelComponent";

// Define and import layout schema
import schema from "./helloWorld.json";

// Register your components
import { createRegistrations } from "@supermatic-ui/core";
const components = createRegistrations({
  label: MyLabelComponent,
})

const App = () => {

  return (
    <>
      <SupermaticUi configuration={schema} registrations={components}></SupermaticUi>
    </>
  );
};

export default App;

```

3. Implement your components

```ts
// MyLabelComponent
import { DataBindingContainer, LabelMetadata } from "@supermatic-ui/core";
import { useTemplate } from "@supermatic-ui/react-core";

type MyLabelComponentProps = {
  metadata: LabelMetadata;
  dataBinding: DataBindingContainer;
};

const MyLabelComponent = (props: MyLabelComponentProps) => {
  const { metadata, dataBinding } = props;

  // Create read-only reactive binding
  const [label] = useTemplate(dataBinding, metadata.label.text);

  return (
    <>
      <span>{label}</span>
    </>
  );
};

export default MyLabelComponent;
```

4. Define view schema in json

```json
// helloWorld.json
{
  "type": "layout",
  "title": "Hello world",
  "dataBinding": {
    "type": "object",
    "properties": {
      "test": {
        "type": "string",
        "value": "It's working!"
      }
    },
    "actions": {}
  },
  "layout": {
    "components": [
      {
        "type": "label",
        "label": {
          "text": "Hello world! {{test}}"
        }
      }
    ]
  }
}

```

Full documentation available at [Supermatic-UI GitHub repository](https://github.com/Supermatic-UI/Supermatic-UI/tree/main/docs).

## Limitations

At its current state, Supermatic UI has the following limitations:

* It does not support the creation of truly dynamic components or complex actions. Supermatic UI primarily serves as a layout ordering tool rather than dynamically composing the UI from the backend. You will need to implement your components (typically components from a design system) and dynamically arrange the layout for pages. However, you can attempt to define actions that evaluate your script to work around this limitation.

* Direct usage of your components is not supported, and the library requires you to write wrappers for each component.