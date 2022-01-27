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
            <div v-for="controlSet in keys" :key="controlSet.index">
                <div>
                    <button 
                        class="button is-primary button-ui m-1"
                        :class="{'is-active': controlSet.isDown}"
                    >
                        <font-awesome-icon
                            class="awesome-icon"
                            :icon="`arrow-${controlSet.direction}`"
                        />
                    </button>
                </div>
            </div>
        </div>
        <!-- desktop -->
        <div class="is-hidden-touch is-flex">
            <div v-for="controlSet in keys" :key="controlSet.index">
                <div>
                    <button 
                        class="button is-primary button-ui m-1"
                        :class="{'is-active': controlSet.isDown}"
                    >
                        <font-awesome-icon
                            class="awesome-icon"
                            :icon="`arrow-${controlSet.direction}`"
                        />
                    </button>
                </div>
                <div>
                    <button 
                        class="button is-primary button-ui m-1"
                        :class="{'is-active': controlSet.isDown}"
                    >
                        <p class="is-size-5">{{ controlSet.key.toUpperCase() }}</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
class ControlSet {
    constructor(direction, key) {
        this.direction = direction;
        this.key = key;
        this.isDown = false;
    }
}
export default {
    name: 'Drawing',
    data() {
        return {
            keys: {
                d: new ControlSet('up', 'd'),
                f: new ControlSet('down', 'f'),
                j: new ControlSet('left', 'j'),
                k: new ControlSet('right', 'k'),
            },
        };
    },
    mounted: function () {
        document.addEventListener('keydown', this.keyDown);
        document.addEventListener('keyup', this.keyUp);
    },
    destroyed: function () {
        document.removeEventListener('keydown', this.keyDown);
        document.removeEventListener('keyup', this.keyUp);
    },
    methods: {
        keyEvent(event, boolean) {
            const key = event.key;
            if (key in this.keys) {
                this.keys[key].isDown = boolean;
            }
        },
        keyDown(event) {
            this.keyEvent(event, true);
        },
        keyUp(event) {
            this.keyEvent(event, false);
        },
    },
};
</script>
