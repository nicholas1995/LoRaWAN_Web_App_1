<template>
<html>
  <body>
    <div id="app">
      <v-app>
        <v-content>
          <v-container>
            <toolbar></toolbar>
            <router-view></router-view>
          </v-container>
        </v-content>
      </v-app>
    </div>
  </body>
  </html>
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
