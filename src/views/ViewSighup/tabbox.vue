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
      <el-button type="info" class="logoutButton" @click="logoutSend">退出登录</el-button>
    </el-menu>
  </div>
</template>


<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout } from "../../request/requestApi"

// 引入所需方法
import { Router, useRouter } from 'vue-router'

// 声明router，用于编程式导航，相当于之前学的this.$router
const router: Router = useRouter()




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
      }).catch((err) => {
        console.log(err);
      })
      // 清除storage
      localStorage.removeItem("token")
      localStorage.removeItem("adminId")
      sessionStorage.removeItem("token")
      // 弹出框表示成功退出
      ElMessage({
        type: 'success',
        message: '成功退出登录',
      })
      // 跳转到登录页面
      router.push('/login')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出登录',
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
  width: 1550px;
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

.demo-tabs>.el-tabs__content {
  padding: 0px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
