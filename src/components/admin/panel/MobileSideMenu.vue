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
      <div class="title">Пользователи</div>
      <div class="pages-container">
        <div class="page" @click="open('/admin')">Все пользователи</div>
      </div>
    </div>
    <div class="section">
      <div class="title">Деньги</div>
      <div class="pages-container">
        <div class="page" @click="open('/admin/balance')">Управление балансом</div>
      </div>
    </div>
    <div class="section">
      <div class="title">Система</div>
      <div class="pages-container">
        <div class="page" @click="open('/admin/prices')">Цены</div>
        <div class="page" @click="open('/admin/limtis')">Лимиты</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
