<script setup lang="ts">
import SupermaticUi from '../src/sdui-renderer.vue'
import schema from "./sandbox.json";
import { DataBindingContainer } from "@supermatic-ui/core/dataBinding/dataBindingBuilder";
import { buildRegistrationApi } from "@supermatic-ui/core/registrations";

const onInit = (dataBinding) => {
  console.log("[sandbox] onInit", dataBinding);
};
const components = {
};
const registrations = buildRegistrationApi(components);
</script>

<template>
    <h1>Supermatic UI Vue Core Sandbox</h1>
    <SupermaticUi :configuration="schema" :registrations="registrations" @init="onInit($event)"></SupermaticUi>
</template>