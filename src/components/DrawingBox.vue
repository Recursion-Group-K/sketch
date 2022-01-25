<template>
    <div class="box container is-fluid">
        <figure class="image is-4by3 mb-2" @click="redirectToDrawingPage">
            <img :src="drawing.imgUrl" />
        </figure>
        <p class="title is-5 has-text-dark">{{ drawing.title }}</p>
        <div class="column is-one-fifths is-flex is-justify-content-flex-end">
            <font-awesome-icon
                class="mx-1 awesome-icon"
                :class="{ 'has-text-success': isPublic }"
                icon="globe-asia"
                size="lg"
                @click="toggoleIsPublic"
            />
            <font-awesome-icon 
                class="mx-1 awesome-icon has-text-info" 
                :icon="['fab', 'twitter']"
                size="lg"
                @click="twitterShare"
            />
            <font-awesome-icon 
                class="mx-1 awesome-icon has-text-danger" 
                icon="trash"
                size="lg"
                @click="handleDeleteConfirmationModal(true)"
            />
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
        },
    },
};
</script>

<style scoped lang="scss">
.box {
    padding: 0 !important;
}
</style>
