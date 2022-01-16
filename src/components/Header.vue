<style>
.header-drowing{
    height: 4.5rem;
}
</style>

<template>
    <div class="hero is-link is-tablet">
        <div class="column py-0">
            <nav class="level is-mobile is-primary header-drowing">
                <div class="level-left">
                    <div class="level-item is-hidden-mobile has-text-weight-bold pr-5">
                        title of work
                    </div>
                    <div class="level-item is-flex-direction-column-reverse"><span class=" is-size-7">color</span><font-awesome-icon class="is-size-4" icon="palette" /></div>
                    <div class="level-item is-flex-direction-column-reverse"><span class=" is-size-7">pixel</span><font-awesome-icon class="is-size-4" icon="circle" /></div>
                    <div class="level-item is-flex-direction-column-reverse"><span class=" is-size-7">redo</span><font-awesome-icon class="is-size-4" icon="redo" /></div>
                    <div class="level-item is-flex-direction-column-reverse"><span class=" is-size-7">undo</span><font-awesome-icon class="is-size-4" icon="undo" /></div>
                </div>
                <div class="level-right">
                    <div class="level-item is-hidden-mobile is-flex-direction-column-reverse"><span class=" is-size-7">save</span><font-awesome-icon class="is-size-4" icon="save" /></div>
                    <div class="level-item is-hidden-mobile is-flex-direction-column-reverse"><span class=" is-size-7">share</span><font-awesome-icon class="is-size-4" icon="share-square" /></div>
                    <div class="level-item is-hidden-tablet">
                        <div class="dropdown is-right" 
                            v-bind:class="{'is-active':isActive}" 
                            v-on:click="isActive=!isActive" 
                        >
                            <div class="dropdown-trigger">
                                <button class="button is-link">
                                    <div class="is-flex is-flex-direction-column-reverse is-justify-content-center has-text-centered"><span class=" is-size-7">others</span><span><font-awesome-icon class="is-size-4" icon="bars" /></span></div>
                                </button>
                            </div>
                            <div class="dropdown-menu">
                                <div class="dropdown-content">
                                    <div class="dropdown-item">save<font-awesome-icon icon="save" /></div>
                                    <div class="dropdown-item">share<font-awesome-icon icon="share-square" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="level-item is-flex-direction-column-reverse"><span class=" is-size-7">back</span><font-awesome-icon class="is-size-4" icon="door-open" /></div>
                </div>
            </nav>
        </div>
    </div>
</template>

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