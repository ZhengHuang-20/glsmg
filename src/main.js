import Vue from 'vue'
import App from './App.vue'
import {initRouter} from './router'
import './theme/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
//import '@/mock'
import store from './store'
import Storage from 'vue-ls';

import hasPermission from '@/utils/hasPermission'

import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import {initI18n} from '@/utils/i18n'
import bootstrap from '@/bootstrap'
import 'moment/locale/zh-cn'


import '@/utils/filter' // base filter


import SbcComponents from '@/components/sbc/index'
import JDictSelectTag from './components/dict/index.js'

import './theme/iconfont/iconfont.css'
import './theme/diy/cover.less'
import './theme/diy/index.less'

window._CONFIG={};
window._CONFIG['domianURL']=process.env.VUE_APP_API_BASE_URL;


console.log(store.state)
const router = initRouter(store.state.setting.asyncRoutes)
const i18n = initI18n('CN', 'US')

Vue.use(Antd)
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Plugins)
Vue.use(hasPermission)

Vue.use(SbcComponents);
Vue.use(JDictSelectTag);

Vue.prototype.$isNotEmpty = function(obj){
  return (obj !== undefined && obj !== null && obj !== '' && obj !== 'null')
}
Vue.prototype.$getDefalut = function(obj, key, df){
  return (obj === undefined || key === undefined || !this.$isNotEmpty(obj[key])) ? df : obj[key];
}

const options = {
  namespace: process.env.VUE_APP_CACHE_PREFIX, // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);

bootstrap({router, store, i18n, message: Vue.prototype.$message})

new Vue({
  router,
  store,
  mounted () {
    //store.commit('SET_TOKEN', Vue.ls.get(CACHE_KEY_ACCESS_TOKEN))
  },
  i18n,
  render: h => h(App),
}).$mount('#app')
