<style lang="scss" scoped>
.drawing-container {
    height: 100vh;
    width: 100vw;
    .body {
        flex-direction: column;
        height: calc(100% - 4rem);
        .canvas-container {
            height: 80%;
            background-color: $grey;
            display: flex;
            justify-content: center;
            align-items: center;
            @include desktop {
                height: 100%;
            }
        }
        .button-container {
            @extend .is-hidden-desktop;
            height: 20%;
            background-color: $link;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .move-button {
                @extend .m-1;
                height: 4rem;
                width: 4rem;
            }
        }
    }
}
</style>

<template>
    <section class="drawing-container is-fullheight">
        <DrawingTools @change-color="changeColor" @change-weight="changeWeight" />
        <div class="body">
            <div class="canvas-container">
                <Canvas :newColor="color" :newWeight="weight" />
            </div>
            <div class="button-container">
                <div class="px-4">
                    <button class="move-button">up</button>
                    <button class="move-button">down</button>
                </div>

                <div class="px-4">
                    <button class="move-button">left</button>
                    <button class="move-button">right</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import DrawingTools from '../components/DrawingTools.vue';
import Canvas from '../components/Canvas.vue';

export default {
    components: { DrawingTools, Canvas },
    name: 'Drawing',
    data() {
        return {
            color: '#000000',
            weight: 3,
        };
    },
    methods: {
        changeColor: function (newColor) {
            this.color = newColor;
        },
        changeWeight: function (newWeight) {
            this.weight = newWeight;
        },
    },
};
</script>
