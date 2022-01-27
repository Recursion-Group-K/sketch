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
            <button 
                v-for="arrow in arrows" :key="arrow.index"
                class="button is-primary button-ui"
            >
                <font-awesome-icon 
                    class="awesome-icon" 
                    :icon="`arrow-${arrow}`" 
                />
            </button>
        </div>
        <!-- desktop -->
        <div class="is-hidden-touch">
            <button 
                v-for="arrow in arrows" :key="arrow.index"
                class="button is-primary button-ui"
            >
                <font-awesome-icon 
                    class="awesome-icon" 
                    :icon="`arrow-${arrow}`" 
                />
            </button>
        </div>
        <div class="is-hidden-touch">
            <button 
                v-for="key in keys" :key="key.index"
                class="button is-primary button-ui"
            >
                <p class="is-size-5">{{ key }}</p>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Drawing',
    data() {
        return {
            arrows: ['up','down','left','right'],
            keys: ['D','F','J','K']
        };
    },
};
</script>
