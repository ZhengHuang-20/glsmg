export const USER_NAME = 'Login_Username'
export const USER_INFO = 'Login_Userinfo'
export const USER_AUTH = 'LOGIN_USER_BUTTON_AUTH'
export const SYS_BUTTON_AUTH = 'SYS_BUTTON_AUTH'
export const ENCRYPTED_STRING = 'ENCRYPTED_STRING'
export const ENHANCE_PRE = 'enhance_'
export const UI_CACHE_DB_DICT_DATA = 'UI_CACHE_DB_DICT_DATA'
export const INDEX_MAIN_PAGE_PATH = '/dashboard'
export const TENANT_ID = 'TENANT_ID'
export const ONL_AUTH_FIELDS = 'ONL_AUTH_FIELDS'
//路由缓存问题，关闭了tab页时再打开就不刷新 #842
export const CACHE_INCLUDED_ROUTES = 'CACHE_INCLUDED_ROUTES'
export const CONTENT_WIDTH_TYPE = {
    Fluid: 'Fluid',
    Fixed: 'Fixed'
}

/**
 * APP_ID
 * @type {number}
 */
export const APP_ID = parseInt(process.env.VUE_APP_ID);

export const APP_SSO = process.env.VUE_APP_SSO;

/**
 * 缓存过期时间
 * @type {number}
 */
export const CACHE_EXPIRE = parseInt(process.env.VUE_APP_CACHE_EXPIRE);
/**
 * token缓存key
 * @type {string}
 */
export const CACHE_KEY_ACCESS_TOKEN = process.env.VUE_APP_CACHE_KEY_ACCESS_TOKEN;
/**
 * 用户缓存key
 * @type {string}
 */
export const CACHE_KEY_USER = process.env.VUE_APP_CACHE_KEY_USER;
/**
 * 权限缓存key
 * @type {string}
 */
export const CACHE_KEY_PERMISSIONS = `${process.env.VUE_APP_CACHE_KEY_PERMISSIONS}_${APP_ID}`
/**
 * 角色缓存key
 * @type {string}
 */
export const CACHE_KEY_ROLES = `${process.env.VUE_APP_CACHE_KEY_ROLES}_${APP_ID}`
/**
 * 路由缓存key
 * @type {string}
 */
export const CACHE_KEY_ROUTES = `${process.env.VUE_APP_CACHE_KEY_ROUTES}_${APP_ID}`

/**
 * 多租户id缓存key
 * @type {string}
 */
export const CACHE_KEY_TENANT_ID = process.env.VUE_APP_CACHE_KEY_TENANT_ID

/**
 * 字典表数据缓存key
 * @type {string}
 */
export const CACHE_KEY_DB_DICT_DATA = process.env.VUE_APP_CACHE_KEY_DB_DICT_DATA


/**
 * 文件存储引擎 1:本地
 * @type {string}
 */
export const FILE_STORAGE_MODE = process.env.VUE_APP_FILE_STORAGE_MODE

