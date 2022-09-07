import { createStore } from 'vuex'

// interface everyPerson {

// }

export default createStore({
  state: {
    // ------------查看报名用户页面------------------------
    // 管理端状态码
    StageCode: 1,
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
    // 下方选择通过或淘汰数据
    chooseValue: '',
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
    DisplayButton: false,
    // 控制登录卡片的变量
    dialogTableVisible: true
  },
  getters: {
    // 渲染到查看报名人数页面的数据
    RenderSighup(state) {
      if(state.AllSighupInfo) {
        if (state.IsoutValue) {
          return state.AllSighupInfo.filter((val) => {
            // 如果筛选条件为是，那么返回状态码为0的，表示淘汰
            let val1 = val.testStatus + ""
            let lastVal = val1.slice(1,val1.length)
            console.log();
            
            if (state.IsoutValue === '是') {
              return lastVal === "02"
            } else {   //否则返回状态码不为0的
              return lastVal === "01"
            }
          })
        }
      }
      return state.AllSighupInfo
    }
  },
  mutations: {
    // ------------查看报名用户页面----------------------------------------    // 修改管理端状态码
    configStageCode(state,value) {
      state.StageCode = value
    },
    // 将请求来的所有报名用户的数据存入vuex的AllSighupInfo中
    SetSighupInfo(state, value) {
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
    ConfigInstituteValue(state, value) {
      state.InstituteValue = value
    },
    // 修改筛选方向数据
    ConfigDerectionValue(state, value) {
      state.DerectionValue = value
    },
    // 修改筛选是否被淘汰数据
    ConfigIsoutValue(state, value) {
      state.IsoutValue = value
    },
    // 修改学号搜索框数据
    ConfigStudentidInput(state, value) {
      state.StudentidInput = value
    },
    // 修改姓名搜索框数据
    ConfigNameInput(state, value) {
      state.NameInput = value
    },
    // 下方选择淘汰或通过框数据
    ConfigchooseValue(state,value) {
      state.chooseValue = value
    },
    // ------------------------用户详细信息页面-----------------------
    // 修改当前用户id
    ConfigNowstudentId(state, value) {
      state.NowstudentId = value
    },
    // 修改当前管理员是否评论test1
    ConfigAdminTest1(state, value) {
      state.AdminTest1 = value
    },
    // 修改当前管理员是否评论test2
    ConfigAdminTest2(state, value) {
      state.AdminTest2 = value
    },
    // 修改当前管理员是否评论test3
    ConfigAdminTest3(state, value) {
      state.AdminTest3 = value
    },
    // 修改当前管理员是否评论test4
    ConfigAdminTest4(state, value) {
      state.AdminTest4 = value
    },
    // 修改判断是否显示修改和删除按钮的字段
    ConfigDisplayButton(state, value) {
      state.DisplayButton = value
    },
  },
  actions: {
  },
  modules: {
  }
})
