<!--suppress ALL -->
<script>
import '@/styles/panel/Files/max.css';
import '@/styles/panel/Files/mobile.css';
import '@/styles/panel/base/max.css';
import '@/styles/general.css';
import Footer from "@/components/global/footer.vue";
import PanelHeader from "@/components/global/PanelHeader.vue";
import PCSideMenu from "@/components/panel/PCSideMenu.vue";
import SubPoolHead from "@/components/panel/files/SubPoolHead.vue";
import MobileSideMenu from "@/components/panel/MobileSideMenu.vue";


export default {
  data() {
    return {};
  },
  components: {
    MobileSideMenu,
    Footer,
    PanelHeader,
    PCSideMenu,
    SubPoolHead
  },
  computed: {},
  methods: {
    parseDisplay(ref) {
      let currentWindow = this.$store.state.currentWindow
      if (currentWindow === ref) {
        return {'display': 'initial'}
      }
      else {
        return {'display': 'none'}
      }
    },
  }
};
</script>

<template>
  <div class="files panel-base">
    <PanelHeader></PanelHeader>
    <div class="panel-container">

      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title">
          Операции с файлами
        </div>

        <div class="sub-pool">

          <div class="window" :style="parseDisplay('head-collide')">
            <div class="content">
              <div class="pool-block long-block">
                <SubPoolHead></SubPoolHead>
                <div id="pool-block-subtitle">
                  Объединяет два файла, убирает дубли, перемешивает.
                </div>

                <div class="file-inputs-container">
                  <div class="file-input-container">
                    <div class="name">Файл 1</div>
                    <div class="file-input">
                      <input type="file" placeholder="Выбор файла">
                    </div>
                  </div>
                  <div class="file-input-container">
                    <div class="name">Файл 2</div>
                    <div class="file-input">
                      <input type="file" placeholder="Выбор файла">
                    </div>
                  </div>
                </div>

                <div class="send-button short-button">Скачать</div>
              </div>
            </div>
          </div>


          <div class="window" :style="parseDisplay('head-remove')">
            <div class="content">
              <div class="pool-block long-block">
                <SubPoolHead></SubPoolHead>
                <div id="pool-block-subtitle">
                  В скачиваемом файле будут данные из второго файла, которых нет в первом файле.
                </div>

                <div class="file-inputs-container">
                  <div class="file-input-container">
                    <div class="name">Файл 1</div>
                    <div class="file-input">
                      <input type="file" placeholder="Выбор файла">
                    </div>
                  </div>
                  <div class="file-input-container">
                    <div class="name">Файл 2</div>
                    <div class="file-input">
                      <input type="file" placeholder="Выбор файла">
                    </div>
                  </div>
                </div>

                <div class="send-button short-button">Скачать</div>
              </div>
            </div>
          </div>


          <div class="window" :style="parseDisplay('head-normalize')">
            <div class="content">
              <div class="pool-block long-block">
                <SubPoolHead></SubPoolHead>
                <div id="pool-block-subtitle">
                  Все номера телефоном будут очищены от лишних знаков.
                </div>

                <div class="file-inputs-container">
                  <div class="file-input-container long-file-input">
                    <div class="name">Файл</div>
                    <div class="file-input">
                      <input type="file" placeholder="Выбор файла">
                    </div>
                  </div>
                </div>

                <div class="send-button short-button">Скачать</div>
              </div>
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
