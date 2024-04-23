<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/base/max.css';
import '@/styles/panel/base/mobile.css';
import '@/styles/general.css';
import Footer from "@/components/global/footer.vue";
import PanelHeader from "@/components/global/PanelHeader.vue";
import PCSideMenu from "@/components/panel/PCSideMenu.vue";
import MobileSideMenu from "@/components/panel/MobileSideMenu.vue";
import CheckAuth from "@/components/panel/CheckAuth.vue";

export default {
  data() {
    return {};
  },
  components: {
    CheckAuth,
    Footer,
    PanelHeader,
    PCSideMenu,
    MobileSideMenu
  },
  computed: {},
  methods: {}
};
</script>

<template>
  <CheckAuth></CheckAuth>
  <div class="invite dispatch panel-base">
    <PanelHeader></PanelHeader>
    <div class="panel-container">

      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title">Рассылка</div>
        <div class="content">
          <div class="pool-block">
            <div id="pool-block-title">Разослать сообщения</div>
            <div class="fields-container">
              <div class="field-container">
                <div id="field-title">Текст рассылки</div>
                <textarea placeholder="Введите текст"></textarea>
              </div>
              <div class="field-container">
                <div id="field-title">Получатели</div>
                <textarea class="paragraph"
                          placeholder="Введите список юзернеймов или номеров, каждый с новой строки"></textarea>
              </div>
            </div>

            <div class="send-button">Запустить</div>
          </div>
          <div class="pool-block">
            <div id="pool-block-title">Импорт файлов</div>
            <div id="pool-block-subtitle">Импортируйте текст из файла</div>

            <div class="fields-container">
              <input type="file" placeholder="Выбор файла">
            </div>
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
