<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/base/max.css';
import '@/styles/general.css';
import Footer from "@/components/global/footer.vue";
import PanelHeader from "@/components/global/PanelHeader.vue";
import PCSideMenu from "@/components/panel/PCSideMenu.vue";
import MobileSideMenu from "@/components/panel/MobileSideMenu.vue";
import CheckAuth from "@/components/panel/CheckAuth.vue";
import {highlightBorder, resolveStatusName, resolveStatusStyle} from "@/scripts/misc.js";
import {request, validateResponse} from "@/scripts/requests.js";
import {loadAuthCookies} from "@/scripts/auth.js";

export default {
  data() {
    return {
      tasks: []
    };
  },
  components: {
    CheckAuth,
    MobileSideMenu,
    Footer,
    PanelHeader,
    PCSideMenu
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
      let groupsEl = document.getElementById('groups')
      let errorEl = document.getElementById('error')
      if (groupsEl.value.length < 1) {
        highlightBorder(groupsEl)
        return
      }

      let targets = []

      groupsEl.value.split('\n').forEach((group, _) => {
        targets.push(
            {
              "target_type": 1,  // 1 = Collect auditory
              "object": group
            }
        )
      })

      console.log(targets)

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
  },
  async mounted() {
    this.auth = await loadAuthCookies()
    await this.getTasks()
    await this.getTasks()
    setInterval(this.getTasks, 5000);
  }
};
</script>

<template>
  <CheckAuth></CheckAuth>
  <div class="auditory panel-base">
    <PanelHeader></PanelHeader>
    <div class="panel-container">

      <PCSideMenu></PCSideMenu>

      <div class="pool">
        <div id="pool-title">
          Сбор аудитории
          <span style="font-size: 0.6em; color: #8f8f8f; cursor: pointer; border-style: solid; border-color: transparent; border-bottom: 2px dotted #8f8f8f;">Помощь</span>
        </div>
        <div class="content">
          <div class="pool-block">
            <div id="pool-block-title">Сбор аудитории</div>
            <div id="pool-block-subtitle">
              Введите список групп и каналов с привязанным чатом, каждый с новой строки
            </div>

            <div class="fields-container">
              <div class="field-container">
                <div id="field-title">Группы/каналы</div>
                <textarea id="groups" class="paragraph"></textarea>
              </div>
            </div>

            <div class="send-button" @click="postCollect">Запустить</div>
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
