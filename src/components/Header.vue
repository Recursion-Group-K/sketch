<style scoped lang="scss">
header {
    z-index: 100;
    background-color: $white;
    width: 100%;
    min-height: 5rem;
    position: absolute;
    top: 0;
    box-shadow: $shadow;
}
.register-buttons {
    margin-right: 1.2em;
}
</style>

<template>
    <header>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <img src="../assets/images/logo.svg" class="m-3" />
                    <h3 class="page-title title" style="width: 200px">Etch A Sketch</h3>
                </router-link>

                <a
                    role="button"
                    class="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="header-nav-items"
                    @click="isOpenMenu = !isOpenMenu"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="header-nav-items" class="navbar-menu" :class="{ 'is-active': isOpenMenu }">
                <div class="navbar-start">
                    <router-link to="/gallery" class="navbar-item sub-title">Gallery</router-link>
                </div>

                <div class="navbar-end">
                    <div v-if="isAuthenticated" :class="{ buttons: !isOpenMenu }">
                        <button to="/" @click="logout" class="button navbar-item">Logout</button>
                    </div>
                    <div v-else :class="{ buttons: !isOpenMenu }" class="register-buttons">
                        <router-link to="/signup" class="button is-primary navbar-item">
                            Signup
                        </router-link>
                        <router-link to="/login" class="button is-light navbar-item">
                            Login
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import UserWrapper from '../api/userWrapper';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'Header',
    data() {
        return {
            isOpenMenu: false,
            demoUser: null,
        };
    },
    watch: {
        isAuthenticated(to) {
            if (to == false) this.$router.push({ name: 'Home' });
        },
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated']),
    },
    mounted() {
        new UserWrapper().getById(1).then((user) => (this.demoUser = user));
    },
    methods: {
        ...mapActions('auth', ['logout']),
    },
};
</script>
