<template>
  <a-spin :spinning="confirmLoading">
    <s-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>

    <a-col :span="24">
        <a-form-model-item label="平台名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="type">
              <a-input style="width:100%"  v-model="model.type_dictText" placeholder="请输入平台名称"  ></a-input>
        </a-form-model-item>
    </a-col>
    <a-col :span="24">
        <a-form-model-item label="openId" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="openId">
              <a-input style="width:100%"  v-model="model.openId" placeholder="请输入openId"  ></a-input>
        </a-form-model-item>
    </a-col>
    <a-col :span="24">
        <a-form-model-item label="unionId" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="unionId">
          <a-input style="width:100%"  v-model="model.unionId" placeholder="请输入unionId"  ></a-input>
        </a-form-model-item>
    </a-col>
        </a-row>
      </a-form-model>
    </s-form-container>
  </a-spin>
</template>

<script>

  import { httpAction, getAction } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'
  import SImageUpload from "@/components/sbc/SImageUpload";

  export default {
    name: 'UcUserThirdForm',
    components: {
        SImageUpload,
    },
    props: {
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data () {
      return {
        model:{
        },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        baseURL: process.env.VUE_APP_API_BASE_URL,
        url: {
          add: "/manager/uc/userthird/add",
          edit: "/manager/uc/userthird/edit",
          queryById: "/manager/uc/userthird/queryById"
        },
        validatorRules:{
        }
      }
    },
    computed: {
      formDisabled(){
        return this.disabled
      },
    },
    created () {
       //备份model原始值
      this.modelDefault = JSON.parse(JSON.stringify(this.model));
    },
    methods: {
      add () {
        this.edit(this.modelDefault);
      },
      edit (record) {
        this.model = Object.assign({}, record);
        this.visible = true;
      },
      submitForm () {
        const that = this;
        // 触发表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }

            httpAction(httpurl,this.model,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }

        })
      },
      popupCallback(value,row){
         this.model = Object.assign(this.model, row);
      }
    }
  }
</script>
