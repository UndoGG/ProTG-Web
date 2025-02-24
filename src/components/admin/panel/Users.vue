<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/base/max.css';
import '@/styles/panel/base/mobile.css';
import '@/styles/general.css';
import '@/styles/panel/admin/base.css'
import '@/styles/panel/admin/Users.css'
import Footer from "@/components/global/footer.vue";
import PanelHeader from "@/components/global/PanelHeader.vue";
import PCSideMenu from "@/components/admin/panel/PCSideMenu.vue";
import MobileSideMenu from "@/components/admin/panel/MobileSideMenu.vue";
import CheckAdminAuth from "@/components/admin/panel/CheckAdminAuth.vue";
import {request, validateResponse} from "@/scripts/requests.js";
import {loadAuthCookies} from "@/scripts/auth.js";
import {copy} from "@/scripts/misc.js";


export default {
  data() {
    return {
      render: false,
      users: []
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
    getAccess() {
      if (!this.$store.userInfo) {
        return false
      }
      return {'opacity': 1}
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
    async loadUsers() {
      this.users = await request('users/all', 'get', this.auth)
      validateResponse(this.users)
      this.users = this.users.data
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

    await this.loadUsers()
  }
};
</script>

<template>
  <div class="admin-background"></div>
  <CheckAdminAuth></CheckAdminAuth>
  <div class="invite dispatch panel-base" v-if="this.render">
    <PanelHeader></PanelHeader>
    <div class="panel-container">
      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title">Пользователи</div>
        <div class="pool-block pool-block-long">
          <div id="pool-block-title">
            Все пользователи
          </div>
          <div class="users-list task-list">
            <table class="tasks-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Имя</th>
                  <th>Почта</th>
                  <th>Баланс</th>
                  <th>Привилегии</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if='this.users.length > 0' v-for="user in users" :key="user.id">
                  <td>
                    <div class="id">
                      {{ user.id }}
                    </div>
                  </td>
                  <td>
                    <div class="username" :id='user.id.toString() + "name"'
                    @click="copy(user.id.toString() + 'name', user.username)">
                      {{ user.username }}
                    </div>
                  </td>
                  <td>
                    <div class="email" :id='user.id.toString() + "email"'
                    @click="copy(user.id.toString() + 'email', user.email)">
                      {{ user.email }}
                    </div>
                  </td>
                  <td>
                    <div class="balance">
                      <strong>{{ user.balance }} ₽</strong>
                    </div>
                  </td>
                  <td>
                    <div v-if="user.is_superuser" class="admin">
                      <strong>Админ</strong>
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
