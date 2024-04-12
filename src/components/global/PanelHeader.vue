<!--suppress ALL -->
<script>
import '@/styles/global/PanelHeader/max.css';
import '@/styles/global/PanelHeader/mobile.css';
import '@/styles/general.css';
import {openLink} from "@/scripts/links.js";
import PanelHeaderMobile from "@/components/global/PanelHeaderMobile.vue";

export default {
  name: 'PanelHeader',
  data() {
    return {};
  },
  components: {PanelHeaderMobile},
  methods: {
    open(link) {
      openLink(link, false);
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
          <div class="username">Username</div>
          <div class="balance">Баланс счёта 0 ₽</div>
        </div>
      </div>
      <div class="pay-container">
        <div class="pay-button">Оформить подписку</div>
      </div>
      <div class="logout-container">
        <div class="logout-button" @click="open('/')">Выйти</div>
      </div>
    </div>

    <div class="panel-menu-container" @click="show()">
        <img alt="menu" src="/assets/icons/menu.png">
      </div>
  </div>
</template>

<style scoped>

</style>
