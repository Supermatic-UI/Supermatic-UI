<script setup lang="ts">
import SupermaticUi from "../src/components/sdui-renderer.vue";
import schema from "./sandbox.json";
import { createRegistrations } from "@supermatic-ui/core";

const onInit = (dataBinding) => {
  console.log("[sandbox] onInit", dataBinding);
};
const components = {};
const registrations = createRegistrations(components);
</script>

<template>
  <h1>Supermatic UI Vue Core Sandbox</h1>
  <SupermaticUi :configuration="schema" :registrations="registrations" @init="onInit($event)"></SupermaticUi>
</template>
