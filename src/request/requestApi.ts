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
const refreshToken = async (params) => {
    return await request.post(httpUrl.refreshToken, (params))
}
// 用户登录
const login = async (params) => {
    return await request.post<string>(httpUrl.login, params);
}


//管理端获取所有报名用户接口
const getAllUserInfo = async (params) => {
    return await request.get(httpUrl.getAllUserInfo,params)
}

// 获取管理端状态接口
const getStageCode = async() => {
    return await request.get(httpUrl.getStageCode)
}

//模糊查询接口
const dimSearch = async (params) => {
    return await request.post(httpUrl.dimSearch, params)
}

// 修改管理端状态接口(进入下一阶段)
const changeStage = async (params) => {
    return await request.get(httpUrl.changeStage,params)
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
    return await request.post(httpUrl.updateAssessment, params)
}

//退出登录接口
const logout = async () => {
    return await request.post(httpUrl.logout)
}

const book = async (params) => {
    return await request.post<string>(httpUrl.book, params);
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
    getStageCode,
    dimSearch,
    changeStage,
    updateUserStatus,
    review,
    updateAssessment,
    logout,
    book,
    addTime,
    changeNumRequest,
    deleteTime,
    refreshToken
}