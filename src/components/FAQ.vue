<!--suppress ALL -->
<script>
import '@/styles/agreement/max.css';
import '@/styles/agreement/300x450.css';
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
    redirect(link) {
      openLink(link, true);
    },
    unlist_answer(answer_component_id) {
      let answer_component = document.getElementById(answer_component_id);
      if (answer_component.style.display == 'block') {
        answer_component.style.display = 'none';
      }
      else {
        answer_component.style.display = 'block';
      }
    },
  }
};
</script>

<template>
  <div class="faq home">
    <Header></Header>
    <div class="faq-container">
        <div class="faq-title">Часто задаваемые вопросы</div>
        <div class="faq-list no-background">
          <div class="item" @click="unlist_answer('answer_1')">
            <div class="head-container">
              <div class="container">
                <div class="text">Как пользоваться сервисом ProTG?</div>
              </div>
              <div class="right-container">
                <div class="pointer"></div>
              </div>
            </div>
            <div class="answer" id="answer_1">
              Допустим, вы хотите добавить подписчиков в группу, для этого вам нужно выполнить
              следующие действия:

              <div>&nbsp</div>
              1) Установить в настройках самой группы:
              <div>&nbsp</div>
              - тип Группы - Публичная;
              <div></div>
              - убрать запрет на добавление участников, нужно активировать вот так http://joxi.ru/p27DwNbTLgBw1A

              <div>&nbsp</div>
              А) Установите бота для чистки сообщений о вступивших - http://joxi.ru/8Ang8RpIKWNyxr

              <div>&nbsp</div>
              Нужно добавить несколько ботов в группу:
              <div></div>
              @AntiServiceMessage_Bot
              <div></div>
              @LeftChatDestroyer_bot
              <div></div>
              @Protectronbot
              <div></div>
              @joinhide19_bot

              <div>&nbsp</div>
              Лучше больше двух, потому что если один — он может сломаться.
              <div></div>
              Б) Соберите аудиторию (Вам нужно скопировать название чата или канала и в утилите «Сбор аудитории» вставить его в окошко и нажимаете запустить – И ждем пока наша аудитория будет собрана)

              <div>&nbsp</div>
              Б) Пригласите её через наш сервис через раздел «Инвайт». В раздел «Получатели» вставляем полученную базу и в «группу для инвайта» - пишем название нашего чата.  Необходимо заранее, перед тем как делать инвайт, создать чат в Telegram.

              <div>&nbsp</div>
              В) Нажмите кнопку запустить. После нажатия кнопки пользователи начинают добавляться в тот чат, который вы указали.

              <div>&nbsp</div>
              Поддержка:

              <div>&nbsp</div>
              Telegram: https://t.me/pro_tg56

              <div>&nbsp</div>
              По почте: axel-f56@yandex.ru

              <div>&nbsp</div>
              Инструкция в видео-формате: https://vimeo.com/892162788
            </div>
          </div>

          <div class="item" @click="unlist_answer('answer_2')">
            <div class="head-container">
              <div class="container">
                <div class="text">Как искать чаты и каналы с вашей аудиторией?</div>
              </div>
              <div class="right-container">
                <div class="pointer"></div>
              </div>
            </div>
            <div class="answer" id="answer_2">
              Для того чтобы найти вам вашу аудиторию вам необходимо сделать парсинг вашей аудитории с ваших конкурентов или тематических чатов и каналов, в которых открыты комментарии.

              <div>&nbsp;</div>
              Какие есть способы:

              <div>&nbsp;</div>
              1) Через нашу утилиту "Поиск чатов и каналов". В этом способе вам достаточно написать ключевое слово и сервис начнет сбор каналов по нему. В результате вы получите готовый список подходящих чатов и каналов.

              <div>&nbsp;</div>
              2) Через Специализированные сервисы: Tgstat, Telemetr и другие.

              <div>&nbsp;</div>
              3) Через поисковые системы (Яндекс, Google и другие). Для поиска подходящих каналов используйте формат поиска: "Ключевое слово" + Телеграмм. (Например: Фармацевтика телеграм)
              <div>&nbsp;</div>
              Видеоурок "Поиск аудитории для инвайтинга": https://www.youtube.com/watch?v=7jt78Ms5HaU&list=PLLQbzn-SGvsJSrrnicwW0z1zs1GmmJlDr&index=1
            </div>
          </div>
          <div class="item" @click="unlist_answer('answer_3')">
            <div class="head-container">
              <div class="container">
                <div class="text">Для чего нужен ваш сервис?</div>
              </div>
              <div class="right-container">
                <div class="pointer"></div>
              </div>
            </div>
            <div class="answer" id="answer_3">
              Наш сервис предлагает удобные и эффективные утилиты, которые значительно экономят ваше время на поиск подходящей аудитории и автоматизируют процесс ее добавления в вашу группу (чат) в телеграм. Благодаря нашим инструментам вы сможете быстро и легко провести парсинг целевой аудитории, которая будет заинтересована в вашем контенте и продуктах. Больше не нужно тратить много времени на поиск подписчиков вручную - наши утилиты сделают все за вас!
            </div>
          </div>
          <div class="item" @click="unlist_answer('answer_4')">
            <div class="head-container">
              <div class="container">
                <div class="text">С какой скоростью добавляться подписчики?</div>
              </div>
              <div class="right-container">
                <div class="pointer"></div>
              </div>
            </div>
            <div class="answer" id="answer_4">
              ProTG работает через официальный API Telegram с учетом задержек и лимитов. Вы можете поставить задачу на добавление любого количества пользователей, но добавляться они будут плавно, примерно по 250-300 человек в сутки. В любой момент можно проверить текущий статус в разделе "Продвижение->Инвайт".
            </div>
          </div>
          <div class="item" @click="unlist_answer('answer_5')">
            <div class="head-container">
              <div class="container">
                <div class="text">Как собрать аудиторию с конкурентов?</div>
              </div>
              <div class="right-container">
                <div class="pointer"></div>
              </div>
            </div>
            <div class="answer" id="answer_5">
              Для того, чтобы собрать аудиторию - укажите ссылку на группу или канал конкурента, где открыты комментарии в разделе "Сбор аудитории". Наши инструменты автоматически соберут целевую аудиторию, которая будет заинтересована в вашем контенте и продуктах.
              <div>&nbsp;</div>
              Если сбор не работает, то, скорее всего, вы указали канал, где закрыты комментарии. С таким каналов собрать аудиторию невозможно.
            </div>
          </div>
          <div class="item" @click="unlist_answer('answer_6')">
            <div class="head-container">
              <div class="container">
                <div class="text">Как мне раскрутить канал в телеграмме?</div>
              </div>
              <div class="right-container">
                <div class="pointer"></div>
              </div>
            </div>
            <div class="answer" id="answer_6">
              Как раскрутить канал? Если инвайтить можно только в группу. Мы создали бесплатного бота @checkerchats_bot для перелива аудитории с группы в канал, вам нужно добавить бота в группу и сделать администратором, и в канале сделать так же администратором.

              Название бота: @checkerchats_bot

              После добавления в группу и в канал бота, в группе пропишите команду с вашего аккаунта админа обязательно вы как админ в группе должны быть не анонимны:
              /kanal t.me/ссылканавашканал
              где "ссылканавашканал" - это публичная ссылка на ваш канал
              например, как тут: http://joxi.ru/8Ang8RpIKBqK1r

              Когда выполнили все действия выше, бот будет показывать в окне уведомления, что нужно подписаться на канал, прежде чем писать в группе.
            </div>
          </div>
        </div>
      </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
