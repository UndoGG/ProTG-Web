<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/base/max.css';
import '@/styles/panel/base/mobile.css';
import '@/styles/general.css';
import '@/styles/panel/admin/base.css'
import '@/styles/panel/admin/Prices.css'
import Footer from "@/components/global/footer.vue";
import PanelHeader from "@/components/global/PanelHeader.vue";
import PCSideMenu from "@/components/admin/panel/PCSideMenu.vue";
import MobileSideMenu from "@/components/admin/panel/MobileSideMenu.vue";
import CheckAdminAuth from "@/components/admin/panel/CheckAdminAuth.vue";
import {copy, highlightBorder} from "@/scripts/misc.js";
import {request, validateResponse} from "@/scripts/requests.js";
import {loadAuthCookies} from "@/scripts/auth.js";
import _default from "vuex";


export default {
  data() {
    return {
      render: false,
      auth: null,
      action: 'global',
      global_prices: [],
      personal_prices: [],
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
    displayUsername() {
      if (this.action == 'global') {
        return {'display': 'none'}
      }
    }
  },
  methods: {
    copy(element_id, text) {
      console.log(element_id)
      let element = document.getElementById(element_id)
      copy(text)
      let el_color = element.style.backgroundColor
      element.style.backgroundColor = '#3d8027'
      setTimeout(() => {
      element.style.backgroundColor = '#4d4d4d'
      }, 500)
    },

    async save() {
      let userEl = document.getElementById('user')
      let inviteEl = document.getElementById('invite')
      let messageEl = document.getElementById('message')
      let filterEl = document.getElementById('filter')
      let collectEl = document.getElementById('collect')
      let errorEl = document.getElementById('error')

      errorEl.style.display = 'none'

      if (userEl.value.length < 1 && this.action == 'individual') {
        highlightBorder(userEl)
        return
      }

      if (inviteEl.value.length < 1) {
        highlightBorder(inviteEl)
        return
      }

      if (filterEl.value.length < 1) {
        highlightBorder(inviteEl)
        return
      }

      if (messageEl.value.length < 1) {
        highlightBorder(messageEl)
        return
      }

      if (collectEl.value.length < 1) {
        highlightBorder(collectEl)
        return
      }

      let data = {}
      let endpoint = null
      let method = null

      let errors = {}

      if (this.action == 'global') {
        errors = {
          404: `Цена не найдена`
        }
        endpoint = `prices/edit`
        method = 'patch'
        data = {
          "id": this.global_prices["3"].id,
          "value": inviteEl.value
        }
        let response = await request(endpoint, method, this.auth, data)
        if (!validateResponse(response, errorEl, errors)) {
          return
        }
        data = {
          "id": this.global_prices["2"].id,
          "value": messageEl.value
        }
        response = await request(endpoint, method, this.auth, data)
        if (!validateResponse(response, errorEl, errors)) {
          return
        }
        data = {
          "id": this.global_prices["1"].id,
          "value": collectEl.value
        }
        response = await request(endpoint, method, this.auth, data)
        if (!validateResponse(response, errorEl, errors)) {
          return
        }

        data = {
          "id": this.global_prices["4"].id,
          "value": filterEl.value
        }
        response = await request(endpoint, method, this.auth, data)
        if (!validateResponse(response, errorEl, errors)) {
          return
        }

        location.reload()
      }

      if (this.action == 'individual') {
        errors = {
          404: `Пользователь не найден`
        }

        let getUserResponse = await request(`users/${userEl.value}`, method, this.auth)
        if (!validateResponse(getUserResponse, errorEl, errors)) {
          return
        }
        let userId = getUserResponse.data.id

        errors = {
          404: `Цена не найдена`
        }

        endpoint = `prices/edit_or_create`
        method = 'put'
        data = {
          "type": 3,
          "value": inviteEl.value,
          "user_id": userId
        }
        let response = await request(endpoint, method, this.auth, data)
        if (!validateResponse(response, errorEl, errors)) {
          return
        }
        data = {
          "type": 2,
          "value": messageEl.value,
          "user_id": userId
        }
        response = await request(endpoint, method, this.auth, data)
        if (!validateResponse(response, errorEl, errors)) {
          return
        }
        data = {
          "type": 1,
          "value": collectEl.value,
          "user_id": userId
        }
        response = await request(endpoint, method, this.auth, data)
        if (!validateResponse(response, errorEl, errors)) {
          return
        }
        data = {
          "type": 4,
          "value": filterEl.value,
          "user_id": userId
        }
        response = await request(endpoint, method, this.auth, data)
        if (!validateResponse(response, errorEl, errors)) {
          return
        }

        location.reload()
      }
    },

    async selectAction(element_id) {
      let previousElement = document.getElementById(this.action)
      let element = document.getElementById(element_id)
      previousElement.style.background = "#666666"
      element.style.background = "#1b981b"

      this.action = element_id
      let errorEl = document.getElementById('error')
      errorEl.style.display = 'none'
    },

    async loadPrices() {
      let pricesResponse = await request('prices/all', 'get', this.auth)
      this.personal_prices = pricesResponse.data
      let globalPricesResponse = await request('prices/global', 'get', this.auth)
      this.global_prices = globalPricesResponse.data[null]
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

    await this.loadPrices()
  }
};
</script>

<template>
  <CheckAdminAuth></CheckAdminAuth>
  <div class="admin-background"></div>
  <div class="invite balance panel-base admin-prices" v-if="this.render">
    <PanelHeader></PanelHeader>
    <div class="panel-container">
      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title">Настройка цен</div>
        <div class="pool-block pool-block-long">
          <div id="pool-block-title">Изменить цены за операции</div>

          <div class="fields-container">
            <div id="buttons-container">
              <div class="button" id="global" style="background: #1b981b" @click="selectAction('global')">Глобально</div>
              <div class="button" id="individual" @click="selectAction('individual')">Индивидуально</div>
              </div>

            <div id="username-container" :style="displayUsername">
              <div id="input-container">
                <div class="title">Имя</div>
                <input id="user" placeholder="Имя пользователя">
              </div>
            </div>

            <div id="prices-container">
              <div class="price-block">
                <div class="title">Инвайт</div>
                <div class="value">
                  <input id="invite" type="number" v-if="global_prices['3']" :value='global_prices["3"].value'>
                  <div class="currency">RUB</div>
                </div>
              </div>
              <div class="price-block">
                <div class="title">Сообщение</div>
                <div class="value">
                  <input id="message" type="number" v-if="global_prices['2']" :value='global_prices["2"].value'>
                  <div class="currency">RUB</div>
                </div>
              </div>
              <div class="price-block">
                <div class="title">Сбор аудитории</div>
                <div class="value">
                  <input id="collect" type="number" v-if="global_prices['1']" :value='global_prices["1"].value'>
                  <div class="currency">RUB</div>
                </div>
              </div>
              <div class="price-block">
                <div class="title">Фильтр</div>
                <div class="value">
                  <input id="filter" type="number" v-if="global_prices['4']" :value='global_prices["4"].value'>
                  <div class="currency">RUB</div>
                </div>
              </div>
            </div>
          </div>

          <div class="error" id="error"></div>
          <div class="send-button" @click="save">Сохранить</div>
        </div>

        <div class="pool-block pool-block-long" style="margin-top: 10px;">
          <div id="pool-block-title">
            Индивидуальные цены
          </div>
          <div class="users-list prices-list task-list">
            <table class="tasks-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Имя</th>
                  <th>Инвайт</th>
                  <th>Сообщение</th>
                  <th>Сбор аудитории</th>
                  <th>Фильтр</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if='this.personal_prices.length > 0' v-for="price in personal_prices" :key="price.user_id">
                  <td>
                    <div class="id">
                      {{ price.user_id }}
                    </div>
                  </td>
                  <td>
                    <div class="username" :id='price.user_id.toString() + "name"'
                    @click="copy(price.user_id.toString() + 'name', price.username)">
                      {{ price.username }}
                    </div>
                  </td>
                  <td>
                    <div id="price">
                      {{ price.prices["3"] }}
                      <div v-if='price.prices["3"]'>RUB</div>
                    </div>
                  </td>
                  <td>
                    <div id="price">
                      {{ price.prices["2"] }}
                      <div v-if='price.prices["2"]'>RUB</div>
                    </div>
                  </td>
                  <td>
                    <div id="price">
                      {{ price.prices["1"] }}
                      <div v-if='price.prices["1"]'>RUB</div>
                    </div>
                  </td>
                  <td>
                    <div id="price">
                      {{ price.prices["4"] }}
                      <div v-if='price.prices["4"]'>RUB</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
    <MobileSideMenu></MobileSideMenu>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
