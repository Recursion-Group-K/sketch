<style>
.drawing-container {
    height: 100vh;
}
.body {
    height: calc(100% - 4rem);
}
.button-container {
    height: 20%;
}
.canvas-container {
    height: 80%;
}
.canvass {
    height: calc(100% - 2rem);
    width: calc(100% - 2rem);
}
.move-button {
    height: 4rem;
    width: 4rem;
    margin: 0.25rem;
}
@media (min-width: 1024px) {
    .canvas-container {
        height: 100%;
    }
    .button-container {
        height: 0%;
    }
}
</style>

<template>
    <div class="drawing-container">
        <DrawingTools />
        <div class="has-background-primary d-flex is-flex-direction-column body is-fullwidth">
            <div
                class="canvas-container has-background-grey is-flex is-align-items-center is-justify-content-center"
            >
                <canvas class="canvass has-background-white"></canvas>
            </div>
            <div
                class="is-flex is-justify-content-space-between is-align-items-center button-container is-fullwidth"
            >
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
import DrawingTools from '../components/DrawingTools.vue';

export default {
    components: { DrawingTools },
    name: 'Drawing',
    data() {
        return {};
    },
};
</script>
