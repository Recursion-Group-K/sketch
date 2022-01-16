<template>
    <div>
        <Header/>
        <div class="hero is-primary is-fullheight-with-navbar">
            <div class="py-5">
                <canvas class="canvas-size"></canvas>
            </div>
            <div class="is-flex is-justify-content-space-between pb-3">
                <div class="is-hidden-desktop px-4">
                    <button class="move-button">up</button>
                    <button class="move-button">down</button>
                </div>

                <div class="is-hidden-desktop px-4">
                    <button class="move-button">left</button>
                    <button class="move-button">right</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>

<script>
import Header from '../components/Header.vue';

export default {
    components: { Header },
    name: 'Drawing',
    data() {
        return {};
    },
};
</script>

<style>
.canvas-size {
    height: 80vh;
    width: 100vw;
    background-color: white;
}
.move-button {
    height: 4rem;
    width: 4rem;
    margin: 0.25rem;
}
@media (min-width: 1024px) {
    .canvas-size {
        height: calc(80vh + 4rem);
    }
}
</style>
