<script setup lang="ts">
// 引入所需方法
import { reactive,ref } from 'vue'
import { ElNotification,ElMessage } from 'element-plus'

// 引入请求接口
import { review,getAllUserInfo } from "../../../request/requestApi"
import { useStore } from 'vuex'

// 用useStore方法获取到vuex的store对象
let store = useStore()

const failLogin = (msg: string) => {
  ElMessage.error(`${msg}`)
}

// 重新获得数据的函数
function resetPage() {
   // 完成后重新获取数据渲染
   let params = {
    testCode: localStorage.getItem("configStageCode")
   }
   getAllUserInfo({params:params}).then((res)=> {
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
// 节流函数
let throttleTimer
const debounce = (fn: Function, delay: number) :Function => {

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


// form表单中的数据
const form = reactive({
  // test: '',
  review: '',
  grade: 0
})

// 当提交按钮点击时的事件
const onSubmit = () => {
  // 转换要提交的分数
  let grade = ref(0)
  grade.value = form.grade * 2
  
  // 获取token（因为有可能在session中或者在local中）
  let token = localStorage.getItem("token")
  if(!token) {
    token = sessionStorage.getItem("token")
  }
//   声明要提交的数据
  const params = {
    grade: grade.value,
    review: form.review,
    studentId: localStorage.getItem("NowstudentId"),
    testId: (Number(localStorage.getItem("configStageCode"))-1)+''
  }
  
//   缺少面试阶段和评价的提示
  if(form.review === '') {
    ElNotification({
    title: '缺少评价',
    message: '请输入评价后再次点击提交',
    type: 'warning',
  })
  }

//   如果存在面试阶段和评价，才可以发送请求
  if(form.review !== '') {
    // 判断当前管理员是否对某个阶段评论过
    if(localStorage.getItem("configStageCode") === '2' && store.state.AdminTest1) {
      ElNotification({
          title: '您已对此用户的"笔试"评价过了',
          message: '请选择选择修改评价',
          type: 'warning',
        })
        return
    } else if(localStorage.getItem("configStageCode") === '3' && store.state.AdminTest2) {
      ElNotification({
          title: '您已对此用户的"面试"评价过了',
          message: '请选择选择修改评价',
          type: 'warning',
        })
        return
    } else if(localStorage.getItem("configStageCode") === '4' && store.state.AdminTest3) {
      ElNotification({
          title: '您已对此用户的"一轮考核"评价过了',
          message: '请选择选择修改评价',
          type: 'warning',
        })
        return
    } else if(localStorage.getItem("configStageCode") === '5' && store.state.AdminTest4) {
      ElNotification({
          title: '您已对此用户的"二轮考核"评价过了',
          message: '请选择选择修改评价',
          type: 'warning',
        })
        return
    } else {
      review(params).then((res) => {
        if(res.resultStatus !== "200") {
          failLogin(res.resultIns)
        } else {
          resetPage()
          ElNotification({
          title: '评价成功',
          message: '您已经评价成功',
          type: 'success',
        })
        }
        }).catch((err) => {
          console.log(err);
        })
    }
  }
}

const debounceSend = () => {
  debounce(onSubmit, 1000)();
};

</script>

<template>
  <div id="sendreview">
    <el-form :model="form" label-width="120px">
    <el-form-item label="填写评价">
      <el-input v-model="form.review" type="textarea" />
    </el-form-item>
    <el-form-item label="选择评分">
      <el-rate v-model="form.grade" allow-half />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="debounceSend">提交</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<style scoped>
#sendreview {
  border: #f2f2f2 solid 1px;
  position: relative;
  top: 315px;
  left: 0%;
  padding: 10px;
  margin-bottom: 165px;
}
</style>
