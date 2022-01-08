import  VueRouter  from 'vue-router';
import Home from '../pages/Home.vue';
import NotFound from '../pages/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound', 
        component: NotFound
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
