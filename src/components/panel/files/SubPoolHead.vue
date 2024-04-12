<!--suppress ALL -->
<script>
import '@/styles/panel/Files/max.css';
import '@/styles/panel/base/max.css';
import '@/styles/general.css';

export default {
  computed: {
    currentWindow() {
      return this.$store.state.currentWindow;
    }
  },
  methods: {
    async switch(ref) {
      this.$store.commit('setCurrentWindow', ref);
    },
    parseHead(ref) {
      return {
        'window-head': true,
        'active': this.currentWindow === ref,
        'inactive': this.currentWindow !== ref
      };
    },
    parseColor(ref) {
      return {
        'active-background': this.currentWindow === ref
      };
    }
  }
}
</script>


<template>
  <div class="head">
    <div :class="parseHead('head-collide')" @click="this.switch('head-collide')">
      Объединить и перемешать
      <div :class="parseColor('head-collide')"></div>
    </div>
    <div :class="parseHead('head-remove')" @click="this.switch('head-remove')">
      Убрать повторения
      <div :class="parseColor('head-remove')"></div>
    </div>
    <div :class="parseHead('head-normalize')" @click="this.switch('head-normalize')">
      Нормализовать телефоны
      <div :class="parseColor('head-normalize')"></div>
    </div>
  </div>
</template>

<style scoped>

</style>
