<script setup lang="ts">
import { DataBindingContainer } from 'sdui-core/dataBinding/dataBindingBuilder'
import { ButtonkMetadata } from 'sdui-core/general-components/button/buttonMetadata'
const props = defineProps<{ metadata: ButtonkMetadata; dataBinding: DataBindingContainer }>()

console.log('[sdui-button] metadata.button.text', props.metadata.button.text)
const text = props.dataBinding.evaluateTemplate(props.metadata.button.text)
console.log('[sdui-button] text', text)

const click = () => {
  console.log('[sdui-button] click')
  if (props.metadata.button.action) {
    console.log('[sdui-button] action call', props.metadata.button.action)
    props.dataBinding.handleAction(props.metadata.button.action)
  }
}
</script>

<template>
  <button @click="click()">{{ text }}</button>
</template>

<style scoped></style>
