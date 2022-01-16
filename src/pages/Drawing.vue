<style>
.drowing-container{
    height: calc(100vh - 4.5rem);
}
.button-container{
    height: 20%;
}
.canvas-container {
    height: 85%;
    width: 100vw;
}
.move-button {
    height: 4rem;
    width: 4rem;
    margin: 0.25rem;
}
@media (min-width: 1024px) {
    .canvas-container {
        height: 95%;
    }
}
</style>

<template>
    <div>
        <Header/>
        <div class="has-background-primary drowing-container d-flex is-flex-direction-column">
            <div class="py-0 canvas-container has-background-grey">
                <canvas class="has-background-white"></canvas>
            </div>
            <div class="is-flex is-justify-content-space-between button-container pb-3">
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
