<script setup lang="ts">
// 引入所需组件
import displayinfo from "./children/displayInfo.vue"
import displaytest from "./children/displaytest.vue"
import sendreview from "./children/sendreview.vue"

// 引入所需方法
import { useStore } from 'vuex'
import { Router, useRouter } from 'vue-router' 

// 用useStore方法获取到vuex的store对象
let store = useStore()

// 获取到当前需要显示的用户详细信息
const UserDetailInfo = store.getters.RenderSighup.filter((val) => {
    return val.studentId === store.state.NowstudentId
})




// 声明router，用于编程式导航，相当于之前学的this.$router
const router: Router = useRouter()
// 页头返回前一页的事件
const goBack = () => {
    // 将管理员是否写评论的状态全部置为false
    store.commit("ConfigAdminTest1",false)
    store.commit("ConfigAdminTest2",false)
    store.commit("ConfigAdminTest3",false)
    store.commit("ConfigAdminTest4",false)
    // 将是否显示删除和修改按钮置为false
    store.commit("ConfigDisplayButton",false)
    router.push("/backPage/viewsighup")
}
</script>

<template>
<div id="detailInfo">
    <div id="theheader">
        <el-page-header @back="goBack">
        <template #content>
          <span class="text-large font-600 mr-3"> 用户详细信息页面 </span>
        </template>
        </el-page-header>
    </div>
    <displayinfo :info="UserDetailInfo"></displayinfo>
    <displaytest :info="UserDetailInfo"></displaytest>
    <sendreview :info="UserDetailInfo"></sendreview>
</div>
</template>

<style scoped>
#detailInfo {
    position: relative;
    top: -180px;
    width: 100%;
    margin: 0 auto;
}
#theheader {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 39px;
    padding: 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #999;
    z-index: 1000;
}
</style>
