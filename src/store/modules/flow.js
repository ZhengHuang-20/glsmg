import {nodeType, getDefaultNodeProps} from '@/utils/enumConst'

const process = {
    type: nodeType.ROOT,
    name: '发起人',
    id: '10000',
    props: getDefaultNodeProps()
}

export default {
    namespaced: true,
    state: {
        parentMap: new Map(),
        isEdit: null,
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
        }
    },
    getters: {

    },
    mutations: {
        setwhoCommit(state, val) {
            state.template.baseSetup.whoCommit = val
        },
        setwhoEdit(state, val) {
            state.template.baseSetup.whoEdit = val
        },
        setwhoExport(state, val) {
            state.template.baseSetup.whoExport = val
        },
        setTemplate(state, val) {
            state.template = val
        },
        clearTemplate(state) {
            state.template = {}
        },
        selectedNode(state, val) {
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
        setIsEdit(state, val){
            state.isEdit = val
        }
    },


    actions: {
    }
}
