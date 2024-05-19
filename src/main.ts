import './assets/css/main.css';
import 'v-calendar/style.css';
import "vue-awesome-paginate/dist/style.css";

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import VueApexCharts from 'vue3-apexcharts';
import VueAwesomePaginate from "vue-awesome-paginate";
import VueTheMask from 'vue-the-mask'

import i18n from './plugins/vue-i18n';

import { setupCalendar } from 'v-calendar';

const app = createApp(App);

app.use(createPinia());
app.use(VueApexCharts);
app.use(setupCalendar, {})
app.use(VueAwesomePaginate)
app.use(VueTheMask)
app.use(router);
app.use(i18n)

app.mount('#app');
