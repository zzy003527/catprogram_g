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

const handleError = (err: any) => {
    // console.log("请求错误", err);
    throw err;
}
// ---------------------------------------------------------------------------------------------------------------------------------------
// 用户登录
const login = async (params) => {
    return await request.post<string>(httpUrl.login, params);
}


//管理端获取所有报名用户接口
const getAllUserInfo = async () => {
    return await request.get(httpUrl.getAllUserInfo)
}
// 管理端批量处理用户通过或淘汰接口
const updateUserStatus = async (params) => {
    return await request.post(httpUrl.updateUserStatus, params)
}

// 评论和评分接口
const review = async (params) => {
    return await request.post(httpUrl.review, params)
}

// 修改或删除评论和评分接口
const updateAssessment = async (params) => {
    return await request.post(httpUrl.updateAssessment, qs.stringify(params))
}

//退出登录接口
const logout = async () => {
    return await request.post(httpUrl.logout)
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
    getAllUserInfo,
    updateUserStatus,
    review,
    updateAssessment,
    logout,
    book,
    addTime,
    changeNumRequest,
    deleteTime
}