<script setup lang="ts">
  // 引入所需方法
  import { useStore } from 'vuex'
  import { getAllUserInfo,getStageCode } from '../../request/requestApi'
  
  // 引入所需组件
  // import tabbox from "./tabbox.vue"
  import selectbox from "./children/selectbox.vue"
  import displaybox from "./children/displaybox.vue"
  import choosebox from "./children/choosebox.vue"
  
  // 用useStore方法获取到vuex的store对象
  let store = useStore()
  

  
  // 获取管理端状态码后再请求数据
  getStageCode().then((res)=> {
    // 将管理端状态码存入vuex
    store.commit("configStageCode",res.obj)
    localStorage.setItem("configStageCode",res.obj)
    const params = {
      testCode: res.obj
    }
      // 发送请求并把获取到的数据存入vuex
      getAllUserInfo({params:params}).then((res) => {
        console.log(res);
        
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
  })


 
  
  
  
  
  
  
  
  
  
  </script>
  
  <template>
    <!-- <tabbox></tabbox> -->
    <div id="viewsighup">
      <selectbox></selectbox>
      <displaybox></displaybox>
      <choosebox></choosebox>
    </div>
  </template>
  
  <style scoped>
  #viewsighup {
      position: relative;
      top: 45px;
      width: 1013px;
      margin: 0 auto;
  }
  </style>
  