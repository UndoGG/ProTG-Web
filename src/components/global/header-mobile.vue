<!--suppress ALL -->
<script>
import '@/styles/global/header/header-mobile.css';
import '@/styles/general.css';
import {openLink} from "@/scripts/links.js";
import {readCookie, setCookie} from "@/scripts/cookie.js";
import {loadAuthCookies} from "@/scripts/auth.js";
import {request} from "@/scripts/requests.js";

export default {
  name: 'HeaderMobile',
  data() {
    return {
      auth: null,
      isAuthenticated: false
    };
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
  },
  async mounted() {
    this.auth = await loadAuthCookies()
    if (this.auth == null) {
      return
    }
    else {
      this.isAuthenticated = true;
    }

    let userInfo = await request('auth/me', 'get', this.auth)
    if (userInfo.response != null) {
      deleteCookie('auth')
      this.isAuthenticated = false;
      return
    }
  }
};
</script>

<template>
  <div class="header-mobile" id="header-mobile">
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
      <div class="link" v-if="info.is_superuser" @click="open('/admin')" style="color: #dd5555;">Администрирование</div>
    </div>
    <div v-if="this.isAuthenticated" class="auth-container">
      <div class="button" @click="redirect('panel')">Личный кабинет</div>
    </div>
    <div v-else class="auth-container">
      <div class="button" @click="redirect('login')">Войти</div>
      <div class="button-reverse" @click="redirect('registration')">Регистрация</div>
    </div>
  </div>
</template>

<style scoped>

</style>
