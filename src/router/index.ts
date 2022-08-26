import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import backPage from "../views/backPage.vue"
import Viewsighup from '../views/ViewSighup/viewsighup.vue'


const routes: Array<RouteRecordRaw> = [
    // 根路径重定向
    {
        path:'/',
        redirect: '/backPage'
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
            }
        ]
    },
    
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;