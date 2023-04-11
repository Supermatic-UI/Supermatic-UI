<script setup lang="ts">
import { ref } from 'vue'
import { SupermaticUi, SupermaticContainer } from '@supermatic-ui/vue-core'
import { SduiButton, SduiLabel, SduiTetxtInput } from '@supermatic-ui/vue-components'
import form from './layouts/form.json'
import type { DataBindingContainer, LayoutMetadata } from '@supermatic-ui/core'
import { createRegistrations } from '@supermatic-ui/core'
import SourceEditor from '../components/SourceEditor.vue'

const source = ref(JSON.stringify(form, null, 2))
const schema = ref<LayoutMetadata>(form)
const componentKey = ref(0)

const onInit = (dataBinding: DataBindingContainer) => {
  console.log('[example] onInit', dataBinding)
}

const components = {
  label: SduiLabel,
  button: SduiButton,
  input: SduiTetxtInput,
  container: SupermaticContainer
}
const registrations = createRegistrations(components)
const updateSchema = (value: string) => {
  try {
    schema.value = JSON.parse(value)
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
  <h1>Form</h1>

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
