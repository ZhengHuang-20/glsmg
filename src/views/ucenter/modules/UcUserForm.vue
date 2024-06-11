<template>
  <a-spin :spinning="confirmLoading">
    <s-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>

    <a-col :span="24">
        <a-form-model-item label="用户名" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="username">
              <a-input :maxLength="60"  style="width:100%"  v-model="model.username" placeholder="请输入用户名"  ></a-input>
        </a-form-model-item>
    </a-col>
    <a-col :span="24">
        <a-form-model-item label="用户昵称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="nickname">
              <a-input :maxLength="60"  style="width:100%"  v-model="model.nickname" placeholder="请输入用户昵称"  ></a-input>
        </a-form-model-item>
    </a-col>
<!--    <a-col :span="24">
        <a-form-model-item label="用户头像" :labelCol="labelCol"  :wrapperCol="wrapperCol" prop="avatar">
              <s-image-upload info="用户头像" :disabled="true" class="avatar-uploader" text="上传" v-model="model.avatar"></s-image-upload>
        </a-form-model-item>
    </a-col>-->
    <a-col :span="24">
        <a-form-model-item label="用户手机号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="phone">
              <a-input :maxLength="16"  style="width:100%"  v-model="model.phone" placeholder="请输入用户手机号"  ></a-input>
        </a-form-model-item>
    </a-col>
<!--    <a-col :span="24">
        <a-form-model-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="sex">
              <j-dict-select-tag type="list" datasource="runplan" v-model="model.sex" dictCode="sex" placeholder="请输入性别"/>
        </a-form-model-item>
    </a-col>
    <a-col :span="24">
        <a-form-model-item label="手机区域号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="phoneCode">
              <a-input :maxLength="6"  style="width:100%"  v-model="model.phoneCode" placeholder="请输入手机区域号"  ></a-input>
        </a-form-model-item>
    </a-col>-->
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
    name: 'UcUserForm',
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
          add: "/manager/uc/user/add",
          edit: "/manager/uc/user/edit",
          queryById: "/manager/uc/user/queryById"
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
