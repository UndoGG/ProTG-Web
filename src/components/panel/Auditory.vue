<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
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
        <div id="pool-title">
          Сбор аудитории
          <span style="font-size: 0.6em; color: #8f8f8f; cursor: pointer; border-style: solid; border-color: transparent; border-bottom: 2px dotted #8f8f8f;">Помощь</span>
        </div>
        <div class="content">
          <div class="pool-block">
            <div id="pool-block-title">Сбор аудитории</div>
            <div id="pool-block-subtitle">
              Введите список групп и каналов с привязанным чатом, каждый с новой строки
            </div>

            <div class="fields-container">
              <div class="field-container">
                <div id="field-title">Группы/каналы</div>
                <textarea class="paragraph"></textarea>
              </div>
            </div>

            <div class="send-button">Запустить</div>
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
