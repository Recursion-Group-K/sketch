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
                <Canvas /> 
            </div>
        </div>
        <DrawingTools />
    </section>
</template>

<script>
import DrawingTools from '../components/DrawingTools.vue';
import Canvas from '../components/Canvas.vue';

export default {
    components: {
        DrawingTools,
        Canvas,
    },
    name: 'Drawing',
    data() {
        return {};
    },
};
</script>
