<script setup lang="ts">
import tabbox from "./ViewSighup/tabbox.vue"
</script>

<template>
  <tabbox></tabbox>
  <!-- 异步组件 -->
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<style scoped>
</style>
