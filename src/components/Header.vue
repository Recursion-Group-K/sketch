<style scoped lang="scss">
header {
    min-height: 5rem;
}
</style>

<template>
    <header>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <img src="../assets/images/logo.svg" class="m-3" />
                    <h3 class="page-title title" style="width: 200px">Etch A Sketch</h3>
                </router-link>

                <a
                    role="button"
                    class="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <router-link to="/drawing" class="navbar-item">drawing</router-link>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div v-if="doesUserSignedIn" class="buttons">
                            <button to="/" class="button">logout</button>
                        </div>
                        <div v-else class="buttons">
                            <router-link to="/signup" class="button is-primary">signup</router-link>
                            <router-link to="/login" class="button is-light">login</router-link>
                        </div>
                    </div>
                </div>
                <button @click="doesUserSignedIn = !doesUserSignedIn">Toggle</button>
            </div>
        </nav>
    </header>
</template>

<script>
import UserWrapper from '../api/userWrapper'
export default {
    name: 'Header',
    data() {
        return {
            doesUserSignedIn: false,
            demoUser: null
        };
    },
    mounted(){
        new UserWrapper().getById(1)
            .then(user => this.demoUser = user)
    }
};
</script>
