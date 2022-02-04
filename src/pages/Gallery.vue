<style scoped lang="scss">
.box {
    box-shadow: $shadow;
    overflow: scroll;
}

.border {
    border: solid;
}

.no-image-message {
    color: crimson;
}
</style>

<template>
    <section id="Gallery" class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="container is-fluid">
                <div class="columns is-vcentered is-justify-content-center mt-4">
                    <div class="box column is-four-fifths p-6 mt-6" style="height: 85vh">
                        <div class="columns is-flex-wrap-wrap">
                            <div class="column is-one-third">
                                <div
                                    class="columns is-vcentered is-flex is-justify-content-center"
                                    style="height: 100%"
                                >
                                    <DrawingForm />
                                </div>
                            </div>
                            <div v-if="!allDrawings.length">
                                <h1 class="no-image-message">There are no images available for viewing.</h1>
                            </div>
                            <div
                                v-else
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
import UserWrapper from '../api/userWrapper';
import DrawingBox from '../components/DrawingBox.vue';
import DrawingForm from '../components/NewDrawingButton.vue';
import { mapGetters } from 'vuex';

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
    computed: {
        ...mapGetters('auth', ['isAuthenticated']),
    },
    async mounted() {
        //test list
        if(this.isAuthenticated){
            const current_user = await new UserWrapper().getCurrent();
            this.allDrawings = await new DrawingWapper().getBy('user', current_user.id);
        }
        else this.allDrawings = await new DrawingWapper().getBy('is_public', 'true');
        
        //test retrieve
        // const id2Drawing = await new DrawingWapper().getById(2);
        // console.log(id2Drawing);

        // //test userwrapper getcurrent
        // const currentRes = new UserWrapper().getCurrent();
        // console.log(currentRes);

        //test destroy
        // const  destroyRes = new DrawingWapper().destroy(8);
        // console.log(destroyRes)

        //test create
        // let params = {
        //     title: 'test',
        //     data: '{}',
        //     isPublic: true,
        //     userId: 8,
        // };
        // const createRes = new DrawingWapper().create(params);
        // console.log(createRes);

        //test update
        // const updateRes = new DrawingWapper().update(id2Drawing.id, {title:'id2-updated-2'});
        // console.log(updateRes);
    },
};
</script>


