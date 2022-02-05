<style lang="scss" scoped>
.key-ui {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
}

.button-ui {
    box-shadow: $shadow;
    width: 40px;
    height: 40px;
}
</style>

<template>
    <div class="key-ui">
        <!-- mobile&tablet -->
        <div class="is-hidden-desktop">
            <div v-for="(direction, name) in pointerSpeed" :key="direction.index">
                <div>
                    <button
                        class="button is-primary button-ui m-1"
                        :class="{ 'is-active': direction.value }"
                    >
                        <font-awesome-icon class="awesome-icon" :icon="`arrow-${name}`" />
                    </button>
                </div>
            </div>
        </div>
        <!-- desktop -->
        <div class="is-hidden-touch is-flex">
            <div v-for="(direction, name) in pointerSpeed" :key="direction.index">
                <div>
                    <button
                        class="button is-primary button-ui m-1"
                        :class="{ 'is-active': direction.value }"
                    >
                        <font-awesome-icon class="awesome-icon" :icon="`arrow-${name}`" />
                    </button>
                </div>
                <div>
                    <button
                        class="button is-primary button-ui m-1"
                        :class="{ 'is-active': direction.value }"
                    >
                        <div v-for="element in direction.keys" :key="element.index">
                            <p class="is-size-5">{{ element.toUpperCase() }}</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Drawing',
    data() {
        return {};
    },
    computed: mapState('drawing/drawingEditter', ['pointerSpeed']),
};
</script>
