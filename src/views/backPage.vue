<script setup lang="ts">
// 引入组件
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
