<template>
<html>
  <body >
    <div id="app">
      <v-app class = "app_background">
        <v-content>
          <v-container>
            <toolbar @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer" @message_display="message_display($event)"></toolbar>
            <v-layout >
              <v-flex >
                <navigation_drawer ref="drawer" flat v-if="!this.$store.state.loginState"></navigation_drawer>
              </v-flex>
              <v-flex xs12 >
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
export default {
  name: 'App',
  components:{
    toolbar,
    navigation_drawer
  },
    methods: {
    message_display(data){
      this.snackbar=1;
      this.color =data.type;
      this.message = data.message;
    }
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
.text{
  color: red;
}
</style>
