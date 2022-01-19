<style lang="scss" scoped>
.drawing-tools {
    height: 4rem;
}

</style>

<template>
    <nav class="drawing-tools level is-mobile has-background-link has-text-white px-3 m-0">
        <div class="level-left is-fullheight">
            <div class="level-item is-hidden-mobile has-text-weight-bold is-size-4 pr-5">
                title of work
            </div>
            <button class="button is-link level-item is-flex-direction-column px-1">
                <font-awesome-icon class="is-size-4 my-1" icon="palette" />
                <span class="is-size-7">color</span>
            </button>
            <button class="button is-link level-item is-flex-direction-column px-1">
                <font-awesome-icon class="is-size-4 my-1" icon="circle" />
                <span class="is-size-7">pixel</span>
            </button>
            <button class="button is-link level-item is-flex-direction-column px-1">
                <font-awesome-icon class="is-size-4 my-1" icon="redo" />
                <span class="is-size-7">redo</span>
            </button>
            <button class="button is-link level-item is-flex-direction-column px-1">
                <font-awesome-icon class="is-size-4 my-1" icon="undo" />
                <span class="is-size-7">undo</span>
            </button>
        </div>
        <div class="level-right">
            <button
                class="button is-link level-item is-hidden-mobile is-flex-direction-column px-1"
            >
                <font-awesome-icon class="is-size-4 my-1" icon="save" />
                <span class="is-size-7">save</span>
            </button>
            <button
                class="button is-link level-item is-hidden-mobile is-flex-direction-column px-1"
            >
                <font-awesome-icon class="is-size-4 my-1" icon="share-square" />
                <span class="is-size-7">share</span>
            </button>
            <button class="button is-link level-item is-hidden-tablet p-0">
                <div
                    class="dropdown is-right"
                    v-bind:class="{ 'is-active': isActive }"
                    v-on:click="isActive = !isActive"
                >
                    <div class="dropdown-trigger">
                        <button class="button is-link p-1">
                            <div
                                class="is-flex is-flex-direction-column-reverse is-justify-content-center has-text-centered"
                            >
                                <span class="is-size-7">others</span
                                ><span
                                    ><font-awesome-icon class="is-size-4 my-1" icon="bars"
                                /></span>
                            </div>
                        </button>
                    </div>
                    <div class="dropdown-menu">
                        <div class="dropdown-content">
                            <div class="dropdown-item is-size-6">
                                <font-awesome-icon icon="save" /> save
                            </div>
                            <div class="dropdown-item is-size-6">
                                <font-awesome-icon icon="share-square" /> share
                            </div>
                        </div>
                    </div>
                </div>
            </button>
            <button class="button is-link level-item is-flex-direction-column px-1">
                <font-awesome-icon class="is-size-4 my-1" icon="door-open" />
                <span class="is-size-7">back</span>
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'DrawingTools',
    data() {
        return {
            isActive: false,
        };
    },
};
</script>
