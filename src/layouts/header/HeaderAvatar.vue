<template>
  <div>
    <a-dropdown>
      <div class="header-avatar" style="cursor: pointer">
        <a-avatar shape="square" class="avatar" icon="user"/>
        <span class="name">{{ user.username }}</span>
      </div>
      <a-menu :class="['avatar-menu']" slot="overlay">
        <!--      <a-menu-item>
                <router-link :to="{ path: '/account/center' }">
                    <a-icon type="user"/>
                    <span>个人中心</span>
                </router-link>
              </a-menu-item>-->
        <!--      <a-menu-item>
                <router-link :to="{ path: '/account/settings/BaseSetting' }">
                    <a-icon type="setting"/>
                    <span>账户设置</span>
                </router-link>
              </a-menu-item>-->
        <!--      <a-menu-divider />-->
        <a-menu-item @click="changePwd">
          <a-icon style="margin-right: 8px;" type="compass"/>
          <span>修改密码</span>
        </a-menu-item>
        <a-menu-item @click="logout">
          <a-icon style="margin-right: 8px;" type="poweroff"/>
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <user-password-modal ref="passwordmodal" @ok="()=>{}"></user-password-modal>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {logout} from '@/services/user'


import UserPasswordModal from '../../views/system/modules/UserPasswordModal'

export default {
  name: 'HeaderAvatar',
  components: {
    UserPasswordModal
  },
  computed: {
    ...mapGetters('account', ['user']),
  },
  methods: {
    logout() {
      console.log('----logout')
      logout()
      this.$router.push({path: '/login'});
    },
    changePwd() {
      console.log('aaaaa')
      this.$refs.passwordmodal.show();
    }
  }
}
</script>

<style lang="less" scoped>
.header-avatar {
  display: initial;

  .avatar, .name {
    align-self: center;
  }

  .avatar {
    margin-right: 8px;
    border-radius: 50%;
  }
}

.avatar-menu {
  width: 150px;
}

</style>
