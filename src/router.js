// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/home.vue';
import Register from './components/register.vue';
import Login from './components/login.vue';
import Agreement from './components/agreement.vue';
import Auditory from "@/components/panel/Auditory.vue";
import Invite from './components/panel/Invite.vue'
import Files from "@/components/panel/files/Files.vue";
import FAQ from "@/components/FAQ.vue";
import Deposit from "@/components/panel/Deposit.vue";
import Partnership from "@/components/panel/Partnership.vue";
import Guidance from "@/components/panel/Guidance.vue";
import Dispatch from "@/components/panel/Dispatch.vue";
import Prices from "@/components/Prices.vue";
import Users from "@/components/admin/panel/Users.vue";
import Balance from "@/components/admin/panel/Balance.vue";
import SystemPrices from "@/components/admin/panel/SystemPrices.vue";
import Limits from "@/components/admin/panel/Limits.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/faq', component: FAQ },
    { path: '/registration', component: Register },
    { path: '/login', component: Login },
    { path: '/agreement', component: Agreement },
    { path: '/prices', component: Prices },
    { path: '/panel/', component: Invite },
    { path: '/panel/auditory', component: Auditory },
    { path: '/panel/files', component: Files },
    { path: '/panel/deposit', component: Deposit },
    { path: '/panel/partnership', component: Partnership },
    { path: '/panel/guidance', component: Guidance },
    { path: '/panel/dispatch', component: Dispatch },
    { path: '/admin', component: Users },
    { path: '/admin/balance', component: Balance },
    { path: '/admin/prices', component: SystemPrices },
    { path: '/admin/limits', component: Limits },
  ],
});

export default router;
