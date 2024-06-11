<template>
  <ckeditor :editor="editor" v-model="val" :config="editorConfig" @ready="onReady"></ckeditor>
</template>

<script>

import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from './ckeditor5'
import {uploadFile} from "@/utils/upload";

export default {
  components: {
    ckeditor: CKEditor.component
  },
  model: {
    prop: 'value',
    // 随便命名事件，对应下面$emit即可
    event: 'changeValue'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    blurHideToolbar: {
      type: Boolean,
      default: false
    },
    minHeight: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number,
      default: 0
    },
    fileType: {
      type: Number,
      default: 0
    },
    staticDomain: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      html: '',
      editor: ClassicEditor,

      editorRef: null,
      editableElem: null,
      toolbarElem: null,
      hideToolbarTimer: null,

      editorConfig: {
        placeholder: '请输入内容',
        removePlugins: ['Markdown'],
        //shouldNotGroupWhenFull: true,
        //plugins: [Video, VideoUpload],
        //extraPlugins: [Video, VideoUpload],
        mediaEmbed: {
          providers: [
            {
              name: 'myprovider',
              url: [
                /.*\.mp4/
              ],
              html: match => {
                //获取媒体url
                const input = match['input'];
                //console.log('input' + match['input']);
                return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 70%;">' +
                    `<video src="${input}" ` +
                    'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                    'frameborder="0" allowtransparency="true" allow="encrypted-media">' +
                    '</video>' +
                    '</div>'
                );
              }
            }
          ],
        },
        video: {
          upload: {
            types: ['mp4'],
            allowMultipleFiles: false,
          },
          styles: [
            'alignLeft', 'alignCenter', 'alignRight', 'full'
          ],
          // Configure the available video resize options.
          resizeOptions: [
            {
              name: 'videoResize:original',
              label: 'Original',
              icon: 'original'
            },
            {
              name: 'videoResize:50',
              label: '50',
              icon: 'medium'
            },
            {
              name: 'videoResize:75',
              label: '75',
              icon: 'large'
            }
          ],

          // You need to configure the video toolbar, too, so it shows the new style
          // buttons as well as the resize buttons.
          toolbar: [
            'videoStyle:alignLeft', 'videoStyle:alignCenter', 'videoStyle:alignRight',
            '|',
            'videoResize:50',
            'videoResize:75',
            'videoResize:original'
          ]
        },
        toolbar: {
          items: [
            'heading', // 1
            '|',
            'removeFormat',
            'bold',
            'italic',
            'strikethrough',
            'underline',
            'fontColor',
            'fontBackgroundColor',
            'fontFamily',
            'fontSize',
            'bulletedList',
            'numberedList',
            'todoList',
            'superscript',
            'subscript',
            '|',
            'horizontalLine',
            'outdent',
            'indent', //
            'alignment',
            '|',
            'link', // 1
            //'imageUpload',
            'imageInsert',
            'mediaEmbed',
            '|',
            'blockQuote', //1
            'code',
            'codeBlock',
            'insertTable',
            '|',
            'undo',
            'redo',
            '|',
            'sourceEditing'
          ],

          // 移除工具栏上的图标
          removeItems: ['fontFamily', 'videoUpload', 'sourceEditing'],
          shouldNotGroupWhenFull: true, // toolbar超过宽度时，平铺显示所有
          tabindex: -1,
        },
        heading: {
          options: [
            {model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph'},
            {model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1'},
            {model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2'},
            {model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3'},
            {model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4'},
            {model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5'},
            {model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6'}
          ]
        },
      }
    }
  },
  created() {
    this.html = this.value;
    console.log(this.editor)
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("changeValue", newValue);
      },
    }
  },
  methods: {
    editableFocusEvent() {
      this.toolbarElem.style.display = '';
    },
    editableBlurEvent() {
      this.hideToolbarTimer = setTimeout(() => {
        this.toolbarElem.style.display = 'none';
      }, 50)
    },
    toolbarClickEvent() {
      if (this.hideToolbarTimer) {
        clearTimeout(this.hideToolbarTimer)
      }
    },
    onReady(editor) {
      this.editorRef = editor;
      /// region 设置编辑器宽高
      let element = editor.ui.view.element;
      if (element) {
        let width = element.offsetWidth;
        let panel = element.querySelector('div.ck .ck-toolbar-dropdown > .ck-dropdown__panel')
        if (panel) {
          panel.style.maxWidth = `${width - 10}px`;
        }

        let editable_inline = element.querySelector('div.ck-editor__editable_inline')

        const createStyle = (css) => {
          let lab_attr_val = editor.ui.view.element.getAttribute('aria-labelledby')
          let style = document.createElement('style');
          style.innerText = `div.ck[aria-labelledby='${lab_attr_val}'] .ck-editor__editable_inline{${css}}`;
          document.getElementsByTagName('head')[0].appendChild(style)
        }

        let tbH = editor.ui.view.toolbar.element.offsetHeight;
        if (this.height) {
          //editable_inline.style.height = this.height + 'px';
          createStyle('height:' + (this.height - tbH) + 'px;')
        } else {
          let css = '';
          if (this.minHeight) {
            css += 'min-height:' + (this.minHeight - tbH) + 'px;';
          }
          if (this.maxHeight) {
            css += 'max-height:' + (this.maxHeight - tbH) + 'px;';
          }
          createStyle(css);
        }
      }
      /// endregion


      /// region 失去焦点隐藏toolbar
      if (this.blurHideToolbar) {
        // 绑定toolbar自动隐藏事件
        this.editableElem = editor.ui.view.editable.element;
        this.toolbarElem = editor.ui.view.toolbar.element;

        this.toolbarElem.style.display = 'none';

        this.editableElem.addEventListener('focus', this.editableFocusEvent, false)
        this.editableElem.addEventListener('blur', this.editableBlurEvent, false)
        this.toolbarElem.addEventListener('click', this.toolbarClickEvent, false)
      }
      /// endregion

      /// region 图片上传逻辑
      let staticDomain = this.staticDomain;
      editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return {
          upload: async () => {
            return await loader.file.then(f => {
              const F = new FileReader();
              F.readAsArrayBuffer(f);
              console.log(f)
              return new Promise(resolve => {
                F.onload = function () {
                  resolve({bufAsArray: F.result, file: f})
                };
              })
            }).then(v => {
              return uploadFile(v.file, this.fileType)
            }).then(res => {
              let url = res.url;
              if (staticDomain && url.indexOf('http') === -1) {
                url = staticDomain.replace(/\/$/, '') + (url.indexOf('/') === 0 ? url : ('/' + url));
              }
              return {
                default: url
              }
            });
          }
        }
      }
      /// endregion


      editor.model.document.on('change:data', () => {
        console.log('The data has changed!');
      });
    }
  },
  beforeDestroy() {
    // 卸载事件
    if (this.blurHideToolbar) {
      this.editableElem.removeEventListener('focus', this.editableFocusEvent);
      this.editableElem.removeEventListener('blur', this.editableBlurEvent);
      this.toolbarElem.removeEventListener('click', this.toolbarClickEvent);
    }
  }
}
</script>

<style lang="less">

.ck-editor__editable_inline {
  //min-height: 200px;
}

.ck.ck-toolbar-dropdown > .ck-dropdown__panel {

}

.ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
  /* border: var(--ck-focus-ring); */
  /* box-shadow: var(--ck-inner-shadow),0 0; */
  /* outline: none; */

  border: 1px solid var(--ck-color-base-border);
  box-shadow: none;
}

.ck .ck-heading-dropdown {
  width: 100px;

  .ck-dropdown__arrow {
    width: 28px;
  }

  .ck-dropdown__panel {
    //width: 100px;
  }
}

.ck.ck-icon {
  //font-size: 12px;
}

.ck.ck-content {
  p {
    margin-bottom: 0 !important;
    line-height: 20px;
  }
}
</style>
