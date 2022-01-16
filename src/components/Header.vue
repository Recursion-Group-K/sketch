<template>
    <div class="hero is-link is-tablet">
        <div class="column">
            <nav class="level is-mobile is-primary">
                <div class="level-left">
                    <div class="level-item is-hidden-mobile has-text-weight-bold pr-5">
                        title of work
                    </div>
                    <div class="level-item">color</div>
                    <div class="level-item">pixel</div>
                    <div class="level-item">redo</div>
                    <div class="level-item">undo</div>
                </div>
                <div class="level-right">
                    <div class="level-item is-hidden-mobile">save</div>
                    <div class="level-item is-hidden-mobile">share</div>
                    <div class="level-item is-hidden-tablet">
                        <div class="dropdown is-right" 
                            v-bind:class="{'is-active':isActive}" 
                            v-on:click="isActive=!isActive" 
                        >
                            <div class="dropdown-trigger">
                                <button class="button is-link">
                                    <span>others</span>
                                </button>
                            </div>
                            <div class="dropdown-menu">
                                <div class="dropdown-content">
                                    <div class="dropdown-item">save</div>
                                    <div class="dropdown-item">share</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="level-item">back</div>
                </div>
            </nav>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>

<script>
export default {
    name: 'Header',
    data() {
        return {
            isActive:false,
        };
    },
};
</script>

<style></style>
