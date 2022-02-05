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
import { dataURItoBlob } from '../utils';
const velocityOfPointer = 2;

export default {
    name: 'Drawing',
    data() {
        return {
            itemList: [], //{line: ラインオブジェクト, lastPoint: ライン最後の座標}
            itemStack: [],
            isUndoed: false,
            isAllSaved: true,
            configKonva: {
                width: 100,
                height: 100,
            },
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
            dataURL: undefined,
            dataURLTimer: undefined,
        };
    },
    async created(){
        const id = this.$route.params['id']
        await this.setDrawingById(id)
        this.setItemList([...this.drawing.data])

        if(!this.drawing.isPublic && !this.isEditable){
            this.$router.push({name: 'Gallery'});
        }
    },
    mounted() {

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
        this.dataURLTimer = setInterval(this.setDataURL, 5000);

        /**
         * resize canvas
         */
        window.addEventListener('resize', this.fitCanvas);
    },
    beforeDestroy: function () {
        if (!this.isAllSaved) {
            //this.save();
        }
    },
    destroyed: function () {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
        clearInterval(this.timer);
        clearInterval(this.dataURLTimer);
    },
    computed: {
        ...mapState('drawing', ['drawing']),
        ...mapState('drawing/drawingEditter', [
            'color',
            'weight',
            'undoTrigger',
            'redoTrigger',
            'saveTrigger',
            'stopPointerTrigger',
            'pointerSpeed',
        ]),
        ...mapState('auth',['currentUser']),
        ...mapGetters('auth', ['isAuthenticated']),

        isEditable(){
            return(
                this.isAuthenticated &&
                this.drawing.userId == this.currentUser.id
            )
        }
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
        stopPointerTrigger() {
            this.stopPointer();
        },
    },
    methods: {
        ...mapActions('drawing', ['saveDB', 'setDrawingById']),
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
        setDataURL() {
            let stage = document.getElementById('canvas');
            let canvas = stage.querySelector('canvas');
            this.dataURL = canvas.toDataURL();
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
            if (!this.isEditable) return;
            let key = event.key;
            Object.keys(this.pointerSpeed).forEach((direction) => {
                const keyIncludes = this.pointerSpeed[direction].keys.includes(key);
                if (keyIncludes) {
                    this.setPointerSpeed({ direction: direction, value: boolean });
                }
            });

            if (key == 'c') {
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
        save() {
            var f = dataURItoBlob(this.dataURL);
            const file = new File([f], 'drawing.png', {
                type: 'image/png',
            });
            this.saveDB({
                itemList: this.itemList,
                dataURL: file,
            });
            this.setIsAllSaved(true);
        },
        downloadURI(name) {
            const link = document.createElement('a');
            link.download = name;
            link.href = this.data;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    },
};
</script>
