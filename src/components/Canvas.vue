<style lang="scss" scoped></style>

<template>
    <div id="canvas" :style="{ height: '100%', width: '100%' }">
        <v-stage :config="configKonva" class="has-background-white" @click="movePointer">
            <v-layer>
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
                <v-circle
                    :config="{
                        x: pointer.x,
                        y: pointer.y,
                        radius: selectedWeight / 2,
                        fill: 'white',
                        stroke: selectedColor,
                        strokeWidth: 4,
                    }"
                ></v-circle>
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
    data() {
        return {
            itemList: [], //{line: ラインオブジェクト, lastPoint: ライン最後の座標}
            itemStack: [],
            isUndoed: false,
            isAllSaved: false,
            configKonva: {
                width: 100,
                height: 100,
            },
            pointer: {
                x: 0,
                y: 0,
            },
            newLineFlag: true,
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
        this.load();
    },
    destroyed: function () {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
        clearInterval(this.timer);
        if (this.isAllSaved) return;
        if (window.confirm('変更をセーブしますか？')) this.save();
    },
    computed: {
        selectedColor: function () {
            return this.$store.state.drawing.color;
        },
        selectedWeight: function () {
            return this.$store.state.drawing.weight;
        },
    },
    watch: {
        selectedWeight() {
            this.setNewLine();
        },
    },
    methods: {
        stopPointer() {
            this.direction.up = false;
            this.direction.down = false;
            this.direction.right = false;
            this.direction.left = false;
            this.setNewLine();
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
            if (key == 'x') {
                console.log('loaded');
                this.load();
            }
            if(key == 'c'){
                console.log('reset');
                this.reset();
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
                    stroke: this.selectedColor,
                    strokeWidth: this.selectedWeight,
                },
                lastPoint: {},
            });
            this.newLineFlag = false;
        },
        setNewLine() {
            if (this.newLineFlag) return;
            this.newLineFlag = true;
            if (this.itemList.length == 0) return;
            this.itemList[this.itemList.length - 1].lastPoint = {
                x: this.pointer.x,
                y: this.pointer.y,
            };
            console.log(this.itemList[this.itemList.length - 1]);
            this.newLineFlag = true;
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
            if (this.newLineFlag) {
                this.pushNewLine(lastPoint.x, lastPoint.y);
                this.isAllSaved = false;
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
            this.loadDB();
            if(this.itemList.length >= 1){
                const newPoint = this.itemList[this.itemList.length - 1].lastPoint;
                this.pointer.x = newPoint.x;
                this.pointer.y = newPoint.y;
            }
            this.resetStack();
            this.setNewLine();
            this.isAllSaved = true;
        },
        save() {
            this.setNewLine();
            this.saveDB();
            this.isAllSaved = true;
            console.log("saved");
        },
        loadDB(){
            const data = localStorage.getItem('storage') || '[]';
            this.itemList = JSON.parse(data);
        },
        saveDB() {
            localStorage.setItem('storage', JSON.stringify(this.itemList));
        },
        reset() {
            this.itemList = [];
            localStorage.setItem('storage', JSON.stringify(this.itemList));
        },
    },
};
</script>
