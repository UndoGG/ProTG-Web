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
        this.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ', false)
        return
      }

      let userInfo = await request('auth/me', 'get', this.auth)
      if (userInfo.response != null) {
        this.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ', false)
        return
      }
      if (userInfo.data.is_superuser == false) {
        this.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ', false)
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
