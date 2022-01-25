<template>
    <div class="box container is-fluid">
        <figure class="image is-4by3 mb-2" @click="redirectToDrawingPage">
            <img :src="drawing.imgUrl" />
        </figure>
        <p class="title is-5 has-text-dark">{{ drawing.title }}</p>
        <div class="column is-one-fifths is-flex is-justify-content-flex-end">
            <font-awesome-icon class="mx-1" icon="globe-asia" />
            <font-awesome-icon class="mx-1" :icon="['fab', 'twitter']" />
            <font-awesome-icon class="mx-1" icon="trash" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['drawing'],
    methods: {
        redirectToDrawingPage() {
            this.$router.push('/drawing');
        },
    },
};
</script>

<style scoped lang="scss">
.box {
    padding: 0 !important;
}

.title {
    margin: 0 !important;
}
</style>
