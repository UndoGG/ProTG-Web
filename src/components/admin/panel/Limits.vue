<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/base/max.css';
import '@/styles/panel/base/mobile.css';
import '@/styles/panel/admin/Limits.css';
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
      settings: null
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
    async save() {
      let inviteGlobalEl = document.getElementById('inviteGlobal')
      let inviteLocalEl = document.getElementById('inviteLocal')
      let messageEl = document.getElementById('messageGlobal')
      let errorEl = document.getElementById('error')

      errorEl.style.display = 'none'

      if (inviteGlobalEl.value.length < 1) {
        highlightBorder(inviteGlobalEl)
        return
      }

      if (inviteLocalEl.value.length < 1) {
        highlightBorder(inviteLocalEl)
        return
      }

      if (messageEl.value.length < 1) {
        highlightBorder(messageEl)
        return
      }

      let errors = {
        404: `Настройка не найдена`
      }
      let endpoint = `settings/edit`
      let method = 'patch'
      let data = {
        "id": 1,
        "value": inviteLocalEl.value
      }
      let response = await request(endpoint, method, this.auth, data)
      if (!validateResponse(response, errorEl, errors)) {
        return
      }
      data = {
        "id": 2,
        "value": inviteGlobalEl.value
      }
      response = await request(endpoint, method, this.auth, data)
      if (!validateResponse(response, errorEl, errors)) {
        return
      }
      data = {
        "id": 3,
        "value": messageEl.value
      }
      response = await request(endpoint, method, this.auth, data)
      if (!validateResponse(response, errorEl, errors)) {
        return
      }

      location.reload()
    },

    async loadSettings() {
      let response = await request('settings/all', 'get', this.auth)
      let raw_settings = response.data
      let parsed_settings = {}
      raw_settings.forEach(setting => {
        parsed_settings[setting.id] = setting
      })
      this.settings = parsed_settings
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

    await this.loadSettings()
  }
};
</script>

<template>
  <CheckAdminAuth></CheckAdminAuth>
  <div class="admin-background"></div>
  <div class="invite limits panel-base admin-prices" v-if="this.render">
    <PanelHeader></PanelHeader>
    <div class="panel-container">
      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title">Настройка лимитов</div>
        <div class="pool-block pool-block-long">
          <div id="pool-block-title">Изменить лимиты ботов</div>

          <div class="fields-container">
            <div id="prices-container">
              <div class="price-block">
                <div class="title">Глобальный инвайт</div>
                <div class="description" v-if="this.settings">{{this.settings['2'].description}}</div>
                <div class="value">
                  <input id="inviteGlobal" v-if="this.settings" type="number" :value="this.settings['2'].value">
                  <div class="currency">Инвайтов</div>
                </div>
              </div>
              <div class="price-block">
                <div class="title">Локальный инвайт</div>
                <div class="description" v-if="this.settings">{{this.settings['1'].description}}</div>
                <div class="value">
                  <input id="inviteLocal" v-if="this.settings" type="number" :value="this.settings['1'].value">
                  <div class="currency">Инвайтов</div>
                </div>
              </div>
              <div class="price-block">
                <div class="title">Глобальные сообщения</div>
                <div class="description" v-if="this.settings">{{this.settings['3'].description}}</div>
                <div class="value">
                  <input id="messageGlobal" v-if="this.settings" type="number" :value="this.settings['3'].value">
                  <div class="currency">Сообщений</div>
                </div>
              </div>
            </div>
          </div>

          <div class="error" id="error"></div>
          <div class="send-button" @click="save">Сохранить</div>
        </div>
      </div>

    </div>
    <MobileSideMenu></MobileSideMenu>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
