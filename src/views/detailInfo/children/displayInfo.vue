<script lang="ts" setup>
// 导入所需方法
import { ref } from 'vue'
// import { useStore } from 'vuex'
// import { getAllUserInfo } from "../../../request/requestApi"
// 用useStore方法获取到vuex的store对象
// let store = useStore()

// 控制组件显示的变量
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

let sex = ref('男')
  if(UserDetailInfo[0].sex === 1) {
    sex.value = '女'
  }
let group = ref('前端')
 if(UserDetailInfo[0].group === false) {
    group.value = '后台'
  }

// 重新获得数据的函数
// let UserDetailInfo
// function resetPage() {
//    // 完成后重新获取数据渲染
//    console.log(Number(localStorage.getItem("configStageCode")));
//    const params = {testCode: Number(localStorage.getItem("configStageCode"))}
//    getAllUserInfo({params:params}).then((res)=> {
//     UserDetailInfo = computed(() => {
//       return res.obj.filter((val)=>{
//         return val.studentId = localStorage.getItem("NowstudentId")
//       })
//     })
//       store.commit("SetSighupInfo",res.obj) 
    //   // 设置一个对象管理更改用户进度（淘汰or通过）
    //   for(let i = 0;i < res.obj.length;i++) {
    //   let value = {
    //     key: res.obj[i].studentId,
    //     thevalue: false
    //   }
    //   store.commit("addUserSetting",value)
    // }
    // 此页面的数据
    // UserDetailInfo = res.obj
   // 转换传过来的性别和组别
   
 

 
//   console.log(typeof(res.obj));
// console.log("User",UserDetailInfo)
//    flag.value = true
  
//    console.log(store.state.AllSighupInfo)
//   })
// }
// resetPage()







</script>


<template>
  <div id="cardbox">
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>姓名：{{ UserDetailInfo[0].username }}</span>
      </div>
    </template>
    <div>性别：{{ sex }}</div>
    <hr>
    <div>组别: {{ group }}</div>
    <hr>
    <div>学院：{{ UserDetailInfo[0].institute }}</div>
    <hr>
    <div>专业：{{ UserDetailInfo[0].major }}</div>
    <hr>
    <div>学号：{{ UserDetailInfo[0].studentId }}</div>
    <hr>
    <div>自我介绍: {{ UserDetailInfo[0].introduction }}</div>
  </el-card>
  </div>
</template>


<style scoped>
div{
    word-break: break-all;
    word-wrap: break-word;
}
#cardbox {
    position: relative;
    top: 228px;
    left: 50%;
    transform: translate(-34%,0);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 600px;
}
</style>
