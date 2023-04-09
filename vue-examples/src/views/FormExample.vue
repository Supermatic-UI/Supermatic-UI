<script setup lang="ts">
// TODO: Fix imports
// import { SupermaticUi } from "@supermatic-ui/vue-core/src/index";
// import {
//   SduiButton,
//   SduiLabel,
//   SduiTetxtInput
// } from "@supermatic-ui/vue-components/src/index";
import schema from "./layouts/form.json";
// TODO: Fix imports
// import { DataBindingContainer } from "@supermatic-ui/core/dataBinding/dataBindingBuilder";
import { buildRegistrationApi } from "@supermatic-ui/core/registrations";
let sdui;
const onInit = (dataBinding) => {
  console.log("[label test] onInit", dataBinding);
  sdui = dataBinding;
};
const components = {
  // label: SduiLabel,
  // button: SduiButton,
  // textInput: SduiTetxtInput,
    label: 'SduiLabel',
  button: 'SduiButton',
  textInput: 'SduiTetxtInput',
};
const registrations = buildRegistrationApi(components);
const setName = () => {
  sdui.setProperty("name", "John Doe");
};
</script>

<template>
  <h1>Form </h1>

  <div class="layout">
    <SupermaticUi :configuration="schema" :registrations="registrations" @init="onInit($event)"></SupermaticUi>
  </div>
</template>

<style scoped></style>
