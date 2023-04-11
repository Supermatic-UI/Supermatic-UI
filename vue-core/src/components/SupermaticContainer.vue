<script setup lang="ts">
import type { DataBindingContainer, ContainerMetadata } from "@supermatic-ui/core";
import { setupTemplate } from "../setup";

const props = defineProps<{ metadata: ContainerMetadata; dataBinding: DataBindingContainer }>();
const wrapClassName = setupTemplate(props.dataBinding, props.metadata.container.wrapClassName);
const className = setupTemplate(props.dataBinding, props.metadata.className);

let components = props.dataBinding.registrations.getComponentRegistrations();
</script>

<template>
  <div :class="className">
    <template v-for="(item, index) in props.metadata.container.components" :key="index">
      <div v-if="props.metadata.container.wrap" :class="wrapClassName">
        <component :is="components[item.type]" :metadata="item" :dataBinding="dataBinding"> </component>
      </div>
      <component v-else :is="components[item.type]" :metadata="item" :dataBinding="dataBinding"> </component>
    </template>
  </div>
</template>

<style scoped></style>
