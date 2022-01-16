<template>
    <div>
        {{ message }}
        <div>
            <router-link to="/drawing">Drawing</router-link>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>

<script>
export default {
    name: 'Home',
    data() {
        return {
            message: 'HEYY!! WELCOME TO HOME',
        };
    },
};
</script>
