<style lang="scss" scoped></style>

<template>
    <v-stage :config="configKonva" class="has-background-white" @click="movePointer">
        <v-layer>
            <v-circle :config="pointer"></v-circle>
            <v-line :config="lineConfig"></v-line>
        </v-layer>
    </v-stage>
</template>

<script>
const velocityOfPointer = 2;
const keyMap = {
    d: 'isUp',
    f: 'isDown',
    k: 'isRight',
    j: 'isLeft',
};
let canvasWidth = window.innerWidth;
let canvasHeight = 500;

export default {
    name: 'Drawing',
    data() {
        return {
            configKonva: {
                width: canvasWidth,
                height: canvasHeight,
            },
            pointer: {
                x: canvasWidth / 2,
                y: canvasHeight / 2,
                radius: 3,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 1,
            },
            lineConfig: {
                stroke: 'black',
                strokeWidth: 3,
                lineCap: 'round',
                points: [canvasWidth / 2, canvasHeight / 2],
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
        this.direction.isUp = false;
        this.direction.isDown = false;
        this.direction.isRight = false;
        this.direction.isLeft = false;
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        this.timer = setInterval(this.draw, 10);
    },
    destroyed: function () {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
        clearInterval(this.timer);
    },
    methods: {
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
        movePointer(event) {
            let stage = event.target;
            let pos = stage.getPointerPosition();
            this.pointer.x=pos.x;
            this.pointer.y=pos.y;
            console.log(pos);
        }
    },
};
</script>
