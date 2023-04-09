<script setup lang="ts">
import SduiRenderer from "../sdui/sdui-renderer.vue";
import schema from "./http.json";
import SduiLabel from "../components/sdui-label.vue";
import SduiButton from "../components/sdui-button.vue";
import TextIinput from "../components/sdui-text-input.vue";
import { DataBindingContainer } from "sdui-core/dataBinding/dataBindingBuilder";
import { buildRegistrationApi } from "sdui-core/registrations";
import { http } from "sdui-core/actions/http";
import { set } from "sdui-core/actions/set";

let sdui: DataBindingContainer;
const onInit = (dataBinding) => {
  console.log("[label test] onInit", dataBinding);
  sdui = dataBinding;
};

const components = {
  label: SduiLabel,
  button: SduiButton,
  textInput: TextIinput,
};

const registrations = buildRegistrationApi(components, {
  http,
  set,
});

const setName = () => {
  sdui.setProperty("name", "John Doe");
};
</script>

<template>
  <h3>HTTP test</h3>
  <SduiRenderer :configuration="schema" :registrations="registrations" @init="onInit($event)"></SduiRenderer>
</template>

<style scoped></style>
