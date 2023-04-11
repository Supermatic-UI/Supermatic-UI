<script setup lang="ts">
import { ref } from "vue";
import type { DataBindingContainer, InputMetadata } from "@supermatic-ui/core";
import { setupTemplate, setupBind } from "@supermatic-ui/vue-core";

const props = defineProps<{ metadata: InputMetadata; dataBinding: DataBindingContainer }>();

const label = setupTemplate(props.dataBinding, props.metadata.input.label);
const labelClassName = setupTemplate(props.dataBinding, props.metadata.input.labelClassName);
const inputClassName = setupTemplate(props.dataBinding, props.metadata.input.inputClassName);
const inputType = setupTemplate(props.dataBinding, props.metadata.input.inputType);
const placeholder = setupTemplate(props.dataBinding, props.metadata.input.placeholder);
const className = setupTemplate(props.dataBinding, props.metadata.className);

const modelRef = ref("");
const inputBind = setupBind(props.dataBinding, props.metadata.binding, modelRef);

const updateInputValue = (e: Event) => inputBind.set((e.target as HTMLInputElement).value);
</script>

<template>
  <div :class="className">
    <label :class="labelClassName">{{ label }}</label>
    <input
      :type="inputType"
      :value="modelRef"
      @input="updateInputValue($event)"
      :placeholder="placeholder"
      :class="inputClassName"
    />
  </div>
</template>

<style scoped></style>
