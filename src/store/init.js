import {
    CACHE_KEY_ACCESS_TOKEN,
    CACHE_KEY_PERMISSIONS,
    CACHE_KEY_USER
} from "@/store/mutation-types";
import Vue from "vue";

function initUser(options) {
    console.log('----init user')
    const {store} = options
    let user = Vue.ls.get(CACHE_KEY_USER);
    if (user) {
        store.commit('account/setUser', user)
    }
    initFetchUser(options);
}

function initFetchUser(options) {
    console.log('----init user')
    const {store} = options
    let token = Vue.ls.get(CACHE_KEY_ACCESS_TOKEN);
    if (token) {
        store.dispatch('account/loadUserInfo')
    }
}

async function initPermission(options) {
    const {store} = options
    let token = Vue.ls.get(CACHE_KEY_ACCESS_TOKEN);
    let permission = Vue.ls.get(CACHE_KEY_PERMISSIONS);
    if (token && !permission) {
        await store.dispatch('account/GetPermissionList')
    }
}

export {
    initUser,
    initPermission
}
