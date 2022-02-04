<template>
    <div class="modal" :class="{ 'is-active': isOpenSaveConfirmationModal }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Save Confirmation</p>
                <button
                    class="delete"
                    aria-label="close"
                    @click="handleSaveConfirmationModal(false)"
                ></button>
            </header>
            <section class="modal-card-body">Do you want to save the Drawing?</section>
            <footer class="modal-card-foot is-flex is-justify-content-center">
                <button
                    class="button is-danger"
                    @click="
                        saveDrawing;
                        handleSaveConfirmationModal(false);
                    "
                >
                    Save
                </button>
                <button class="button" @click="handleSaveConfirmationModal(false)">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: ['isOpenSaveConfirmationModal'],
    methods: {
        handleSaveConfirmationModal(bool) {
            this.$emit('handleSaveConfirmationModal', bool);
        },
    },
};
</script>
