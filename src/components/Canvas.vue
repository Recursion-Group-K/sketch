<style lang="scss" scoped></style>

<template>
    <div id="canvas" :style="{ height: '100%', width: '100%'}" >
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
            lineList: [],
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
                strokeWidth: 2,
            },
            lineConfig: {
                color: 'black',
                weight: 3,
                newLineFlag: true,
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

        /**
         * Drawing setting
         */
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        this.timer = setInterval(this.draw, 15);

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
            const areAllKeyUp = Object.values(this.direction).every((bool) => bool == false);
            if (areAllKeyUp) this.lineConfig.newLineFlag = true;
        },
        pushNewLine(x, y) {
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
            const isSamePoint = lastPoint.x == this.pointer.x && lastPoint.y == this.pointer.y;
            if (isSamePoint) {
                return;
            }
            if (this.lineConfig.newLineFlag) {
                this.pushNewLine(lastPoint.x, lastPoint.y);
                this.lineConfig.newLineFlag = false;
                console.log(this.lineList);
            }
            this.lineList[this.lineList.length - 1].points.push(this.pointer.x, this.pointer.y);
        },
        movePointer(event) {
            let stage = event.target.getStage();
            let clickPos = stage.getPointerPosition();
            this.pointer.x = clickPos.x;
            this.pointer.y = clickPos.y;
            this.lineConfig.newLineFlag = true;
        },
    },
};
</script>
