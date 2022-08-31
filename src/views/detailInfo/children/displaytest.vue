<script setup lang="ts">
// 引入子组件
import testInfo from "./testInfo.vue"

// 接收父组件传来的数据
const props = defineProps({
    info: Object
})
// 定义类型接口
interface UserDetailInfoType {
    id: number
    introduction: string
    testStatus: number
    username: string
    major: string
    institute: string
    group: boolean
    studentId: string   
}
const UserDetailInfo: UserDetailInfoType = props.info as UserDetailInfoType

</script>

<template>
  <div id="displaytest">
    <el-tabs type="border-card">
    <el-tab-pane label="笔试">
      <ul class="infinite-list" style="overflow: auto">
      <li v-for="i in UserDetailInfo[0].test1" :key="i"  class="infinite-list-item">
        <testInfo :info="i"></testInfo>
      </li>
      </ul>  
    </el-tab-pane>
    <el-tab-pane label="面试">
      <ul class="infinite-list" style="overflow: auto">
      <li v-for="i in UserDetailInfo[0].test2" :key="i"  class="infinite-list-item">
        <testInfo :info="i"></testInfo>
      </li>
      </ul>
        
    </el-tab-pane>
    <el-tab-pane label="一轮">
      <ul class="infinite-list" style="overflow: auto">
      <li v-for="i in UserDetailInfo[0].test3" :key="i"  class="infinite-list-item">
        <testInfo :info="i"></testInfo>
      </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="二轮">
      <ul class="infinite-list" style="overflow: auto">
      <li v-for="i in UserDetailInfo[0].test4" :key="i"  class="infinite-list-item">
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
