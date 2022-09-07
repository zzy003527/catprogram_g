<script setup lang="ts">
import { reactive,computed } from "vue"
import { useStore } from 'vuex'
import { Search } from '@element-plus/icons-vue'
import { dimSearch,getAllUserInfo } from "../../../request/requestApi"

// 获取vuex的store
let store = useStore()


// 节流函数
// let throttleTimer
// const debounce = (fn: Function, delay: number) :Function => {
//   return (...args: unknown[]) => {
//     if (throttleTimer) {
//       return;
//     }
//     throttleTimer = setTimeout(() => {
//       fn.apply(this, args);
//       throttleTimer = null;
//     }, delay);
//   }
// }

// 学院筛选下拉框的数据
const InstituteOptions = [
  {
    value: '机电工程学院',
    label: '机电工程学院',
  },
  {
    value: '自动化学院',
    label: '自动化学院',
  },
  {
    value: '计算机学院',
    label: '计算机学院',
  },
  {
    value: '信息工程学院',
    label: '信息工程学院',
  },
  {
    value: '轻工化工学院',
    label: '轻工化工学院',
  },
  {
    value: '土木与交通工程学院',
    label: '土木与交通工程学院',
  },
  {
    value: '材料与能源学院',
    label: '材料与能源学院',
  },
  {
    value: '环境科学与工程学院',
    label: '环境科学与工程学院',
  },
  {
    value: '外国语学院',
    label: '外国语学院',
  },
  {
    value: '物理与光电工程学院',
    label: '物理与光电工程学院',
  },
  {
    value: '生物医药学院',
    label: '生物医药学院',
  },
  {
    value: '生态环境与资源学院',
    label: '生态环境与资源学院',
  },
  {
    value: '集成电路学院',
    label: '集成电路学院',
  }
]
// const InstituteValue = ref('') 

// 前后端选择方向数据
const DirectionOptions = [
  {
    value: '前端',
    label: '前端',
  },
  {
    value: '后台',
    label: '后台',
  }
  ]
const DerectionValue = computed(()=>{
  if(store.state.DerectionValue === true) {
        return "前端"
      } else if(store.state.DerectionValue === false) {
        return "后台"
      } else {
        return ""
      }
})

// 是否被淘汰数据
const IsoutOptions = [
  {
    value: '是',
    label: '是',
  },
  {
    value: '否',
    label: '否',
  }
  ]
// const IsoutValue = ref('')

// 搜索框的数据
// const StudentidInput = ref('')
// const NameInput = ref('')

// 一个修改筛选条件后重新获取数据的方法
function reGetInfo() {
  // 要发送的参数对象
  const params = reactive({
    testStatus: store.state.StageCode
  })
  if(store.state.InstituteValue) {
    params['institute'] = store.state.InstituteValue
  }
  if((typeof (store.state.DerectionValue) !== 'string')) {
    if(store.state.DerectionValue === false) {
      params['group'] = 0
    } else if(store.state.DerectionValue === true) {
      params['group'] = 1
    }
  }
  if(store.state.StudentidInput) {
    params['studentId'] = store.state.StudentidInput
  }
  if(store.state.NameInput) {
    params['username'] = store.state.NameInput
  }
  // 如果提交的四个参数不为空的话才发送模糊查询
  if(store.state.InstituteValue || (typeof (store.state.DerectionValue) !== 'string') || store.state.StudentidInput || store.state.NameInput) {
    dimSearch(params).then((res) => {
    // 将获取到的数据存入vuex
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
  } else {
    // 否则获取所有数据
    // 发送请求并把获取到的数据存入vuex
    const params = {testCode: Number(localStorage.getItem("configStageCode"))}
    getAllUserInfo({params:params}).then((res) => {
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
  // console.log(store.state.InstituteValue);
  // console.log(store.state.DerectionValue);
  // console.log(store.state.IsoutValue);
  // console.log(store.state.StudentidInput);
  // console.log(store.state.NameInput);
}



// 各个下拉框或搜索框值变化函数
function InstituteValueChange(val) {
  // 将当前的值传到vuex
  store.commit("ConfigInstituteValue",val)
  reGetInfo()
  // // 将其他四个的值在vuex置空(为了每次只能有一个条件搜索)
  // store.commit("ConfigDerectionValue",'')
  // store.commit("ConfigIsoutValue",'')
  // store.commit("ConfigStudentidInput",'')
  // store.commit("ConfigNameInput",'')
  // // 在页面上将其他四个置空
  // DerectionValue.value = ''
  // IsoutValue.value = ''
  // StudentidInput.value = ''
  // NameInput.value = ''
}

function DerectionValueChange(val) {
  // 将当前的值传到vuex
  if(val === '前端') {
    // 如果是前端，为true
    store.commit("ConfigDerectionValue",true)
  } else if(val === '后台') {
    // 如果是后台，为false
    store.commit("ConfigDerectionValue",false)
  } else {
    // 如果都不是，置空
    store.commit("ConfigDerectionValue",'')
  }
  reGetInfo()
  // // 将其他四个的值在vuex置空(为了每次只能有一个条件搜索)
  // store.commit("ConfigInstituteValue",'')
  // store.commit("ConfigIsoutValue",'')
  // store.commit("ConfigStudentidInput",'')
  // store.commit("ConfigNameInput",'')
  // // 在页面上将其他四个置空
  // InstituteValue.value = ''
  // IsoutValue.value = ''
  // StudentidInput.value = ''
  // NameInput.value = ''
}

function IsoutValueChange(val) {
  store.commit("ConfigIsoutValue",val)
  // 将其他四个的值在vuex置空(为了每次只能有一个条件搜索)
  // store.commit("ConfigInstituteValue",'')
  // store.commit("ConfigDerectionValue",'')
  // store.commit("ConfigStudentidInput",'')
  // store.commit("ConfigNameInput",'')
  // // 在页面上将其他四个置空
  // InstituteValue.value = ''
  // DerectionValue.value = ''
  // StudentidInput.value = ''
  // NameInput.value = ''
}

function StudentidInputChange(val) {
  store.commit("ConfigStudentidInput",val)
  reGetInfo()
  // 将其他四个的值在vuex置空(为了每次只能有一个条件搜索)
  // store.commit("ConfigInstituteValue",'')
  // store.commit("ConfigDerectionValue",'')
  // store.commit("ConfigIsoutValue",'')
  // store.commit("ConfigNameInput",'')
  // // 在页面上将其他四个置空
  // InstituteValue.value = ''
  // DerectionValue.value = ''
  // IsoutValue.value = ''
  // NameInput.value = ''
}

function NameInputChange(val) {
  store.commit("ConfigNameInput",val)
  reGetInfo()
  // 将其他四个的值在vuex置空(为了每次只能有一个条件搜索)
  // store.commit("ConfigInstituteValue",'')
  // store.commit("ConfigDerectionValue",'')
  // store.commit("ConfigIsoutValue",'')
  // store.commit("ConfigStudentidInput",'')
  // // 在页面上将其他四个置空
  // InstituteValue.value = ''
  // DerectionValue.value = ''
  // IsoutValue.value = ''
  // StudentidInput.value = ''
}

// const debounceStudentidInputChange = (val) => {
//   console.log(val);
  
//   debounce(StudentidInputChange, 1000)();
// };
// const debounceNameInputChange = () => {
//   debounce(NameInputChange, 500)();
// };

</script>

<template>
<div id="selectbox">
    <div class="selectboxone">
        <el-select v-model="store.state.InstituteValue" clearable placeholder="筛选学院" size="large" @change="InstituteValueChange">
        <el-option
          v-for="item in InstituteOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
        </el-select>
    </div>
    <div class="selectboxone">
        <el-select v-model="DerectionValue" clearable placeholder="筛选方向" size="large" @change="DerectionValueChange">
        <el-option
          v-for="item in DirectionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
        </el-select>
    </div>
    <div class="selectboxone">
        <el-select v-model="store.state.IsoutValue" clearable placeholder="筛选是否被淘汰" size="large" @change="IsoutValueChange">
        <el-option
          v-for="item in IsoutOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
        </el-select>
    </div>
</div>
<div id="searchbox">
    <el-input
      v-model="store.state.StudentidInput"
      class="w-50 m-2 searchson"
      size="large"
      placeholder="按学号查找"
      :prefix-icon="Search"
      @change="StudentidInputChange"
    />
    <el-input
      v-model="store.state.NameInput"
      class="w-50 m-2 searchson"
      size="large"
      placeholder="按姓名查找"
      :prefix-icon="Search"
      @change="NameInputChange"
    />
</div>
</template>

<style scoped>
#selectbox {
    position: relative;
    display: flex;
    justify-self: space-around;
    top: 0px;
    width: 1000px;
    height: 50px;
}
.selectboxone {
    margin: 5px 54px;
}
.searchson {
    margin: 8px 0;
}
</style>
