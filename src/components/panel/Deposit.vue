<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/base/max.css';
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
    MobileSideMenu,
    Footer,
    PanelHeader,
    PCSideMenu
  },
  computed: {},
  methods: {
    togglePayoutMethod(clickedElementId) {
      let checkmark_ym = document.getElementById('checkmark-YM');
      let checkmark_nrf = document.getElementById('checkmark-NRF');
      if (checkmark_ym.style.display == 'none' && clickedElementId !== 'checkmark-NRF') {
        checkmark_ym.style.display = 'block';
        checkmark_nrf.style.display = 'none';
      }
      else if (clickedElementId !== 'checkmark-YM') {
        checkmark_ym.style.display = 'none';
        checkmark_nrf.style.display = 'block';
      }
    }
  }
};
</script>

<template>
  <CheckAuth></CheckAuth>
  <div class="invite panel-base">
    <PanelHeader></PanelHeader>
    <div class="panel-container">

      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title">Пополнить баланс</div>
        <div class="content">
          <div class="pool-block">
            <div id="pool-block-title">Пополнить счет</div>

            <div class="fields-container">
              <div class="field-container">
                <div id="field-title">Сумма, ₽</div>
                <input type="number"></input>
              </div>
              <div class="field-container">
                <div id="field-title">Промокод</div>
                <textarea></textarea>
              </div>
            </div>

            <div class="options-container">
              <div class="agreement-container no-margin-left">
                <div class="checkmark" @click="togglePayoutMethod('checkmark-YM')">
                  <img alt="checkmark" src="/assets/icons/checkmark.png" class="checkmark-image" id="checkmark-YM"></img>
                </div>
                <div class="text">Карты РФ, Юmoney</div>
              </div>
              <div class="agreement-container no-margin-left">
                <div class="checkmark" @click="togglePayoutMethod('checkmark-NRF')">
                  <img alt="checkmark" src="/assets/icons/checkmark.png" class="checkmark-image" id="checkmark-NRF" style="display: none;"></img>
                </div>
                <div class="text">Карты не РФ</div>
              </div>
            </div>

            <div class="send-button">Продолжить</div>
          </div>
          <div class="pool-block">
            <div id="pool-block-title">История</div>
            <table class="tasks-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Сумма, ₽</th>
                  <th>Комментарий</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                <tr class="gray-tr">
                  <td>0000</td>
                  <td>00</td>
                  <td>DUMMY</td>
                  <td>2009-06-08 10:39:42</td>
                </tr>
              </tbody>
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
