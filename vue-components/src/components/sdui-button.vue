<script setup lang="ts">
import { DataBindingContainer } from "@supermatic-ui/core/dataBinding/dataBindingBuilder";
import { ButtonkMetadata } from "@supermatic-ui/core/general-components/button/buttonMetadata";
import { ref } from "vue";
import { setupTemplate } from "@supermatic-ui/vue-core/src/setup";

const props = defineProps<{ metadata: ButtonkMetadata; dataBinding: DataBindingContainer }>();

let labelRef = ref("");

setupTemplate(props.dataBinding, props.metadata, props.metadata.button.text, labelRef);

const click = () => {
  console.log("[sdui-button] click");
  if (props.metadata.button.action) {
    console.log("[sdui-button] action call", props.metadata.button.action);
    props.dataBinding.handleAction(props.metadata.button.action);
  }
};
</script>

<template>
  <button @click="click()">{{ labelRef }}</button>
</template>

<style scoped></style>
