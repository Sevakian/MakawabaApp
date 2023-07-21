<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <router-link to="/Timestats">Timestats</router-link> |
      <router-link to="/Calendar">Calendar</router-link> |
      <router-link to="/Gaming">Gaming</router-link> |
      <span style="color:#ff9900;font-size:50px;"> 𓂀 </span>
    </div>
    <router-view style="overflow-x:scroll"/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  background-color:#004d80;
  padding: 30px;
  padding-top:3px;
  border: 1px solid black;

  a {
    font-weight: bold;
    color: #ff9900;

    &.router-link-exact-active {
      color:white;
    }
  }
}
</style>
