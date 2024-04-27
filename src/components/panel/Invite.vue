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
import {setCookie} from "@/scripts/cookie.js";
import {loadAuthCookies} from "@/scripts/auth.js";
import {highlightBorder} from "@/scripts/misc.js";
import {resolveStatusStyle, resolveStatusName} from "@/scripts/misc.js";

export default {
  components: {
    Footer,
    PanelHeader,
    PCSideMenu,
    MobileSideMenu,
    CheckAuth
  },
  computed: {},
  data() {
    return {
      auth: null,
      tasks: []
    };
  },
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

    getResult(text) {
      // Создаем новый Blob объект с указанным текстом и MIME-типом
      const blob = new Blob([text], { type: 'text/plain' });

      // Создаем ссылку для объекта Blob
      const url = URL.createObjectURL(blob);

      // Создаем ссылку для скачивания файла
      const link = document.createElement('a');
      link.href = url;
      link.download = 'result.txt';

      // Добавляем ссылку на страницу и эмулируем клик для скачивания файла
      document.body.appendChild(link);
      link.click();

      // Очищаем ссылку и объект Blob после завершения скачивания
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
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
        targets: targets
      }

      console.log(data)

      let createTaskResponse = await request('tasks/create', 'post', this.auth, data)
      let success = validateResponse(createTaskResponse, errorEl)
      if (success) {
        location.reload()
      }
      console.log(success)
    }
  },
  async mounted() {
    this.auth = await loadAuthCookies()
    await this.getTasks()
    setInterval(this.getTasks, 5000);
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
                <textarea id="group" placeholder="Пригласительная или прямая ссылка"></textarea>
              </div>
              <div class="field-container">
                <div id="field-title">Получатели</div>
                <textarea class="paragraph"
                          id="recipients"
                          placeholder="Введите список юзернеймов или номеров, каждый с новой строки"></textarea>
              </div>
            </div>

            <div class="send-button" @click="postInvite">Запустить</div>
            <div class="error" id="error"></div>
          </div>
          <div class="pool-block">
            <div id="pool-block-title">Список задач</div>
            <div class="task-list">
              <table class="tasks-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Статус</th>
                    <th>Результат</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if='this.tasks.length > 0' v-for="task in tasks" :key="task.id">
                    <td>
                      <div class="id">
                        {{ task.id }}
                      </div>
                    </td>
                    <td>
                      <div :style="resolveStatusStyle(task.status)" class="status">
                        {{ resolveStatusName(task.status) }}
                      </div>
                    </td>
                    <td v-if="task.result != null">
                      <div class="status result" @click="getResult(task.result)">
                        Скачать
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
