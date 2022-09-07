import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import backPage from "../views/backPage.vue"
import Viewsighup from '../views/ViewSighup/viewsighup.vue'
import detailInfo from "../views/detailInfo/detailInfo.vue"
import login from '../views/login/login.vue'
import book from "../views/book/book.vue"

const routes: Array<RouteRecordRaw> = [
    // 根路径重定向
    {
        path: '/',
        redirect: '/login'
    },
    // 登陆页面
    {
        path: '/login',
        component: login
    },
    // 后台主页
    {
        path: "/backPage",
        component: backPage,
        redirect: "/backPage/viewsighup",
        // 后台主页的子路由
        children: [
            // 报名用户显示页面
            {
                path: 'viewsighup',
                component: Viewsighup
            },
            // 用户详细信息页面
            {
                path: "detailinfo",
                component: detailInfo
            },
            // 预约面试
            {
                path: "book",
                component: book
            }
        ]
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to,form,next) => {
    form
    // 如果进入的时候检测到进入登录页面并且localStorage中有token的话，就证明有七天免登录
    if(to.path.indexOf("/login") !== -1 && localStorage.getItem("token")) {
        // 跳转到后台主页
        router.push("/backPage")
    }
    // 如果进入(非登录页)的时候没有检测到localStorage或者sessionStorage中有token的话，那么就跳转到登录页
    let userToken = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : window.sessionStorage.getItem('token')
    if(to.path.indexOf("/login") === -1 && !userToken) {
        router.push("/")
    }
    // 如果用户未能验证身份，则 `next` 会被调用两次
    next()
  })

export default router;