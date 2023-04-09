<script setup>
import Label from "./tabs/label.vue";

let activeTab;

const tabs = [{ name: "Label", component: Label }];
</script>

<template>
  <h2>SDUI</h2>

  <!-- <div class="tab-container">
    <div class="labels">
      <button v-for="item in tabs" :key="item" @click="activeTab = item.component"> {{ item.name }}</button>
    </div>
    <div class="tab">
      <keep-alive>
        <component :is="activeTab">
      </component>
      </keep-alive>
      
    </div>
  </div> -->

  <Label></Label>
</template>

<style scoped></style>
