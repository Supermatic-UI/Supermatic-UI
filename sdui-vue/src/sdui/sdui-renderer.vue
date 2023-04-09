<script setup lang="ts">
import { PageMetadata } from "sdui-core/page";
import { dataBindingBuilder } from "sdui-core/dataBinding/dataBindingBuilder";
import { SchemaDefinition } from "sdui-core/specs/bindings";
import { buildRegistrationApi, RegistrationApi } from "sdui-core/registrations";
import { DataBindingContainer } from "sdui-core/dataBinding/DataBindingContainer";

const props = defineProps<{
  configuration?: PageMetadata;
  onInit?: (dataBinding: DataBindingContainer) => void;
  registrations?: RegistrationApi;
}>();

if (props.configuration && props.configuration.type === "layout") {
  console.log("[sdui-component] configuration", props.configuration);
} else {
  console.log("[sdui-component] no configuration");
}

let schemaDefinition: SchemaDefinition;
let dataBinding: DataBindingContainer;

let registrations = props.registrations;

if (registrations == null) {
  registrations = buildRegistrationApi({}, {});
}

let components = registrations.getComponentRegistrations();

if (
  props.configuration != null &&
  props.configuration.dataBinding != null &&
  typeof props.configuration.dataBinding["type"] === "string"
) {
  schemaDefinition = props.configuration.dataBinding as SchemaDefinition;
  dataBinding = dataBindingBuilder({}, schemaDefinition, registrations);
  if (props.onInit) {
    props.onInit(dataBinding);
  }
}
console.log("[sdui-renderer] components", components);
</script>

<template>
  <template v-for="(item, index) in props.configuration?.page" :key="index">
    <div>
      <p>Component type "{{ item.type }}"</p>
      <component :is="components[item.type]" :metadata="item" :dataBinding="dataBinding"> </component>
    </div>
  </template>
</template>

<style scoped></style>
