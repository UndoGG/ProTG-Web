<!--suppress ALL -->
<script>
import '@/styles/panel/sideMenu/max.css';
import '@/styles/panel/sideMenu/mobile.css';
import '@/styles/general.css';
import {openLink} from "@/scripts/links.js";

export default {
  data() {
    return {};
  },
  components: {
  },
  computed: {},
  methods: {
    open(link) {
      openLink(link, false)
    }
  }
};
</script>

<template>
  <div class="mobile-side-menu">
    <div class="section">
      <div class="title">Продвижение</div>
      <div class="pages-container">
        <div class="page" @click="open('/panel')">Инвайт</div>
      </div>
    </div>
    <div class="section">
      <div class="title">Утилиты</div>
      <div class="pages-container">
        <div class="page" @click="open('/panel/auditory')">Сбор аудитории</div>
        <div class="page" @click="open('/panel/files')">Операции с файлами</div>
      </div>
    </div>
    <div class="section">
      <div class="title">Ваш аккаунт</div>
      <div class="pages-container">
        <div class="page" @click="open('/faq')">FAQ</div>
        <div class="page" @click="open('/panel/deposit')">Пополнить баланс</div>
<!--        <div class="page" @click="open('/panel/partnership')">Партнёрская программа</div>-->
        <div class="page" @click="open('/panel/guidance')">Обучение</div>
        <div class="page" @click="open('/panel/dispatch')">Рассылка</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
