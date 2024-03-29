## @supermatic-ui/vue-core

Supermatic UI is a project that aims to provide a simple way to create web frontend UIs using a server-driven UI approach and a low-code editor, enhancing the productivity of web developers.

The best use cases for this project are:

* Internal web applications, such as admin panels and dashboards
* Dynamic web applications with complex UI logic controlled by the server
* Low-code and no-code applications

Supermatic UI stems from the abstract idea of composing UIs from metadata. It is not a framework; rather, it offers a framework-agnostic approach to creating UIs.

This package, `@supermatic-ui/vue-core`, is implementation of `@supermatic-ui/core` in Vue. Additionally, we have the [@supermatic-ui/vue-components](https://www.npmjs.com/package/@supermatic-ui/vue-components) package, which offers a simple HTML-based component library that you can restyle.

To provide the best experience, you can clone the components to your repository and override everything to suit your needs.

Full documentation available at [Supermatic-UI GitHub repository](https://github.com/Supermatic-UI/Supermatic-UI/tree/main/docs).

## Quick Start

This tutorial is applicable to developers who want to implement Supermatic UI in a web framework that is not supported or in a vanilla JavaScript web application.

1. Install the `@supermatic-ui/vue-core` package using your package manager.

2. Register plugin in your app

```ts
// main.ts
import { UseSupermaticUi } from '@supermatic-ui/vue-core'

...

app.use(UseSupermaticUi)
```


3. Use `SupermaticUi` component in your page

```ts
// App.tsx
<script setup lang="ts">

// Implement your components
import MyLabelComponent from "./MyLabelComponent.vue";

// Define and import layout schema
import schema from "./helloWorld.json.json";

// Register your components
import { createRegistrations } from "@supermatic-ui/core";
const components = createRegistrations({
  label: SupermaticLabel
});
</script>

<template>
  <SupermaticUi :configuration="schema" :registrations="components"></SupermaticUi>
</template>

```

4. Implement your components

```ts
// MyLabelComponent
<script setup lang="ts">
import type { DataBindingContainer, LabelMetadata } from "@supermatic-ui/core";
import { setupTemplate } from "@supermatic-ui/vue-core";

const props = defineProps<{ metadata: LabelMetadata; dataBinding: DataBindingContainer }>();

// Create read-only reactive binding
const label = setupTemplate(props.dataBinding, props.metadata.label.text);
</script>

<template>
  <span>{{ label }}</span>
</template>

<style scoped></style>
```

5. Define view schema in json

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