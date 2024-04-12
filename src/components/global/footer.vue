<!--suppress ALL -->
<script>
import '@/styles/global/footer/max.css';
import '@/styles/global/footer/mobile.css';
import '@/styles/general.css';
import {openLink} from "@/scripts/links.js";

export default {
  name: 'Footer',
  data() {
    return {};
  },
  computed: {},
  methods: {
    redirect(link, blank=true) {
      openLink(link, blank)
    }
  }
};
</script>

<template>
  <div class="footer">
    <div class="container">
      <div class="info-container">
        <div class="link" @click="redirect('agreement', false)">Политика конфиденциальности</div>
        <div class="link" @click="redirect('files/oferta.pdf', false)">Оферта</div>
      </div>
      <div class="links-container">
        <div class="link">axel-f56@yandex.ru</div>
        <img src="/assets/icons/telegram.png" @click="redirect('https://t.me/pro_tg56')" alt="telegram">
      </div>
      <div class="copyright-container">
        <div class="link">Copyring © 2024 pro-tg.ru</div>
        <div class="link">Все права защищены</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
