<script setup lang="ts">
import { ref } from 'vue'
import YAML from 'yaml'
import { SupermaticUi, SupermaticContainer } from '@supermatic-ui/vue-core'
import { SupermaticButton, SupermaticLabel, SupermaticInput } from '@supermatic-ui/vue-components'
import { plainText as actionsYaml } from './layouts/actions.yaml'
import type { DataBindingContainer, LayoutMetadata } from '@supermatic-ui/core'
import { createRegistrations } from '@supermatic-ui/core'
import SourceEditor from '../components/SourceEditor.vue'

const source = ref(actionsYaml)
const schema = ref<LayoutMetadata>(YAML.parse(actionsYaml))
const componentKey = ref(0)

const onInit = (dataBinding: DataBindingContainer) => {
  console.log('[example] onInit', dataBinding)
}

const components = {
  label: SupermaticLabel,
  button: SupermaticButton,
  input: SupermaticInput,
  container: SupermaticContainer
}

const registrations = createRegistrations(components)
const updateSchema = (value: string) => {
  try {
    schema.value = YAML.parse(value)
    forceRerender()
  } catch (error) {
    // ignore
  }
}

const forceRerender = () => {
  componentKey.value += 1
}
</script>

<template>
  <div class="content">
    <h1>Actions</h1>
    <p>
      This example shows the core functions of the Actions feature. In Supermatic UI, to provide a
      complete experience with Server-Driven UI, we need to handle various interactions with the
      user and manage many aspects that arise in real usage, such as data fetching, input
      validation, event reactions, and more.
    </p>

    <p>
      This feature is called Actions, and we can define actions for each event point. We can set a
      single action or an action chain (an array of actions). Each specific action is registered
      with its own type and can define its own arguments. An action can access the data context and
      the current component.
    </p>

    <p>
      In this case, we have created a button that will fetch a random cat fact from a public API.
      Here's how it works: In the Button component, we set an action with the type "http" and
      specify its arguments (url, method). The last argument is "onResponse," which is also an
      action. We set it to another action with the type "set," which will update the data context
      variable called "value" using a double curly braces template.
    </p>
  </div>

  <div class="example">
    <div class="layout">
      <SupermaticUi
        :key="componentKey"
        :configuration="schema"
        :registrations="registrations"
        @init="onInit($event)"
      >
      </SupermaticUi>
    </div>
    <div>
      <SourceEditor :model-value="source" @update:model-value="updateSchema($event)"></SourceEditor>
    </div>
  </div>

  <div class="content">
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
