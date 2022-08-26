<script setup lang="ts">
import { ref } from "vue"
import { useStore } from 'vuex'
import { Search } from '@element-plus/icons-vue'

// 获取vuex的store
let store = useStore()
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
const InstituteValue = ref('')

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
const DerectionValue = ref('')

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
const IsoutValue = ref('')

// 搜索框的数据
const StudentidInput = ref('')
const NameInput = ref('')


// 各个下拉框或搜索框值变化函数
function InstituteValueChange(val) {
  // 将当前的值传到vuex
  store.commit("ConfigInstituteValue",val)
  // 将其他四个的值在vuex置空(为了每次只能有一个条件搜索)
  store.commit("ConfigDerectionValue",'')
  store.commit("ConfigIsoutValue",'')
  store.commit("ConfigStudentidInput",'')
  store.commit("ConfigNameInput",'')
  // 在页面上将其他四个置空
  DerectionValue.value = ''
  IsoutValue.value = ''
  StudentidInput.value = ''
  NameInput.value = ''
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
  // 将其他四个的值在vuex置空(为了每次只能有一个条件搜索)
  store.commit("ConfigInstituteValue",'')
  store.commit("ConfigIsoutValue",'')
  store.commit("ConfigStudentidInput",'')
  store.commit("ConfigNameInput",'')
  // 在页面上将其他四个置空
  InstituteValue.value = ''
  IsoutValue.value = ''
  StudentidInput.value = ''
  NameInput.value = ''
}

function IsoutValueChange(val) {
  store.commit("ConfigIsoutValue",val)
  // 将其他四个的值在vuex置空(为了每次只能有一个条件搜索)
  store.commit("ConfigInstituteValue",'')
  store.commit("ConfigDerectionValue",'')
  store.commit("ConfigStudentidInput",'')
  store.commit("ConfigNameInput",'')
  // 在页面上将其他四个置空
  InstituteValue.value = ''
  DerectionValue.value = ''
  StudentidInput.value = ''
  NameInput.value = ''
}

function StudentidInputChange(val) {
  store.commit("ConfigStudentidInput",val)
  // 将其他四个的值在vuex置空(为了每次只能有一个条件搜索)
  store.commit("ConfigInstituteValue",'')
  store.commit("ConfigDerectionValue",'')
  store.commit("ConfigIsoutValue",'')
  store.commit("ConfigNameInput",'')
  // 在页面上将其他四个置空
  InstituteValue.value = ''
  DerectionValue.value = ''
  IsoutValue.value = ''
  NameInput.value = ''
}

function NameInputChange(val) {
  store.commit("ConfigNameInput",val)
  // 将其他四个的值在vuex置空(为了每次只能有一个条件搜索)
  store.commit("ConfigInstituteValue",'')
  store.commit("ConfigDerectionValue",'')
  store.commit("ConfigIsoutValue",'')
  store.commit("ConfigStudentidInput",'')
  // 在页面上将其他四个置空
  InstituteValue.value = ''
  DerectionValue.value = ''
  IsoutValue.value = ''
  StudentidInput.value = ''
}




</script>

<template>
<div id="selectbox">
    <div class="selectboxone">
        <el-select v-model="InstituteValue" clearable placeholder="筛选学院" size="large" @change="InstituteValueChange">
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
        <el-select v-model="IsoutValue" clearable placeholder="筛选是否被淘汰" size="large" @change="IsoutValueChange">
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
      v-model="StudentidInput"
      class="w-50 m-2 searchson"
      size="large"
      placeholder="按学号查找"
      :prefix-icon="Search"
      @input="StudentidInputChange"
    />
    <el-input
      v-model="NameInput"
      class="w-50 m-2 searchson"
      size="large"
      placeholder="按姓名查找"
      :prefix-icon="Search"
      @input="NameInputChange"
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
