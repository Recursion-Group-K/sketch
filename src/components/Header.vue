<style scoped lang="scss">
header {
    // position: absolute;
}
</style>

<template>
    <header>
        <router-link to="/signup"><p>signup</p></router-link>
        <router-link to="/login"><p>login</p></router-link>
        <router-link :to="drawingMode"><p>drawing</p></router-link>
    </header>
</template>

<script>
import store from '../store/index.js';
export default {
    name: 'Header',
    data() {
        return {};
    },
    computed: {
        drawingMode: function () {
            if (store.state.mode == 'Etch a Sketch') {
                return '/drawing/etchASketch';
            } else return '/drawing';
        },
    },
};
</script>
