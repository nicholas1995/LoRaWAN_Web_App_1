<template>
<html>
  <body >
    <div id="app">
      <v-app class = "app_background">
        <v-content>
         <snackbar></snackbar>
          <v-container>
            <toolbar @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer" @message_display="message_display($event)"></toolbar>
            <v-layout >
              <v-flex >
                <navigation_drawer ref="drawer" flat v-if="!this.$store.state.loginState"></navigation_drawer>
              </v-flex>
              <v-flex xs12 m12>
                 <router-view ></router-view>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
      </v-app>
    </div>
  </body>
  </html>
</template>

<script>
import toolbar from './components/Toolbar'
import navigation_drawer from './components/Navigation_Drawer'
import snackbar from './components/Snack_Bar'
export default {
  name: 'App',
  components:{
    toolbar,
    navigation_drawer,
    snackbar
  },
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
.text{
  color: red;
}
</style>
