<style lang="scss" scoped></style>

<template>
    <div id="canvas" :style="{ height: '100%', width: '100%'}" >
        <v-stage :config="configKonva" class="has-background-white">
            <v-layer>
                <v-circle :config="pointer"></v-circle>
                <v-line :config="lineConfig"></v-line>
            </v-layer>
        </v-stage>
    </div>
</template>

<script>
const velocityOfPointer = 2;
const keyMap = {
    d: 'isUp',
    f: 'isDown',
    k: 'isRight',
    j: 'isLeft',
};

export default {
    name: 'Drawing',
    data() {
        return {
            configKonva: {
                width: 100,
                height: 100,
            },
            pointer: {
                x: 0,
                y: 0,
                radius: 3,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 1,
            },
            lineConfig: {
                stroke: 'black',
                strokeWidth: 3,
                lineCap: 'round',
                points: [0, 0],
            },
            direction: {
                isUp: false,
                isDown: false,
                isRight: false,
                isLeft: false,
            },
            timer: undefined,
        };
    },
    mounted: function () {
        const parent = document.querySelector('#canvas');
        const { clientWidth, clientHeight } = parent;

        /**
         * Init Konva Config
         */
        this.fitCanvas();
        this.pointer.x = clientWidth / 2;
        this.pointer.y = clientHeight / 2;

        this.lineConfig.points = [this.pointer.x, this.pointer.y];

        /**
         * Drawing setting
         */
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        this.timer = setInterval(this.draw, 10);

        /**
         * resize canvas
         */

        window.addEventListener("resize", this.fitCanvas);
    },
    destroyed: function () {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
        clearInterval(this.timer);
    },
    methods: {
        fitCanvas() {
            const parent = document.querySelector('#canvas');
            const { clientWidth, clientHeight } = parent;
            console.log(clientWidth, clientHeight)
            this.configKonva.width = clientWidth;
            this.configKonva.height = clientHeight;
        },
        keyEvent(event, boolean) {
            let key = event.key;
            if (key in keyMap) {
                this.direction[keyMap[key]] = boolean;
            }
        },
        keyDown(event) {
            this.keyEvent(event, true);
        },
        keyUp(event) {
            this.keyEvent(event, false);
        },
        draw() {
            let lastPoint = [this.pointer.x, this.pointer.y];
            if (this.direction['isUp']) this.pointer.y -= velocityOfPointer;
            if (this.direction['isDown']) this.pointer.y += velocityOfPointer;
            if (this.direction['isRight']) this.pointer.x += velocityOfPointer;
            if (this.direction['isLeft']) this.pointer.x -= velocityOfPointer;
            if (lastPoint[0] != this.pointer.x || lastPoint[1] != this.pointer.y) {
                this.lineConfig.points.push(this.pointer.x, this.pointer.y);
            }
        },
    },
};
</script>
