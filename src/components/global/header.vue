<!--suppress ALL -->
<script>
import '@/styles/global/header/mobile.css';
import '@/styles/global/header/max.css';
import '@/styles/general.css';
import {openLink} from "@/scripts/links.js";
import HeaderMobile from "@/components/global/header-mobile.vue";

export default {
  name: 'Header',
  data() {
    return {};
  },
  components: {
    HeaderMobile
  },
  computed: {
  },
  methods: {
    redirect(link) {
      openLink(link, false)
    },
    show() {
      let headerElement = document.getElementById('header-mobile')
      headerElement.style.display = 'block'
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
      </div>
      <div class="auth-container">
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
