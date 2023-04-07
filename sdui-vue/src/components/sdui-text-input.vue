<script setup lang="ts">
import { DataBindingContainer } from 'sdui-core/dataBinding/dataBindingBuilder'
import { TextInputMetadata } from 'sdui-core/general-components/textInput/textInputMetadata'
const props = defineProps<{ metadata: TextInputMetadata; dataBinding: DataBindingContainer }>()

console.log('[sdui-text-input] metadata.text-input.label', props.metadata.textInput.label)
const label = props.dataBinding.evaluateTemplate(props.metadata.textInput.label)
console.log('[sdui-text-input] label', label)

let bindValue;

if (props.metadata.binding != null) {
  const bindingProperty = props.dataBinding.evaluateTemplate(props.metadata.binding)
  console.log('[sdui-text-input] bindingProperty', bindingProperty)
  bindValue = props.dataBinding.evaluate(bindingProperty);
  console.log('[sdui-text-input] bindValue', bindValue)
}
</script>

<template>
  <span>{{ label }}</span>
  <input type="text" v-model="bindValue"/>
</template>

<style scoped></style>
