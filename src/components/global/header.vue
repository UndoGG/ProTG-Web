<!--suppress ALL -->
<script>
import '@/styles/global/header/mobile.css';
import '@/styles/global/header/max.css';
import '@/styles/general.css';
import {openLink} from "@/scripts/links.js";
import HeaderMobile from "@/components/global/header-mobile.vue";
import {loadAuthCookies} from "@/scripts/auth.js";
import {request} from "@/scripts/requests.js";
import {deleteCookie, readCookie, setCookie} from "@/scripts/cookie.js";

export default {
  name: 'Header',
  data() {
    return {
      auth: null,
      isAuthenticated: false
    };
  },
  components: {
    HeaderMobile
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
  methods: {
    redirect(link) {
      openLink(link, false)
    },
    show() {
      let headerElement = document.getElementById('header-mobile')
      headerElement.style.display = 'block'
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
  <HeaderMobile></HeaderMobile>
  <div class="header">
    <div class="header-main">
      <div class="logo-container" @click="redirect('/')">
        <div class="logo"></div>
      </div>
      <div class="headings">
        <div class="heading">
          <div class="heading-text" @click="redirect('/prices')">Цены</div>
        </div>
        <div class="heading">
          <div class="heading-text" @click="redirect('/faq')">Как пользоваться сервисом</div>
        </div>
        <div class="heading" v-if="info.is_superuser">
          <div class="link" @click="open('/admin')" style="color: #dd5555;">Администрирование</div>
        </div>
      </div>
      <div v-if="this.isAuthenticated" class="auth-container">
        <div class="button" @click="redirect('panel')">Личный кабинет</div>
      </div>
      <div v-else class="auth-container">
        <div class="button" @click="redirect('login')">Войти</div>
        <div class="button-reverse" @click="redirect('registration')">Регистрация</div>
      </div>
    </div>
  </div>

  <div class="header-mobile-head">
    <div class="header-mobile-main">
      <div class="logo-container" @click="redirect('/')">
        <img alt="logo" src="/assets/icons/logo.png">
      </div>
      <div class="menu-container" @click="show()">
        <img alt="menu" src="/assets/icons/menu.png">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
