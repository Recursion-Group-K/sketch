<style scoped lang="scss">
header {
    min-height: 5rem;
    box-shadow: 2px 2px 2px 2px hsl(171deg 89% 35%);
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
                        <div class="buttons">
                            <router-link to="/signup" class="button is-primary">signup</router-link>
                            <router-link to="/login" class="button is-light">login</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {};
    },
};
</script>
