<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    switchFullscreen
    @ok="handleOk"
    :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
    @cancel="handleCancel"
    :dialogStyle="{top:'0px'}"
    cancelText="关闭">
    <template slot="footer">
      <a-button key="cancel" @click="handleCancel">
        关闭
      </a-button>
      <a-button v-if="!disableSubmit" key="save" type="primary" :loading="loading" @click="handleOk()">
        保存
      </a-button>
    </template>

    <lesson-form ref="realForm" @ok="submitCallback" :disabled="disableSubmit"></lesson-form>
  </j-modal>
</template>

<script>
  import LessonForm from './LessonForm'
  export default {
    name: 'LessonModal',
    components: {
      LessonForm
    },
    data() {
      return {
        title: '',
        width: 1000,
        visible: false,
        disableSubmit: false,
        loading: false,
      }
    },
    methods: {
      add() {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.realForm.add();
        })
      },
      edit(record) {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.realForm.edit(record);
        })
      },
      close() {
        this.$emit('close');
        this.visible = false;
        this.loading = false;
      },
      handleOk() {
        if (this.loading) return;
        this.loading = true;
        this.$refs.realForm.submitForm();
      },
      submitCallback(success) {
        this.loading = false;
        if (success) {
          this.$emit('ok');
          this.visible = false;
        }
      },
      submitValidCallback(valid) {
      },
      handleCancel() {
        this.loading = false;
        this.close()
      }
    }
  }
</script>
