<template>
  <v-toolbar fixed color ="grey lighten-2" >
    <v-toolbar-title>Private Marine IoT Network Console </v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down ">
      <v-btn class="grey lighten-2" @click="login" flat v-if="this.$store.state.loginState">
        Login
      </v-btn>
      <v-btn class="grey lighten-2" @click="logout" flat v-if="(!this.$store.state.loginState)">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

  

<script>
export default {
  data() {
    return {

    };
  },
  components: {},
  methods: {
    login(){
      this.$router.push('login');
    },
    register(){
      this.$router.push('register');
    },
    logout(){
      this.$store.commit('logout');
      this.$router.push('login');
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
