<style lang="scss" scoped>
.shadow {
    box-shadow: $shadow;
}
.canvas-container {
    height: calc(85vh - 5rem);
    width: 100%;
}
</style>

<template>
    <section class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="canvas-container">
                <Canvas ref="canvas" />
            </div>
        </div>
        <DrawingTools @undo="undo" @redo="redo" />
        <KeyUI />
    </section>
</template>

<script>
import DrawingTools from '../components/DrawingTools.vue';
import KeyUI from '../components/KeyUI.vue';
import Canvas from '../components/Canvas.vue';

export default {
    components: {
        DrawingTools,
        Canvas,
        KeyUI,
    },
    name: 'Drawing',
    data() {
        return {};
    },
    methods: {
        undo: function () {
            this.$refs.canvas.undo();
        },
        redo: function () {
            this.$refs.canvas.redo();
        },
    },
};
</script>
