<script setup lang="ts">
import loader from '@monaco-editor/loader'
import { ref, onMounted } from 'vue'
import pageMetadataSchema from '../assets/pageMetadatSchema.json'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])
const editor = ref<HTMLElement>()

onMounted(() => {
  loader.init().then((monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: 'http://myserver/foo-schema.json',
          fileMatch: ['*'],
          schema: pageMetadataSchema
        }
      ]
    })
    const instance = monaco.editor.create(editor.value!, {
      value: props.modelValue,
      language: 'yaml',
      theme: 'vs-dark',
      minimap: {
        enabled: false
      }
    })
    instance.onDidChangeModelContent(() => {
      emit('update:modelValue', instance.getValue())
    })
  })
})
</script>

<template>
  <div id="editor" ref="editor"></div>
</template>

<style scoped>
#editor {
  width: 100%;
  min-height: 600px;
}
</style>
