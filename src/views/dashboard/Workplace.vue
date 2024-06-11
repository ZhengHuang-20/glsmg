<template>
  <div class="workplace" :style="['color:red;']" @click="log">
    后台管理系统
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  components: {},
  name: 'Workplace',
  comments: {},
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
  created() {
    // this.init();
  },
  methods: {
    init() {
      // this.$router.push({path: 'apps'});
    },
    log() {
    },
  }
}
</script>

<style scoped lang="less">
.workplace {
  margin-top: 200px;
  font-size: 18px;
  text-align: center;
}
</style>

<style scoped lang="less">
.form {
  position: relative;
  background: #FFFFFF;

  .f-num-move {
    position: absolute;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 10px;
    background: rgba(221, 0, 0, 0.99);
    color: #fff;
    cursor: move;
    z-index: 1;
  }

  .f-delete {
    position: absolute;
    right: 0;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    cursor: pointer;
    color: rgba(221, 0, 0, 0.99);
    z-index: 1;
  }
}

.form2 {
  background: #f9f9f9;
}
</style>
