<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/base/max.css';
import '@/styles/panel/base/mobile.css';
import '@/styles/general.css';
import Footer from "@/components/global/footer.vue";
import PanelHeader from "@/components/global/PanelHeader.vue";
import PCSideMenu from "@/components/panel/PCSideMenu.vue";
import MobileSideMenu from "@/components/panel/MobileSideMenu.vue";
import CheckAuth from "@/components/panel/CheckAuth.vue";
import {request, validateResponse} from "@/scripts/requests.js";
import {loadAuthCookies} from "@/scripts/auth.js";
import {highlightBorder} from "@/scripts/misc.js";
import {resolveStatusName, resolveStatusStyle} from "@/scripts/resolver.js";
import {getResult} from "@/scripts/helper.js";
import TaskList from "@/components/panel/TaskList.vue";


export default {
  components: {
    Footer,
    PanelHeader,
    PCSideMenu,
    MobileSideMenu,
    CheckAuth,
    TaskList
  },
  computed: {},
  data() {
    return {
      auth: null
    };
  },
  methods: {
    getResult(text) {
      return getResult(text)
    },

    async postInvite() {
      let groupEl = document.getElementById('group')
      let recipientsEl = document.getElementById('recipients')
      let errorEl = document.getElementById('error')

      if (groupEl.value.length < 1) {
        highlightBorder(groupEl)
        return
      }
      if (recipientsEl.value.length < 1) {
        highlightBorder(recipientsEl)
        return
      }

      let targets = []

      recipientsEl.value.split('\n').forEach((recipient, _) => {
        targets.push(
            {
              "target_type": 3,  // 3 = Invite
              "recipient": recipient,
              "object": groupEl.value
            }
        )
      })

      let data = {
        targets: targets,
        params: []
      }

      let createTaskResponse = await request('tasks/create', 'post', this.auth, data)

      let errors = {
        429: 'Превышен лимит задач. Попробуйте позже!'
      }
      let success = validateResponse(createTaskResponse, errorEl, errors)
      if (success) {
        location.reload()
      }
    }
  },
  async mounted() {
    document.addEventListener('keydown', this.keyPress);
    this.auth = await loadAuthCookies()
  }
};
</script>

<template>
  <CheckAuth></CheckAuth>
  <div class="invite panel-base">
    <PanelHeader></PanelHeader>
    <div class="panel-container">

      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title"></div>
        <div class="content">
          <div class="pool-block">
            <div id="pool-block-title">Пригласить в группу</div>
            <div id="pool-block-subtitle">Должны быть включены настройки добавления участников</div>

            <div class="fields-container">
              <div class="field-container">
                <div >Группа для инвайта</div>
                <textarea id="group" placeholder="Ссылка"></textarea>
              </div>
              <div class="field-container">
                <div id="field-title">Получатели</div>
                <textarea class="paragraph"
                          id="recipients"
                          placeholder="Введите список юзернеймов или номеров, каждый с новой строки"></textarea>
              </div>
            </div>

            <div class="error" id="error"></div>
            <div class="send-button" @click="postInvite">Запустить</div>
          </div>

          <TaskList></TaskList>
        </div>
      </div>



      <MobileSideMenu></MobileSideMenu>

    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
