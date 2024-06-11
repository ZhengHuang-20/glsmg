import JModal from './JModal'
import SDate from './SDate.vue'
import SEllipsis from './SEllipsis.vue'
import SExcelUpload from './SExcelUpload.vue'
import SFormContainer from './SFormContainer.vue'
import SImageUpload from './SImageUpload.vue'
import SInput from './SInput.vue'
import SSelectMultiple from './SSelectMultiple.vue'
import STreeSelect from './STreeSelect.vue'

//sbcbiz
import JSelectDepart from '../sbcbiz/JSelectDepart.vue'
import JSelectMultiUser from '../sbcbiz/JSelectMultiUser.vue'
import JSelectPosition from '../sbcbiz/JSelectPosition.vue'
import JSelectRole from '../sbcbiz/JSelectRole.vue'
import JSelectUserByDep from '../sbcbiz/JSelectUserByDep.vue'

export default {
  install(Vue) {
    Vue.component(JModal.name, JModal)
    Vue.component('SDate', SDate)
    Vue.component('SEllipsis', SEllipsis)
    Vue.component('SExcelUpload', SExcelUpload)
    Vue.component('SFormContainer', SFormContainer)
    Vue.component('SImageUpload', SImageUpload)
    Vue.component('SInput', SInput)
    Vue.component('SSelectMultiple', SSelectMultiple)
    Vue.component('STreeSelect', STreeSelect)

    //sbcbiz
    Vue.component('JSelectDepart', JSelectDepart)
    Vue.component('JSelectMultiUser', JSelectMultiUser)
    Vue.component('JSelectPosition', JSelectPosition)
    Vue.component('JSelectRole', JSelectRole)
    Vue.component('JSelectUserByDep', JSelectUserByDep)
  }
}
