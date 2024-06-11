<template>

  <iframe :id="id" :src="url" frameborder="0" width="100%" height="800px" scrolling="auto"></iframe>

</template>

<script>
import Vue from 'vue'
import {CACHE_KEY_ACCESS_TOKEN} from "@/store/mutation-types"

export default {
  name: "NewPageView",
  data() {
    return {
      url: "",
      id: "",
      from: null
    }
  },
  created() {
    this.goUrl()
  },
  updated() {
    console.log('------------url:updated------------')
    this.goUrl()
  },
  watch: {
    $route(to, from) {
      console.log('----------id:', this.id)
      if (this.id && this.id !== to.path) return;
      this.from = from
      this.goUrl();
    }
  },
  methods: {
    goUrl() {
      let component = this.$route.meta.component;
      let url = this.$route.meta.url
      let id = this.$route.path
      console.log("------url------" + url)
      if (url) {
        this.id = id
        /*update_begin author:wuxianquan date:20190908 for:判断打开方式，新窗口打开时this.$route.meta.internalOrExternal==true */
        if (this.$route.meta.internalOrExternal) {
          let _from = this.from
          if (_from && _from.path == id) _from = {}
          this.$closePage(this.$route, _from);
          //外部url加入token
          let tokenStr = "${token}";
          if (url.indexOf(tokenStr) != -1) {
            let token = Vue.ls.get(CACHE_KEY_ACCESS_TOKEN);
            url = url.replace(tokenStr, token);
          }
          window.open(url);
          return;
        }
        this.url = url;
        /*update_end author:wuxianquan date:20190908 for:判断打开方式，新窗口打开时this.$route.meta.internalOrExternal==true */
      }
    }
  }
}
</script>

<style>
</style>
