// ./src/request/httpUrl.ts
// 这是配置根目录的还有接口路径的

const config = {
  rootUrl: "http://106.52.239.206:8080",
};

const httpApi = {
  refreshToken: config.rootUrl + '/cat/user/refreshToken',
  // 测试接口
  banner: config.rootUrl + 'home/banner', // banner
  login: config.rootUrl + '/cat/user/login', // 用户登录
  getAllUserInfo: config.rootUrl + '/cat/userInfo/getAllCandidate',   //管理端查询用户所有报名信息接口
  updateUserStatus: config.rootUrl + '/cat/userInfo/updateUserStatus',      //管理端批量处理用户通过或淘汰
  review: config.rootUrl + '/cat/userInfo/review',                //评论和评分接口
  updateAssessment: config.rootUrl + '/cat/userInfo/updateAssessment',     //修改和删除评论和评分接口
  logout: config.rootUrl + '/cat/user/logout',               //退出登录接口
  book: config.rootUrl + '/cat/reservation/number',//获取当前已预约人数
  addTime: config.rootUrl + '/cat/reservation/time/add',
  changeNum: config.rootUrl + '/cat/reservation/number/renew',
  deleteTime: config.rootUrl + '/cat/reservation/time/del'
}

export default httpApi;