<style lang="scss" scoped>
</style>

<template>
        <v-stage :config="configKonva" class="has-background-white">
            <v-layer>
                <v-circle :config="configCircle"></v-circle>
                <v-rect :config="configRectangle"></v-rect>
                <v-line :config="configLine"></v-line>
            </v-layer>
        </v-stage>
</template>

<script>

export default {
    name: 'Drawing',
    data() {
        return {
            configKonva: {
                width: window.innerWidth,
                height: 500
            },
            configCircle: {
                x: 100,
                y: 100,
                radius: 70,
                fill: "red",
                stroke: "black",
                strokeWidth: 4
            },
            configRectangle: {
                x:300,
                y:100,
                width:100,
                height:200,
                fill:'red',
                shadowBlur:10
            },
            configLine: {
                x: 20,
                y: 200,
                points: [0, -50, 100, 0, 100, 100],
                tension: 0.5,
                closed: true,
                stroke: 'black',
                fillLinearGradientStartPoint: { x: -50, y: -50 },
                fillLinearGradientEndPoint: { x: 50, y: 50 },
                fillLinearGradientColorStops: [0, 'red', 1, 'yellow']
            },
        }
    }
};
</script>
