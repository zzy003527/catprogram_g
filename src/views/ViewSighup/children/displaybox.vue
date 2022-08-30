<template>
  <div id="displaybox">
    <div class="boxhead">
         <el-row class="everylistbox">
            <el-col :span="2"><div class="grid-content ep-bg-purple"></div>姓名</el-col>
            <el-col :span="5"><div class="grid-content ep-bg-purple-light"></div>学院</el-col>
            <el-col :span="5"><div class="grid-content ep-bg-purple"></div>专业</el-col>
            <el-col :span="3"><div class="grid-content ep-bg-purple-light"></div>方向</el-col>
            <el-col :span="3"><div class="grid-content ep-bg-purple"></div>面试进度</el-col>
            <el-col :span="3"><div class="grid-content ep-bg-purple-light"></div>勾选进行进度更改</el-col>
            <el-col :span="3"><div class="grid-content ep-bg-purple-light"></div>详细信息</el-col>
          </el-row>
    </div>
    <ul class="infinite-list" style="overflow: auto">
      <li v-for="i in UserData" :key="i"  class="infinite-list-item">
        <everylist :data="i"></everylist>
      </li>
    </ul> 
  </div>
</template>

<script lang="ts" setup>
// 引入所需方法
import { computed } from 'vue'
import { useStore } from 'vuex'

// 引入所需组件
import everylist from "./everylist.vue"


let store = useStore()
// 让数据成为响应式的
let UserData = computed(()=>{
    return store.getters.RenderSighup
})




</script>

<style>
#displaybox {
    padding-top: 10px;
    border: 1px solid #f5f5f5;
    border-radius: 15px;
}
.boxhead {
    position: relative;
    left: -13px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 15px;
    font-weight: 700;
}

.infinite-list {
  height: 450px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
