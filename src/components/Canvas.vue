<style lang="scss" scoped>
</style>

<template>
        <v-stage :config="configKonva" class="has-background-white">
            <v-layer>
                <v-circle :config="pointer"></v-circle>
                <v-line :config="lineConfig"></v-line>
            </v-layer>
        </v-stage>
</template>

<script>
const velocityOfPointer = 2;
let canvasWidth=window.innerWidth;
let canvasHeight=500;

export default {
    name: 'Drawing',
    data() {
        return {
            configKonva: {
                width: canvasWidth,
                height: canvasHeight
            },
            pointer: {
                x: canvasWidth/2,
                y: canvasHeight/2,
                radius: 3,
                fill: "white",
                stroke: "black",
                strokeWidth: 1
            },
            lineConfig:{
                stroke: "black",
                strokeWidth: 3,
                lineCap: 'round',
                points:[canvasWidth/2,canvasHeight/2]
            },
            controller:{
                x:{isPositive:false, isNegative:false},
                y:{isPositive:false, isNegative:false},
                timer:undefined,
            },
        }
    },
    mounted: function(){
        this.controller.x={isPositive:false, isNegative:false};
        this.controller.y={isPositive:false, isNegative:false};
        document.addEventListener('keydown',this.keyDown);
        document.addEventListener('keyup',this.keyUp);
        this.controller.timer=setInterval(this.draw,10);
    },
    destroyed: function(){
        document.removeEventListener('keydown',this.keyDown);
        document.removeEventListener('keyup',this.keyUp);
        clearInterval(this.controller.timer);
    },
    methods: {
        keyDown(event){
            let key=event.key;
            if(key=="d"){
                this.controller.y.isPositive=true;
            }
            if(key=="f"){
                this.controller.y.isNegative=true;
            }
            if(key=="k"){
                this.controller.x.isPositive=true;
            }
            if(key=="j"){
                this.controller.x.isNegative=true;
            }
        },
        keyUp(event){
            let key=event.key;
            if(key=="d"){
                this.controller.y.isPositive=false;
            }
            if(key=="f"){
                this.controller.y.isNegative=false;
            }
            if(key=="k"){
                this.controller.x.isPositive=false;
            }
            if(key=="j"){
                this.controller.x.isNegative=false;
            }
        },
        draw(){
            let lastPoint=[this.pointer.x,this.pointer.y];
            if(this.controller.y.isPositive==true)this.pointer.y+=velocityOfPointer;
            if(this.controller.y.isNegative==true)this.pointer.y-=velocityOfPointer;
            if(this.controller.x.isPositive==true)this.pointer.x+=velocityOfPointer;
            if(this.controller.x.isNegative==true)this.pointer.x-=velocityOfPointer;
            if(lastPoint[0]!=this.pointer.x||lastPoint[1]!=this.pointer.y){
                this.lineConfig.points.push(this.pointer.x,this.pointer.y);
            }
        }
    },

};
</script>