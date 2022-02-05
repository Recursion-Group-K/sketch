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

.loading {
    display: flex;
    justify-content: center;
}
</style>

<style module>
@import '../assets/loading.css';
</style>

<template>
    <section id="Gallery" class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="container is-fluid">
                <div class="columns is-vcentered is-justify-content-center mt-4">
                    <div class="box column is-four-fifths p-6 mt-6" style="height: 85vh">
                        <div class="columns is-flex-wrap-wrap">
                            <div v-if="isAuthenticated" class="column is-one-third">
                                <div
                                    class="columns is-vcentered is-flex is-justify-content-center"
                                    style="height: 100%"
                                >
                                    <DrawingForm />
                                </div>
                            </div>
                            <!-- Loader -->
                            <div v-if="isLoading" class="loading">
                                <span class="loader"></span>
                            </div>
                            <div v-else-if="hasError">
                                <h1 class="no-image-message">
                                    There are no images available for viewing.
                                </h1>
                            </div>
                            <div
                                v-else
                                v-for="drawing in drawings"
                                :key="drawing.id"
                                class="column is-one-third"
                            >
                                <DrawingBox :drawing="drawing" @reload="reloadDrawings"></DrawingBox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import UserWrapper from '../api/userWrapper';
import DrawingBox from '../components/DrawingBox.vue';
import DrawingForm from '../components/NewDrawingButton.vue';
import { mapState, mapGetters } from 'vuex';

export default {
    components: {
        DrawingBox,
        DrawingForm,
    },
    name: 'Gallery',

    data() {
        return {};
    },
    computed: {
        ...mapState('gallery', ['isLoading', 'hasError', 'drawings']),
        ...mapGetters('auth', ['isAuthenticated']),
    },
    async mounted() {
        this.reloadDrawings();
    },
    methods:{
        reloadDrawings: async function(){
            try {
                console.log("start:"+this.isAuthenticated);
                if (this.isAuthenticated) {
                    const current_user = await new UserWrapper().getCurrent();
                    await this.$store.dispatch('gallery/setUserGallery', current_user);
                } else {
                    await this.$store.dispatch('gallery/setPublicGallery');
                }
                console.log("end:"+ this.isAuthenticated);
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
