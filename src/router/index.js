import VueRouter from 'vue-router';
import Home from '../pages/Home.vue';
import Drawing from '../pages/Drawing.vue';
import Login from '../pages/Login.vue';
import SignUp from '../pages/SignUp.vue';
import NotFound from '../pages/NotFound.vue';
import Header from '../components/Header.vue'

const routes = [
    {
        path: '/',
        name: 'Header',
        component: Header,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/drawing',
        name: 'Drawing',
        component: Drawing,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
