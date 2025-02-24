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
import {loadAuthCookies} from "@/scripts/auth.js";
import {resolveStatusName, resolveStatusStyle} from "@/scripts/resolver.js";
import {highlightBorder} from "@/scripts/misc.js";
import {request, validateResponse} from "@/scripts/requests.js";
import TaskList from "@/components/panel/TaskList.vue";
import {getResult} from "@/scripts/helper.js";


export default {
  data() {
    return {
      tasks: []
    };
  },
  components: {
    CheckAuth,
    Footer,
    PanelHeader,
    PCSideMenu,
    MobileSideMenu,
    TaskList
  },
  computed: {},
  methods: {
    resolveStatusStyle(int) {
      return resolveStatusStyle(int)
    },
    resolveStatusName(int) {
      return resolveStatusName(int)
    },
    async getTasks() {
      this.tasks = await request('tasks/my', 'get', this.auth)
      validateResponse(this.tasks)
      this.tasks = this.tasks.data.reverse()
    },

    async postCollect() {
      let textEl = document.getElementById('text')
      let recipientsEl = document.getElementById('recipients')
      let errorEl = document.getElementById('error')
      if (textEl.value.length < 1) {
        highlightBorder(textEl)
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
              "target_type": 2,  // 2 = send message
              "object": textEl.value,
              "recipient": recipient
            }
        )
      })

      let data = {
        targets: targets,
        params: []
      }


      let errors = {
        429: 'Превышен лимит задач. Попробуйте позже!'
      }
      let createTaskResponse = await request('tasks/create', 'post', this.auth, data)
      let success = validateResponse(createTaskResponse, errorEl, errors)
      if (success) {
        location.reload()
      }
    },

    getResult(text) {
      return getResult(text)
    },
    handleFileSelect(event) {
      const file = event.target.files[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = function(event) {
        const text = event.target.result;
        let dispatchTextEl = document.getElementById('text');
        dispatchTextEl.value = text
      };

      reader.readAsText(file);
    }
  },
  async mounted() {
    this.auth = await loadAuthCookies()
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', this.handleFileSelect);
  }
};
</script>

<template>
  <CheckAuth></CheckAuth>
  <div class="invite dispatch panel-base">
    <PanelHeader></PanelHeader>
    <div class="panel-container">

      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title">Рассылка</div>
        <div class="content">
          <div class="left-container">
            <div class="pool-block">
              <div id="pool-block-title">Разослать сообщения</div>
              <div class="fields-container">
                <div class="field-container">
                  <div id="field-title">Текст рассылки</div>
                  <textarea
                      id="text"
                      class="medium-paragraph"
                      placeholder="Введите текст"></textarea>
                </div>
                <div class="field-container">
                  <div id="field-title">Получатели</div>
                  <textarea class="paragraph"
                            id="recipients"
                            placeholder="Введите список юзернеймов или номеров, каждый с новой строки"></textarea>
                </div>
              </div>

              <div class="error" id="error"></div>
              <div class="send-button" @click="postCollect">Запустить</div>
            </div>
          </div>
          <div class="right-container">
            <div class="pool-block">
              <div id="pool-block-title">Импорт файлов</div>
              <div id="pool-block-subtitle">Импортируйте текст из файла</div>

              <div class="fields-container">
                <input type="file" id="fileInput" placeholder="Выбор файла">
              </div>
            </div>


          <TaskList></TaskList>

          </div>
        </div>
      </div>



      <MobileSideMenu></MobileSideMenu>

    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
