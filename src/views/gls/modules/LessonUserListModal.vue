<template>
  <j-modal
      :title="title"
      :width="width"
      :visible="visible"
      switchFullscreen
      :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
      :dialogStyle="{top:'0px'}"
      @cancel="handleCancel"
      :footer="null"
      cancelText="关闭">
    <lesson-user-list v-if="visible" :lesson-id="lessonId" :title="title"></lesson-user-list>
  </j-modal>
</template>

<script>
import LessonUserList from './LessonUserList'

export default {
  name: 'LessonUserModal',
  components: {
    LessonUserList
  },
  data() {
    return {
      title: '',
      width: 800,
      visible: false,
      disableSubmit: false,
      lessonId: '',
    }
  },
  methods: {
    close() {
      this.visible = false;
    },
    show(record) {
      this.title = record.name + '--报名列表';
      this.lessonId = record.id;
      this.visible = true
    },
    handleCancel() {
      this.close()
    }
  }
}
</script>
