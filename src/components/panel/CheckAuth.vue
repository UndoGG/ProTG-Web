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
    redirect(link, blank) {
      openLink(link, blank);
    }
  },
  async mounted() {
    this.auth = await loadAuthCookies()
    if (this.auth == null) {
      this.redirect('/login', false)
    }

    let userInfo = await request('auth/me', 'get', this.auth)
    console.log(userInfo.response)
    if (userInfo.response != null) {
      console.log(123)
      this.redirect('/login', false)
      return
    }

    this.$store.commit('setUserInfo', userInfo.data)

  }
};
</script>

<template>
</template>

<style scoped>

</style>
