<template>
  <div id="tabbox">
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <router-link to="/backPage/viewsighup">查看报名人数</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/backPage/book">预约面试</router-link>
      </el-menu-item>
      <div class="NowStage">{{Stage}}</div>
      <el-button type="info" class="logoutButton" @click="logoutSend">退出登录</el-button>
      <el-button type="info" class="nextButton" @click="nextstage">进入下一阶段</el-button>
    </el-menu>
  </div>
</template>


<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout,changeStage,getAllUserInfo } from "../../request/requestApi"

// 引入所需方法
import {ref} from 'vue'
import { Router, useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 用useStore方法获取到vuex的store对象
let store = useStore()

// 声明router，用于编程式导航，相当于之前学的this.$router
const router: Router = useRouter()

// 失败弹窗
const failLogin = (msg: string) => {
  ElMessage.error(`${msg}`)
}
// 在点击按钮之后的重置函数
function resetPage() {
    // 发送之后将选择框置空
    store.state.chooseValue = ''
    store.commit("ConfigInstituteValue","")
    store.commit("ConfigDerectionValue","")
    store.commit("ConfigIsoutValue","")
    store.commit("ConfigStudentidInput","")
    store.commit("ConfigNameInput","")
    store.commit("ConfigchooseValue","")
    // 置空发送的数据
    store.commit("ResetSendUserInfo")
    // 将上面的勾选框也置空
    for (let [x] of Object.entries(store.state.Whethercheck)) {
        let value = {
        key: x,
        thevalue: false
        }
        store.commit("addUserSetting",value)
    }
    // 完成后重新获取数据渲染
    getAllUserInfo({testStatus: store.state.StageCode}).then((res)=> {
        store.commit("SetSighupInfo",res.obj) 
        // 设置一个对象管理更改用户进度（淘汰or通过）
        for(let i = 0;i < res.obj.length;i++) {
          let value = {
            key: res.obj[i].studentId,
            thevalue: false
          }
          store.commit("addUserSetting",value)
        }
    })
}


// 标题阶段
let Stage = ref("报名阶段")
if(localStorage.getItem("configStageCode") === "2") {
  Stage.value = "笔试阶段"
} else if(localStorage.getItem("configStageCode") === "3") {
  Stage.value = "面试阶段"
} else if(localStorage.getItem("configStageCode") === "4") {
  Stage.value = "一轮阶段"
} else if(localStorage.getItem("configStageCode") === "5") {
  Stage.value = "二轮阶段"
} else if(localStorage.getItem("configStageCode") === "") {
  Stage.value = "完全通过"
}

// 退出登录按钮需要的
const logoutSend = () => {
  ElMessageBox.confirm(
    '你确定要退出登录吗?',
    '注意',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info',
    }
  )
    .then(() => {
      // 点击确定，发送请求
      logout().then((res) => {
        console.log(res);
        if(res.resultStatus !== '200') {
          ElMessage({
            type: 'warning',
            message: '退出登录失败，请重试',
          })
        } else {
          // 清除storage
          localStorage.removeItem("token")
          localStorage.removeItem("adminId")
          sessionStorage.removeItem("token")
          localStorage.removeItem("configStageCode")
          // 弹出框表示成功退出
          ElMessage({
            type: 'success',
            message: '成功退出登录',
          })
          // 跳转到登录页面
          router.push('/login')
          }
        })
      })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出登录',
      })
    })
}


// 进入下一阶段按钮需要的
const nextstage = () => {
  ElMessageBox.confirm(
    '你确定要进入下一阶段吗?',
    '注意',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info',
    }
  )
    .then(() => {
      let params = {testCode: store.state.StageCode}
      changeStage({params:params}).then((res) => {
        if(res.resultStatus !== "200") {
          failLogin(res.obj)
        } else {
          resetPage()
          // 弹出框表示切换成功
          ElMessage({
            type: 'success',
            message: '成功进入下一阶段',
          })
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消进入下一阶段',
      })
    })
}

</script>

<style>
#tabbox {
    position: fixed;
    left: -25px;
    top: 0;
    height: 39px;
    width: 100%;
    background-color: #f5f5f5;
    padding-left: 25px;
    z-index: 100;
}

.logoutButton {
  border: none;
  outline: none;
  position: absolute;
  top: 12px;
  right: 50px;
}

.nextButton {
  border: none;
  outline: none;
  position: absolute;
  top: 12px;
  right: 160px;
}

.NowStage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 30px;
  font-weight: 700;
  color: white;
}

.demo-tabs>.el-tabs__content {
  padding: 0px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
