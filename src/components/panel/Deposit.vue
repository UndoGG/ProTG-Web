<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/Deposit.css';
import '@/styles/panel/base/max.css';
import '@/styles/general.css';
import Footer from "@/components/global/footer.vue";
import PanelHeader from "@/components/global/PanelHeader.vue";
import PCSideMenu from "@/components/panel/PCSideMenu.vue";
import MobileSideMenu from "@/components/panel/MobileSideMenu.vue";
import CheckAuth from "@/components/panel/CheckAuth.vue";
import {request, validateResponse} from "@/scripts/requests.js";
import {loadAuthCookies} from "@/scripts/auth.js";
import {formatDate, highlightBorder} from "@/scripts/misc.js"
import {openLink} from "@/scripts/links.js";
import {resolveInvoiceStatusName, resolveInvoiceStatusStyle, resolveStatusName} from "@/scripts/resolver.js";


export default {
  data() {
    return {
      invoices: null,
      auth: null
    };
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
    resolveStatusStyle(int) {
      return resolveInvoiceStatusStyle(int)
    },
    resolveStatusName(int) {
      return resolveInvoiceStatusName(int)
    },
    formatDate(inputDate) {
      return formatDate(inputDate)
    },
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
    },
    async pay() {
      let summEl = document.getElementById('summ')
      let errorEl = document.getElementById('error')
      errorEl.style.display = 'none';

      if (summEl.value.length < 1) {
        highlightBorder(summEl)
        return
      }

      let data = {
        amount: parseInt(summEl.value)
      }

      let createInvoiceResponse = await request('invoices/create', 'post', this.auth, data)

      let success = validateResponse(createInvoiceResponse, errorEl)
      if (success) {
        openLink(createInvoiceResponse.data, false)
      }
    },
    async getInvoices() {
      this.invoices = await request('invoices/my', 'get', this.auth)
      validateResponse(this.invoices.data)
      console.log(this.invoices.data)
      this.invoices = this.invoices.data.reverse()
    },
  },
  async mounted() {
    this.auth = await loadAuthCookies()
    await this.getInvoices()
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
                <input type="number"
                       id="summ"
                       style="width: 100px !important; text-align: center"
                ></input>
              </div>
<!--              <div class="field-container">-->
<!--                <div id="field-title">Промокод</div>-->
<!--                <textarea></textarea>-->
<!--              </div>-->
            </div>

<!--            <div class="options-container">-->
<!--              <div class="agreement-container no-margin-left">-->
<!--                <div class="checkmark" @click="togglePayoutMethod('checkmark-YM')">-->
<!--                  <img alt="checkmark" src="/assets/icons/checkmark.png" class="checkmark-image" id="checkmark-YM"></img>-->
<!--                </div>-->
<!--                <div class="text">Карты РФ, Юmoney</div>-->
<!--              </div>-->
<!--              <div class="agreement-container no-margin-left">-->
<!--                <div class="checkmark" @click="togglePayoutMethod('checkmark-NRF')">-->
<!--                  <img alt="checkmark" src="/assets/icons/checkmark.png" class="checkmark-image" id="checkmark-NRF" style="display: none;"></img>-->
<!--                </div>-->
<!--                <div class="text">Карты не РФ</div>-->
<!--              </div>-->
<!--            </div>-->

            <div class="error" id="error"></div>
            <div class="send-button" @click="pay">Продолжить</div>
          </div>
          <div class="pool-block">
            <div id="pool-block-title">История</div>
            <table class="tasks-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Сумма</th>
                  <th>Статус</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                <tr class="gray-tr invoices-table center-tds" v-for="invoice in invoices" :key="invoices.id">
                  <td>{{ invoice.id }}</td>
                  <td v-if="invoice.amount">{{ invoice.amount }} ₽</td>
                  <td class="status" :style="resolveStatusStyle(invoice.status)">{{ resolveStatusName(invoice.status) }}</td>
                  <td>{{ formatDate(invoice.created_at) }}</td>
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
