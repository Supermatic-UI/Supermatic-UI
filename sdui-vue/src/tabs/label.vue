<script setup lang="ts">
import SduiRenderer from "../sdui/sdui-renderer.vue";
import schema from "./label.json";
import SduiLabel from "../components/sdui-label.vue";
import SduiButton from "../components/sdui-button.vue";
import TextIinput from "../components/sdui-text-input.vue";
import { DataBindingContainer } from "sdui-core/dataBinding/DataBindingContainer";
import { buildRegistrationApi } from "sdui-core/registrations";

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
  alert: (definition, data, context) => {
    console.log("[formReset-handler] alert called with value", definition.value);
    const text = context.evaluateTemplate(definition.value);
    alert(text);
  },
});

const setName = () => {
  sdui.setProperty("name", "John Doe");
};
</script>

<template>
  <h3>Label test</h3>
  <SduiRenderer :configuration="schema" :registrations="registrations" @init="onInit($event)"></SduiRenderer>
  <div>
    <h3>Debug zone</h3>
    <button @click="setName()">Set name</button>
  </div>
</template>

<style scoped></style>
