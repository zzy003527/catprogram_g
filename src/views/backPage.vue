<script setup lang="ts">
import tabbox from "./ViewSighup/tabbox.vue"
// import {defineAsyncComponent} from 'vue'
// const Child = defineAsyncComponent(()=> import('./components/Child.vue'))
</script>

<template>
  <tabbox></tabbox>
<!-- 异步组件 -->
<Suspense>
  <template v-slot:default>
    <router-view></router-view>
  </template>
  <template v-slot:fallback>
    <h1>加载中..........</h1>
  </template>
</Suspense>
</template>

<style scoped>

</style>
