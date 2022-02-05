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
        <div class="column is-one-fifths is-flex is-justify-content-flex-end">
            <font-awesome-icon
                icon="globe-asia"
                :class="{ 'has-text-success': drawing.isPublic }"
                class="mx-1 awesome-icon"
                size="lg"
                @click="toggleIsPublic"
            />
            <font-awesome-icon
                :icon="['fab', 'twitter']"
                class="mx-1 awesome-icon has-text-info"
                size="lg"
                @click="twitterShare(drawing.id)"
            />
            <font-awesome-icon
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
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['drawing'],
    data() {
        return {
            isOpenDeleteConfirmationModal: false,
        };
    },
    computed: mapGetters('drawing/drawingEditter', ['isEtchASketchMode']),
    methods: {
        ...mapActions('drawing/drawingEditter',['toggleIsPublic']),
        twitterShare() {
            console.log('gggg');
        },
        handleDeleteConfirmationModal(bool) {
            this.isOpenDeleteConfirmationModal = bool;
        },
        deleteDrawing() {
            console.log('gggg');
            this.handleDeleteConfirmationModal(false);
        },
    },
};
</script>
