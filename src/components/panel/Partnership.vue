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
      let checkmark_deposit = document.getElementById('checkmark-deposit');
      let checkmark_payout = document.getElementById('checkmark-payout');
      if (checkmark_deposit.style.display == 'none' && clickedElementId !== 'checkmark-payout') {
        checkmark_deposit.style.display = 'block';
        checkmark_payout.style.display = 'none';
      }
      else if (clickedElementId !== 'checkmark-deposit') {
        checkmark_deposit.style.display = 'none';
        checkmark_payout.style.display = 'block';
      }
    }
  }
};
</script>

<template>
  <CheckAuth></CheckAuth>
  <div class="partnership panel-base">
    <PanelHeader></PanelHeader>
    <div class="panel-container">

      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title">
          Партнерская программа
        </div>
        <div class="content">

          <div class="pool-block">
            <div id="pool-block-subtitle no-margin-top">
              <div class="rainbow-text">https://pro-tg.ru/?ref=00000</div>
              <div>&nbsp;</div>
              <div class="gray-text">Ваш уровень:</div>
              <div>&nbsp;</div>
              <div class="gray-text">Ваше партнерское вознаграждение:</div>
            </div>
          </div>

          <div class="pool-block">
            <div id="pool-block-subtitle no-margin-top">
              <div id="pool-block-title">Партнёрский счёт</div>

              <div class="fields-container">
                <div class="field-container">
                  <div id="field-title">Сумма, ₽</div>
                  <input type="number"></input>
                </div>
              </div>

              <div class="options-container">
                <div class="agreement-container no-margin-left">
                  <div class="checkmark" @click="togglePayoutMethod('checkmark-deposit')">
                    <img alt="checkmark" src="/assets/icons/checkmark.png" class="checkmark-image" id="checkmark-deposit"></img>
                  </div>
                  <div class="text">Перевести на основной баланс</div>
                </div>
                <div class="agreement-container low-margin no-margin-left">
                  <div class="checkmark" @click="togglePayoutMethod('checkmark-payout')">
                    <img alt="checkmark" src="/assets/icons/checkmark.png" class="checkmark-image" id="checkmark-payout" style="display: none;"></img>
                  </div>
                  <div class="text">Заказать выплату</div>
                </div>
              </div>

              <div class="send-button medium-button">Продолжить</div>
            </div>
          </div>

          <div class="pool-block">
            <div id="pool-block-title">
              Ваши рефералы
            </div>
            <div id="pool-block-subtitle">
              У вас ещё нет рефералов
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
