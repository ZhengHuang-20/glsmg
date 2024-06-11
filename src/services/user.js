import {CACHE_KEY_ACCESS_TOKEN, CACHE_KEY_PERMISSIONS, CACHE_KEY_ROLES, CACHE_KEY_ROUTES} from "@/store/mutation-types";
import Vue from "vue";


/**
 * 退出登录
 */
export function logout() {
    Vue.ls.remove(CACHE_KEY_ROUTES)
    Vue.ls.remove(CACHE_KEY_PERMISSIONS)
    Vue.ls.remove(CACHE_KEY_ROLES)
    Vue.ls.remove(CACHE_KEY_ACCESS_TOKEN)
    Vue.ls.clear();
}

export default {
    logout,
}
