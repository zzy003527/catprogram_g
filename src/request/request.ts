// ./src/request/request.ts
import service from './axiosConfig'
import { Get, Post } from './types'; // 接口泛型

// 封装 get 方法，类型为Get
const get: Get = async (url, config) => {
    const response = await service.get(url, { ...config });
    return response.data;
};

const post: Post = async (url, params, config) => {
    const response = await service.post(url, params, { ...config });
    return response.data;
};

// ... delete 等等

// 使用 request 统一调用
const request = {
    get,
    post
};

export default request;