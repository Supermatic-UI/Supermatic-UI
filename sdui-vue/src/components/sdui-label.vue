<script setup lang="ts">
import { ref } from 'vue'
import { DataBindingContainer } from 'sdui-core/dataBinding/DataBindingContainer'
import { LabelMetadata } from 'sdui-core/general-components/label/labelMetadata'
import { setupTemplate } from '../sdui/setup'

const props = defineProps<{ metadata: LabelMetadata; dataBinding: DataBindingContainer }>()

let labelRef = ref('')

setupTemplate(props.dataBinding, props.metadata, props.metadata.label.text, labelRef)
</script>

<template>
  <span>{{ labelRef }}</span>
</template>

<style scoped></style>
