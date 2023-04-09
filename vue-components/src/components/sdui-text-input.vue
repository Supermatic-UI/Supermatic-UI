<script setup lang="ts">
import { Ref, ref } from "vue";
import { DataBindingContainer } from "@supermatic-ui/core/dataBinding/dataBindingBuilder";
import { TextInputMetadata } from "@supermatic-ui/core/general-components/textInput/textInputMetadata";
import { setupTemplate, setupBind } from "@supermatic-ui/vue-core/src/setup";

const props = defineProps<{ metadata: TextInputMetadata; dataBinding: DataBindingContainer }>();

let labelRef = ref("");
let modelRef = ref("");

setupTemplate(props.dataBinding, props.metadata, props.metadata.textInput.label, labelRef);
const inputBind = setupBind(props.dataBinding, props.metadata, modelRef);

const updateInputValue = (e: Event) => inputBind.set((e.target as HTMLInputElement).value);
</script>

<template>
  <span>{{ labelRef }}</span>
  <input type="text" :value="modelRef" @input="updateInputValue($event)" />
</template>

<style scoped></style>
