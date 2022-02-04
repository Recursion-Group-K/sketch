<template>
    <div class="modal" :class="{ 'is-active': isOpen }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Saving your Drawing</p>
                <button class="delete" aria-label="close" @click="handlIsOpen(false)"></button>
            </header>
            <section class="modal-card-body has-text-dark">
                <div v-if="isLoading">
                    Loading..
                    <progress class="progress is-small is-primary" max="100"></progress>
                </div>
                <div v-if="!isLoading&&!hasError">
                    <p class="has-text-success">Success!!</p>
                    <progress class="progress is-small is-primary" value="100" max="100"></progress>
                </div>
                <div v-if="!isLoading&&hasError">
                    <p class="has-text-danger">We are sorry. Failed to save your Drawing. Try againg later...</p>
                    <progress class="progress is-small is-danger" value="10" max="100"></progress>
                </div>
            </section>
            <footer class="modal-card-foot is-flex is-justify-content-center">
                <button class="button" @click="handlIsOpen(false)">Back</button>
                <button
                    v-if="!isLoading&&!hasError"
                    class="button is-success"
                    @click="handlIsOpen(false)"
                >
                    OK
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            isOpen: false,
        };
    },
    watch: {
        isLoading(to) {
            if (to == true) this.handlIsOpen(true);
        },
    },
    computed: mapState('drawing', ['isLoading', 'hasError']),
    methods: {
        handlIsOpen(bool) {
            this.isOpen = bool;
        },
    },
};
</script>
