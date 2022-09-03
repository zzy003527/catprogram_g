<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { updateUserStatus,getAllUserInfo } from "../../../request/requestApi"

// 获取vuex的store
let store = useStore()

const chooseValue = ref('')
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

// 批量选择通过或淘汰后的事件
function sendmessage() {
    for (let [x, y] of Object.entries(store.state.Whethercheck)) {
        // 判断该用户是否有勾选，有勾选的才能进入要发送的数据中
        if(y === true) {
            // 声明要发送的数据
            let thevalue = {}
            if(chooseValue.value === '通过') {
                thevalue = {
                key: x,
                value: true
               }
            } else if(chooseValue.value === '淘汰') {
                thevalue = {
                key: x,
                value: false
               }
            }
            // 只有在有'淘汰'或者'通过'的时候才存入数据
            if(chooseValue.value) {
                store.commit("addSendUserInfo",thevalue)
            }
        }
    }
    // 如果有'淘汰'或者'通过'，发送请求
    if(chooseValue.value) {
        const params = store.state.SendUserInfo
        updateUserStatus(params).then(() => {
            // 发送成功之后将选择框置空
            chooseValue.value = ''
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
            // 弹出框表示成功
            ElNotification({
              title: '修改成功',
              message: '您已经修改成功',
              type: 'success',
            })
             // 完成后重新获取数据渲染
                getAllUserInfo().then((res)=> {
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
    <el-select v-model="chooseValue" clearable placeholder="选择通过或淘汰" size="large" class="chooseboxselect">
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
