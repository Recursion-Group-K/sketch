<template>
    <div class="box mb-4" style="width: 270px">
        <figure class="image is-4by3 mb-2">
            <img :src="drawing.imgUrl" />
        </figure>
        <p class="title is-5">{{ drawing.title }}</p>
        <div class="column is-one-fifths is-flex is-justify-content-flex-end">
            <font-awesome-icon class="mx-1" icon="book-reader" />
            <font-awesome-icon class="mx-1" icon="cloud" />
            <font-awesome-icon class="mx-1" icon="edit" />
            <font-awesome-icon class="mx-1" icon="trash" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['drawing'],
};
</script>

<style scoped>
.box {
    padding: 0 !important;
}

.title {
    margin: 0 !important;
}
</style>
