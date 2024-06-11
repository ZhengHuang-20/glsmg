<template>
  <div>
    <vue-ueditor-wrap
      v-model="message"
      :config="myConfig"
      @ready="ready"
      :destroy="true"
      @beforeInit="addCustomButtom"
    />
    <input type="file" style="display: none;" ref="e_upload"
           @change="imgChange"
    >
  </div>
</template>
<script>
  import VueUeditorWrap from 'vue-ueditor-wrap'
  import {uploadFile} from "../../utils/upload";
  import {imageSize} from '../../utils/util'



  export default {
    name: "UEditorShow",
    components: {
      VueUeditorWrap
    },
    props: {
      contentInfo: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        message: '',
        // 简单配置
        myConfig: {
                // serverUrl: `${__GATEWAYPATH__}/ueditor/ueditorConfig`, // 上传功能的后端服务器接口地址
                UEDITOR_HOME_URL: '/ueditor/', // 你的UEditor资源存放的路径,相对于打包后的index.html
                autoHeightEnabled: true, // 编辑器是否自动被内容撑高
                autoFloatEnabled: false, // 工具栏是否可以浮动
                initialFrameHeight: 340, // 初始容器高度
                initialFrameWidth: '100%', // 初始容器高度
                enableAutoSave: true // 关闭自动保存
        },
        editor: undefined
      };
    },
    mounted() {
      // 这里是从列表页编辑时做的内容注入，没有需要可以不写
      this.message = this.contentInfo;
    },
    methods: {
      ready(editorInstance) {
        // 这里可以拿到ueditor的实例，比如editorInstance.getContent()就可以拿到编辑器的html内容
        //this.evtHub.emit('editor.data', editorInstance);
        editorInstance.addListener('afterAutoSave', () => {
          this.message = editorInstance.getContent()
          this.$emit('listentochildEvent', this.message)
        })
        this.editor = editorInstance;
        console.log(88888)
      },
      imgChange(e) {
        console.log(e)
        let that = this;
        let target = e.target;
        //target.value = '';
        let file = target.files[0];
        uploadFile(file, 1).then(res => {
          //that.editor.insertEmbed(length, 'image', imageSize.format(url, imageSize.style.w640))
          that.editor.execCommand('inserthtml', `<img src="${imageSize.format(res.url, imageSize.style.w800)}">`)
        }).catch((e) => {
          that.$message.error('上传图片失败，请稍后再试！');
        }).finally(() => {
          target.value = '';
        })
      },
      addCustomButtom(editorId) {
        let _this = this;
        window.UE.registerUI('c-simpleupload', function (editor, uiName) {
          // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
          editor.registerCommand(uiName, {
            execCommand: () => {
              _this.imageList = [];
              _this.dialogVisible = true;
              _this.editorHandler = editor;
              //editor.execCommand('inserthtml', `<span>这是一段由自定义按钮添加的文字</span>`)
              _this.$refs.e_upload.click()
            }
          })

          // 创建一个 button
          var btn = new window.UE.ui.Button({
            className: 'edui-for-simpleupload',
            // 按钮的名字
            name: uiName,
            // 提示
            title: '上传图片1',
            // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
            cssRules: "background-position: -380px 0;",
            // 点击时执行的命令
            onclick: function () {
              // 这里可以不用执行命令，做你自己的操作也可
              editor.execCommand(uiName)

              console.log('上传图片.....')
            }
          })

          // 当点到编辑内容上时，按钮要做的状态反射
          editor.addListener('selectionchange', function () {
            var state = editor.queryCommandState(uiName)
            if (state === -1) {
              btn.setDisabled(true)
              btn.setChecked(false)
            } else {
              btn.setDisabled(false)
              btn.setChecked(state)
            }
          })

          // 因为你是添加 button，所以需要返回这个 button
          return btn
        }, 47 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
      }
    },
    watch: {
      contentInfo(newValue, oldValue) {
        this.message = newValue
      },
      message(newValue, oldValue) {
        this.$emit('setmess', newValue)
      },
    },
  };
</script>
<style scoped>

</style>
