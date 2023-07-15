<template>
  <div class="content">
    <h1>Supermatic UI</h1>
    <p>
      Supermatic UI is a project to provide a simple way to create web-fronend UI using server
      driven UI approach and low-code editor to increase productivity of web developers.
    </p>
    <br />

    <p>Best use cases for this project are:</p>

    <ul>
      <li>Internal web applications, like admin panels and dashboards</li>
      <li>Dynamic web applications with complex UI logic controlled by server</li>
      <li>Low-code and no-code applications</li>
    </ul>
    <br />

    <p>
      Supermatic UI comes from abstract idea of composing UI from metadata, it's not a framework,
      it's a way to create UI with fraemwork agnostic approach.
    </p>

    <p>
      You can use Supermatic UI Server-Driven UI in your solution, with framework-specific
      implementations:
    </p>
    <ul>
      <li>
        React: Use the
        <a target="_blank" href="https://www.npmjs.com/package/@supermatic-ui/react-core"
          >@supermatic-ui/react-core</a
        >
        package for the React implementation. Additionally, we have the
        <a target="_blank" href="https://www.npmjs.com/package/@supermatic-ui/react-components"
          >@supermatic-ui/react-components</a
        >
        package, which offers a simple HTML-based component library that you can restyle.
      </li>
      <li>
        Vue.js: Similarly, for Vue.js, utilize the
        <a target="_blank" href="https://www.npmjs.com/package/@supermatic-ui/vue-core"
          >@supermatic-ui/vue-core</a
        >
        package for the Vue implementation, and the
        <a target="_blank" href="https://www.npmjs.com/package/@supermatic-ui/vue-components"
          >@supermatic-ui/vue-components</a
        >
        package for the basic component library.
      </li>
    </ul>

    <p>
      Also if you want more control or if you want to use a framework that is not supported, you can
      start from the core package
      <a target="_blank" href="https://www.npmjs.com/package/@supermatic-ui/core"
        >@supermatic-ui/core</a
      >
      and continue with tutorial to implement it yourself.
    </p>
    <p>
      Full documentation available at
      <a target="_blank" href="https://github.com/Supermatic-UI/Supermatic-UI/tree/main/docs"
        >Supermatic-UI GitHub repository</a
      >.
    </p>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .content {
    padding: 0 2rem;
  }
}
</style>
