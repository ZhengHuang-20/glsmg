<template>
  <exception-page :home-route="index" :style="`min-height: ${minHeight}`" type="403" />
</template>

<script>
import ExceptionPage from '@/components/exception/ExceptionPage'
import {mapState} from 'vuex'
import {INDEX_MAIN_PAGE_PATH} from "@/store/mutation-types";
export default {
  name: 'Exp403',
  components: {ExceptionPage},
  data() {
    return {
      index: INDEX_MAIN_PAGE_PATH
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
    minHeight() {
      return this.pageMinHeight ? this.pageMinHeight + 'px' : '100vh'
    }
  }
}
</script>

<style scoped lang="less">
</style>
