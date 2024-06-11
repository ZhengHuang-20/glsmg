// 视图组件
const view = {
    tabs: () => import('@/layouts/tabs'),
    blank: () => import('@/layouts/BlankView'),
    page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
    login: {
        authority: '*',
        path: '/login',
        component: () => import('@/views/login')
    },

    root: {
        path: '/',
        name: '首页',
        redirect: '/dashboard',
        component: view.tabs
    },

    dashboard: {
        path: '/dashboard',
        name: '工作台',
        component: view.tabs,
    },
    dashboardDefault: {
        path: '/',
        name: '工作台',
        component: () => import('@/views/dashboard/Workplace'),
    },

    //--------异常页
    exception: {
        name: '异常页',
        icon: 'warning',
        component: view.blank
    },
    exp403: {
        authority: '*',
        name: 'exp403',
        path: '403',
        component: () => import('@/views/exception/403')
    },
    exp404: {
        name: 'exp404',
        path: '404',
        component: () => import('@/views/exception/404')
    },
    exp500: {
        name: 'exp500',
        path: '500',
        component: () => import('@/views/exception/500')
    },
}
export default routerMap
