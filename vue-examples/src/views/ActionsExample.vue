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
  <h1>Actions</h1>

  <div class="example">
    <div class="layout">
      <SupermaticUi
        :key="componentKey"
        :configuration="schema"
        :registrations="registrations"
        @init="onInit($event)"
      ></SupermaticUi>
    </div>
    <div>
      <SourceEditor :model-value="source" @update:model-value="updateSchema($event)"></SourceEditor>
    </div>
  </div>
</template>

<style scoped></style>
