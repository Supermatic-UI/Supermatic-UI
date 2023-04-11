<script setup lang="ts">
import type { DataBindingContainer, ButtonkMetadata } from "@supermatic-ui/core";
import { setupTemplate } from "@supermatic-ui/vue-core";

const props = defineProps<{ metadata: ButtonkMetadata; dataBinding: DataBindingContainer }>();

const label = setupTemplate(props.dataBinding, props.metadata.button.text);
const className = setupTemplate(props.dataBinding, props.metadata.className);

const click = () => {
  console.log("[SupermaticButton] click");
  if (props.metadata.button.action) {
    console.log("[SupermaticButton] action call", props.metadata.button.action);
    props.dataBinding.handleAction(props.metadata.button.action);
  }
};
</script>

<template>
  <button :class="className" @click="click()">{{ label }}</button>
</template>

<style scoped></style>
