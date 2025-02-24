<!--suppress ALL -->
<script>
import '@/styles/register/max.css';
import '@/styles/global/header/max.css';
import '@/styles/general.css';
import Header from "@/components/global/header.vue";
import Footer from "@/components/global/footer.vue";
import {openLink} from "@/scripts/links.js";
import {request} from "@/scripts/requests.js";
import {setCookie} from "@/scripts/cookie.js";
import {loadAuthCookies} from "@/scripts/auth.js";

export default {
  data() {
    return {
      auth: null
    };
  },
  components: {
    Header,
    Footer
  },
  computed: {},
  methods: {
    async login() {
      let nameEl = document.getElementById('name');
      let passEl = document.getElementById('password');

      let errorEl = document.getElementById('error');

      if (nameEl.value.length < 1) {
        nameEl.style.borderColor = 'red';
        setTimeout(() => {
          nameEl.style.borderColor = 'white';
        }, 500)
        return
      }

      if (passEl.value.length < 1) {
        passEl.style.borderColor = 'red';
        setTimeout(() => {
          passEl.style.borderColor = 'white';
        }, 500)
        return
      }

      let data = {
        'username': nameEl.value,
        'password': passEl.value
      }

      let loginResponse = await request('auth/login', 'post', null, data)

      if (loginResponse.response != null) {
        console.error(loginResponse)
        errorEl.style.display = 'block';

        if (loginResponse.response.status === 401) {
          errorEl.textContent = 'Неверный логин или пароль. Возможно вы указали почту вместо логина?'
        }
        else {
          errorEl.textContent = `Ошибка ${loginResponse.response.status}: ${JSON.stringify(loginResponse.response.data.detail)}`
        }

        return
      }

      setCookie('auth', loginResponse.data)
      this.redirect('/panel', false)
    },
    redirect(link, blank=true) {
      openLink(link, blank);
    },
    keyPress(event) {
      if (event.key === "Enter") {
        this.login()
      }
    }
  },
  async mounted() {
    document.addEventListener('keydown', this.keyPress);

    this.auth = await loadAuthCookies()
    if (this.auth == null) {
      return
    }

    let userInfo = await request('auth/me', 'get', this.auth)
    if (userInfo.response == null) {
      this.redirect('/panel', false)
      return
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
<!--          <div class="login-via-telegram-button">-->
<!--            <div class="telegram-image"></div>-->
<!--            <div class="text-container">-->
<!--              <div class="text">Войти через Telegram</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="title">или</div>-->
        </div>

        <div class="inputs-container">
          <div class="input-container">
            <div class="title">Логин</div>
            <input maxlength="32" id="name" type="text">
          </div>
        </div>

        <div class="inputs-container">
          <div class="input-container">
            <div class="title">Пароль</div>
            <input maxlength="32" id="password" type="password">
          </div>
        </div>


        <div class="error-text" id="error"></div>
        <div class="done-button" @click="login()">Войти</div>
        <div class="have_account">Ещё не зарегистрированы? <div></div><a href="/registration">Создать аккаунт</a></div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
