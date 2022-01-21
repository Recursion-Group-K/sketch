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
        <router-view />
    </div>
</template>

<script>
import Header from '../src/components/Header.vue';
export default {
    components: { Header },
    name: 'App',
};
</script>
