<style scoped lang="scss"></style>
<template>
    <div>
        <router-link to="/signup"><p>signup</p></router-link>
        <router-link to="/login"><p>login</p></router-link>
        <router-link to="/drawing"><p>drawing</p></router-link>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {};
    },
};
</script>