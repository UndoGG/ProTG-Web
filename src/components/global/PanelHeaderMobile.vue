<!--suppress ALL -->
<script>
import '@/styles/global/PanelHeader/mobile.css';
import '@/styles/global/PanelHeader/PanelHeaderMobile.css';
import '@/styles/general.css';
import {openLink} from "@/scripts/links.js";

export default {
  name: 'PanelHeaderMobile',
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
      <div class="link" @click="redirect('/panel')">Перейти в кабинет</div>
    </div>

    <div class="auth-container">
<!--      <div class="button-reverse">Оформить подписку</div>-->

      <div class="user">
        <div class="user-info-container">
          <div class="username">Username</div>
          <div class="balance">Баланс счёта 0 ₽</div>
        </div>
      </div>

      <div class="button-reverse" @click="redirect('/')">Выйти</div>
    </div>
  </div>
</template>

<style scoped>

</style>
