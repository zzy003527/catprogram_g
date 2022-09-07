<script lang="ts" setup>
// 导入所需方法
import { reactive,onMounted } from 'vue'
import { getAllUserInfo } from "../../../request/requestApi"



// 重新获得数据的函数

let UserDetailInfo = reactive([
    {
      id: 0,
      introduction: '',
      testStatus: 1,
      username: '',
      major: '',
      institute: '',
      group: '',
      studentId: '',
      sex: ''
    }
])


onMounted(()=> {
 async function getData() {
    const params = {testCode: Number(localStorage.getItem("configStageCode"))}
    let res = await getAllUserInfo({params:params})
    UserDetailInfo[0] = res.obj.filter((val)=> {
      return val.studentId === localStorage.getItem("NowstudentId")
    })
  }
  getData()
})




</script>


<template>
  <div id="cardbox" v-if="UserDetailInfo[0][0]">
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>姓名：{{UserDetailInfo[0][0].username}}</span>
      </div>
    </template>
    <div>性别：{{ UserDetailInfo[0][0].sex == true ? '男' : '女' }}</div>
    <hr>
    <div>组别: {{UserDetailInfo[0][0].sex == true ? '后台' : '前端'}}</div>
    <hr>
    <div>学院：{{UserDetailInfo[0][0].institute}}</div>
    <hr>
    <div>专业：{{UserDetailInfo[0][0].major}}</div>
    <hr>
    <div>学号：{{UserDetailInfo[0][0].studentId}}</div>
    <hr>
    <div>自我介绍: {{UserDetailInfo[0][0].introduction}}</div>
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
