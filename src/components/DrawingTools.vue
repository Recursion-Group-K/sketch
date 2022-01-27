<style lang="scss" scoped>
.drawing-tools {
    @extend .level;
    @extend .is-mobile;
    width: 100%;
    height: 4rem;
    position: absolute;
    top: 5rem;
    color: $white;
    background-color: $link;
    button {
        @extend .button;
        @extend .level-item;
        @extend .is-link;
        @extend .px-2;
        @extend .py-5;
        @extend .m-1;
        flex-direction: column;
        color: $white;
        padding-top: 3rem;
        border-radius: 1rem;

        span {
            font-size: $size-7;
        }
        .awesome-icon {
            @extend .my-1;
            font-size: $size-4;
        }
    }
    .dropdown {
        @extend .p-0;
        .dropdown-trigger {
            button {
                @extend .px-1;
            }
        }
        .dropdown-item {
            font-size: $size-6;
        }
    }
}
.color-button {
    .background-circle {
        height: 2rem;
        width: 2rem;
        border-radius: 2rem;
        z-index: 1;
    }
    .color-picker {
        opacity: 0;
        position: absolute;
        height: 3rem;
        z-index: 3;
    }
    .zindex-2 {
        z-index: 2;
    }
}
</style>

<template>
    <nav class="drawing-tools px-3 m-0">
        <div class="level-left is-fullheight">
            <div class="level-item is-hidden-mobile has-text-weight-bold is-size-4 pr-5">
                title of work
            </div>
            <button class="color-button">
                <div class="background-circle" :style="{ backgroundColor: color }">
                    <font-awesome-icon class="awesome-icon zindex-2" icon="palette" />
                </div>
                <input
                    class="color-picker"
                    type="color"
                    v-model="color"
                    @click="$emit('click-color-picker')"
                    @change="$emit('change-color', color)"
                />
            </button>
            <div
                class="dropdown"
                :class="{ 'is-active': toggles.weight }"
                @click="toggles.weight = !toggles.weight"
            >
                <div class="dropdown-trigger">
                    <button>
                        <font-awesome-icon class="awesome-icon" icon="circle" />
                    </button>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-content">
                        <div class="dropdown-item">
                            weight: {{ weight }} px
                            <input
                                type="range"
                                min="2"
                                max="20"
                                v-model="weight"
                                @change="$emit('change-weight', weight)"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button>
                <font-awesome-icon class="awesome-icon" icon="redo" />
            </button>
            <button>
                <font-awesome-icon class="awesome-icon" icon="undo" />
            </button>
        </div>
        <div class="level-right">
            <button class="is-hidden-mobile">
                <font-awesome-icon class="awesome-icon" icon="save" />
            </button>
            <button class="is-hidden-mobile">
                <font-awesome-icon class="awesome-icon" :icon="['fab', 'twitter']" />
            </button>
            <button class="is-hidden-mobile">
                <font-awesome-icon class="awesome-icon" icon="globe-asia" />
            </button>
            <div
                class="dropdown is-right is-hidden-tablet"
                :class="{ 'is-active': toggles.others }"
                @click="toggles.others = !toggles.others"
            >
                <div class="dropdown-trigger">
                    <button>
                        <span>
                            <font-awesome-icon class="awesome-icon" icon="bars" />
                        </span>
                        <span>others</span>
                    </button>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-content">
                        <div class="dropdown-item"><font-awesome-icon icon="save" /> save</div>
                        <div class="dropdown-item">
                            <font-awesome-icon :icon="['fab', 'twitter']" /> share twitter
                        </div>
                        <div class="dropdown-item">
                            <font-awesome-icon icon="globe-asia" /> share gallery
                        </div>
                    </div>
                </div>
            </div>
            <button>
                <font-awesome-icon class="awesome-icon" icon="door-open" />
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'DrawingTools',
    data() {
        return {
            toggles: {
                weight: false,
                others: false,
            },
            color: '#000000',
            weight: 3,
        };
    },
};
</script>
