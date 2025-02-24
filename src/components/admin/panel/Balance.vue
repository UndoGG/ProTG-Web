<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/base/max.css';
import '@/styles/panel/base/mobile.css';
import '@/styles/general.css';
import '@/styles/panel/admin/base.css'
import '@/styles/panel/admin/Balance.css'
import Footer from "@/components/global/footer.vue";
import PanelHeader from "@/components/global/PanelHeader.vue";
import PCSideMenu from "@/components/admin/panel/PCSideMenu.vue";
import MobileSideMenu from "@/components/admin/panel/MobileSideMenu.vue";
import CheckAdminAuth from "@/components/admin/panel/CheckAdminAuth.vue";
import {highlightBorder} from "@/scripts/misc.js";
import {request, validateResponse} from "@/scripts/requests.js";
import {loadAuthCookies} from "@/scripts/auth.js";
import _default from "vuex";


export default {
  data() {
    return {
      render: false,
      action: 'add'
    };
  },
  components: {
    CheckAdminAuth,
    Footer,
    PanelHeader,
    PCSideMenu,
    MobileSideMenu
  },
  computed: {
    showSumm() {
      if (this.action == 'check') {
        return {'display': 'none'}
      }
    }
  },
  methods: {
    async selectAction(element_id) {
      let previousElement = document.getElementById(this.action)
      let element = document.getElementById(element_id)
      previousElement.style.background = "#666666"
      element.style.background = "#1b981b"

      this.action = element_id
      let errorEl = document.getElementById('error')
      let resultEl = document.getElementById('result')

      resultEl.style.display = 'none'
      errorEl.style.display = 'none'
    },
    async execute() {
      let userEl = document.getElementById('user')
      let summEl = document.getElementById('summ')
      let errorEl = document.getElementById('error')
      let resultEl = document.getElementById('result')

      resultEl.style.display = 'none'
      errorEl.style.display = 'none'

      if (userEl.value.length < 1) {
        highlightBorder(userEl)
        return
      }
      if (this.action != 'check' && summEl.value.length < 1) {
        highlightBorder(summEl)
        return
      }


      let data = {}
      let endpoint = null
      let method = null

      if (this.action == 'check') {
        endpoint = `users/balances/get?username=${userEl.value}`
        method = 'get'
      }
      else {
        method = 'patch'
      }

      console.log(this.action)

      switch (this.action) {
        case "add":
          endpoint = `users/balances/add?username=${userEl.value}&add_money=${summEl.value}`
          break

        case "remove":
          endpoint = `users/balances/remove?username=${userEl.value}&remove_money=${summEl.value}`
          break
        case "set":
          endpoint = `users/balances/set?username=${userEl.value}&set_money=${summEl.value}`
          break
        case _default:
          console.error(this.action)
          return
      }

      let errors = {
        404: `Пользователь ${userEl.value} не найден`
      }

      let response = await request(endpoint, method, this.auth, data)
      let success = validateResponse(response, errorEl, errors)
      if (success && this.action != 'check') {
        resultEl.textContent = `Новый баланс: ${response.data.new_balance}₽`
        resultEl.style.display = 'block'
      }
      if (success && this.action == 'check') {
        resultEl.textContent = 'Баланс: ' + response.data + '₽'
        resultEl.style.display = 'block'
      }
    }
  },
  async mounted() {
    this.auth = await loadAuthCookies()
    if (this.auth == null) {
      return
    }
    let userInfo = await request('auth/me', 'get', this.auth)
    if (userInfo.response != null) {
      return
    }
    if (userInfo.data.is_superuser == false) {
      return
    }
    this.render = true
  }
};
</script>

<template>
  <div class="admin-background"></div>
  <CheckAdminAuth></CheckAdminAuth>
  <div class="invite balance panel-base" v-if="this.render">
    <PanelHeader></PanelHeader>
    <div class="panel-container">
      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title">Управление балансом</div>
        <div class="pool-block">
            <div id="pool-block-title">Изменить баланс пользователя</div>

            <div class="fields-container">
              <div class="field-container">
                <div >Введите имя пользователя</div>
                <input id="user" placeholder="Имя"></input>
              </div>
              <div class="field-container" :style="showSumm">
                <div >Введите сумму</div>
                <input id="summ" placeholder="Сумма, RUB" type="number"></input>
              </div>
              <div class="field-container">
                <div id="buttons-container">
                  <div class="button" id="check" @click="selectAction('check')">Проверить</div>
                  <div class="button" id="add" style="background: #1b981b" @click="selectAction('add')">Начислить</div>
                  <div class="button" id="set" @click="selectAction('set')">Установить</div>
                  <div class="button" id="remove" @click="selectAction('remove')">Забрать</div>
                </div>
              </div>
            </div>

            <div class="error" id="error"></div>
            <div id="result"></div>
            <div class="send-button" @click="execute">Выполнить</div>
          </div>
      </div>

    </div>
    <MobileSideMenu></MobileSideMenu>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
