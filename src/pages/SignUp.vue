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
.vertical-alignment {
    vertical-align: bottom;
}
.error-title {
    font-size: 1em;
    color: red;
}
.error-message {
    color: crimson;
    font-size: 0.8em;
}
.btn {
    margin: 0.8rem 0;
}
.loading {
    display: flex;
    justify-content: center;
}
</style>
<style module>
@import '../assets/loading.css';
</style>

<template>
    <section class="hero is-primary is-fullheight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-vcentered">
                    <div class="column is-6 vertical-alignment">
                        <img src="../assets/images/logo.svg" class="logo" />
                        <h1 class="page-title title is-1">Welcome to Etch A Sketch</h1>
                        <p class="subtitle">Unlock your imagination</p>
                    </div>
                    <div class="column is-5-tablet is-4-desktop is-4-widescreen">
                        <form @submit.prevent="createAccount(inputs)" class="box">
                            <div class="title">
                                <h1 class="has-text-black has-text-weight-bold">Sign Up</h1>
                            </div>
                            <!-- Loader -->
                            <div class="loading">
                                <span v-if="isLoading" class="loader"></span>
                            </div>
                            <!-- Error Message -->
                            <div
                                v-if="hasRespError"
                                class="has-text-danger is-size-4 p-3"
                            >
                                <p class="error-title">Error occured. Try Again.</p>
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
                                <div v-for="error in usernameError" :key=error.id>
                                    <p class="error-message">{{ error }}</p>
                                </div>
                            </div>
                            <div class="field">
                                <label for="" class="label">Email</label>
                                <div class="control has-icons-left">
                                    <input
                                        v-model="inputs.email"
                                        type="email"
                                        placeholder="e.g. recursionist@gmail.com"
                                        class="input"
                                        required
                                    />
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                </div>
                                <div v-for="error in emailError" :key=error.id>
                                    <p class="error-message">{{ error }}</p>
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
                                <button class="button is-success btn">Create account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'SignUp',
    data() {
        return {
            inputs: {
                username: '',
                email: '',
                password: '',
            },
        };
    },
    computed: {
        ...mapState('signup', [
            'isLoading',
            'hasRespError',
            'usernameError',
            'emailError',
        ]),
        ...mapGetters('auth', ['isAuthenticated']),
    },
    methods: {
        async createAccount({ username, email, password }) {
            try {
                console.log(username, email, password)
                await this.$store.dispatch('signup/createAccount', { username, email, password });
                await this.$store.dispatch('auth/login', { username, password });
                if(!this.hasRespError && this.isAuthenticated) {
                    this.$router.push({ name: 'Gallery' });
                }
            } catch(error) {
                console.log(error);
            }
        }
    }
};
</script>
