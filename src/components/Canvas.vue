<style lang="scss" scoped></style>

<template>
    <div id="canvas" :style="{ height: '100%', width: '100%' }">
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
                <v-line
                    v-for="item in savedItemList"
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
    </div>
</template>

<script>
const velocityOfPointer = 2;
const keyMap = {
    d: 'up',
    f: 'down',
    k: 'right',
    j: 'left',
};

export default {
    name: 'Drawing',
    props: ['newWeight', 'newColor'],
    data() {
        return {
            itemList: [], //{line: ラインオブジェクト, lastPoint: ライン最後の座標}
            savedItemList: [], //saveしたitemList。undoで消えない。
            itemStack: [],
            isUndoed: false,
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
                strokeWidth: 4,
            },
            lineConfig: {
                color: 'black',
                weight: 3,
                newLineFlag: true,
            },
            direction: {
                up: false,
                down: false,
                right: false,
                left: false,
            },
            limit: {
                up: 0,
                down: 0,
                right: 0,
                left: 0,
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

        window.addEventListener('resize', this.fitCanvas);
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
            this.lineConfig.newLineFlag = true;
        },
        newColor: function () {
            this.lineConfig.color = this.newColor;
            this.pointer.stroke = this.newColor;
            this.lineConfig.newLineFlag = true;
        },
    },
    methods: {
        stopPointer() {
            this.direction.up = false;
            this.direction.down = false;
            this.direction.right = false;
            this.direction.left = false;
        },
        fitCanvas() {
            const parent = document.querySelector('#canvas');
            const { clientWidth, clientHeight } = parent;
            //console.log(clientWidth, clientHeight);
            this.configKonva.width = clientWidth;
            this.configKonva.height = clientHeight;
            this.limit.down = clientHeight;
            this.limit.right = clientWidth;
            this.checkOverLimit(this.pointer);
        },
        checkOverLimit(point) {
            if (point.x < this.limit.left) point.x = this.limit.left;
            if (point.x > this.limit.right) point.x = this.limit.right;
            if (point.y < this.limit.up) point.y = this.limit.up;
            if (point.y > this.limit.down) point.y = this.limit.down;
        },
        keyEvent(event, boolean) {
            let key = event.key;
            if (key in keyMap) {
                this.direction[keyMap[key]] = boolean;
            }
            if(key=="z"){
                console.log("saved");
                this.save();
            }
            if(key=="x"){
                console.log("loaded");
                this.load();
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
            this.lineConfig.newLineFlag = true;
            if(this.itemList.length==0)return
            this.itemList[this.itemList.length - 1].lastPoint = {
                x: this.pointer.x,
                y: this.pointer.y,
            };
            console.log(this.itemList[this.itemList.length - 1]);
        },
        draw() {
            let lastPoint = { x: this.pointer.x, y: this.pointer.y };
            if (this.direction['up']) this.pointer.y -= velocityOfPointer;
            if (this.direction['down']) this.pointer.y += velocityOfPointer;
            if (this.direction['right']) this.pointer.x += velocityOfPointer;
            if (this.direction['left']) this.pointer.x -= velocityOfPointer;
            this.checkOverLimit(this.pointer);
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
            this.setNewLine();
            if (this.itemList.length == 0) return;
            this.itemStack.push(this.itemList.pop());
            if (this.itemList.length == 0) return;
            const newPoint = this.itemList[this.itemList.length - 1].lastPoint;
            this.pointer.x = newPoint.x;
            this.pointer.y = newPoint.y;
            this.isUndoed = true;
        },
        redo() {
            this.setNewLine();
            if (this.itemStack.length == 0) return;
            this.itemList.push(this.itemStack.pop());
            const newPoint = this.itemList[this.itemList.length - 1].lastPoint;
            this.pointer.x = newPoint.x;
            this.pointer.y = newPoint.y;
        },
        resetStack() {
            this.itemStack = [];
            this.isUndoed = false;
        },
        movePointer(event) {
            this.setNewLine();
            let stage = event.target.getStage();
            let clickPos = stage.getPointerPosition();
            this.checkOverLimit(clickPos);
            this.pointer.x = clickPos.x;
            this.pointer.y = clickPos.y;
        },
        load() {
            const data = localStorage.getItem('storage') || '[]';
            this.savedItemList = JSON.parse(data);
            const newPoint=this.savedItemList[this.savedItemList.length-1].lastPoint;
            this.pointer.x=newPoint.x;
            this.pointer.y=newPoint.y;
            this.resetStack();
            this.itemList=[];
            this.setNewLine();
        },
        save() {
            this.setNewLine();
            this.itemList.forEach(element=>{
                this.savedItemList.push(element);
            });
            localStorage.setItem('storage', JSON.stringify(this.savedItemList));
            this.itemList=[];
        }
    },
};
</script>
