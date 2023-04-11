# Supermatic UI

![docs/logo.png](docs/logo.png)

Supermatic UI is a project to provide a simple way to create web-fronend UI using server driven UI approach and low-code editor to increase productivity of web developers.

Best use cases for this project are:

* Internal web applications, like admin panels and dashboards
* Dynamic web applications with complex UI logic controlled by server
* Low-code and no-code applications

Supermatic UI comes from abstract idea of composing UI from metadata, it's not a framework, it's a way to create UI with fraemwork agnostic approach. 
For first time it implemented for Vue.js, but it's possible to implement it for any other framework.

## Description

### Project structure

* `core`           - folder contains general sources for server driven ui types and core components
* `vue-vue`        - folder contains implementation of server driven ui for Vue.js
* `vue-components` - folder contains Vue.js UI-Kit components
* `vue-examples`   - folder contains Supermatic UI examples for Vue.js

## Quick start

This project uses yarn, consider using it instead of npm.

You can install yarn with npm:

```BashSession
npm install -g yarn
```

1. Prepare core project

```BashSession
cd core
yarn install
yarn build
```

For development, you can use `yarn dev` and check project with sandbox

2. Prepare Vue Core

```BashSession
cd ../vue-core
yarn install
yarn build
```

For development, you can use `yarn dev` and check project with sandbox

3. Prepare Vue Components

```BashSession
cd ../vue-components
yarn install
yarn build
```

For development, you can use `yarn dev` and check project with sandbox

4. Run Vue Examples

```BashSession
cd ../vue-examples
yarn install
yarn build
```