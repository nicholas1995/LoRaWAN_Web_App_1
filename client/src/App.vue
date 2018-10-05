<template>
  <body>
    <div id="app">
      <v-app>
        <v-content>
              <toolbar></toolbar>
      <br>
      <router-view></router-view>
        </v-content>
      </v-app>
    </div>
  </body>
</template>

<script>
import register from './components/Register'
import login from './components/Login'
import toolbar from './components/Toolbar'
export default {
  name: 'App',
  components:{
    toolbar,
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
