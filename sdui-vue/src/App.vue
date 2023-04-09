<script setup lang="ts">
import Label from "./tabs/label.vue";
import Http from "./tabs/http.vue";
import { ref } from "vue";

let activeTab = ref(0);
console.log("activeTab", activeTab);

const tabs = [
  { name: "Label", component: Label },
  { name: "HTTP", component: Http },
];
</script>

<template>
  <h2>SDUI</h2>

  <div class="tab-container">
    <div class="labels">
      <button v-for="(item, index) in tabs" :key="index" @click="activeTab = index">{{ item.name }}</button>
    </div>
    <div class="tab">
      <keep-alive>
        <component :is="tabs[activeTab].component"> </component>
      </keep-alive>
    </div>
  </div>
</template>

<style scoped></style>
