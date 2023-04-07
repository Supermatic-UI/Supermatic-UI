<script setup lang="ts">
import { PageMetadata } from "sdui-core/page"
import { ObjectContaier, dataBindingBuilder, DataBindingContainer } from "sdui-core/dataBinding/dataBindingBuilder"
import VueLabel from "../components/sdui-label.vue"

const { 
    configuration,
} =  defineProps<{
    configuration?: PageMetadata,
}>()

if (configuration && configuration.type === 'layout') {
    console.log('configuration', configuration)
} else {
    console.log('no configuration')
}

let dataContext;

if (configuration?.dataBinding.type === 'object') {
    dataContext = {};
}
if (configuration?.dataBinding.type === 'array') {
    dataContext = [];
}

const dataBinding: DataBindingContainer = dataBindingBuilder(configuration?.dataBinding, dataContext);
// const dataBinding: DataBindingContainer = new ObjectContaier(configuration?.dataBinding, dataContext);


const components = {
    label: VueLabel
}
</script>

<template>
    <template v-for="item in configuration?.page">
        <div>
            <p>Component type "{{ item.type }}"</p>
            <component :is="components[item.type]" :metadata="item" :dataBinding="dataBinding">
        </component>
        </div>
    </template>
</template>

<style scoped>
</style>
