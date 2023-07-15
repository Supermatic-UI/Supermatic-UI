<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Supermatic UI logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <img alt="Vue logo" class="logo" src="@/assets/vue-logo.svg" width="125" height="125" />
    <meta name="description" content="Supermatic UI">
    <div class="wrapper">
      <h2>Here is Supermatic UI with Vue.js example</h2>
      <p>The way to build web UI with server driven approach and low-code editor</p>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/form">Form example</RouterLink>
        <RouterLink to="/actions">Actions example</RouterLink>
      </nav>
    </div>
  </header>

  <div class="view">
    <RouterView />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
  font-weight: normal;
}

header {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100vh;
  padding-bottom: 40px;
}

.wrapper {
  min-width: 640px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.view {
  padding: 0 2rem;
}

@media (min-width: 1024px) {
  header {
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    width: 100%;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

@media (max-width: 1024px) {
  header {
    place-items: border-left;
    align-items: start;
    flex-direction: column;
  }
  .wrapper {
    min-width: 0;
  }
}

@media (max-width: 640px) {
  header {
    padding: 2rem;
    flex-direction: column;
  }

  .wrapper {
    min-width: 0;
  }

  nav {
    text-align: left;
  }

  #app {
    display: display;
  }

  .view {
    padding: 0;
  }
}
</style>
