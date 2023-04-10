<script setup lang="ts">
import { ref } from "vue";
import { DataBindingContainer } from "@supermatic-ui/core/dataBinding/dataBindingBuilder";
import { LabelMetadata } from "@supermatic-ui/core/general-components/label/labelMetadata";
import { setupTemplate } from "@supermatic-ui/vue-core/src/setup";

const props = defineProps<{ metadata: LabelMetadata; dataBinding: DataBindingContainer }>();

let labelRef = ref("");

setupTemplate(props.dataBinding, props.metadata, props.metadata.label.text, labelRef);
</script>

<template>
  <span>{{ labelRef }}</span>
</template>

<style scoped></style>
