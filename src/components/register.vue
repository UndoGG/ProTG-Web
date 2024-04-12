<!--suppress ALL -->
<script>
import '@/styles/register/max.css';
import '@/styles/register/mobile.css';
import '@/styles/global/header/max.css';
import '@/styles/general.css';
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
            <div class="title">Имя</div>
            <input maxlength="32" type="text">
          </div>
        </div>

        <div class="inputs-container">
          <div class="input-container">
            <div class="title">Email</div>
            <input maxlength="32" type="text">
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
            <input maxlength="64" type="password"></div>
        </div>

        <div class="agreement-container">
          <div class="checkmark" @click="checkmark()">
            <img alt="checkmark" src="/assets/icons/checkmark.png" class="checkmark-image" id="checkmark"></img>
          </div>
          <div class="text">Я ознакомился и согласен с <a href="/agreement">Политикой конфиденциальности</a> и <a href="/agreement">Политикой обработки персональных данных</a></div>
        </div>
        <div class="done-button" @click="redirect('/panel', false)">Зарегистрироваться</div>
        <div class="have_account">Уже есть аккаунт? <div></div><a href="/login">Войти в аккаунт</a></div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
