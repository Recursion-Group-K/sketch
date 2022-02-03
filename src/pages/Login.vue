<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
.page-title {
    font-family: 'Lobster', cursive;
}
.box {
    box-shadow: 2px 2px 2px 2px hsl(171, 89%, 35%);
}
.link {
    color: rgb(6, 69, 173);
}
.logo {
    height: 200px;
}
.vertical-align {
    margin-bottom: auto;
}
</style>

<template>
    <section class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-vcentered">
                    <div class="column is-6 vertical-align">
                        <img src="../assets/images/logo.svg" class="logo" />
                        <h1 class="page-title title is-1">Etch A Sketch</h1>
                        <p class="subtitle">Unlock your imagination</p>
                    </div>
                    <div class="column is-5-tablet is-4-desktop is-4-widescreen">
                        <form @submit.prevent="login(inputs)" class="box">
                            <div class="title">
                                <h1 class="has-text-black has-text-weight-bold">Login</h1>
                            </div>
                            <hr />
                            <div class="field">
                                <label for="" class="label">Name</label>
                                <div class="control has-icons-left">
                                    <input
                                        v-model="inputs.username"
                                        type="text"
                                        class="input"
                                        required
                                    />
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label for="" class="label">Password</label>
                                <div class="control has-icons-left">
                                    <input
                                        v-model="inputs.password"
                                        type="password"
                                        placeholder="*******"
                                        class="input"
                                        required
                                    />
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <button class="button is-success">Login</button>
                            </div>
                            <hr />
                            <div class="field">
                                <!-- router-linkは/signupに後で変更する -->
                                <p>
                                    Not Registered?
                                    <router-link to="/signup">
                                        <span class="link">Sign Up</span>
                                    </router-link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss"></style>

<script>
import UserWrapper from '../api/userWrapper';

export default {
    name: 'Login',
    data() {
        return {
            inputs: {
                username: process.env.VUE_APP_SUPERUSER_NAME,
                password: process.env.VUE_APP_SUPERUSER_PASSWORD,
            },
        };
    },
    methods: {
        async login({ username, password }) {
            try {
                await this.$store.dispatch('auth/login', { username, password });
                this.$router.push({ name: 'Gallery' });
            } catch(error) {
                console.error(error);
            }
        },
        async createUser() {
            const userPrams = {
                name: `ggggggg`,
                email: `ggggggg@gmail.com`,
                password: `ggggggg`,
            };
            const user = await new UserWrapper().create(userPrams);
            console.log(user);
        },
    },
};
</script>
