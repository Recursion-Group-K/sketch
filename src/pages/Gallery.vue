<template>
    <section id="Gallery" class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="container is-fluid">
                <div class="columns is-vcentered is-justify-content-center">
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
import { mapState } from 'vuex';
import DrawingWapper from '../api/drawingWrapper';
import UserWrapper from '../api/userWrapper';
import DrawingBox from '../components/DrawingBox.vue';
import DrawingForm from '../components/NewDrawingButton.vue';

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
    computed:{
        ...mapState('auth',['token']),
    },
    async mounted() {
        //test list
        const drawingWrapper = new DrawingWapper();
        this.allDrawings = await drawingWrapper.getAll();
        console.log(this.allDrawings);

        //test retrieve
        const id2Drawing = await drawingWrapper.getById(2);
        console.log(id2Drawing);

        //test userwrapper getcurrent
        const currentRes = new UserWrapper().getCurrent();
        console.log(currentRes);

        /*
        //test destroy
        const drawingWrapper2 = new DrawingWapper();
        console.log("dest");
        drawingWrapper2.destroy(1);
        */
        this.allDrawings = await drawingWrapper.getAll();

        /*
        //test create
        let params = 
        {
            id: 5, 
            title: 'test', 
            image: 'https://res.cloudinary.com/hefkgasfk/image/upload/v1/media/path/to/my/default/image.jpg', 
            data: {}, 
            is_public: true, 
            createdAt: '2022-02-02T16:30:01.008788+09:00',
            updatedAt: '2022-02-02T16:30:01.008788+09:00',
            user: {
                id: 1, 
                username: 'admin', 
                email: 'leandro83g.development@gmail.com', 
                is_active: true, 
                is_superuser: true, 
                password: 'pbkdf2_sha256$320000$M3dSgi9YpknPGar2aLP53e$FDdrZcpzOYfIyeJzQ9gXMP4pFkVGokOdB6EqbmVrPnc=',
            }
        }
        drawingWrapper.create(params);
        */
        //this.allDrawings = await drawingWrapper.getAll();

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
