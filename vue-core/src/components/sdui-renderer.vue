<script setup lang="ts">
import { PageMetadata } from "@supermatic-ui/core/page";
import { dataBindingBuilder } from "@supermatic-ui/core/dataBinding/dataBindingBuilder";
import { SchemaDefinition } from "@supermatic-ui/core/specs/bindings";
import { buildRegistrationApi, RegistrationApi } from "@supermatic-ui/core/registrations";
import { DataBindingContainer } from "@supermatic-ui/core/dataBinding/dataBindingBuilder";

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
      <p>Debug component type "{{ item.type }}"</p>
      <component :is="components[item.type]" :metadata="item" :dataBinding="dataBinding"> </component>
    </div>
  </template>
</template>

<style scoped></style>
