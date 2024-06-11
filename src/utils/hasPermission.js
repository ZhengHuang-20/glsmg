import store from '@/store'

/*<a-button v-has="'user:add'" type="primary" icon="plus">添加用户</a-button>*/

const hasPermission = {
    install(Vue, options) {
        Vue.directive('has', {
            inserted: (el, binding, vnode) => {
                console.log("页面权限控制----");
                checkPermission(el, binding, vnode);
            }
        });
    }
};


function checkPermission(el, binding, vnode) {
    //let obj = vnode.context.$props.formData;
    console.log('_______________________')
    // ['user:edit','user:add']
    let perms = store.getters['account/permissions'];
    if (perms.findIndex(d => d.action === binding.value) === -1) {
        el.parentNode.removeChild(el);
    }
}

export default hasPermission;
