<template>
  <div class="">
    后台管理系统
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
  components: {  },
    name: 'Demo',
    i18n: require('./i18n'),
    comments:{},
    data() {
      return {
      }
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
      desc() {
        return this.$t('description')
      }
    },
    created(){
      // this.init();
    },
    methods:{
      init(){
        // this.$router.push({path: 'apps'});
      }
    }
  }
</script>

<style scoped lang="less">
@import "index";
.apps{
  margin-top: 0px;
}
</style>
