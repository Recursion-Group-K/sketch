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
            configKonva: {
                width: 100,
                height: 100,
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
        this.setItemList([]);
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
        ...mapState('drawing', ['drawing']),
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

        /**
         *
         */
        fitCanvas() {
            const parent = document.querySelector('#canvas');
            const { clientWidth, clientHeight } = parent;
            this.configKonva.width = clientWidth;
            this.configKonva.height = clientHeight;
            this.limit.down = clientHeight;
            this.limit.right = clientWidth;
            this.checkOverLimit(this.pointer);
        },

        

        /**
         * KeyDown
         */
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
        /**
         * Getters
         */
        
        /**
         * Setters
         */
        pushNewLine({ x, y }) {
            if (this.isUndoed) this.resetStack();
            this.itemList.push({
                line: {
                    points: [x, y],
                    stroke: this.color,
                    strokeWidth: this.weight,
                },
                lastPoint: {},
            });
            this.setNewLineFlag(false);
        },
        pushNewPoint({ x, y }) {
            this.itemList[this.itemList.length - 1].line.points.push(x, y);
        },
        setNewLine() {
            if (this.newLineFlag) return;
            this.setNewLineFlag(true);

            if (this.itemList.length == 0) return;
            this.setLastPoint(this.pointer);
        },
        /**
         * Draw
         */
        draw() {
            const lastPoint = this.getPointerClone();
            if (this.pointerSpeed['up'].value) this.pointer.y -= velocityOfPointer;
            if (this.pointerSpeed['down'].value) this.pointer.y += velocityOfPointer;
            if (this.pointerSpeed['right'].value) this.pointer.x += velocityOfPointer;
            if (this.pointerSpeed['left'].value) this.pointer.x -= velocityOfPointer;

            this.checkOverLimit(this.pointer);

            const isSamePoint = lastPoint.x == this.pointer.x && lastPoint. y == this.pointer.y
            if (isSamePoint) return;
            if (this.newLineFlag) {
                this.pushNewLine(lastPoint);
                this.setIsAllSaved(false);
            }
            this.pushNewPoint(this.pointer);
        },
        checkOverLimit(point) {
            if (point.x < this.limit.left) point.x = this.limit.left;
            if (point.x > this.limit.right) point.x = this.limit.right;
            if (point.y < this.limit.up) point.y = this.limit.up;
            if (point.y > this.limit.down) point.y = this.limit.down;
        },
        undo() {
            this.setNewLine();
            if (this.itemList.length == 0) return;
            this.itemStack.push(this.itemList.pop());
            if (this.itemList.length == 0) return;
            const newPoint = this.getLastPoint();
            this.setPointer(newPoint);
            this.setIsUndoed(true);
        },
        redo() {
            this.setNewLine();
            if (this.itemStack.length == 0) return;
            this.itemList.push(this.itemStack.pop());
            const newPoint = this.getLastPoint();
            this.setPointer(newPoint);
        },
        resetStack() {
            this.setItemStack([]);
            this.setIsUndoed(false);
        },
        reset() {
            this.setItemList([]);
            localStorage.setItem('storage', JSON.stringify(this.itemList));
        },
        /**
         * load&save
         */
        load() {
            console.log('loading');
            this.loadDB();
            if (this.itemList.length >= 1) {
                const newPoint = this.getLastPoint();
                this.setPointer(newPoint);
            }
            this.resetStack();
            this.setNewLine();
            this.setIsAllSaved(true);
        },
        save() {
            this.setNewLine();
            let stage = document.getElementById('canvas');
            let canvas = stage.querySelector('canvas');
            let dataURL = canvas.toDataURL();
            this.saveDB({
                itemList: this.itemList,
                dataURL: dataURL,
            });
            this.setIsAllSaved(true);
            //画像download
            this.downloadURI(dataURL, 'drawing.png');
        },
        loadDB() {
            const data = JSON.stringify(this.currentDrawing.data);
            if (data == '{}') {
                this.setItemList(JSON.parse('[]'));
                return;
            }
            this.setItemList(JSON.parse(JSON.parse(data)));
        },
        downloadURI(uri, name) {
            const link = document.createElement('a');
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    },
};
</script>
