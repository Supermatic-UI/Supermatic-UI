<script setup lang="ts">
import type { DataBindingContainer, LabelMetadata } from "@supermatic-ui/core";
import { setupTemplate } from "@supermatic-ui/vue-core";

const props = defineProps<{ metadata: LabelMetadata; dataBinding: DataBindingContainer }>();

const label = setupTemplate(props.dataBinding, props.metadata.label.text);
const className = setupTemplate(props.dataBinding, props.metadata.className);
</script>

<template>
  <span :class="className">{{ label }}</span>
</template>

<style scoped></style>
