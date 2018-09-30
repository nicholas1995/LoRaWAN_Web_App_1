<template>
  <div id="app">
    <router-view></router-view>
    <!--<register></register>-->
  </div>
</template>

<script>
import register from './components/Register'
import login from './components/Login'
export default {
  name: 'App',
  components:{
    register,
    login
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
