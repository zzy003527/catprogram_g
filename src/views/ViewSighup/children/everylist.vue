<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex'

// 用useStore方法获取到vuex的store对象
let store = useStore()

// 接收父组件传来的数据
const props = defineProps({
    data: Object
})



interface UserInfoType {
    id: number
    introduction: string
    testStatus: number
    username: string
    major: string
    institute: string
    group: boolean
    studentId: string   
}
const UserInfo: UserInfoType = props.data as UserInfoType


// 通过考核状态码判断是否被淘汰
let beout = ref('未报名')

// 获取状态码后两位
let testCode = UserInfo.testStatus + ''
let lastTwo = testCode.slice(1,testCode.length)

if(testCode === '101') {
    beout.value = '已报名'
} else if(testCode === '102') {
    beout.value = '报名淘汰'
}

// 通过判断管理端状态码来修改显示数据头两位
if(store.state.StageCode === 2) {
    beout.value = "笔试"
} else if(store.state.StageCode === 3) {
    beout.value = "面试"
} else if(store.state.StageCode === 4) {
    beout.value = "一轮"
} else if(store.state.StageCode === 5) {
    beout.value = "二轮"
} else if(store.state.StageCode === 6) {
    beout.value = "成功通过"
}

// 只有当管理端状态不为1或6时才补全beout后面
if(store.state.StageCode !== 1 && store.state.StageCode !== 6) {
    // 通过判断状态码后两位补全beout
if(lastTwo === '00') {
    beout.value = beout.value + "中"
} else if(lastTwo === "01") {
    beout.value = beout.value + "通过"
} else if(lastTwo === "02") {
    beout.value = beout.value + "淘汰"
}

}

// 判断组别
let theGroup = ref('前端')
if(UserInfo.group === false) {
    theGroup.value = '后台' 
}


//勾选框对应的值
const checked1 = ref(store.state.Whethercheck[`${UserInfo.studentId}`])

// 勾选框的值变化后的触发函数
function valuechange(checkvalue) {
    //将勾选的值设置发送到vuex
    const value = {
        key: UserInfo.studentId,
        thevalue: checkvalue
    }
    store.commit("addUserSetting",value)
}


function detailButtonClick() {
    store.commit("ConfigNowstudentId",UserInfo.studentId)
    localStorage.setItem("NowstudentId",UserInfo.studentId)
}

</script>

<template>
<div id="everylist">
    <el-row class="everylistbox">
    <el-col :span="3"><div class="grid-content ep-bg-purple" />{{ UserInfo.username }}</el-col>
    <el-col :span="5"><div class="grid-content ep-bg-purple-light" />{{ UserInfo.institute }}</el-col>
    <el-col :span="5"><div class="grid-content ep-bg-purple" />{{ UserInfo.major }}</el-col>
    <el-col :span="2"><div class="grid-content ep-bg-purple-light" />{{ theGroup }}</el-col>
    <el-col :span="3"><div class="grid-content ep-bg-purple" />{{ beout }}</el-col>
    <el-col :span="3"><div class="grid-content ep-bg-purple-light" />
    <el-checkbox v-model="checked1" label="勾选" size="large" border @change="valuechange" class="checkbutton"/>
    </el-col>
    <el-col :span="3"><div class="grid-content ep-bg-purple-light" /><el-button type="primary" class="infobutton">
     <router-link to="/backPage/detailinfo" class="detailbutton"  @click="detailButtonClick">详细信息</router-link> 
    </el-button></el-col>
  </el-row>
</div>
</template>

<style scoped>
.everylistbox {
    width: 985px;
    height: 97px;
}
.infobutton {
    margin-top: -3px;
    width: 80px;
    height: 33px;
}

.checkbutton {
    margin-top: -8px;
}
.detailbutton {
    width: 88px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: white;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>
