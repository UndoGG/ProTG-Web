<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/base/max.css';
import '@/styles/general.css';
import {loadAuthCookies} from "@/scripts/auth.js";
import {openLink} from "@/scripts/links.js";
import {request} from "@/scripts/requests.js";
import {resolveStatusName, resolveStatusStyle} from "@/scripts/resolver.js";
import {getResult} from "@/scripts/helper.js";

export default {
  data() {
    return {
      tasks: [],
      auth: null
    };
  },
  components: {
  },
  computed: {},
  methods: {
    getResult(text) {
      return getResult(text)
    },
    calcShow(task) {
      if (task.result == null) {
        return false
      }
      let denied = [1, 2, 9]
      if (denied.includes(task.status)) {
        return false
      }
      return true
    },
    resolveStatusStyle(int) {
      return resolveStatusStyle(int)
    },
    resolveStatusName(int) {
      return resolveStatusName(int)
    },
    async getTasks() {
      this.tasks = await request('tasks/my', 'get', this.auth)
      this.tasks = this.tasks.data.reverse()
    },
    redirect(link, blank) {
      openLink(link, blank);
    }
  },
  async mounted() {
    this.auth = await loadAuthCookies()
    if (this.auth == null) {
      return
    }
    await this.getTasks()
    setInterval(this.getTasks, 5000);

  }
};
</script>

<template>
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
            <td v-if="calcShow(task)">
              <div class="status result" @click="getResult(task.result)">
                Скачать
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
