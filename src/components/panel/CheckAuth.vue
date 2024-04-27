<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/base/max.css';
import '@/styles/general.css';
import {loadAuthCookies} from "@/scripts/auth.js";
import {openLink} from "@/scripts/links.js";
import {request} from "@/scripts/requests.js";

export default {
  data() {
    return {};
  },
  components: {
  },
  computed: {},
  methods: {
    async update() {
      this.auth = await loadAuthCookies()
      if (this.auth == null) {
        this.redirect('/login', false)
      }

      let userInfo = await request('auth/me', 'get', this.auth)
      if (userInfo.response != null) {
        this.redirect('/login', false)
        return
      }

      this.$store.commit('setUserInfo', userInfo.data)
    },
    redirect(link, blank) {
      openLink(link, blank);
    }
  },
  async mounted() {
    await this.update()
    setInterval(this.update, 5000);

  }
};
</script>

<template>
</template>

<style scoped>

</style>
