<!--suppress ALL -->
<script>
import '@/styles/prices/max.css';
import '@/styles/panel/base/max.css'
import '@/styles/panel/base/mobile.css'
import '@/styles/prices/mobile.css';
import '@/styles/global/header/max.css';
import '@/styles/general.css';
import Header from "@/components/global/header.vue";
import Footer from "@/components/global/footer.vue";
import {openLink} from "@/scripts/links.js";


export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer
  },
  computed: {},
  methods: {
    redirect(link) {
      openLink(link, true);
    }
  }
};
</script>

<template>
  <div class="prices">
    <Header></Header>

    <div class="prices-container">
      <div class="title">Цены</div>
      <div class="text gray-text">
        <strong>5 рублей </strong> инвайт за <strong>1 подписчика</strong>
        <div></div>
        <strong>25 рублей за парсинг 100 людей</strong>
        <div></div>
        <strong>5 рублей</strong> за рассылку
        <div></div>
        <div>&nbsp;</div>
        <strong>Спец. условия уточнять в лс</strong> (доступно от 5к аудитории)
      </div>
      <div class="send-button average-button">Пополнить баланс</div>
    </div>

    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
