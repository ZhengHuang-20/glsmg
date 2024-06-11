<template>
  <a-modal
      class="picPreview"
      :title="title"
      :visible="imgListShow"
      width="900px"
      @cancel="close()"
      :bodyStyle="moduleCenter"
  >
    <div id="test_3" @mousemove="move" @mouseup="stop" @mouseleave="mouseLeave">
      <img @mousedown="start" :src="furl" ref="singleImg" class="originStyle"/>
    </div>

    <template slot="footer">
      <div class="allImg">
        <a-button @click="handleCurrentChange(-1)" class="changeImg">
          <a-icon type="left"/>
        </a-button>
        <div class="imgbox" :class="imgList.length>6?'':'min'" ref="imgbox">
          <img
              v-for="(item,index) in imgList"
              :key="item"
              :src="item"
              :class="{ changeColor:changeColor == index}"
              @click="handlerImg(item,index)"
          />
        </div>
        <a-button @click="handleCurrentChange(1)" class="changeImg right">
          <a-icon type="left" style="transform: rotate(180deg);"/>
        </a-button>
      </div>
      <div class="ctr-box">
        <a-button @click="rotateL" title="左旋转">
          <a-icon type="redo"/>
        </a-button>
        <a-button @click="rotateR" title="右旋转">
          <a-icon type="undo"/>
        </a-button>
        <a-button @click="scale(-1)" title="缩小">
          <a-icon type="zoom-out"/>
        </a-button>
        <a-button @click="scale(1)" title="放大">
          <a-icon type="zoom-in"/>
        </a-button>
        <!-- <a-button @click="download" title="下载">
          <a-icon type="download" />
        </a-button> -->
      </div>
    </template>
  </a-modal>
</template>
<script>
export default {
  name: "PicPreview",
  data() {
    return {
      imgListShow: false,
      num: 0,
      furl: "",
      changeColor: -1,
      currentRotate: 0,
      currentScale: 1,
      canDrag: false,
      offset_x: 0,
      offset_y: 0,
      mouse_x: 0,
      mouse_y: 0,
      moduleCenter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "500px"
      },
      downUrl: ""
    };
  },
  props: {
    title: {
      //弹框名称
      type: String,
      required: false,
      default: "图片预览"
    },
    filePreviewShow: {
      //是否显示
      type: Boolean,
      default: true
    },
    imgList: {
      //图像数组
      type: Array,
      required: true,
      default: function () {
        return [];
      }
    },
    currentImg: {
      //当前图像
      type: String,
      required: false,
      default: ""
    },
    currentIndex: {
      //当前图像下标
      type: Number,
      required: false,
      default: 0
    }
  },
  watch: {
    imgList(newv) {
      this.handlerImg(newv[0], 0);
    },
    filePreviewShow(newv) {
      if (newv) {
        this.imgListShow = this.filePreviewShow;
        this.imgList = this.trimSpace(this.imgList);
        if (this.imgList.length === 0) {
          this.furl = "";
          this.changeColor = -1;
        } else {
          this.changeColor = this.currentIndex;
          if (this.currentImg) {
            this.changeColor = this.imgList.findIndex(
                a => a === this.currentImg
            );
          }
          setTimeout(() => {
            this.scrollImg(this.changeColor - 5, this.changeColor < 5);
          }, 500);
          this.furl = this.imgList[this.changeColor];
          this.handlerImg(this.furl, this.changeColor);
        }
      } else {
        this.imgListShow = this.filePreviewShow;
        this.$refs.imgbox.scrollLeft = 0;
        window.removeEventListener("mousewheel", this.handleScroll, true) ||
        window.removeEventListener("DOMMouseScroll", this.handleScroll, true);
      }
    }
  },
  mounted() {
    this.handlerImg(this.imgList[0], 0);
    setTimeout(() => {
      this.scrollImg(this.changeColor - 5, this.changeColor < 5);
    }, 500);
  },
  methods: {
    close() {
      this.imgListShow = false;
    },
    trimSpace(array) {
      for (var i = 0; i < array.length; i++) {
        if (
            array[i] == " " ||
            array[i] == null ||
            typeof array[i] == "undefined"
        ) {
          array.splice(i, 1);
          i = i - 1;
        }
      }
      return array;
    },
    //判断滚动方向
    handleScroll(e) {
      this.scale(-e.deltaY);
    },
    //点击图片显示
    handlerImg(furl, index) {
      this.currentRotate = 0;
      this.currentScale = 1;
      //this.rotateScale();
      if (this.$refs.singleImg) {
        this.$refs.singleImg.style.left = 0;
        this.$refs.singleImg.style.top = 0;
        this.$refs.singleImg.style.transform = 'initial';
      }
      this.furl = furl;
      this.changeColor = index;
      if (
          document.getElementsByClassName("originStyle") &&
          document.getElementsByClassName("originStyle")[0] &&
          document.getElementsByClassName("originStyle")[0].style
      ) {
        document.getElementsByClassName("originStyle")[0].style.position =
            "relative";
      }
    },
    handleCurrentChange(val) {
      const changeColor = this.changeColor + val;
      if (changeColor === this.imgList.length || changeColor === -1) {
        return;
      }
      this.currentRotate = 0;
      this.currentScale = 1;
      this.rotateScale();
      this.$refs.singleImg.style.left = 0;
      this.$refs.singleImg.style.top = 0;
      this.furl = this.imgList[changeColor];
      this.changeColor = changeColor;
      const noScroll =
          (val > 0 && changeColor <= 5) ||
          (val < 0 && changeColor + 1 >= this.imgList.length - 5);
      this.scrollImg(val, noScroll);
    },
    scrollImg(val, noScroll) {
      if (noScroll || !this.$refs.imgbox) {
        return;
      }
      this.$refs.imgbox.scrollLeft += 60 * val;
    },
    start(e) {
      //鼠标左键点击
      e.preventDefault && e.preventDefault(); //去掉图片拖动响应
      if (e.button == 0) {
        this.canDrag = true;
        //获取需要拖动节点的坐标
        this.offset_x = document.getElementsByClassName(
            "originStyle"
        )[0].offsetLeft; //x坐标
        this.offset_y = document.getElementsByClassName(
            "originStyle"
        )[0].offsetTop; //y坐标
        //获取当前鼠标的坐标
        this.mouse_x = e.pageX;
        this.mouse_y = e.pageY;
      }
    },
    move(e) {
      e.preventDefault && e.preventDefault();
      window.addEventListener("mousewheel", this.handleScroll, true) ||
      window.addEventListener("DOMMouseScroll", this.handleScroll, false);
      if (this.canDrag == true) {
        let _x = e.pageX - this.mouse_x;
        let _y = e.pageY - this.mouse_y;
        //设置移动后的元素坐标
        let now_x = this.offset_x + _x + "px";
        let now_y = this.offset_y + _y + "px";
        document.getElementsByClassName("originStyle")[0].style.position =
            "absolute";
        document.getElementsByClassName("originStyle")[0].style.top = now_y;
        document.getElementsByClassName("originStyle")[0].style.left = now_x;
      }
    },
    mouseLeave(e) {
      this.canDrag = false;
      window.removeEventListener("mousewheel", this.handleScroll, true) ||
      window.removeEventListener("DOMMouseScroll", this.handleScroll, true);
    },
    stop(e) {
      this.canDrag = false;
    },
    //旋转放大
    rotateScale() {
      if (!this.$refs.singleImg) {
        return;
      }
      this.$refs.singleImg.style.Transform =
          "rotate(" +
          this.currentRotate +
          "deg)" +
          "scale(" +
          this.currentScale +
          ")";
      this.$refs.singleImg.style.webkitTransform =
          "rotate(" +
          this.currentRotate +
          "deg)" +
          "scale(" +
          this.currentScale +
          ")";
      this.$refs.singleImg.style.MozTransform =
          "rotate(" +
          this.currentRotate +
          "deg)" +
          "scale(" +
          this.currentScale +
          ")";
      this.$refs.singleImg.style.msTransform =
          "rotate(" +
          this.currentRotate +
          "deg)" +
          "scale(" +
          this.currentScale +
          ")";
      this.$refs.singleImg.style.transform =
          "rotate(" +
          this.currentRotate +
          "deg)" +
          "scale(" +
          this.currentScale +
          ")";
    },
    //旋转
    rotateL() {
      this.currentRotate += 15;
      this.rotateScale();
    },
    rotateR() {
      this.currentRotate -= 15;
      this.rotateScale();
    },
    //缩放 放大
    scale(type) {
      if (type >= 0) {
        this.currentScale += 0.5;
        this.rotateScale();
      } else {
        this.currentScale -= 0.5;
        if (this.currentScale <= 0.5) {
          this.currentScale = 0.5;
          this.rotateScale();
        } else {
          this.rotateScale();
        }
      }
    },
    downloadIamge(imgsrc, name) {
      //下载图片地址和图片名
      var image = new Image();
      // 解决跨域 Canvas 污染问题
      image.src = imgsrc + "?v=" + Math.random(); // 处理缓存
      image.crossOrigin = "*"; // 支持跨域图片
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "img"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
    },
    download() {
      this.downloadIamge(this.furl, new Date().getTime());
    }
  }
};
</script>
<style lang="less" scoped>
.picPreview {
  /deep/ .ant-modal-footer {
    border-top: 0;

    .allImg {
      width: 100%;
      height: 60px;
      margin-bottom: 10px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      .changeImg {
        height: 100%;
        width: 50px;
        cursor: pointer;
        padding: 0;
        border: 0;

        i {
          font-size: 60px;
        }

        &.right {
          i {
            bottom: 2px;
            right: 7px;
            position: relative;
          }
        }
      }

      .imgbox {
        width: 370px;
        height: 100%;
        overflow: hidden;
        margin: 0 auto;
        border: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        &.min {
          justify-content: center;
        }

        img {
          width: 50px;
          height: 50px;
          margin: 5px;
          cursor: pointer;
        }

        .changeColor {
          border: 2px solid #42b983;
        }
      }
    }

    .ctr-box {
      display: flex;
      justify-content: center;
      align-content: center;
    }
  }

  /deep/ .ant-modal-body {
    padding: 0 24px;

    .originStyle {
      // position: absolute;
      left: 0;
      top: 0;
      cursor: pointer;
      height: inherit;
      // transform-origin: 50% 50%;
    }

    #test_3 {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border: 1px solid #eeeeee;
      // overflow: scroll;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        cursor: move;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
