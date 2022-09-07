<template>
    <div h="auto" w="auto" m="20" class="table" :style="{
        boxShadow: `var(${getCssVarName('light')})`
    }">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="48px"
            class="demo-ruleForm">
            <el-form-item label="账号" prop="studentNumber">
                <el-input v-model="ruleForm.studentNumber" class="NumberInput" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" class="NumberInput" autocomplete="off" />
            </el-form-item>

            <div class="loginFooter">
                <el-button class="loginSubmit" type="primary" @click="submitForm(ruleFormRef)">登陆
                </el-button>
            </div>
            <el-checkbox v-model="checked1" label="七天免登录" size="small" />
        </el-form>
        <el-divider />
    </div>

</template>
  
  
  <script lang='ts' setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { login, handleError,logout } from '../../request/requestApi'
import store from '../../store/index';
import { useRouter } from 'vue-router'
const router = useRouter()
// 样式
const getCssVarName = (type: string) => {
    return `--el-box-shadow${type ? '-' : ''}${type}`
}

const checked1 = ref(true)
//设置学号和密码不能够为空
const ruleFormRef = ref<FormInstance>()
const checkUserNumber = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        callback()
    }
}
const validatePass = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    studentNumber: '',
    pass: '',

})

const rules = reactive({
    studentNumber: [{ validator: checkUserNumber, trigger: 'blur' }],
    pass: [{ validator: validatePass, trigger: 'blur' }]
})
//如果登陆成功就触发成功弹窗
const sucessLogin = () => {
    ElMessage({
        message: '登陆成功',
        type: 'success',
    })
}
const failLogin = (msg: string) => {
    ElMessage.error(`${msg}`)
}
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            login({
                studentId: ruleForm.studentNumber,
                password: ruleForm.pass,
                isSeven: checked1.value
            }).then((res) => {
                if (res.resultStatus != 200) {
                    failLogin(res.resultIns)
                }
                else {
                    //根据返回信息判断当前登录用户的权限false=普通用户 true=管理员
                    //如果为普通管理员就显示自定义信息
                    if(res.map.power == false){
                        localStorage.setItem('token', `${res.obj}`);
                        logout()
                        localStorage.removeItem('token');
                        failLogin("非管理员账号")
                        return;
                    }
                    sucessLogin()
                    store.state.dialogTableVisible = false
                    localStorage.setItem('adminId', res.id);
                    //登陆成功的时候根据是否勾选七天免登陆来判断把token存储到localstorage里面还是sessionstorage
                    if (checked1.value == true) {
                        localStorage.setItem('token', `${res.obj}`);
                    }
                    else {
                        sessionStorage.setItem('token', `${res.obj}`);
                    }
                    router.push('/backPage')
                }
                return res
            })
                .catch(handleError);
        } else {
            return false
        }
    })
}

</script>
  <style scoped>
  .table {
      padding: 50px;
      padding-bottom: 30px;
      border-radius: 15px;
      box-shadow: 33px;
      background-color: white;
  }
  
  .ruleForm {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
  }
  
  .loginNumber {
      display: flex;
      justify-content: center;
  }
  
  .loginHeaderTitle {
      font-size: 50px;
      color: #aa87c58f;
      margin-left: 0;
      padding: 0;
      text-align: left;
      font-family: fantasy;
  }
  
  .forgetPassword {
      position: absolute;
      bottom: 187px;
      right: 104px;
      font-size: 12px;
  }
  </style>
  <style>
.loginWindow {
    width: 480px !important;
    border-radius: 10px !important;
}

.NumberInput {
    width: 230px !important;
}

.el-dialog__header {
    padding-bottom: 0;
    width: 440px;
    height: 251px;
    border-radius: 10px 10px 0 0;
    background-size: 484px 296px;
}

.loginSubmit {
    width: 266px;
    margin-top: 18px;
    border-radius: 149px !important;

}

.loginFooter {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>