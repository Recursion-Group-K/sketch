<style lang="scss" scoped>
// SIZES
$width__sidebar: 20em;

.sidebar-group {
    position: absolute;
    top: 5rem;
    left: 0;
    z-index: 2;
    margin: 3px;
    margin-left: calc($width__sidebar + 3px);
    cursor: pointer;
    transition: 0.7s;

    &.is-closed {
        transform: translateX(-$width__sidebar);
    }
}

.sidebar {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    width: $width__sidebar;
    height: 100vh;
    background-color: $white;
    transition: 0.7s;
    box-shadow: $shadow;

    aside {
        margin-top: 5rem;
    }

    &.is-closed {
        transform: translateX(-$width__sidebar);
    }
}

.menu {
    @extend .menu;
    p {
        text-align: start;
    }
    a {
        text-align: start;
        padding-left: 2em;
        padding-right: 2em;
    }
}

.color-picker {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    border: none;
    outline: none;
    -webkit-appearance: none;
}
.color-picker::-webkit-color-swatch-wrapper {
    padding: 0;
}
.color-picker::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
}

.disabled {
    pointer-events: none;
    opacity: 0.6;
}
</style>

<template>
    <div>
        <div class="sidebar has-text-dark" :class="{ 'is-closed': !isSidebarOpen }">
            <aside class="menu p-5">
                <div class="level-item is-hidden-mobile has-text-weight-bold is-size-4 pr-5">
                    <div v-if="!isInputTitle" @click="openInputTitle">
                        {{ drawing.title }}
                        <font-awesome-icon icon="edit" class="awesome-icon ml-2" />
                    </div>
                    <input
                        type="text"
                        v-if="isInputTitle"
                        v-model="renameTitle"
                        @blur="closeInputTitle"
                        class="input"
                    />
                </div>
                <p class="menu-label">Color</p>
                <ul class="menu-list is-align-content-start">
                    <li>
                        <a>
                            <div class="columns is-vcentered">
                                <div class="column">
                                    <input
                                        type="color"
                                        v-model="selectedColor"
                                        class="color-picker"
                                        @click="stopPointer"
                                        @change="changeColor({ newColor: selectedColor })"
                                    />
                                    <span :style="{ backgroundColor: color }"></span>
                                </div>
                                <div class="column">
                                    <p>{{ color }}</p>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>

                <p class="menu-label">Weight</p>
                <ul class="menu-list">
                    <li>
                        <a>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                v-model="selectedWeight"
                                @change="changeWeight({ newWeight: selectedWeight })"
                            />
                            {{ weight }} px
                        </a>
                    </li>
                </ul>
                <p class="menu-label">Share Options</p>
                <ul class="menu-list">
                    <li
                        @click="twitterShare({ id: drawing.id })"
                        :class="{ disabled: !isAuthenticated }"
                    >
                        <a>
                            <font-awesome-icon
                                :icon="['fab', 'twitter']"
                                class="mx-1 awesome-icon has-text-info"
                                size="lg"
                            />
                            Twitter
                        </a>
                    </li>
                    <li @click="toggleIsPublic" :class="{ disabled: !isAuthenticated }">
                        <a>
                            <font-awesome-icon
                                icon="globe-asia"
                                :class="{ 'has-text-success': isPublic }"
                                class="mx-1 awesome-icon"
                                size="lg"
                            />
                            Gallery
                        </a>
                    </li>
                </ul>
                <p class="menu-label">Save Options</p>
                <ul class="menu-list">
                    <li :class="{ disabled: !isAuthenticated }">
                        <a @click="save">
                            <font-awesome-icon
                                class="mx-1 awesome-icon has-text-primary"
                                icon="hdd"
                                size="lg"
                            />
                            Save
                        </a>
                    </li>
                </ul>
            </aside>
        </div>
        <div class="sidebar-group" :class="{ 'is-closed': !isSidebarOpen }">
            <button class="button m-1" @click="toggleSideBar">
                <font-awesome-icon class="awesome-icon" icon="sliders-h" size="lg" />
            </button>
            <button class="button m-1" @click="undo" :disabled="!isAuthenticated">
                <font-awesome-icon class="awesome-icon has-text-primary" icon="undo" size="lg" />
            </button>
            <button class="button m-1" @click="redo" :disabled="!isAuthenticated">
                <font-awesome-icon class="awesome-icon has-text-primary" icon="redo" size="lg" />
            </button>
        </div>
        <SaveModal />
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import SaveModal from './SaveModal.vue';
export default {
    name: 'DrawingTools',
    components: {
        SaveModal,
    },
    data() {
        return {
            isSidebarOpen: false,
            toggles: {
                weight: false,
                others: false,
            },
            selectedColor: '',
            selectedWeight: 0,
            renameTitle: '',
            isInputTitle: false,
        };
    },
    computed: {
        ...mapState('drawing/drawingEditter', ['color', 'weight', 'isPublic']),
        ...mapState('drawing', ['drawing']),
        ...mapGetters('auth', ['isAuthenticated']),
    },
    mounted: function () {
        this.selectedColor = this.color;
        this.selectedWeight = this.weight;
    },
    methods: {
        ...mapActions('drawing/drawingEditter', [
            'changeColor',
            'changeWeight',
            'redo',
            'undo',
            'stopPointer',
            'toggleIsPublic',
            'save',
        ]),
        ...mapActions('drawing', ['twitterShare', 'setDrawingTitle']),
        toggleSideBar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        openInputTitle() {
            this.renameTitle = this.drawing.title;
            this.isInputTitle = true;
            console.log(this.renameTitle);
            //title変更中はkeyイベントを発火させない
            //document.removeEventListener('keydown', this.keyDown);
            //document.removeEventListener('keyup', this.keyUp);
        },
        closeInputTitle() {
            this.isInputTitle = false;
            //keyイベントを再発火

            if (this.renameTitle == this.drawing.title) return;
            //タイトルが変わったら
            this.setDrawingTitle({ newTitle: this.renameTitle });
        },
    },
};
</script>
