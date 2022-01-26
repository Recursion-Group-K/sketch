<template>
    <div class="box container is-fluid">
        <figure class="image is-4by3 mb-2" @click="redirectToDrawingPage">
            <img :src="drawing.imgUrl" />
        </figure>
        <p class="title is-5 has-text-dark">{{ drawing.title }}</p>
        <div class="column is-one-fifths is-flex is-justify-content-flex-end">
            <font-awesome-icon icon="globe-asia"
                :class="{ 'has-text-success': isPublic }"
                class="mx-1 awesome-icon"
                size="lg"
                @click="toggoleIsPublic"
            />
            <font-awesome-icon :icon="['fab', 'twitter']"
                class="mx-1 awesome-icon has-text-info" 
                size="lg"
                @click="twitterShare"
            />
            <font-awesome-icon icon="trash"
                class="mx-1 awesome-icon has-text-danger" 
                size="lg"
                @click="handleDeleteConfirmationModal(true)"
            />
        </div>

        <!-- Delete Confirmation Modal -->
        <div class="modal" :class="{'is-active': isOpenDeleteConfirmationModal}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Delete Confirmation</p>
                    <button class="delete" aria-label="close" @click="handleDeleteConfirmationModal(false)"></button>
                </header>
                <section class="modal-card-body">
                    Are you sure you want delete the Drawing.
                </section>
                <footer class="modal-card-foot is-flex is-justify-content-center">
                    <button class="button is-danger" @click="deleteDrawing">Delete</button>
                    <button class="button" @click="handleDeleteConfirmationModal(false)">Cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['drawing'],
    data() {
        return {
            isPublic: false,
            isOpenDeleteConfirmationModal: false,
        };
    },
    methods: {
        redirectToDrawingPage() {
            this.$router.push('/drawing');
        },
        toggoleIsPublic() {
            this.isPublic = !this.isPublic;
        },
        twitterShare() {
            console.log('gggg')
        },
        handleDeleteConfirmationModal(bool) {
            this.isOpenDeleteConfirmationModal = bool
        },
        deleteDrawing() {
            console.log('gggg')
            this.handleDeleteConfirmationModal(false)
        },
    },
};
</script>

<style scoped lang="scss">
.box {
    padding: 0 !important;
}
</style>
