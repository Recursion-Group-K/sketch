<style scoped lang="scss">
.box {
    padding: 0 !important;
}
</style>

<template>
    <div class="box container is-fluid">
        <router-link :to="`/drawing/${drawing.id}`">
            <figure class="image is-4by3 mb-2">
                <img :src="drawing.image" />
            </figure>
        </router-link>
        <p class="title is-5 has-text-dark">{{ drawing.title }}</p>
        <div
            class="column is-one-fifths is-flex is-justify-content-flex-end"
        >
            <font-awesome-icon
                icon="globe-asia"
                :class="{ 'has-text-success': is_Public }"
                class="mx-1 awesome-icon"
                size="lg"
                @click="switchIsPublic()"
            />
            <font-awesome-icon
                :icon="['fab', 'twitter']"
                class="mx-1 awesome-icon has-text-info"
                size="lg"
                @click="twitterShare({ id: drawing.id })"
            />
            <font-awesome-icon
                v-if="isEditable"
                icon="trash"
                class="mx-1 awesome-icon has-text-danger"
                size="lg"
                @click="handleDeleteConfirmationModal(true)"
            />
        </div>

        <!-- Delete Confirmation Modal -->
        <div class="modal" :class="{ 'is-active': isOpenDeleteConfirmationModal }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Delete Confirmation</p>
                    <button
                        class="delete"
                        aria-label="close"
                        @click="handleDeleteConfirmationModal(false)"
                    ></button>
                </header>
                <section class="modal-card-body">Are you sure you want delete the Drawing.</section>
                <footer class="modal-card-foot is-flex is-justify-content-center">
                    <button class="button is-danger" @click="deleteDrawing">Delete</button>
                    <button class="button" @click="handleDeleteConfirmationModal(false)">
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import DrawingWapper from '../api/drawingWrapper';
import { mapActions, mapGetters, mapState} from 'vuex';
export default {
    props: ['drawing'],
    data() {
        return {
            isOpenDeleteConfirmationModal: false,
            is_Public:false,
        };
    },
    mounted: function(){
        this.is_Public = this.drawing.isPublic;
    },
    computed: {
        ...mapState('auth',['currentUser']),
        ...mapGetters('drawing/drawingEditter', ['isEtchASketchMode']),
        ...mapGetters('auth', ['isAuthenticated']),

        isEditable(){
            return(
                this.isAuthenticated &&
                this.drawing.userId == this.currentUser.id
            )
        }
    },
    methods: {
        ...mapActions('drawing', ['twitterShare', 'toggleIsPublic']),
        handleDeleteConfirmationModal(bool) {
            this.isOpenDeleteConfirmationModal = bool;
        },
        async deleteDrawing() {
            const responce = await new DrawingWapper().destroy(this.drawing.id);
            console.log("deleted");
            console.log(responce);
            //再ロード
            this.$emit('reload');
            
            this.handleDeleteConfirmationModal(false);
        },
        switchIsPublic(){
            if(this.isEditable)return;
            this.toggleIsPublic(this.drawing);
            this.is_Public=!this.is_Public;
            this.$emit('reload');
        }
    },
};
</script>
