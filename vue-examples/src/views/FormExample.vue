<script setup lang="ts">
import { ref } from 'vue'
import YAML from 'yaml'
import { SupermaticUi, SupermaticContainer } from '@supermatic-ui/vue-core'
import { SupermaticButton, SupermaticLabel, SupermaticInput } from '@supermatic-ui/vue-components'
import { plainText as formYaml } from './layouts/form.yaml'
import type { DataBindingContainer, LayoutMetadata } from '@supermatic-ui/core'
import { createRegistrations } from '@supermatic-ui/core'
import SourceEditor from '../components/SourceEditor.vue'

const source = ref(formYaml)
const schema = ref<LayoutMetadata>(YAML.parse(formYaml))
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
    <h1>Form</h1>
    <p>
      This example shows how data binding is working. Supermatic UI handles data with an internal
      context, and components can interact with the context using read or read-write bindings.
    </p>
    <p>
      In this case, the Label component retrieves data from the context using double curly braces
      markup called 'name'. The Input control interacts with the same data variable, but in
      read-write binding, allowing the variable value to be edited. Every change will reactively
      update the value for every component that uses it.
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
