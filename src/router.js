// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/home.vue';
import Register from './components/register.vue';
import Login from './components/login.vue';
import Agreement from './components/agreement.vue';
import Test from './components/global/header-mobile.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/registration', component: Register },
    { path: '/login', component: Login },
    { path: '/agreement', component: Agreement },
    { path: '/tst', component: Test },
  ],
});

export default router;
