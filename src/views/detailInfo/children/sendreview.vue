<script setup lang="ts">
// 引入所需方法
import { reactive,ref } from 'vue'
import { ElNotification } from 'element-plus'

// 引入请求接口
import { review } from "../../../request/requestApi"
import store from '/@/store';

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


// form表单中的数据
const form = reactive({
  test: '',
  review: '',
  grade: 0
})

// 当提交按钮点击时的事件
const onSubmit = () => {

  // 转换要提交的面试阶段（testId）
  let testId = ref(0)
  if(form.test === '面试') {
    testId.value = 1
  } else if(form.test === '笔试') {
    testId.value = 2
  } else if(form.test === '一轮考核') {
    testId.value = 3
  } else if(form.test === '二轮考核') {
    testId.value = 4
  }
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
    studentId: UserDetailInfo[0].studentId,
    testId: testId.value,
    adminId: Number(localStorage.getItem("adminId"))
  }
  
//   缺少面试阶段和评价的提示
  if(form.review === '') {
    ElNotification({
    title: '缺少评价',
    message: '请输入评价后再次点击提交',
    type: 'warning',
  })
  }
  if(testId.value === 0) {
    ElNotification({
    title: '缺少面试阶段',
    message: '请选择面试阶段后再次点击提交',
    type: 'warning',
  })
  }
//   如果存在面试阶段和评价，才可以发送请求
  if(form.review !== '' && testId.value !== 0) {
    // 判断当前管理员是否对某个阶段评论过
    if(testId.value === 1 && store.state.AdminTest1) {
      ElNotification({
          title: '您已对此用户的"面试"评价过了',
          message: '请选择选择修改评价或者对其他面试阶段进行评价',
          type: 'warning',
        })
        return
    } else if(testId.value === 2 && store.state.AdminTest2) {
      ElNotification({
          title: '您已对此用户的"笔试"评价过了',
          message: '请选择选择修改评价或者对其他面试阶段进行评价',
          type: 'warning',
        })
        return
    } else if(testId.value === 3 && store.state.AdminTest3) {
      ElNotification({
          title: '您已对此用户的"一轮考核"评价过了',
          message: '请选择选择修改评价或者对其他面试阶段进行评价',
          type: 'warning',
        })
        return
    } else if(testId.value === 4 && store.state.AdminTest4) {
      ElNotification({
          title: '您已对此用户的"二轮考核"评价过了',
          message: '请选择选择修改评价或者对其他面试阶段进行评价',
          type: 'warning',
        })
        return
    } else {
      review(params).then((res) => {
        ElNotification({
          title: '评价成功',
          message: '您已经评价成功',
          type: 'success',
        })
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
    }
    
  }
  
}

const debounceSend = () => {
  debounce(onSubmit, 200)();
};

</script>

<template>
  <div id="sendreview">
    <el-form :model="form" label-width="120px">
    <el-form-item label="选择面试阶段">
      <el-select v-model="form.test" placeholder="请选择面试阶段">
        <el-option label="面试" value="面试" />
        <el-option label="笔试" value="笔试" />
        <el-option label="一轮考核" value="一轮考核" />
        <el-option label="二轮考核" value="二轮考核" />
      </el-select>
    </el-form-item>
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
  margin-bottom: 50px;
}
</style>
