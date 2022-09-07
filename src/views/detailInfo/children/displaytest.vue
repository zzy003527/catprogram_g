<script setup lang="ts">
// 引入子组件
// import { reactive,onMounted } from 'vue'
import testInfo from "./testInfo.vue"
import { getAllUserInfo } from "../../../request/requestApi"
import { useStore } from 'vuex'

// 用useStore方法获取到vuex的store对象
let store = useStore()

// 重新获得数据的函数
async function resetPage() {
   // 完成后重新获取数据渲染
  const params = {testCode: Number(localStorage.getItem("configStageCode"))}
  let res = await getAllUserInfo({params:params})
   store.commit("SetSighupInfo",res.obj.filter((val) => {
    return val.studentId === localStorage.getItem("NowstudentId")
   }))
}
resetPage()




</script>

<template>
  <div id="displaytest" >
    <el-tabs type="border-card">
    <el-tab-pane label="笔试">
      <ul class="infinite-list" style="overflow: auto">
      <li :key="i" v-for="i in store.getters.RenderSighup[0].test1" class="infinite-list-item">
        <testInfo :info="i"></testInfo>
      </li>
      </ul>  
    </el-tab-pane>
    <el-tab-pane label="面试">
      <ul class="infinite-list" style="overflow: auto">
      <li v-for="i in store.getters.RenderSighup[0].test2" :key="i"  class="infinite-list-item">
        <testInfo :info="i"></testInfo>
      </li>
      </ul>
        
    </el-tab-pane>
    <el-tab-pane label="一轮">
      <ul class="infinite-list" style="overflow: auto">
      <li v-for="i in store.getters.RenderSighup[0].test3" :key="i"  class="infinite-list-item">
        <testInfo :info="i"></testInfo>
      </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="二轮">
      <ul class="infinite-list" style="overflow: auto">
      <li v-for="i in store.getters.RenderSighup[0].test4" :key="i"  class="infinite-list-item">
        <testInfo :info="i"></testInfo>
      </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<style scoped>
#displaytest {
  position: relative;
  top: 255px;
  left: 0%;
  width: 1012px;
  height: 521px;
}
.infinite-list {
  height: 450px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  text-align: left;
  justify-content: flex-start;
  align-items: flex-start;
  height: 170px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
