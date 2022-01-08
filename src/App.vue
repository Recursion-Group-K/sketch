<template>
  <div id="app">
    <header id="nav">
        <router-link to="/">Home</router-link> 
    </header>
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
};
</script>

<style lang="scss">
@import "bulma/bulma.sass";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
