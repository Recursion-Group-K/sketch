<template>
    <div>
        {{ message }}
        <p>
            <router-link to="/login">Login</router-link>
        </p>
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
