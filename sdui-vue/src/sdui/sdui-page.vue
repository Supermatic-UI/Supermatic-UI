<script setup lang="ts">
import { PageMetadata } from 'sdui-core/page'
import { dataBindingBuilder, DataBindingContainer } from 'sdui-core/dataBinding/dataBindingBuilder'
import { SchemaDefinition } from 'sdui-core/specs/bindings'
import SduiLabel from '../components/sdui-label.vue'
import SduiButton from '../components/sdui-button.vue'
import TextIinput from '../components/sdui-text-input.vue'
import { ActionRegistry } from 'sdui-core/registrations'

const props = defineProps<{
  configuration?: PageMetadata
}>()

if (props.configuration && props.configuration.type === 'layout') {
  console.log('[sdui-component] configuration', props.configuration)
} else {
  console.log('[sdui-component] no configuration')
}

let dataContext
let schemaDefinition: SchemaDefinition
let dataBinding: DataBindingContainer
const actionHandlers = new ActionRegistry({
  alert: (definition, data, context) => {
    console.log('[formReset-handler] alert called with value', definition.value)
    const text = context.evaluateTemplate(definition.value);
    alert(text);
  }
})

if (
  props.configuration != null &&
  props.configuration.dataBinding != null &&
  typeof props.configuration.dataBinding['type'] === 'string'
) {
  schemaDefinition = props.configuration.dataBinding as SchemaDefinition
  if (schemaDefinition.type === 'object') {
    dataContext = {}
  }
  if (schemaDefinition.type === 'array') {
    dataContext = []
  }
  dataBinding = dataBindingBuilder(dataContext, schemaDefinition, actionHandlers)
  
  // Test data
  dataBinding.setProperty('name', 'John Doe')
}

const components = {
  label: SduiLabel,
  button: SduiButton,
  textInput: TextIinput
}
</script>

<template>
  <template v-for="(item, index) in props.configuration?.page" :key="index">
    <div>
      <p>Component type "{{ item.type }}"</p>
      <component :is="components[item.type]" :metadata="item" :dataBinding="dataBinding">
      </component>
    </div>
  </template>
</template>

<style scoped></style>
