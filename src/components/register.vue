<!--suppress ALL -->
<script>
import '@/styles/register/max.css';
import '@/styles/register/mobile.css';
import '@/styles/global/header/max.css';
import '@/styles/general.css';
import Header from "@/components/global/header.vue";
import Footer from "@/components/global/footer.vue";
import {setCookie} from "@/scripts/cookie.js";
import {openLink} from "@/scripts/links.js";
import {request} from "@/scripts/requests.js";
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
    async register() {
      let nameEl = document.getElementById('name');
      let passEl = document.getElementById('password');
      let emailEl = document.getElementById('email');

      let errorEl = document.getElementById('error');

      if (nameEl.value.length < 1) {
        nameEl.style.borderColor = 'red';
        setTimeout(() => {
          nameEl.style.borderColor = 'white';
        }, 500)
        return
      }

      if (emailEl.value.length < 1) {
        emailEl.style.borderColor = 'red';
        setTimeout(() => {
          emailEl.style.borderColor = 'white';
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
        'password': passEl.value,
        'email': emailEl.value
      }

      let registerResponse = await request('auth/register', 'post', null, data);
      if (registerResponse.response != null) {
        console.error(registerResponse)
        errorEl.style.display = 'block';

        if (registerResponse.response.status === 409) {
          errorEl.textContent = 'Пользователь уже существует'
        }
        else {
          errorEl.textContent = `Ошибка ${registerResponse.response.status}: ${JSON.stringify(registerResponse.response.data.detail)}`
        }

        return
      }

      data = {
        'username': nameEl.value,
        'password': passEl.value
      }

      let loginResponse = await request('auth/login', 'post', null, data)

      if (loginResponse.response != null) {
        console.error(loginResponse)
        errorEl.style.display = 'block';

        if (loginResponse.response.status === 401) {
          errorEl.textContent = 'Авторизация не удалась'
        }
        else {
          errorEl.textContent = `Ошибка ${registerResponse.response.status}: ${JSON.stringify(registerResponse.response.data.detail)}`
        }

        return
      }

      setCookie('auth', loginResponse.data)
      this.redirect('/panel', false)
    },
    checkmark() {
      let checkmark_component = document.getElementById('checkmark');
      if (checkmark_component.style.display == 'none') {
        checkmark_component.style.display = 'block';
      }
      else {
        checkmark_component.style.display = 'none';
      }
    },
    redirect(link, blank=true) {
      openLink(link, blank);
    },

    keyPress(event) {
      if (event.key === "Enter") {
        this.register()
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
          <div class="title">Регистрация</div>
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
            <div class="title">Email</div>
            <input maxlength="32" id="email" type="text">
          </div>
        </div>

        <div class="inputs-container">
          <div class="input-container">
            <div class="title">Телефон</div>
            <input maxlength="32" type="number">
          </div>
        </div>

        <div class="inputs-container">
          <div class="input-container">
            <div class="title">Ссылка на профиль в телеграме</div>
            <input maxlength="64" type="text">
            <div class="hint">Официальная поддержка только через телеграм-аккаунт, указанный при регистрации</div>
          </div>
        </div>

        <div class="inputs-container">
          <div class="input-container">
            <div class="title">Пароль</div>
            <input maxlength="64" id="password" type="password"></div>
        </div>

        <div class="agreement-container">
          <div class="checkmark" @click="checkmark()">
            <img alt="checkmark" src="/assets/icons/checkmark.png" class="checkmark-image" id="checkmark"></img>
          </div>
          <div class="text">Я ознакомился и согласен с <a href="/agreement">Политикой конфиденциальности</a> и <a href="/agreement">Политикой обработки персональных данных</a></div>
        </div>
        <div class="error-text" id="error"></div>
        <div class="done-button" @click="register()">Зарегистрироваться</div>
        <div class="have_account">Уже есть аккаунт? <div></div><a href="/login">Войти в аккаунт</a></div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
