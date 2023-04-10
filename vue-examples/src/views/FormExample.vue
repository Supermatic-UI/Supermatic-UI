<script setup lang="ts">
import { SupermaticUi } from '@supermatic-ui/vue-core'
import { SduiButton, SduiLabel, SduiTetxtInput } from '@supermatic-ui/vue-components'
import schema from './layouts/form.json'
import type { DataBindingContainer } from '@supermatic-ui/core'
import { buildRegistrationApi } from '@supermatic-ui/core'
let dataBindingContainer: DataBindingContainer
const onInit = (dataBinding: DataBindingContainer) => {
  console.log('[label test] onInit', dataBinding)
  dataBindingContainer = dataBinding
}
const components = {
  label: SduiLabel,
  button: SduiButton,
  textInput: SduiTetxtInput
}
const registrations = buildRegistrationApi(components)
const setName = () => {
  dataBindingContainer.setProperty('name', 'John Doe')
}
</script>

<template>
  <h1>Form</h1>

  <div class="layout">
    <SupermaticUi
      :configuration="schema"
      :registrations="registrations"
      @init="onInit($event)"
    ></SupermaticUi>
  </div>
</template>

<style scoped></style>
