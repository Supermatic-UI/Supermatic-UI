<script setup lang="ts">
import { DataBindingContainer } from "sdui-core/dataBinding/dataBindingBuilder"
import { LabelMetadata } from 'sdui-core/general-components/label/labelMetadata';
const { metadata, dataBinding } =  defineProps<{ metadata: LabelMetadata, dataBinding: DataBindingContainer}>();

console.log('[sdui-label] metadata.label.text', metadata.label.text);
const text = dataBinding.evaluateTemplate(metadata.label.text);
console.log('[sdui-text]', text);
</script>

<template>
    <h2>This is a label with </h2>
    <span>{{ text }}</span>
</template>

<style scoped>
</style>
