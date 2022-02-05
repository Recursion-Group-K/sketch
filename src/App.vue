<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>

<template>
    <div id="app">
        <Header />
        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import { mapActions } from 'vuex';
export default {
    name: 'App',
    components: {
        Header,
    },
    methods: {
        ...mapActions('auth', ['initSession']),
    },
    mounted() {
        this.initSession();
    },
};
</script>
