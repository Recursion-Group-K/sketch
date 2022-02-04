<style lang="scss" scoped></style>

<template>
    <div id="canvas" :style="{ height: '100%', width: '100%' }">
        <v-stage :config="configKonva" class="has-background-white" @click="movePointer">
            <v-layer>
                <v-rect
                    :config="{
                        x: 0,
                        y: 0,
                        width: configKonva.width,
                        height: configKonva.height,
                        fill: 'white',
                    }"
                ></v-rect>
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
                        radius: weight / 2,
                        fill: 'white',
                        stroke: color,
                        strokeWidth: 4,
                    }"
                ></v-circle>
            </v-layer>
        </v-stage>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
const velocityOfPointer = 2;

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
        this.itemList = [];
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
    beforeDestroy: function () {
        if (this.isAllSaved) return;
        if (window.confirm('変更をセーブしますか？')) this.save();
    },
    destroyed: function () {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
        clearInterval(this.timer);
    },
    computed: {
        ...mapState('drawing', ['currentDrawing']),
        ...mapState('drawing/drawingEditter', [
            'color',
            'weight',
            'undoTrigger',
            'redoTrigger',
            'saveTrigger',
            'loadTrigger',
            'stopPointerTrigger',
            'pointerSpeed',
        ]),
    },
    watch: {
        weight() {
            this.setNewLine();
        },
        undoTrigger() {
            this.undo();
        },
        redoTrigger() {
            this.redo();
        },
        saveTrigger() {
            this.save();
        },
        loadTrigger() {
            this.load();
        },
        stopPointerTrigger() {
            this.stopPointer();
        },
    },
    methods: {
        ...mapActions('drawing', ['saveDB']),
        ...mapActions('drawing/drawingEditter', ['setPointerSpeed']),
        stopPointer() {
            Object.keys(this.pointerSpeed).forEach((direction) => {
                this.setPointerSpeed({ direction: direction, value: false });
            });
            this.setNewLine();
        },
        fitCanvas() {
            const parent = document.querySelector('#canvas');
            const { clientWidth, clientHeight } = parent;
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
            Object.keys(this.pointerSpeed).forEach((direction) => {
                const keyIncludes = this.pointerSpeed[direction].keys.includes(key);
                if (keyIncludes) {
                    this.setPointerSpeed({ direction: direction, value: boolean });
                }
            });

            if (key == 'x') {
                console.log('loaded');
                this.load();
            }
            if (key == 'c') {
                console.log('reset');
                this.reset();
            }
        },
        keyDown(event) {
            this.keyEvent(event, true);
        },
        keyUp(event) {
            this.keyEvent(event, false);
            const areAllKeyUp = Object.values(this.pointerSpeed).every(
                (element) => element.value == false
            );
            if (areAllKeyUp) this.setNewLine();
        },
        pushNewLine(x, y) {
            if (this.isUndoed) this.resetStack();
            this.itemList.push({
                line: {
                    points: [x, y],
                    stroke: this.color,
                    strokeWidth: this.weight,
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
            if (this.pointerSpeed['up'].value) this.pointer.y -= velocityOfPointer;
            if (this.pointerSpeed['down'].value) this.pointer.y += velocityOfPointer;
            if (this.pointerSpeed['right'].value) this.pointer.x += velocityOfPointer;
            if (this.pointerSpeed['left'].value) this.pointer.x -= velocityOfPointer;
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
            console.log('loading');
            this.loadDB();
            if (this.itemList.length >= 1) {
                const newPoint = this.itemList[this.itemList.length - 1].lastPoint;
                this.pointer.x = newPoint.x;
                this.pointer.y = newPoint.y;
            }
            this.resetStack();
            this.setNewLine();
            this.isAllSaved = true;
        },
        save() {
            console.log('saving');
            this.setNewLine();

            let stage = document.getElementById('canvas');
            let canvas = stage.querySelector('canvas');
            let dataURL = canvas.toDataURL();
            this.saveDB({ itemList: this.itemList, dataURL: dataURL });

            this.isAllSaved = true;
            console.log(dataURL);
            console.log('saved');

            //画像download
            this.downloadURI(dataURL, 'stage.png');
        },
        loadDB() {
            console.log('fire');
            console.log(this.currentDrawing.data);
            const data = JSON.stringify(this.currentDrawing.data);
            if (data == '{}') {
                this.itemList = JSON.parse('[]');
                return;
            }
            console.log(data);
            this.itemList = JSON.parse(JSON.parse(data));
            console.log(this.itemList);
        },
        reset() {
            this.itemList = [];
            localStorage.setItem('storage', JSON.stringify(this.itemList));
        },
        downloadURI(uri, name) {
            var link = document.createElement('a');
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    },
};
</script>
