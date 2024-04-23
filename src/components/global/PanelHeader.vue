<!--suppress ALL -->
<script>
import '@/styles/global/PanelHeader/max.css';
import '@/styles/global/PanelHeader/mobile.css';
import '@/styles/general.css';
import {openLink} from "@/scripts/links.js";
import PanelHeaderMobile from "@/components/global/PanelHeaderMobile.vue";
import {deleteCookie, readCookie, setCookie} from "@/scripts/cookie.js";


export default {
  name: 'PanelHeader',
  data() {
    return {};
  },
  computed: {
    info() {
      let lastUsername = readCookie('username')
      if (this.$store.state.userInfo == null) {
        return {'username': lastUsername}
      }

      if (this.$store.state.userInfo.username !== lastUsername) {
        setCookie('username', this.$store.state.userInfo.username)
      }

      return this.$store.state.userInfo
    }
  },
  components: {PanelHeaderMobile},
  methods: {
    open(link) {
      openLink(link, false);
    },
    logout() {
      deleteCookie('auth')
      this.open('/')
    },
    show() {
      let headerElement = document.getElementById('header-mobile')
      headerElement.style.display = 'block'
    }
  }
};
</script>

<template>
  <PanelHeaderMobile></PanelHeaderMobile>
  <div class="panel-header">
    <div class="logo-section">
        <img alt="logo" @click="open('/')" src="/assets/icons/logo.png">
    </div>
    <div class="info-section">
      <div class="link" @click="open('/prices')">Цены</div>
      <div class="link" @click="open('/faq')">Как пользоваться сервисом</div>
    </div>
    <div class="user-section">
      <div class="user">
        <div class="avatar-container">
          <img alt="avatar" src="/assets/icons/avatar.png">
        </div>
        <div class="user-info-container">
          <div class="username">{{info.username}}</div>
          <div class="balance">Баланс счёта 0 ₽</div>
        </div>
      </div>
<!--      <div class="pay-container">-->
<!--        <div class="pay-button">Оформить подписку</div>-->
<!--      </div>-->
      <div class="logout-container">
        <div class="logout-button" @click="logout">Выйти</div>
      </div>
    </div>

    <div class="panel-menu-container" @click="show()">
        <img alt="menu" src="/assets/icons/menu.png">
      </div>
  </div>
</template>

<style scoped>

</style>
