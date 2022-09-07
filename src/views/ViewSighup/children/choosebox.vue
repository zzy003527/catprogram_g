<script setup lang="ts">
// import { ref } from 'vue'
import { useStore } from 'vuex'
import { ElNotification,ElMessage } from 'element-plus'
import { updateUserStatus,getAllUserInfo } from "../../../request/requestApi"

// 获取vuex的store
let store = useStore()



// 失败弹窗
const failLogin = (msg: string) => {
  ElMessage.error(`${msg}`)
}
// const chooseValue = ref('')
const options = [
  {
    value: '淘汰',
    label: '淘汰',
  },
  {
    value: '通过',
    label: '通过',
  }
]

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


// 在点击按钮之后的重置函数
function resetPage() {
    // 发送之后将选择框置空
    // chooseValue.value = ''
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
            const params = {testCode: store.state.StageCode}
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

// 批量选择通过或淘汰后的事件
function sendmessage() {
  
for (let [x, y] of Object.entries(store.state.Whethercheck)) {
        // 判断该用户是否有勾选，有勾选的才能进入要发送的数据中
        if(y === true) {
          // 通过选择框的变化写出对应的状态码
          let testStatus = store.state.StageCode + ''
          if(store.state.chooseValue === '通过') {
            testStatus = testStatus + '01'
          } else if(store.state.chooseValue === '淘汰') {
            testStatus = testStatus + '02'
          }
            // 声明要发送的数据
            let thevalue = {
                key: x,
                value: testStatus
               }
            // 只有在有'淘汰'或者'通过'的时候才存入数据
            if(store.state.chooseValue) {
                store.commit("addSendUserInfo",thevalue)
            }
        }
    }
    // 如果为报名阶段或者完全通过阶段，弹出提示框
    if(store.state.StageCode === 1) {
      // 弹出框表示成功
      ElNotification({
              title: '不可修改',
              message: '当前是报名阶段，不可修改',
              type: 'info',
            })
      resetPage()
    }
    if(store.state.StageCode === 6) {
      // 弹出框表示成功
      ElNotification({
              title: '不可修改',
              message: '当前已经结束考核，不可修改',
              type: 'info',
            })
      resetPage()
    }
    // 如果有'淘汰'或者'通过'，且管理端不为报名阶段或完全通过阶段时，且有人勾选，发送请求
    let values = Object.values(store.state.Whethercheck)
    let flag1 = false
    for(let i = 0;i < values.length;i++) {
      if(values[i] === true) {
        flag1 = true
      }
    }
    if(store.state.chooseValue && store.state.StageCode !== 1 && store.state.StageCode !== 6 && flag1) {
        const params = store.state.SendUserInfo
        updateUserStatus(params).then((res) => {        
          if(res.resultStatus !== "200") {
             // 弹出框表示失败
             failLogin(res.resultIns)
            //  ElNotification({
            //   title: '修改失败',
            //   message: '您的修改失败了，请重试',
            //   type: 'error',
            // })
          } else {
            // 弹出框表示成功
            ElNotification({
              title: '修改成功',
              message: '您已经修改成功',
              type: 'success',
            })
          }
          resetPage()
        }).catch((err) => {
            console.log(err);
        })
    }
    
   
}

const debounceSend = () => {
  debounce(sendmessage, 200)();
};

</script>

<template>
<div id="choosebox">
    <el-select v-model="store.state.chooseValue" clearable placeholder="选择通过或淘汰" size="large" class="chooseboxselect">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
    </el-select>
    <el-button type="primary" round size="large" @click="debounceSend">确定</el-button>
</div>
</template>

<style scoped>
#choosebox {
    margin-top: 25px;
}
.chooseboxselect {
    margin-right: 45px;
}
</style>
