<script lang="ts" setup>
// 导入所需方法
import { ref } from 'vue'

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


// 转换传过来的性别和组别
let sex = ref('男')
if(UserDetailInfo[0].sex === 1) {
    sex.value = '女'
}
let group = ref('前端')
if(UserDetailInfo[0].group === false) {
    group.value = '后台'
}

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
