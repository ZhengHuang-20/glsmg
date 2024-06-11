import {hasAuthority} from '@/utils/authority-utils'
import {loginIgnore} from '@/router/index'
import NProgress from 'nprogress'
import Vue from "vue";
import store from "@/store";
import {loadRoutes} from "@/utils/routerUtil";
import {CACHE_KEY_ACCESS_TOKEN} from "@/store/mutation-types";

NProgress.configure({showSpinner: false})

const whiteList = ['/login', '/user/register', '/user/register-result', '/user/alteration'] // no redirect whitelist


/**
 * 进度条开始
 * @param to
 * @param form
 * @param next
 */
const progressStart = (to, from, next) => {
    // start progress bar
    if (!NProgress.isStarted()) {
        NProgress.start()
    }
    next()
}

/**
 * 登录守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const loginGuard = (to, from, next, options) => {
    const {message} = options
    // TODO chen
    // 验证是否登录

    console.log('--------:guards')

    let token = Vue.ls.get(CACHE_KEY_ACCESS_TOKEN);
    if (token) {
        /*if (to.path === '/login') {
            // 如果已登录，打开的是 登录页，者跳转到 默认页
            //next({path: '/'}) 有bug
        } else {
            next()
        }*/
        next()
    } else if (loginIgnore.includes(to)) {
        next();
    } else {
        message.warning('登录已失效，请重新登录')
        next({path: '/login', query: {redirect: to.fullPath}})
    }
}

/**
 * 权限守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const authorityGuard = (to, from, next, options) => {
    //return true;
    const {store, message, router} = options
    const permissions = store.getters['account/permissions']
    const roles = store.getters['account/roles']

    // 如果路由不存在，别的地方会出404
    /*let index = router.options.routes.findIndex(i => i.path === to.path)
    if (index===-1){
        //message.warning(`对不起，您无权访问页面: ${to.fullPath}，请联系管理员`)
        next({path: '/404'})
    }else {
        next()
    }*/

    // TODO chen
    /*if (!hasAuthority(to, permissions, roles)) {
        message.warning(`对不起，您无权访问页面: ${to.fullPath}，请联系管理员`)
        next({path: '/403'})
        // NProgress.done()
    } else {
        next()
    }*/
}

/**
 * 混合导航模式下一级菜单跳转重定向
 * @param to
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
const redirectGuard = (to, from, next, options) => {
    const {store} = options
    const getFirstChild = (routes) => {
        const route = routes[0]
        if (!route.children || route.children.length === 0) {
            return route
        }
        return getFirstChild(route.children)
    }
    if (store.state.setting.layout === 'mix') {
        const firstMenu = store.getters['setting/firstMenu']
        if (firstMenu.find(item => item.fullPath === to.fullPath)) {
            store.commit('setting/setActivatedFirst', to.fullPath)
            const subMenu = store.getters['setting/subMenu']
            if (subMenu.length > 0) {
                const redirect = getFirstChild(subMenu)
                return next({path: redirect.fullPath})
            }
        }
    }
    next()
}

/**
 * 进度条结束
 * @param to
 * @param form
 * @param options
 */
const progressDone = () => {
    // finish progress bar
    NProgress.done()
}

export default {
    beforeEach: [progressStart, loginGuard, /*authorityGuard,*/ redirectGuard],
    afterEach: [progressDone]
}
