import routerMap from './router.map'
import {parseRoutes} from '@/utils/routerUtil'
import TabsView from '@/layouts/tabs/TabsView'

// 异步路由配置
const routesConfig = [
    'login',
    'root',
    {
        router: 'dashboard',
        children: [
            {
                path: '',
                name: '工作台',
                router: 'dashboardDefault'
            }
        ]
    },
    {
        router: 'exp404',
        path: '*',
        name: '404'
    },
    {
        router: 'exp403',
        path: '/403',
        name: '403'
    },

    /*{
        path: "/workPanel",
        name: "workPanel",
        component: () => import("@/views/flow/workPanel.vue"),
        meta:{title:'工作面板'}
    },
    {
        path: "/flow/workSpace",
        name: "workSpace",
        component: () => import("@/views/flow/workSpace.vue"),
        meta:{title:'表单列表'}
    },
    {
        path: "/flow/formListPanel",
        name: "formListPanel",
        component: () => import("@/views/flow/formListPanel.vue"),
        meta:{title:'表单列表'}
    },
    {
        path: "/flow/design",
        name: "design",
        component: () => import("@/views/flow/design.vue"),
    },*/

]

const options = {
    routes: parseRoutes(routesConfig, routerMap)
}

export default options
