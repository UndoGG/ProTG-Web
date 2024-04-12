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

export default {
  data() {
    return {};
  },
  components: {
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
  <div class="invite panel-base">
    <PanelHeader></PanelHeader>
    <div class="panel-container">

      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title">Инвайт</div>
        <div class="content">
          <div class="pool-block">
            <div id="pool-block-title">Пригласить в группу</div>
            <div id="pool-block-subtitle">Должны быть включены настройки добавления участников (скриншот).</div>

            <div class="fields-container">
              <div class="field-container">
                <div id="field-title">Группа для инвайта</div>
                <textarea placeholder="@"></textarea>
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
            <div id="pool-block-title">Список задач</div>
            <table class="tasks-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Статус</th>
                </tr>
              </thead>
<!--              <tbody>-->
<!--                <tr>-->
<!--                  <td>Id</td>-->
<!--                  <td>Status</td>-->
<!--                </tr>-->
<!--              </tbody>-->
            </table>
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
