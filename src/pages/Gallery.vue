<template>
    <div id="Gallery" class="">
        <!-- <div id="header">

        </div> -->

        <h1 class="title has-text-centered my-4">Gallery</h1>
        
        <!--絵の表示エリア-->
        <div id="showcase" class="is-flex is-justify-content-center">
            <div class="box column is-four-fifths p-6" style="height: 85vh">
                <div class="is-flex is-justify-content-space-between is-align-items-flex-start is-flex-wrap-wrap">

                    <!-- 新規作成用のカード -->
                    <div class="box is-align-self-stretch is-flex is-justify-content-center is-align-items-center mb-4" style="width: 270px">
                        <div class="field has-addons">
                            <div class="control">
                                <input class="input" type="text" placeholder="title">
                            </div>
                            <div class="control">
                                <button class="button is-primary">new</button>
                            </div>
                        </div>
                    </div>

                    <!-- v-forでDrawingCardコンポーネントを描写 -->
                    <DrawingBox v-for="drawing in allDrawings" :key="drawing.id" :drawing="drawing"></DrawingBox>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import DrawingWapper from '../api/drawingWrapper'
import DrawingBox from '../components/DrawingBox.vue';

export default {
  components: { 
      DrawingBox,
    },
    name: 'Gallery',
    data() {
        return {
            allDrawings: [],
        };
    },
    async mounted() {
        const drawingWrapper = new DrawingWapper();
        this.allDrawings = await drawingWrapper.getAll();
    }
};
</script>

<style scoped>
    .box {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        overflow: scroll;
    }

    .border {
        border: solid;
    }
</style>