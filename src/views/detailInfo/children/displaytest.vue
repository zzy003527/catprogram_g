<script setup lang="ts">
// 引入子组件
import testInfo from "./testInfo.vue"
// import {ref} from "vue"
// import { useStore } from 'vuex'
// import { getAllUserInfo } from "../../../request/requestApi"

// 用useStore方法获取到vuex的store对象
// let store = useStore()

// 控制组件显示的flag
// let flag = ref(false)

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
// const UserDetailInfo = store.getters.RenderSighup.filter((val) => {
//     return val.studentId === localStorage.getItem("NowstudentId")
// })

// let UserDetailInfo
// // 重新获得数据的函数
// function resetPage() {
//    // 完成后重新获取数据渲染
//    console.log(Number(localStorage.getItem("configStageCode")));
//    const params = {testCode: Number(localStorage.getItem("configStageCode"))}
//    getAllUserInfo({params:params}).then((res)=> {
//     console.log(res);
//       store.commit("SetSighupInfo",res.obj) 
//       // 设置一个对象管理更改用户进度（淘汰or通过）
//       for(let i = 0;i < res.obj.length;i++) {
//       let value = {
//         key: res.obj[i].studentId,
//         thevalue: false
//       }
//       store.commit("addUserSetting",value)
//     }
//     // 此页面的数据
//     UserDetailInfo = store.getters.RenderSighup.filter((val) => {
//     return val.studentId === localStorage.getItem("NowstudentId")
//    })
//   console.log(store.state.AllSighupInfo);
//   console.log("User",UserDetailInfo[0])
//   flag.value = true
//   })
// }
// resetPage()


</script>

<template>
  <div id="displaytest" >
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
