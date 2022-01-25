<template>
    <section id="Gallery" class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="container is-fluid">
                <div class="columns is-vcentered is-justify-content-center">
                    <div class="box column is-four-fifths p-6 mt-6" style="height: 85vh">
                        <div class="columns is-flex-wrap-wrap">
                            <div class="column is-one-third">
                                <div class="columns is-vcentered" style="height: 100%">
                                    <DrawingForm />
                                </div>
                            </div>
                            <div
                                v-for="drawing in allDrawings"
                                :key="drawing.id"
                                class="column is-one-third"
                            >
                                <DrawingBox :drawing="drawing"></DrawingBox>
                            </div>
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
import DrawingForm from '../components/DrawingForm.vue';

export default {
    components: {
        DrawingBox,
        DrawingForm,
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
