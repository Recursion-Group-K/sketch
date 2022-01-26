<style lang="scss" scoped></style>

<template>
    <v-stage :config="configKonva" class="has-background-white" @click="movePointer">
        <v-layer>
            <v-circle :config="pointer"></v-circle>
            <v-line
                v-for="line in lineList"
                :key="line.id"
                :config="{
                    points: line.points,
                    lineCap: 'round',
                    stroke: line.stroke,
                    strokeWidth: line.strokeWidth,
                }"
            ></v-line>
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
    props: ['newWeight'],
    data() {
        return {
            lineList: [],
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
                strokeWidth: 4,
            },
            lineConfig: {
                color: 'black',
                weight: 3,
                newLineFlag: false,
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
        this.newLinePush(this.pointer.x, this.pointer.y);
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        this.timer = setInterval(this.draw, 15);
    },
    destroyed: function () {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
        clearInterval(this.timer);
    },
    watch: {
        newWeight: function () {
            let newWeight = Number(this.newWeight);
            this.lineConfig.weight = newWeight;
            this.pointer.radius = newWeight / 2;
        },
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
        newLinePush(x, y) {
            this.lineList.push({
                points: [x, y],
                stroke: this.lineConfig.color,
                strokeWidth: this.lineConfig.weight,
            });
        },
        draw() {
            let lastPoint = { x: this.pointer.x, y: this.pointer.y };
            if (this.direction['isUp']) this.pointer.y -= velocityOfPointer;
            if (this.direction['isDown']) this.pointer.y += velocityOfPointer;
            if (this.direction['isRight']) this.pointer.x += velocityOfPointer;
            if (this.direction['isLeft']) this.pointer.x -= velocityOfPointer;
            if (lastPoint.x != this.pointer.x || lastPoint.y != this.pointer.y) {
                if (this.lineConfig.newLineFlag) {
                    this.newLinePush(this.pointer.x, this.pointer.y);
                    console.log(this.lineList);
                }
                this.lineConfig.newLineFlag = false;
                this.lineList[this.lineList.length - 1].points.push(this.pointer.x, this.pointer.y);
            } else {
                this.lineConfig.newLineFlag = true;
            }
        },
        movePointer(event) {
            let stage = event.target.getStage();
            let clickPos = stage.getPointerPosition();
            this.pointer.x = clickPos.x;
            this.pointer.y = clickPos.y;
        },
    },
};
</script>
