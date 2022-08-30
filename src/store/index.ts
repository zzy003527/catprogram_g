import { createStore } from 'vuex'

// interface everyPerson {
  
// }

export default createStore({
  state: {
    // ------------查看报名用户页面------------------------
    // 所有报名用户的数据
    AllSighupInfo: [
        {
          id: 0,
          introduction: '',
          testStatus: 1,
          username: '',
          major: '',
          institute: '',
          group: '',
          studentId: ''
        }
      ]
    ,
    // 判断用户是否勾选的对象
    Whethercheck: {},
    // 保存发送批量处理的数据
    SendUserInfo: {},
    //选择筛选学院信息数据
    InstituteValue: '',
    // 选择筛选方向数据
    DerectionValue: '',
    // 筛选是否被淘汰数据
    IsoutValue: '',
    // 学号搜索框的数据
    StudentidInput: '',
    // 姓名搜索框的数据
    NameInput: '',
    // ------------------------用户详细信息页面-----------------------
    //点击进入的当前用户的学号
    NowstudentId: '',
    // 当前管理员用户是否写过test1
    AdminTest1: false,
    // 当前管理员用户是否写过test2
    AdminTest2: false,
    // 当前管理员用户是否写过test3
    AdminTest3: false,
    // 当前管理员用户是否写过test4
    AdminTest4: false,
    // 判断是否显示修改和删除按钮的字段
    DisplayButton: false
  },
  getters: {
    // 渲染到查看报名人数页面的数据
    RenderSighup(state) {
      if(state.InstituteValue) {
        // 如果学院信息数据存在,就按照学院信息筛选
        return state.AllSighupInfo.filter((val)=> {
          return val.institute === state.InstituteValue
        })
      } else if(typeof(state.DerectionValue) !== 'string') {   //因为返回的前端后台信息是boolean，所以要通过这个判断信息是否存在
        return state.AllSighupInfo.filter((val) => {
          // 如果是boolean，那么判断筛选
          if(typeof(state.DerectionValue) !== 'string') {
            return val.group === state.DerectionValue
          } else {
            // 如果不是，证明没有筛选条件，返回所有数据（因为所有数据必定有institute）
            return val.institute !== ''
          }
        })
      } else if(state.IsoutValue) {
        return state.AllSighupInfo.filter((val) => {
          // 如果筛选条件为是，那么返回状态码为0的，表示淘汰
          if(state.IsoutValue === '是') {
            return val.testStatus === 0
          } else {   //否则返回状态码不为0的
            return val.testStatus !== 0
          }
        })
      } else if(state.StudentidInput) {     //判断是否有筛选学号或姓名的数据，如果有，返回符合条件的数据
        return state.AllSighupInfo.filter((val) => {
          return val.studentId === state.StudentidInput
        })
      } else if(state.NameInput) {
        return state.AllSighupInfo.filter((val) => {
          return val.username === state.NameInput
        })
      }
      
      return state.AllSighupInfo
    }
  },
  mutations: {
     // ------------查看报名用户页面----------------------------------------
    // 将请求来的所有报名用户的数据存入vuex的AllSighupInfo中
    SetSighupInfo(state,value) {
      state.AllSighupInfo = value
    },
    // 为数据设置是否勾选
    addUserSetting(state, value) {
      state.Whethercheck[value.key] = value.thevalue
    },
    // 添加发送的数据
    addSendUserInfo(state, thevalue) {
      state.SendUserInfo[thevalue.key] = thevalue.value
    },
    // 置空发送的数据
    ResetSendUserInfo(state) {
      state.SendUserInfo = {}
    },
    // 修改筛选学院信息数据
    ConfigInstituteValue(state,value) {
      state.InstituteValue = value
    },
    // 修改筛选方向数据
    ConfigDerectionValue(state,value) {
      state.DerectionValue = value
    },
    // 修改筛选是否被淘汰数据
    ConfigIsoutValue(state,value) {
      state.IsoutValue = value
    },
    // 修改学号搜索框数据
    ConfigStudentidInput(state,value) {
      state.StudentidInput = value
    },
    // 修改姓名搜索框数据
    ConfigNameInput(state,value) {
      state.NameInput = value
    },
    // ------------------------用户详细信息页面-----------------------
    // 修改当前用户id
    ConfigNowstudentId(state,value) {
      state.NowstudentId = value
    },
    // 修改当前管理员是否评论test1
    ConfigAdminTest1(state,value) {
      state.AdminTest1 = value
    },
    // 修改当前管理员是否评论test2
    ConfigAdminTest2(state,value) {
      state.AdminTest2 = value
    },
    // 修改当前管理员是否评论test3
    ConfigAdminTest3(state,value) {
      state.AdminTest3 = value
    },
    // 修改当前管理员是否评论test4
    ConfigAdminTest4(state,value) {
      state.AdminTest4 = value
    },
    // 修改判断是否显示修改和删除按钮的字段
    ConfigDisplayButton(state,value) {
      state.DisplayButton = value
    },
  },
  actions: {
  },
  modules: {
  }
})
