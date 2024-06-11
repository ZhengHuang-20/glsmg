<template>
  <div class="img">
    <a-upload
        listType="picture-card"
        :multiple="multiple"
        :fileList="fileList"
        :beforeUpload="beforeUpload"
        :disabled="disabled"
        :showUploadList="true"
        :accept="accept"

        :customRequest="upload"
        :remove="remove"

        @preview="handlePreview"
        class="imgupload">
      <div class="wrap" v-if="fileList.length<number">
        <a-icon type="plus"/>
        {{ text }}
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel()">
      <img alt="example" style="width: 100%" :src="previewImage"/>
    </a-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import {CACHE_KEY_ACCESS_TOKEN} from "@/store/mutation-types"
import {getFileAccessHttpUrl} from '@/api/manage'
import {uploadFile} from "@/utils/upload";

const uidGenerator = () => {
  return '-' + parseInt(Math.random() * 10000 + 1, 10);
}
const getFileName = (path) => {
  if (path.lastIndexOf("\\") >= 0) {
    let reg = new RegExp("\\\\", "g");
    path = path.replace(reg, "/");
  }
  return path.substring(path.lastIndexOf("/") + 1);
}
export default {
  name: 'SImageUpload',
  data() {
    return {
      fileList: [],
      images: null,
      previewImage: "",
      previewVisible: false,

      valType: 1,// 1是数组，0是字符串
    }
  },
  props: {
    text: {
      type: String,
      required: false,
      default: "上传"
    },
    /*这个属性用于控制文件上传的业务路径*/
    /*bizPath: {
      type: String,
      required: false,
      default: "temp"
    },*/
    value: {
      type: [String, Array],
      required: false
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    number: {
      type: Number,
      required: false,
      default: 1
    },
    maxSize: {
      type: Number,
      default: 5
    }
  },
  watch: {
    value: {
      handler(val, oldValue) {
        if (val instanceof Array) {
          this.valType = 1;

          let s = val.join(',');
          let images = this.images;
          if (images === null) images = ''
          else images = images.join(',')
          if (s === images) return;

          this.initFileList(s)
        } else {
          this.valType = 0;

          if (val === this.images) return;
          this.initFileList(val)
        }
      },
      //立刻执行handler
      immediate: true
    }
  },
  created() {
  },
  methods: {
    initFileList(paths) {
      if (!paths || paths.length == 0) {
        this.fileList = [];
        return;
      }

      let fileList = [];
      let arr = paths.split(",")
      for (var a = 0; a < arr.length; a++) {
        let url = getFileAccessHttpUrl(arr[a]);
        fileList.push({
          uid: uidGenerator(),
          name: getFileName(arr[a]),
          status: 'done',
          url: url,
          response: {
            status: "history",
            message: arr[a]
          }
        })
      }
      this.fileList = fileList
    },
    beforeUpload: function (file) {
      let size = file.size;
      if (size > this.maxSize * 1024 * 1024) {
        this.$message.error(`图片不能大于${this.maxSize}MB`);
        return false;
      }
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
        uploadFile(file, 0, progress).then(res => {
          item.url = res.url;
          item.status = 'done'

          this.emitImage();

        }).catch(e => {
          item.status = 'error'
        })
      }
    },

    remove(file) {
      let url = file.url;

      if (url) {
        let imgs = this.fileList;
        let index = imgs.findIndex(f => f.url === url);
        if (index > -1) {
          imgs.splice(index, 1)

          this.fileList = imgs;

          this.emitImage();
        }
      }
    },

    emitImage() {
      let urls = []
      this.fileList.forEach(f => {
        if (f.status === 'done') urls.push(f.url);
      })
      if (this.valType === 0) {
        this.images = urls.join(',')
      } else {
        this.images = urls;
      }
      this.$emit('change', this.images);
    },

    // 预览
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    getAvatarView() {
      if (this.fileList.length > 0) {
        let url = this.fileList[0].url
        return getFileAccessHttpUrl(url)
      }
    },

    handleCancel() {
      this.close();
      this.previewVisible = false;
    },
    close() {

    },
  },
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>

<style lang="less" scoped>
/* update--begin--autor:lvdandan-----date:20201016------for：s-image-upload图片组件单张图片详情回显空白
* https://github.com/zhangdaiscott/sbc-boot/issues/1810
* https://github.com/zhangdaiscott/sbc-boot/issues/1779
*/
/deep/ .imgupload .ant-upload-select {
  display: block
}

.imgupload {
  /deep/ .ant-upload-list-item, /deep/ .ant-upload-list-picture-card-container, /deep/ .ant-upload-select-picture-card {
    width: 80px;
    height: 80px;
  }
}

/deep/ .imgupload .iconp {
  display: flex;
  flex-direction: column;

  width: 80px;
  height: 80px;
}

.wrap {
  display: flex;
  flex-direction: column;
}

/deep/ .imgupload .ant-upload {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* update--end--autor:lvdandan-----date:20201016------for：s-image-upload图片组件单张图片详情回显空白*/
</style>
