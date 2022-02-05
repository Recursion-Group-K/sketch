<style>
.btn {
    margin: 0 auto;
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
    <div>
        <button @click="toggleModal" class="button is-rounded p-6">
            <div
                class="control is-flex is-justify-content-around"
                :style="{ 'text-align': 'center' }"
            >
                <font-awesome-icon
                    icon="plus"
                    class="mx-1 awesome-icon has-text-primary"
                    size="3x"
                />
                <p class="is-size-3 ml-2">New</p>
            </div>
        </button>
        <!-- Title Modal -->
        <div class="modal" :class="{ 'is-active': isCreateNew }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Title</p>
                    <button class="delete" aria-label="close" @click="toggleModal"></button>
                    <!-- Loader -->
                    <div class="loading">
                        <span v-if="createLoading" class="loader"></span>
                    </div>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                placeholder="Title of your work"
                                v-model="title"
                            />
                        </div>
                    </div>
                    <div class="field is-grouped mt-5">
                        <div class="control btn">
                            <button @click="createDrawing" class="button is-link">Start</button>
                        </div>
                        <div class="control btn">
                            <button @click="toggleModal" class="button is-link is-light">
                                Cancel
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'DrawingForm',
    data() {
        return {
            isCreateNew: false,
            title: '',
        };
    },
    computed: {
        ...mapState('drawing', ['createLoading', 'createError']),
    },
    methods: {
        toggleModal() {
            this.isCreateNew = !this.isCreateNew;
        },
        async createDrawing() {
            try {
                // get form data
                const params = {
                    title: this.title,
                    data: '[]'
                };
                const responce = await this.$store.dispatch('drawing/createDrawing', params);
                if (!this.createError){
                    this.$router.push({ name: 'Drawing', params: { id: responce.id } });
                }
            } catch (error) {
                console.log(error.responce);
            }
        },
    },
};
</script>
