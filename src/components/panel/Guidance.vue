<!--suppress ALL -->
<script>
import '@/styles/panel/Guidance.css';
import '@/styles/panel/base/max.css';
import '@/styles/general.css';
import Footer from "@/components/global/footer.vue";
import PanelHeader from "@/components/global/PanelHeader.vue";
import PCSideMenu from "@/components/panel/PCSideMenu.vue";
import MobileSideMenu from "@/components/panel/MobileSideMenu.vue";

export default {
  data() {
    return {};
  },
  components: {
    MobileSideMenu,
    Footer,
    PanelHeader,
    PCSideMenu
  },
  computed: {},
  methods: {}
};
</script>

<template>
  <div class="auditory panel-base">
    <PanelHeader></PanelHeader>
    <div class="panel-container">

      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div class="titles-container">
          <div>
            <span class="gray-text">1. </span>Вводный урок
          </div>
          <div>
            <span class="gray-text">2. </span>Как искать нужную целевую аудиторию через поиск Телеграм
          </div>
          <div>
            <span class="gray-text">3. </span>Как искать аудиторию с помощью сторонних сайтов?
          </div>
          <div>
            <span class="gray-text">4. </span>Как искать аудиторию с помощью бота для анализа подписок пользователя?
          </div>
          <div>
            <span class="gray-text">5. </span>Как подготовить список и запустить сбор аудитории в TGtron?
          </div>
          <div>
            <span class="gray-text">6. </span>Как создать посадочную площадку для сбора аудитории? Виды площадок
          </div>
          <div>
            <span class="gray-text">7. </span>Обязательный бот для чата, который нужно добавить перед привлечением аудитории
          </div>
          <div>
            <span class="gray-text">8. </span>Как запустить привлечение подписчиков в сервисе TGtron? Пошаговая инструкция
          </div>
          <div>
            <span class="gray-text">9. </span>Как правильно оформить площадку: название, аватарка и описание
          </div>
          <div>
            <span class="gray-text">10. </span>Как наполнять площадку контентом?
          </div>
          <div>
            <span class="gray-text">11. </span>Разбор кейсов по оформлению площадок
          </div>
          <div>
            <span class="gray-text">12. </span>Для чего нужен лид-магнит?
          </div>
          <div>
            <span class="gray-text">13. </span>Как списывается баланс в сервисе TGtron?
          </div>
          <div>
            <span class="gray-text">14. </span>Что делать, если при запуске инвайтинга ничего не происходит
          </div>
          <div>
            <span class="gray-text">15. </span>Что делать, если люди в чате повторяются и выглядят как боты
          </div>
          <div>
            <span class="gray-text">16. </span>Что делать при зависании инвайтинга, когда подписчики не добавляются
          </div>
        </div>
      </div>


      <MobileSideMenu></MobileSideMenu>

    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
