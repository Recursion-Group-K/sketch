<template>
    <section id="Gallery" class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="container is-fluid">
                <div class="columns is-vcentered is-justify-content-center">
                    <div class="box column is-four-fifths p-6 mt-6" style="height: 85vh">
                        <div
                            class="is-flex is-justify-content-space-between is-align-items-flex-start is-flex-wrap-wrap"
                        >
                            <!-- 新規作成用のカード -->
                            <div
                                class="box is-align-self-stretch is-flex is-justify-content-center is-align-items-center mb-4"
                                style="width: 270px"
                            >
                                <div class="field has-addons">
                                    <div class="control">
                                        <input class="input" type="text" placeholder="title" />
                                    </div>
                                    <div class="control">
                                        <button class="button is-primary">new</button>
                                    </div>
                                </div>
                            </div>

                            <!-- v-forでDrawingCardコンポーネントを描写 -->
                            <DrawingBox
                                v-for="drawing in allDrawings"
                                :key="drawing.id"
                                :drawing="drawing"
                            ></DrawingBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import DrawingWapper from '../api/drawingWrapper';
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
    },
};
</script>

<style scoped lang="scss">

.box {
    box-shadow: $shadow;
    overflow: scroll;
}

.border {
    border: solid;
}
</style>
