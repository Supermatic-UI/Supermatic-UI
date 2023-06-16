## @supermatic-ui/core

Supermatic UI is a project that aims to provide a simple way to create web frontend UIs using a server-driven UI approach and a low-code editor, enhancing the productivity of web developers.

The best use cases for this project are:

* Internal web applications, such as admin panels and dashboards
* Dynamic web applications with complex UI logic controlled by the server
* Low-code and no-code applications

Supermatic UI stems from the abstract idea of composing UIs from metadata. It is not a framework; rather, it offers a framework-agnostic approach to creating UIs.

This package, `@supermatic-ui/core`, serves as the core project, providing base types and an implementation of reactive UI. If you intend to use Server-Driven UI in your solution, we recommend examining framework-specific implementations:

* React: Use the [@supermatic-ui/react-core](https://www.npmjs.com/package/@supermatic-ui/react-core) package for the React implementation. Additionally, we have the [@supermatic-ui/react-components](https://www.npmjs.com/package/@supermatic-ui/react-components) package, which offers a simple HTML-based component library that you can restyle.

* Vue.js: Similarly, for Vue.js, utilize the [@supermatic-ui/vue-core](https://www.npmjs.com/package/@supermatic-ui/vue-core) package for the Vue implementation, and the [@supermatic-ui/vue-components](https://www.npmjs.com/package/@supermatic-ui/vue-components) package for the basic component library.

To provide the best experience, you can clone the components to your repository and override everything to suit your needs.

Full documentation available at [Supermatic-UI GitHub repository](https://github.com/Supermatic-UI/Supermatic-UI/tree/main/docs).

## Philosophy

Supermatic UI manages UI components within a viewport, allowing you to define:
* Components to be rendered (referred to as `components`)
* How to display and order components in the viewport (referred to as `layout`)
* Event handling and actions to respond to events (referred to as `actions`)
* Utilizing the data context of the viewport to display and interact with data (referred to as `dataBinding`)

## Quick Start

This tutorial is applicable to developers who want to implement Supermatic UI in a web framework that is not supported or in a vanilla JavaScript web application.

1. Install the `@supermatic-ui/core` package using your package manager.
2. To set up the viewport, retrieve the layout information using the `LayoutMetadata` type. The `LayoutMetadata` contains all the necessary information to render your view.
3. Populate the `Registrations` with your components.
4. Handle data binding in the view. Supermatic UI utilizes the internal context of the viewport and provides data binding features to display or modify values.
    1. For rendering view components with readonly access, use the `evaluateTemplateReactive` method in the `DataBindingContainer`. The `evaluateTemplateReactive` method allows for templating, and the `-Reactive` postfix ensures reactive subscription with dependency event handling for every change of dependent internal context values. If your implementation does not require reactive template evaluation, you can use `evaluateTemplate`.
    2. To implement read/write binding, utilize the `evaluateReactive` method in the `DataBindingContainer`.

Full documentation available at [Supermatic-UI GitHub repository](https://github.com/Supermatic-UI/Supermatic-UI/tree/main/docs).

## Limitations

At its current state, Supermatic UI has the following limitations:

* It does not support the creation of truly dynamic components or complex actions. Supermatic UI primarily serves as a layout ordering tool rather than dynamically composing the UI from the backend. You will need to implement your components (typically components from a design system) and dynamically arrange the layout for pages. However, you can attempt to define actions that evaluate your script to work around this limitation.

* Direct usage of your components is not supported, and the library requires you to write wrappers for each component.