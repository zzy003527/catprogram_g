<script setup lang="ts">
// 引入所需方法
import { useStore } from 'vuex'
import { ref,reactive,computed } from 'vue'
import { ElMessage, ElMessageBox,ElNotification } from 'element-plus'
import { updateAssessment } from '../../../request/requestApi'

// 用useStore方法获取到vuex的store对象
let store = useStore()

// 节流函数
const debounce = (fn: Function, delay: number) :Function => {
    let throttleTimer
  return (...args: unknown[]) => {
    if (throttleTimer) {
      return;
    }
    throttleTimer = setTimeout(() => {
      fn.apply(this, args);
      throttleTimer = null;
    }, delay);
  }
}

// 接收父组件传来的数据
const props = defineProps({
    info: Object
})

interface UserTestInfoType {
    adminId: number
    adminName: string
    grade: number
    id: number
    review: string
    studentId: string
    testId: number
}
const UserTestInfo: UserTestInfoType = props.info as UserTestInfoType

// 获取token（因为有可能在session中或者在local中）
  let token = localStorage.getItem("token")
  if(!token) {
    token = sessionStorage.getItem("token")
  }

// 判断是否显示删除和修改按钮
let displayButton = computed(() => {
  return UserTestInfo.adminId === Number(localStorage.getItem("adminId"))
})


// 判断当前管理员是否评论过当前用户，并将状态存入vuex
if(UserTestInfo.testId === 1 && UserTestInfo.adminId === Number(localStorage.getItem("adminId"))) {
  store.commit("ConfigAdminTest1",true)
} else if(UserTestInfo.testId === 2 && UserTestInfo.adminId === Number(localStorage.getItem("adminId"))) {
  store.commit("ConfigAdminTest2",true)
} else if(UserTestInfo.testId === 3 && UserTestInfo.adminId === Number(localStorage.getItem("adminId"))) {
  store.commit("ConfigAdminTest3",true)
} else if(UserTestInfo.testId === 4 && UserTestInfo.adminId === Number(localStorage.getItem("adminId"))) {
  store.commit("ConfigAdminTest4",true)
}



// 点击删除按钮的事件
const deleteReview = () => {
  ElMessageBox.confirm(
    '你确定要删除这条评价吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      // 点击确定，发送请求删除数据
      // 准备参数
      // 准备发送请求的数据对象
      const score = {
        grade: UserTestInfo.grade,
        review: UserTestInfo.review,
        studentId: UserTestInfo.studentId,
        testId: UserTestInfo.testId,
        id: UserTestInfo.id,
        flag: false
      }
      // 发送请求
      updateAssessment(score).then((res) => {
        if(res.resultStatus !== '200') {
          ElMessage({
            type: 'error',
            message: '删除失败',
          })
        } else {
          // 弹出框提示
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
        }
      }).catch((err) => {
        console.log(err);
      })
    })
    .catch(() => {
      
    })
}

// 点击修改按钮的操作
const dialogFormVisible = ref(false)
const form = reactive({
  review: '',
  grade: 0
})
// 修改函数
const configReview = () => {
  // 准备请求数据
  //   缺少评价的提示
  if(form.review === '') {
    ElNotification({
    title: '缺少评价',
    message: '请输入评价后再次点击提交',
    type: 'warning',
  })
  }
  // 当评价不为空时才可发送请求
  if(form.review !== '') {
    // 准备发送请求的数据对象
      const score = {
        grade: form.grade * 2,
        review: form.review,
        studentId: UserTestInfo.studentId,
        testId: UserTestInfo.testId,
        id: UserTestInfo.id,
        flag: true
      }
      // 发送请求
      updateAssessment(score).then((res) => {
        if(res.resultStatus !== '200') {
          ElMessage({
            type: 'error',
            message: '修改失败',
          })
        } else {
          // 弹出框提示
          ElMessage({
            type: 'success',
            message: '修改成功',
          })
          // 关闭弹出框
          dialogFormVisible.value = false
          // 将数据置零
          form.grade = 0
          form.review = ''
        }
      }).catch((err) => {
        console.log(err);
      })
  }
}

//加个节流
const deleteReviewSend = () => {
  debounce(deleteReview, 200)();
};
const configReviewSend = () => {
  debounce(configReview, 200)();
};

</script>

<template>
  <div id="testInfo">
    <div class="name">&nbsp;&nbsp;&nbsp;{{ UserTestInfo.adminName }}：</div>
    <div>评论：{{ UserTestInfo.review }}</div>
    <div>评分: {{ UserTestInfo.grade }}</div>
    <el-button type="warning" round class="testinfobuttonOne" @click="dialogFormVisible = true" v-if="displayButton">修改</el-button>
    <el-button type="danger" round class="testinfobuttonTwo" @click="deleteReviewSend" v-if="displayButton">删除</el-button>
    <el-dialog v-model="dialogFormVisible" title="修改评价和评分">
    <el-form :model="form" label-width="120px">
    <el-form-item label="填写评价">
      <el-input v-model="form.review" type="textarea" />
    </el-form-item>
    <el-form-item label="选择评分">
      <el-rate v-model="form.grade" allow-half />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="configReviewSend">提交</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>
  </div>
</template>

<style scoped>
.name {
    font-size: 18px;
    font-weight: 700;
}
#testInfo{
    position: relative;
    word-break: break-all;
    word-wrap: break-word;
    width: 960px;
    height: 170px;
}
.testinfobuttonOne {
  position: absolute;
  left: 5px;
  bottom: 5px;
}
.testinfobuttonTwo {
  position: absolute;
  left: 65px;
  bottom: 5px;
}
</style>
