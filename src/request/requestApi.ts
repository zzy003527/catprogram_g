// ./src/request/requestApi.ts
// 这是封装请求的ts文件

import request from './request'; // axios 封装
import httpUrl from "./httpUrl"; // 接口 url
import qs from "qs";


// 此处的两个请求为示例，如果使用请自行更改-----------------------------------------------------------------------------------------------------------------
// 获取 banner
const getBanner = async () => {
    return await request.get(httpUrl.banner);
}
// 用户登录
const login = async (params) => {
    return await request.post<string>(httpUrl.login, qs.stringify(params));
}
// ---------------------------------------------------------------------------------------------------------------------------------------

const handleError = (err: any) => {
    console.log("请求错误", err);
    throw err;
}
const book = async (params) => {
    return await request.post<string>(httpUrl.book, qs.stringify(params));
}
const addTime = async (params) => {
    return await request.post<string>(httpUrl.addTime, qs.stringify(params));
}
const changeNumRequest = async (params) => {
    return await request.post<string>(httpUrl.changeNum, qs.stringify(params));
}
const deleteTime = async (params) => {
    return await request.post<string>(httpUrl.deleteTime, qs.stringify(params));
}
export {
    getBanner,
    login,
    handleError,
    book,
    addTime,
    changeNumRequest,
    deleteTime

}