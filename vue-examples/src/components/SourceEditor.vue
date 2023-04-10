<script setup lang="ts">
import loader from '@monaco-editor/loader';
import { ref, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])
const editor = ref<HTMLElement>()

onMounted(() => {
  loader.init().then(monaco => {
    console.log('languages', monaco.languages.getLanguages())
    const instance = monaco.editor.create(editor.value!, {
      value: props.modelValue,
      language: 'json',
      theme: 'vs-dark',
    });
    instance.onDidChangeModelContent(() => {
      emit('update:modelValue', instance.getValue())
    })
  });
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
