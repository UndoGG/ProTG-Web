<!--suppress ALL -->
<script>
import '@/styles/register/max.css';
import '@/styles/global/header/max.css';
import '@/styles/all.css';
import Header from "@/components/global/header.vue";
import Footer from "@/components/global/footer.vue";
import {openLink} from "@/scripts/links.js";

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer
  },
  computed: {},
  methods: {
    redirect(link) {
      openLink(link, true);
    }
  }
};
</script>

<template>
  <div class="register">
    <Header></Header>

    <div class="form-container">
      <div class="form">
        <div class="title-container">
          <div class="title">Войти</div>
          <div class="login-via-telegram-button">
            <div class="telegram-image"></div>
            <div class="text-container">
              <div class="text">Войти через Telegram</div>
            </div>
          </div>
          <div class="title">или</div>
        </div>

        <div class="inputs-container">
          <div class="input-container">
            <div class="title">Email</div>
            <input maxlength="32" type="text">
          </div>
        </div>

        <div class="inputs-container">
          <div class="input-container">
            <div class="title">Пароль</div>
            <input maxlength="32" type="text">
          </div>
        </div>

        <div class="done-button">Войти</div>
        <div class="have_account">Ещё не зарегистрированы? <div></div><a href="/registration">Создать аккаунт</a></div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
