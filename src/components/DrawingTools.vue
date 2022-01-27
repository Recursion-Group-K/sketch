<style lang="scss" scoped>
// SIZES
$width__sidebar: 20em;

.sidebar-toggle {
    @extend .button;
    border-radius: 0%;
    position: absolute;
    top: 5rem;
    left: 0;
    position: fixed;
    z-index: 2;
    margin-left: $width__sidebar;
    cursor: pointer;
    transition: .7s;
    
    &.is-closed {
        transform: translateX(- $width__sidebar);  
    }
}

.sidebar {
    z-index: 2;
    position: absolute;
    top: 5rem;
    left: 0;
    width: $width__sidebar;
    height: calc(100vh - 5rem);
    background-color: $white;
    transition: .7s;
    box-shadow: $shadow;
    
    &.is-closed {
        transform: translateX(-$width__sidebar);
    }
}
.non-radious {
    border-radius: 0;
}
</style>

<template>
    <div>
        <div class="sidebar has-text-dark" :class="{'is-closed': !isSidebarOpen}">
            <aside class="menu py-3">

                <div class="level-item is-hidden-mobile has-text-weight-bold is-size-4 pr-5">
                    title of work
                </div>

                <p class="menu-label">Color</p>
                <ul class="menu-list is-align-content-start">
                    <li>
                        <a>
                            <font-awesome-icon class="awesome-icon zindex-2" icon="palette" />
                            <input class="color-picker" type="color" v-model="color" />
                        </a>
                    </li>
                </ul>
                
                <p class="menu-label">Weight</p>
                <ul class="menu-list">
                    <li>
                        <a>
                            <input type="range"  min="1" max="200" v-model="weight" /> {{ weight }} px
                        </a>
                    </li>
                </ul>
                <p class="menu-label">Transactions</p>
                <ul class="menu-list">
                    <li>
                        <a>
                            <font-awesome-icon class="awesome-icon" icon="redo" />
                        </a>
                    </li>
                    <li>
                        <a>
                            <font-awesome-icon class="awesome-icon" icon="undo" />
                        </a>
                    </li>
                </ul>
                <p class="menu-label">Share Option</p>
                <ul class="menu-list">
                    <li>
                        <a><font-awesome-icon :icon="['fab', 'twitter']" /> Twitter</a>
                    </li>
                    <li>
                        <a><font-awesome-icon icon="globe-asia" /> Gallery</a>
                    </li>
                </ul>
                <p class="menu-label">Save Option</p>
                <ul class="menu-list">
                    <li>
                        <a>
                            <font-awesome-icon icon="save" /> Save
                        </a>
                    </li>
                    
                </ul>
            </aside>
        </div>
        <button 
            class="sidebar-toggle"
            :class="{'is-closed': !isSidebarOpen}" 
            @click="toggleSideBar"
        >
            <font-awesome-icon class="awesome-icon" icon="sliders-h" size="lg" />
        </button>
    </div>
</template>

<script>
export default {
    name: 'DrawingTools',
    data() {
        return {
            isSidebarOpen: true,
            toggles: {
                weight: false,
                others: false,
            },
            color: '#000000',
            weight: 50,
        };
    },
    methods: {
        toggleSideBar(){
            this.isSidebarOpen = !this.isSidebarOpen
        }
    }
};
</script>
