<script setup lang="ts">
import schema from "./sandbox.json";
import SupermaticLabel from "../src/components/SupermaticLabel.vue";
import SupermaticButton from "../src/components/SupermaticButton.vue";
import SupermaticInput from "../src/components/SupermaticInput.vue";
import { createRegistrations } from "@supermatic-ui/core";

const onInit = (dataBinding) => {
  console.log("[sandbox] onInit", dataBinding);
};
const components = {
  label: SupermaticLabel,
  button: SupermaticButton,
  input: SupermaticInput,
};
const registrations = createRegistrations(components);
</script>

<template>
  <h1>Supermatic UI Vue Components Sandbox</h1>
  <SupermaticUi :configuration="schema" :registrations="registrations" @init="onInit($event)"></SupermaticUi>
</template>
