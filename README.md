# Supermatic UI

Supermatic UI is a project to provide a simple way to create web-fronend UI using server driven UI approach and low-code editor to increase productivity of web developers.

Best use cases for this project are:

* Internal web applications, like admin panels and dashboards
* Dynamic web applications with complex UI logic controlled by server
* Low-code and no-code applications

Supermatic UI comes from abstract idea of composing UI from metadata, it's not a framework, it's a way to create UI with fraemwork agnostic approach. 
For first time it implemented for Vue.js, but it's possible to implement it for any other framework.

## Description

### Project structure

* `sdui-core` - folder contains general sources for server driven ui types and core components
* `sdui-vue`  - folder contains implementation of server driven ui for vue.js

## Quick start

This project uses yarn, consider using it instead of npm.

You can install yarn with npm:

```BashSession
npm install -g yarn
```

1. Install dependencies

```BashSession
cd sdui-vue
yarn install
```

3. Run Vue

```BashSession
cd sdui-vue
yarn dev
```
