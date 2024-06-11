<template>
  <a-spin :spinning="confirmLoading">
    <s-form-container :disabled="formDisabled" class="form-item-small">
      <a-form-model ref="form" :model="model" :rules="rules" slot="detail">
        <a-form-model-item v-if="formDisabled" label="课程id" :disabled="formDisabled" :labelCol="labelCol"
                           :wrapperCol="wrapperCol" prop="title">
          <a-input :maxLength="255" v-model="model.id" placeholder="课程id"></a-input>
        </a-form-model-item>

        <a-form-model-item label="课程名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="name">
          <a-input :maxLength="255" v-model="model.name" placeholder="请输入课程名称"></a-input>
        </a-form-model-item>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="开始时间" :labelCol="labelCol2" :wrapperCol="wrapperCol2" prop="startTime">
              <s-date v-model="model.startTime" :show-time="true" date-format="YYYY-MM-DD HH:mm"
                      placeholder="请选择日期时间"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="结束时间" :labelCol="labelCol2" :wrapperCol="wrapperCol2" prop="endTime">
              <s-date v-model="model.endTime" :show-time="true" date-format="YYYY-MM-DD HH:mm"
                      placeholder="请选择日期时间"/>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="报名开始时间" :labelCol="labelCol2" :wrapperCol="wrapperCol2" prop="signUpStartTime">
              <s-date v-model="model.signUpStartTime" :show-time="true" date-format="YYYY-MM-DD HH:mm"
                      placeholder="请选择日期时间"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="报名结束时间" :labelCol="labelCol2" :wrapperCol="wrapperCol2" prop="signUpEndTime">
              <s-date v-model="model.signUpEndTime" :show-time="true" date-format="YYYY-MM-DD HH:mm"
                      placeholder="请选择日期时间"/>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-model-item label="会议信息" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="meetingInfo">
              <a-textarea :maxLength="1024" v-model="model.meetingInfo" rows="4" placeholder="请输入会议信息"/>
            </a-form-model-item>
          </a-col>
        </a-row>


        <a-form-model-item label="课程介绍" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="introduce">
          <editor v-if="showEditor" v-model="model.introduce" :height="400"></editor>
        </a-form-model-item>

        <a-col :span="24">
          <a-form-model-item label="附件" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-upload
                list-type="picture"
                class="upload-list-inline"
                multiple="multiple"
                :fileList="fileList"
                :beforeUpload="beforeUpload"
                :remove="remove"
                :customRequest="upload"
            >
              <a-button>
                <a-icon type="upload"/>
                上传附件
              </a-button>
              大小不超过10M
            </a-upload>
          </a-form-model-item>
        </a-col>

      </a-form-model>
    </s-form-container>
  </a-spin>
</template>

<script>

import {httpAction} from '@/api/manage'
import Editor from '@/components/editor/Editor';
import moment from "moment";
import {uploadFile} from "@/utils/upload";

export default {
  name: 'GlsLessonForm',
  components: {
    Editor,
  },
  props: {
    //表单禁用
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      model: {
        introduce: ''
      },
      labelCol: {
        xs: {span: 24},
        sm: {span: 3},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 21},
      },


      labelCol2: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol2: {
        xs: {span: 24},
        sm: {span: 18},
      },

      confirmLoading: false,
      baseURL: process.env.VUE_APP_API_URL,
      url: {
        add: "/manager/gls/lesson/add",
        edit: "/manager/gls/lesson/edit",
        queryById: "/manager/gls/lesson/queryById"
      },
      rules: {},

      showEditor: false,

      fileList: [],
      maxSize: 10,
    }
  },
  computed: {
    formDisabled() {
      return this.disabled
    },
  },
  created() {
    //备份model原始值
    this.modelDefault = JSON.parse(JSON.stringify(this.model));
  },
  methods: {
    add() {
      this.edit(this.modelDefault);

      setTimeout(() => {
        this.showEditor = true;
      }, 10)
    },
    edit(record) {
      this.model = Object.assign({}, record);
      if (record.id) {
        httpAction(this.url.queryById + "?id=" + record.id, {id: record.id}, 'get').then((res) => {
          let m = res.result;

          console.log('initFileList')

          this.initFileList(m.attachments);

          this.model = m;
        }).finally(() => {
          this.confirmLoading = false;
        })
      }
      this.visible = true;

      setTimeout(() => {
        this.showEditor = true;
      }, 10)
    },
    submitForm() {
      const that = this;
      // 触发表单验证
      this.$refs.form.validate(valid => {
        if (valid) {
          that.confirmLoading = true;
          let httpurl = '';
          let method = '';
          if (!this.model.id) {
            httpurl += this.url.add;
            method = 'post';
          } else {
            httpurl += this.url.edit;
            method = 'put';
          }


          let sDate = this.model.startTime;
          let eDate = this.model.endTime;
          let ssuDate = this.model.signUpStartTime;
          let esuDate = this.model.signUpEndTime;

          let params = JSON.parse(JSON.stringify(this.model))

          if (sDate) params.startTime = moment(sDate).format('YYYY-MM-DD HH:mm:00')
          if (eDate) params.endTime = moment(eDate).format('YYYY-MM-DD HH:mm:00')
          if (ssuDate) params.signUpStartTime = moment(ssuDate).format('YYYY-MM-DD HH:mm:00')
          if (esuDate) params.signUpEndTime = moment(esuDate).format('YYYY-MM-DD HH:mm:00')

          let files = [];

          for (let i = 0; i < this.fileList.length; i++) {
            const f = this.fileList[i];
            f.status === 'done' && files.push({id: f.uid})
          }


          params.attachments = files;

          httpAction(httpurl, params, method).then((res) => {
            if (!res.success) throw res;
            that.$message.success(res.message);
            that.$emit('ok', true);
          }).catch(res => {
            that.$message.error(res.message);
            that.$emit('ok', false);
          }).finally(() => {
            that.confirmLoading = false;
          })
        }
      })
    },


    initFileList(files) {
      if (!files || files.length == 0) {
        this.fileList = [];
        return;
      }

      let fileList = [];
      for (var a = 0; a < files.length; a++) {
        let file = files[a];
        fileList.push({
          uid: file.id,
          name: file.fileName,
          status: 'done',
          url: file.path,
          response: '',
        })
      }
      this.fileList = fileList
    },

    beforeUpload(file) {
      let size = file.size;
      if (size > this.maxSize * 1024 * 1024) {
        this.$message.error(`文件不能大于${this.maxSize}M`);
        return false;
      }
    },

    remove(file) {
      let uid = file.uid;
      let imgs = this.fileList;
      let index = imgs.findIndex(f => f.uid === uid);
      imgs.splice(index, 1)

      this.fileList = imgs;
    },

    upload(params) {
      let file = params.file;
      let uid = file.uid;
      let fileList = this.fileList;

      const item = {
        uid: file.uid,
        name: file.name,
        status: "uploading",
        response: "",
        url: "",
      };

      fileList.push(item)

      const progress = (p) => {
        item.percent = p;
      }

      if (item) {
        uploadFile(file, 0, progress, 1).then(res => {
          item.url = res.url;
          item.uid = res.id;
          item.status = 'done'
          console.log('ddd')
        }).catch(e => {
          console.error(e)
          item.status = 'error'
        })
      }
    },
  }
}
</script>

<style lang="less">
.form-item-small {
  .avatar {
    .img {
      line-height: 0;
    }
  }

  .ant-upload-list-item {
    height: 36px;

    .ant-upload-list-item-thumbnail {
      top: 8px;
      left: 8px;
      width: 20px;
      height: 20px;
      font-size: 16px;
      line-height: 0px;
      display: none;

      .ant-upload-list-item-icon {
        font-size: 20px;
      }
    }

    .ant-upload-list-item-name {
      line-height: 20px;
      /*padding-left: 22px;*/
      padding-left: 0;
    }

    .ant-upload-list-item-card-actions {
      top: 10px;
    }
  }
}
</style>

<style lang="less" scoped>
.form-item-small {
  overflow-y: auto;
  max-height: calc(100vh - 200px);

  .file-upload {
    display: none !important;
    opacity: 0;
  }

  .video-wrap {
    display: flex;
    align-items: center;
    margin-top: 4px;

    .icon {
      margin-left: 5px;
    }
  }
}
</style>
