<script setup lang="ts">
import { DataBindingContainer } from "sdui-core/dataBinding/dataBindingBuilder"
import { LabelMetadata } from 'sdui-core/general-components/label/labelMetadata';
const { metadata, dataBinding } =  defineProps<{ metadata: LabelMetadata, dataBinding: DataBindingContainer}>();

console.log('[sdui-label] metadata.label.text', metadata.label.text);
const text = dataBinding.evaluateTemplate(metadata.label.text);
console.log('[sdui-label] text', text);
</script>

<template>
    <span>{{ text }}</span>
</template>

<style scoped>
</style>
