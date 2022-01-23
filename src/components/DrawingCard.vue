<template>
    <div class="card mb-4" style="width: 23%; height: auto">
        <div class="card-img">
            <img :src="drawing.imgUrl" alt="...">
        </div>
        <div class="p-1 has-text-centered">
            <p class="title is-6">{{ drawing.title }}</p>
        </div>
        <footer class="card-footer">
            <a class="card-footer-item">Share</a>
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item">Delete</a>
        </footer>
    </div>
</template>

<script>
export default {
    props: ['drawing']
}
</script>