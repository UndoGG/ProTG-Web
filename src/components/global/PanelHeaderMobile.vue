<!--suppress ALL -->
<script>
import '@/styles/global/PanelHeader/mobile.css';
import '@/styles/global/PanelHeader/PanelHeaderMobile.css';
import '@/styles/general.css';
import {openLink} from "@/scripts/links.js";
import {readCookie, setCookie} from "@/scripts/cookie.js";

export default {
  name: 'PanelHeaderMobile',
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
    }},
  methods: {
    remove() {
      let headerElement = document.getElementById('header-mobile')
      headerElement.style.display = 'none'
    },
    redirect(link) {
      openLink(link, false)
    }
  }
};
</script>

<template>
  <div class="panel-header-mobile" id="header-mobile">
    <div class="head">
      <div class="logo" @click="redirect('/')">
        <img src="/assets/icons/logo.png" alt="logo">
      </div>
      <div class="exit-container">
        <img alt="exit" src="/assets/icons/exit.png" class="exit" @click="remove()">
      </div>
    </div>

    <div class="headings">
      <div class="link" @click="redirect('/prices')">Цены</div>
      <div class="link" @click="redirect('/faq')">Как пользоваться сервисом</div>
      <div class="link" v-if="info.is_superuser" @click="redirect('/admin')" style="color: #dd5555;">Администрирование</div>
    </div>

    <div class="auth-container">
<!--      <div class="button-reverse">Оформить подписку</div>-->

      <div class="user">
        <div class="user-info-container">
          <div class="username">{{info.username}}</div>
          <div class="balance">Баланс счёта {{info.balance}}₽</div>
        </div>
      </div>

      <div class="button-reverse" @click="redirect('/')">Выйти</div>
    </div>
  </div>
</template>

<style scoped>

</style>
