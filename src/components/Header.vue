<style scoped lang="scss">
header {
    // position: absolute;
}
</style>

<template>
    <header>
        <router-link to="/signup"><p>signup</p></router-link>
        <router-link to="/login"><p>login</p></router-link>
        <router-link to="/drawing"><p>drawing</p></router-link>
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
