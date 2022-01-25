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
                        <h1 class="page-title title is-1">Welcome to Etch A Sketch</h1>
                        <p class="subtitle">Unlock your imagination</p>
                    </div>
                    <div class="column is-5-tablet is-4-desktop is-4-widescreen">
                        <form action="" class="box">
                            <div class="title">
                                <h1 class="has-text-black has-text-weight-bold">Sign Up</h1>
                            </div>
                            <hr />
                            <div class="field">
                                <label for="" class="label">Email</label>
                                <div class="control has-icons-left">
                                    <input
                                        type="email"
                                        placeholder="e.g. recursionist@gmail.com"
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
                                <button class="button is-success">Sign Up</button>
                            </div>
                            <hr />
                            <div class="field">
                                <!-- router-linkは/loginに後で変更する -->
                                <p>
                                    Already have an account?
                                    <router-link to="/login"
                                        ><span class="link">Login</span></router-link
                                    >
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
export default {
    name: 'SignUp',
    data() {
        return {};
    },
};
</script>
