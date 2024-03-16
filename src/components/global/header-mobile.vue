<!--suppress ALL -->
<script>
import '@/styles/global/header-mobile.css';
import '@/styles/all.css';
import {openLink} from "@/scripts/links.js";

export default {
  name: 'HeaderMobile',
  data() {
    return {};
  },
  computed: {},
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
      <div class="link">Цены</div>
      <div class="link">Как пользоваться сервисом</div>
    </div>

    <div class="auth-container">
      <div class="button" @click="redirect('login')">Войти</div>
      <div class="button-reverse" @click="redirect('registration')">Регистрация</div>
    </div>
  </div>
</template>

<style scoped>

</style>
