<script setup lang="ts">
import { createRegistrations, dataBindingBuilder } from "@supermatic-ui/core";
import type { SchemaDefinition, Registrations, LayoutMetadata, DataBindingContainer } from "@supermatic-ui/core";
import { ref } from "vue";
import { setupTemplate } from "../setup";
import SduiContainer from "./sdui-container.vue";

const props = defineProps<{
  configuration?: LayoutMetadata;
  onInit?: (dataBinding: DataBindingContainer) => void;
  registrations?: Registrations;
}>();

const wrapClassName = ref("");

if (props.configuration && props.configuration.type === "layout") {
  console.log("[sdui-component] configuration", props.configuration);
} else {
  console.log("[sdui-component] no configuration");
}

let schemaDefinition: SchemaDefinition;
let dataBinding: DataBindingContainer;

let registrations = props.registrations;
let components: Record<string, any> = {};
if (
  props.configuration != null &&
  props.configuration.dataBinding != null &&
  typeof props.configuration.dataBinding["type"] === "string"
) {
  schemaDefinition = props.configuration.dataBinding as SchemaDefinition;
  dataBinding = dataBindingBuilder(
    {},
    schemaDefinition,
    registrations ||
      createRegistrations({
        container: SduiContainer,
      })
  );
  components = dataBinding.registrations.getComponentRegistrations();
  setupTemplate(dataBinding, props.configuration.layout.wrapClassName, wrapClassName);

  if (props.onInit) {
    props.onInit(dataBinding);
  }
}

console.log("[sdui-renderer] components", components);
</script>

<template>
  <template v-for="(item, index) in props.configuration?.layout.components" :key="index">
    <div v-if="props.configuration?.layout.wrap" :class="wrapClassName">
      <component :is="components[item.type]" :metadata="item" :dataBinding="dataBinding"> </component>
    </div>
    <component v-else :is="components[item.type]" :metadata="item" :dataBinding="dataBinding"> </component>
  </template>
</template>

<style scoped></style>
