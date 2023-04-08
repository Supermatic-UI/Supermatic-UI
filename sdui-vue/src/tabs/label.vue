<script setup lang="ts">
import SduiRenderer from '../sdui/sdui-renderer.vue'
import schema from './label.json'
import { DataBindingContainer } from 'sdui-core/dataBinding/DataBindingContainer'

let sdui: DataBindingContainer
const onInit = (dataBinding) => {
  console.log('[label test] onInit', dataBinding)
  sdui = dataBinding
}

const setName = () => {
  sdui.setProperty('name', 'John Doe')
}
</script>

<template>
  <h3>Label test</h3>
  <SduiRenderer :configuration="schema" @init="onInit($event)"></SduiRenderer>
  <div>
    <h3>Debug zone</h3>
    <button @click="setName()">Set name</button>
  </div>
</template>

<style scoped></style>
