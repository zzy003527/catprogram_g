// ./src/request/httpUrl.ts
// 这是配置根目录的还有接口路径的

const config = {
  rootUrl: "http://127.0.0.1:4523/m1/1473415-0-default/",
};

const httpApi = {
  // 测试接口
  banner: config.rootUrl + 'home/banner', // banner
  login: config.rootUrl + 'user/login', // 用户登录
  book: config.rootUrl + 'cat/reservation/number',//获取当前已预约人数
  addTime: config.rootUrl + 'cat/reservation/time/add',
  changeNum: config.rootUrl + 'cat/reservation/number/renew',
  deleteTime: config.rootUrl + '/cat/reservation/time/del'
}

export default httpApi;