import {login, logout, phoneLogin, thirdLogin} from "@/api/login";

import Vue from "vue";
import {
    CACHE_EXPIRE,
    CACHE_KEY_ACCESS_TOKEN, CACHE_KEY_DB_DICT_DATA,
    CACHE_KEY_PERMISSIONS,
    CACHE_KEY_ROLES, CACHE_KEY_ROUTES,
    CACHE_KEY_USER,
    TENANT_ID, UI_CACHE_DB_DICT_DATA, APP_ID, APP_SSO
} from "@/store/mutation-types";
import {getUserInfo, queryPermissionsByUser} from "@/api/api";
import {loadRoutes} from "@/utils/routerUtil";
import { USER_INFO } from "../mutation-types";
import {nodeType, getDefaultNodeProps} from '@/utils/enumConst'

/*
*user:{
*   token: '',
    username: '',
    realname: '',
    tenantid:'',
    avatar: '',
    id:'',
* }
* */

const process = {
    type: nodeType.ROOT,
    name: '发起人',
    id: '10000',
    props: getDefaultNodeProps()
  }

export default {
    namespaced: true,
    state: {
        user: null,
        userInfo: null,
        permissions: null,
        roles: null,
        routesConfig: null,
        selectedNode: {},
        template: {
            baseSetup: {
              icon: 'el-icon-s-custom',
              background: '#718dff',
              name: '新的审批',
              group: null,
              remark: '',
              sign: false,
              whoCommit: {
                names: [],
                values: []
              },
              whoEdit: {
                names: [],
                values: []
              },
              whoExport: [],
              notify: {
                types: [],
                title: ''
              }
            },
            //表单设计
            form: [],
            //流程设计
            /* process: {
               name: '发起人',
               type: 'root'
             }*/
            process: process
        },
        parentMap: new Map(),
    },
    getters: {
        selectedNode:state => {
            return state.selectedNode
        },
        parentMap:state => {
            return state.parentMap
        },
        template:state => {
            return state.template
        },
        userInfo: state => {
            if (!state.userInfo || !state.userInfo.token) {
                try {
                    const userInfo = Vue.ls.get(USER_INFO, {})
                    state.userInfo = userInfo
                } catch (e) {
                    console.error(e)
                }
            }
            return state.userInfo
        },
        user: state => {
            if (!state.user || !state.user.token) {
                try {
                    const user = Vue.ls.get(CACHE_KEY_USER, {})
                    state.user = user
                } catch (e) {
                    console.error(e)
                }
            }
            return state.user
        },
        permissions: state => {
            if (!state.permissions) {
                try {
                    const permissions = Vue.ls.get(CACHE_KEY_PERMISSIONS)
                    state.permissions = permissions ? permissions : []
                } catch (e) {
                    console.error(e.message)
                }
            }
            return state.permissions
        },
        roles: state => {
            if (!state.roles) {
                try {
                    const roles = Vue.ls.get(CACHE_KEY_ROLES)
                    state.roles = roles ? roles : []
                } catch (e) {
                    console.error(e.message)
                }
            }
            return state.roles
        },
        routesConfig: state => {
            if (!state.routesConfig) {
                try {
                    const routesConfig = Vue.ls.get(CACHE_KEY_ROUTES)
                    state.routesConfig = routesConfig ? routesConfig : []
                } catch (e) {
                    console.error(e.message)
                }
            }
            return state.routesConfig
        }
    },
    mutations: {
        selectedNode(state, val) {
            debugger
            state.selectedNode = val
        },
        selectedApprover(state, val) {
            state.selectedNode.props.targetObj.objs = val
        },
        setCondition(state, val) {
          state.selectedNode.condition = val
        },
        setConditionRootUser(state, val) {
          state.selectedNode.condition = val
        },
        setTemplate(state, val) {
          state.template = val
          console.log(state.template)
        },
        clearTemplate(state) {
          state.template = {}
        },
        setIsEdit(state, val){
            state.isEdit = val
        },
        setUser(state, user) {
            console.log('----set user')
            state.user = user
            Vue.ls.set(CACHE_KEY_ACCESS_TOKEN, user.token, CACHE_EXPIRE)
            Vue.ls.set(CACHE_KEY_USER, user, CACHE_EXPIRE)
            //localStorage.setItem(VUE_APP_USER_KEY, JSON.stringify(user))
        },
        setUserInfo(state, userInfo) {
            console.log('----set userInfo')
            state.userInfo = userInfo
            Vue.ls.set(USER_INFO, userInfo, CACHE_EXPIRE)
            //localStorage.setItem(VUE_APP_USER_KEY, JSON.stringify(user))
        },
        setPermissions(state, permissions) {
            state.permissions = permissions
            Vue.ls.set(CACHE_KEY_PERMISSIONS, permissions, CACHE_EXPIRE)
            //localStorage.setItem(VUE_APP_CACHE_KEY_PERMISSIONS, JSON.stringify(permissions))
        },
        setRoles(state, roles) {
            state.roles = roles
            Vue.ls.set(CACHE_KEY_ROLES, roles, CACHE_EXPIRE)
            //localStorage.setItem(VUE_APP_CACHE_KEY_ROLES, JSON.stringify(roles))
        },
        setRoutesConfig(state, routesConfig) {
            state.routesConfig = routesConfig
            Vue.ls.set(CACHE_KEY_ROUTES, routesConfig, CACHE_EXPIRE)
            //localStorage.setItem(VUE_APP_CACHE_KEY_ROUTES, JSON.stringify(routesConfig))
        },
    },


    actions: {
        initSelectNode({commit},selectedNode){
            commit("selectedNode", selectedNode);
        },
        initForm({commit},template,isEdit){
            commit("setTemplate", template);
    	    commit("setIsEdit", isEdit);
        },
        loadUserInfo({commit}){
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    if (response.code == '200') {
                        const result = response.result;
                        const userInfo = result.userInfo;
                        const token = result.token;
                        let user = {
                            id: userInfo.id,
                            username: userInfo.username,
                            realname: userInfo.realname,
                            avatar: userInfo.avatar,
                            token: token
                        };
                        commit('setUser', user);
                        commit('setUserInfo', userInfo);
                        resolve(response)
                    } else {
                        reject(response)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登录
        Login({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    if (response.code == '200') {
                        const result = response.result;
                        const userInfo = result.userInfo;
                        const token = result.token;
                        let user = {
                            id: userInfo.id,
                            username: userInfo.username,
                            realname: userInfo.realname,
                            avatar: userInfo.avatar,
                            token: token
                        };
                        commit('setUser', user);
                        commit('setUserInfo',userInfo);

                        Vue.ls.set(CACHE_KEY_DB_DICT_DATA, result.sysAllDictItems, CACHE_EXPIRE)

                        resolve(response)
                    } else {
                        reject(response)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //手机号登录
        PhoneLogin({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                phoneLogin(userInfo).then(response => {
                    if (response.code == '200') {
                        const result = response.result;
                        const userInfo = result.userInfo;
                        const token = result.token;
                        let user = {
                            id: userInfo.id,
                            username: userInfo.username,
                            realname: userInfo.realname,
                            avatar: userInfo.avatar,
                            token: token
                        };
                        commit('setUser', user);
                        commit('setUserInfo', userInfo);
                        resolve(response)
                    } else {
                        reject(response)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetPermissionList({commit}) {
            return new Promise((resolve, reject) => {
                queryPermissionsByUser({appId: APP_ID}).then(response => {
                    const menuData = response.result.menu;
                    const authData = response.result.auth;
                    const allAuthData = response.result.allAuth;
                    //Vue.ls.set(USER_AUTH,authData);
                    //sessionStorage.setItem(USER_AUTH, JSON.stringify(authData));
                    //sessionStorage.setItem(SYS_BUTTON_AUTH, JSON.stringify(allAuthData));

                    //commit('setRoles')
                    commit('setPermissions', authData);

                    if (menuData && menuData.length > 0) {
                        //update--begin--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
                        menuData.forEach((item, index) => {
                            if (item["children"]) {
                                let hasChildrenMenu = item["children"].filter((i) => {
                                    return !i.hidden || i.hidden == false
                                })
                                if (hasChildrenMenu == null || hasChildrenMenu.length == 0) {
                                    item["hidden"] = true
                                }
                            }
                        })

                        commit('setRoutesConfig', menuData)
                        // 重新加载菜单
                        loadRoutes();

                    } else {
                        reject('getPermissionList: permissions must be a non-null array !')
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout({commit, state}) {
            return new Promise((resolve) => {
                let logoutToken = state.token;

                commit('setUser', {});
                commit('setUserInfo', {});
                Vue.ls.remove(CACHE_KEY_USER)
                Vue.ls.remove(CACHE_KEY_PERMISSIONS)
                Vue.ls.remove(CACHE_KEY_ROLES)
                Vue.ls.remove(CACHE_KEY_ROUTES)

                logout(logoutToken).then(() => {
                    if (APP_SSO == 'true') {
                        let sevice = 'http://' + window.location.host + '/'
                        let serviceUrl = encodeURIComponent(sevice)
                        window.location.href = sevice;//VUE_APP_CAS_BASE_URL + '/logout?service=' + serviceUrl
                    }
                    resolve()
                }).catch(() => {
                    resolve()
                })
            })
        },
        // 第三方登录
        ThirdLogin({commit}, param) {
            return new Promise((resolve, reject) => {
                thirdLogin(param.token, param.thirdType).then(response => {
                    if (response.code == '200') {
                        const result = response.result;
                        const userInfo = result.userInfo;
                        const token = result.token;
                        let user = {
                            id: userInfo.id,
                            username: userInfo.username,
                            realname: userInfo.realname,
                            avatar: userInfo.avatar,
                            token: token
                        };
                        commit('setUser', user);
                        commit('setUserInfo', userInfo);
                        resolve(response)
                    } else {
                        reject(response)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },

        saveTenant({commit}, id) {
            Vue.ls.set(TENANT_ID, id, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TENANT', id)
        }


    }
}
