import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloud, faEdit, faTrash, faBookReader } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCloud, faEdit, faTrash, faBookReader)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;
Vue.use(VueRouter);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
