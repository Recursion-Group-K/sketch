<style lang="scss" scoped>
.prompt-signup {
    margin-top: 1em;
    font-weight: bold;
}
</style>

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
        <div v-if="!isAuthenticated">
            <p class="prompt-signup">Please SignUp to use our drawing tools.</p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
const velocityOfPointer = 2;

export default {
    name: 'Drawing',
    data() {
        return {
            configKonva: {
                width: 100,
                height: 100,
            },
            itemList: [], //{line: ラインオブジェクト, lastPoint: ライン最後の座標}
            itemStack: [],
            isAllSaved: false,
            pointer: {
                x: 0,
                y: 0,
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
         * Init
         */
        this.fitCanvas();
        this.pointer.x = clientWidth / 2;
        this.pointer.y = clientHeight / 2;
        this.pushNewLine(this.pointer);
        this.limit.down = clientHeight;
        this.limit.right = clientWidth;
        this.checkOverLimit(this.pointer);

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

        /**
         * Disable key event for unauthorized user
         */
        this.disableKeyEvents();
    },
    beforeDestroy: function () {
        // this.save();
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
        ...mapGetters('auth', ['isAuthenticated']),
    },
    watch: {
        weight() {
            this.pushNewLine(this.pointer);
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
        },

        /**
         * Pointer
         */
        stopPointer() {
            Object.keys(this.pointerSpeed).forEach((direction) => {
                this.setPointerSpeed({ direction: direction, value: false });
            });
            this.pushNewLine(this.pointer);
        },
        movePointer(event) {
            const stage = event.target.getStage();
            const clickPos = stage.getPointerPosition();
            this.checkOverLimit(clickPos);
            this.setPointer(clickPos);
            this.pushNewLine(this.pointer);
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
            const areAllKeyUp = Object.values(this.pointerSpeed).every((element) => !element.value);
            if (areAllKeyUp) this.pushNewLine(this.pointer);
            this.keyEvent(event, true);
        },
        keyUp(event) {
            this.keyEvent(event, false);
        },
        /**
         * Getters
         */
        getLastPoint() {
            return this.itemList[this.itemList.length - 1].lastPoint;
        },
        getPointerClone() {
            const { x, y } = this.pointer;
            return { x, y };
        },
        /**
         * Setters
         */
        setPointer({ x, y }) {
            this.pointer.x = x;
            this.pointer.y = y;
        },
        setIsAllSaved(bool) {
            this.isAllSaved = bool;
        },
        setItemList(itemList) {
            this.itemList = itemList;
        },
        setItemStack(itemStack) {
            this.itemStack = itemStack;
        },
        pushNewLine({ x, y }) {
            this.itemList.push({
                line: {
                    points: [x, y],
                    stroke: this.color,
                    strokeWidth: this.weight,
                },
                lastPoint: { x, y },
            });
        },
        updateLine({ x, y }) {
            if (this.itemList.length == 0) this.pushNewLine(this.pointer);
            const l = this.itemList.length;
            this.itemList[l - 1].line.points.push(x, y);
            this.itemList[l - 1].lastPoint = { x, y };
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

            const isSamePoint = lastPoint.x == this.pointer.x && lastPoint.y == this.pointer.y;
            if (isSamePoint) return;
            this.updateLine(this.pointer);
        },
        checkOverLimit(point) {
            if (point.x < this.limit.left) point.x = this.limit.left;
            if (point.x > this.limit.right) point.x = this.limit.right;
            if (point.y < this.limit.up) point.y = this.limit.up;
            if (point.y > this.limit.down) point.y = this.limit.down;
        },
        undo() {
            const l = this.itemList.length;
            if (l == 0) return;
            this.itemStack.push(this.itemList.pop());

            if (l - 1 <= 0) return;
            this.setPointer(this.getLastPoint());
        },
        redo() {
            const l = this.itemStack.length;
            if (l == 0) return;
            this.itemList.push(this.itemStack.pop());

            if (l - 1 <= 0) return;
            this.setPointer(this.getLastPoint());
        },
        resetStack() {
            this.setItemStack([]);
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
            this.pushNewLine(this.pointer);
            this.setIsAllSaved(true);
        },
        save() {
            this.pushNewLine(this.pointer);
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
