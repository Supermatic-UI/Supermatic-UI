<script setup lang="ts">
import schema from "./sandbox.json";
import SduiLabel from "../src/components/sdui-label.vue";
import SduiButton from "../src/components/sdui-button.vue";
import TextIinput from "../src/components/sdui-text-input.vue";
import { buildRegistrationApi } from "@supermatic-ui/core";

const onInit = (dataBinding) => {
  console.log("[sandbox] onInit", dataBinding);
};
const components = {
  label: SduiLabel,
  button: SduiButton,
  textInput: TextIinput,
};
const registrations = buildRegistrationApi(components);
</script>

<template>
  <h1>Supermatic UI Vue Components Sandbox</h1>
  <SupermaticUi :configuration="schema" :registrations="registrations" @init="onInit($event)"></SupermaticUi>
</template>
