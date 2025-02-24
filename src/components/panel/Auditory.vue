<!--suppress ALL -->
<script>
import '@/styles/panel/Invite.css';
import '@/styles/panel/Auditory.css';
import '@/styles/panel/base/max.css';
import '@/styles/general.css';
import Footer from "@/components/global/footer.vue";
import PanelHeader from "@/components/global/PanelHeader.vue";
import PCSideMenu from "@/components/panel/PCSideMenu.vue";
import MobileSideMenu from "@/components/panel/MobileSideMenu.vue";
import CheckAuth from "@/components/panel/CheckAuth.vue";
import {highlightBorder} from "@/scripts/misc.js";
import {resolveStatusName, resolveStatusStyle} from "@/scripts/resolver.js";
import {request, validateResponse} from "@/scripts/requests.js";
import {loadAuthCookies} from "@/scripts/auth.js";
import TaskList from "@/components/panel/TaskList.vue";


export default {
  data() {
    return {
      tasks: [],
      filters: {}
    };
  },
  components: {
    CheckAuth,
    MobileSideMenu,
    Footer,
    PanelHeader,
    PCSideMenu,
    TaskList
  },
  computed: {},
  methods: {
    async postCollect() {
      let groupsEl = document.getElementById('groups')
      let errorEl = document.getElementById('error')
      let onlineEl = document.getElementById('online')
      let bioEl = document.getElementById('bio')

      let avatarValue = this.filters['avatar']
      console.log(avatarValue)
      if (avatarValue === 'yes') {
        avatarValue = true
      }
      else if (avatarValue === 'no') {
        avatarValue = false
      }
      else {
        avatarValue = null
      }

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

      let params = []

      if (onlineEl.value.length > 0) {
        params.push({
          'param_type': 2,
          'value': onlineEl.value
        })
      }

      if (bioEl.value.length > 0) {
        params.push({
          'param_type': 3,
          'value': bioEl.value
        })
      }

      if (avatarValue != null) {
        params.push({
          'param_type': 1,
          'value': avatarValue.toString()
        })
      }

      let data = {
        targets: targets,
        params: params
      }
      console.log(data)

      let errors = {
        429: 'Превышен лимит задач. Попробуйте позже!',
        400: 'Неверное значение фильтров. Убедитесь, что ввели верные числа'
      }

      let createTaskResponse = await request('tasks/create', 'post', this.auth, data)
      let success = validateResponse(createTaskResponse, errorEl, errors)
      if (success) {
        location.reload()
      }
    },
    selectFilterResult(filter_id, selected_name) {
      let filter = document.getElementById(filter_id)
      let element = null
      filter.querySelectorAll(".select").forEach(select => {
        if (select.dataset.name === selected_name) {
          element = select
          return
        }
      })
      let name = element.dataset.name

      this.resetFilter(filter_id)
      element.classList.add(name)
      element.style.opacity = 1
      this.filters[filter_id] = name
      console.log(this.filters)
    },
    resetFilter(filter_id) {
      let filter_selectbox = document.getElementById(filter_id)
      filter_selectbox.querySelectorAll(".select").forEach(select => {
        select.classList.remove(...select.classList)
        select.classList.add('select')
        select.style.opacity = 0.5
        select.classList.add('default')
      })
    },
    resetAllFilters() {
      let filters = ['avatar']
      filters.forEach(filter => {
        this.resetFilter(filter)
        this.selectFilterResult(filter, 'none')
      })
    },
    unlistFilters() {
      let filtersTitleEl = document.getElementById('fields-title')
      let filtersEl = document.getElementById('filters')

      if (filtersTitleEl.style.background !== 'gray') {
        filtersTitleEl.style.background = 'gray'
        filtersEl.style.display = 'block'
      }
      else {
        filtersTitleEl.style.background = 'none'
        filtersEl.style.display = 'none'
      }
    }
  },
  async mounted() {
    this.auth = await loadAuthCookies()
    this.resetAllFilters()
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
<!--          <span style="font-size: 0.6em; color: #8f8f8f; cursor: pointer; border-style: solid; border-color: transparent; border-bottom: 2px dotted #8f8f8f;">Помощь</span>-->
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
              <div class="field-container params" >
                <div class="field-title filters-title" id="fields-title" @click="unlistFilters">Фильтры</div>
                <div id="filters">
                  <div class="field-subtitle">
                    Фильтры немного повышают стоимость сбора, но позволяют повысить гибкость.
                    <div>&nbsp;</div>
                    <div>Необязательно</div>
                  </div>
                  <div class="filters-container">
                    <div class="filter">
                      <div class="title">Есть аватарка</div>
                      <div class="select-box try-not-wrap" id="avatar">
                        <div class="select" data-name="yes"
                        @click="this.selectFilterResult('avatar', 'yes')">
                          <div class="symbol">✓</div>
                        </div>
                        <div class="select" data-name="none"
                        @click="this.selectFilterResult('avatar', 'none')">
                          <div class="symbol">|</div>
                        </div>
                        <div class="select" data-name="no"
                        @click="this.selectFilterResult('avatar', 'no')">
                          <div class="symbol">☓</div>
                        </div>
                      </div>
                    </div>
                    <div class="filter">
                      <div class="title">Последний раз в сети</div>
                      <div class="select-box no-margin-left" id="last-seen">
                        <input class="short-input no-margin-top center-placeholder" id="online" placeholder="<=" maxlength="4">
                      </div>
                      <div class="title">Дней назад</div>
                    </div>
                    <div class="filter">
                      <div class="title">БИО содержит:</div>
                      <div class="select-box no-margin-left" id="last-seen">
                        <input class="no-margin-top center-placeholder" id="bio" placeholder="Текст">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="error" id="error"></div>
            <div class="send-button" @click="postCollect">Запустить</div>
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
