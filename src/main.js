import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueKonva from 'vue-konva';

library.add(fas, fab);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueKonva);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');

