import VueRouter from 'vue-router';
import Drawing from '../pages/Drawing.vue';
import Login from '../pages/Login.vue';
import SignUp from '../pages/SignUp.vue';
import NotFound from '../pages/NotFound.vue';
import Gallery from '../pages/Gallery.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Login,
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
        path: '/gallery',
        name: 'Gallery',
        component: Gallery,
    },
    {
        path: '/drawing/:id',
        name: 'Drawing',
        component: Drawing,
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
