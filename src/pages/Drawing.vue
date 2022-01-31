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
        <DrawingTools
            @click-color-picker="clickColorPicker"
            @undo="undo"
            @redo="redo"
            @save="save"
        />
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
        return {
            color: '#000000',
            weight: 3,
        };
    },
    methods: {
        clickColorPicker: function () {
            this.$refs.canvas.stopPointer();
        },
        undo: function () {
            this.$refs.canvas.undo();
        },
        redo: function () {
            this.$refs.canvas.redo();
        },
        save: function () {
            this.$refs.canvas.save();
        },
    },
};
</script>
