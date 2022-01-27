<style lang="scss" scoped></style>

<template>
    <v-stage :config="configKonva" class="has-background-white" @click="movePointer">
        <v-layer>
            <v-circle :config="pointer"></v-circle>
            <v-line
                v-for="item in itemList"
                :key="item.id"
                :config="{
                    points: item.line.points,
                    lineCap: 'round',
                    stroke: item.line.stroke,
                    strokeWidth: item.line.strokeWidth,
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
    data() {
        return {
            itemList: [], //{line: ラインオブジェクト, lastPoint: ライン最後の座標}
            itemStack: [],
            isUndoed: false,
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
        this.direction.isUp = false;
        this.direction.isDown = false;
        this.direction.isRight = false;
        this.direction.isLeft = false;
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
        this.timer = setInterval(this.draw, 15);
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
            const areAllKeyUp = Object.values(this.direction).every((bool) => bool == false);
            if (areAllKeyUp) this.setNewLine();
        },
        pushNewLine(x, y) {
            console.log(this.itemList);
            if (this.isUndoed) this.resetStack();
            this.itemList.push({
                line: {
                    points: [x, y],
                    stroke: this.lineConfig.color,
                    strokeWidth: this.lineConfig.weight,
                },
                lastPoint: {},
            });
            this.lineConfig.newLineFlag = false;
        },
        setNewLine() {
            if (this.lineConfig.newLineFlag) return;
            this.itemList[this.itemList.length - 1].lastPoint = {
                x: this.pointer.x,
                y: this.pointer.y,
            };
            console.log(this.itemList[this.itemList.length - 1].lastPoint);
            this.lineConfig.newLineFlag = true;
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
            }
            this.itemList[this.itemList.length - 1].line.points.push(
                this.pointer.x,
                this.pointer.y
            );
        },
        undo() {
            if (this.itemList.length == 0) return;
            this.itemStack.push(this.itemList.pop());
            this.pointer.x = this.itemList[this.itemList.length - 1].lastPoint.x;
            this.pointer.y = this.itemList[this.itemList.length - 1].lastPoint.y;
            this.isUndoed = true;
        },
        redo() {
            if (this.itemStack.length == 0) return;
            this.itemList.push(this.itemStack.pop());
        },
        resetStack() {
            this.itemStack = [];
            this.isUndoed = false;
        },
        movePointer(event) {
            this.setNewLine();
            let stage = event.target.getStage();
            let clickPos = stage.getPointerPosition();
            this.pointer.x = clickPos.x;
            this.pointer.y = clickPos.y;
        },
    },
};
</script>
