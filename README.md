# Project under development

Project SDUI (temporary name) goals are to provide a simple way to create web-fronend UI using server driven UI approach 
and low-code editor to increase productivity of web developers.

Best use cases for this project are:

* internal web applications, like admin panels and dashboards
* dynamic web applications with complex UI logic controlled by server

## Description

### Project structure

* 'src' folder contains general sources for server driven ui types and core components
* 'sdui-vue' folder contains implementation of server driven ui for vue.js

## Quick start

This project uses yarn, consider using it instead of npm.

You can install yarn with npm:

```BashSession
npm install -g yarn
```

1. Install dependencies

```BashSession
cd sdui-vue
yarn
```

2. Link local packages


```BashSession
cd sdui-vue
yarn link
```

Command should output something like this:

```
success Registered "sdui-vue".
info You can now run `yarn link "sdui-vue"` in the projects where you want to use this package and it will be used instead.
```

3. Run Vue

```BashSession
cd sdui-vue
yarn dev
```
