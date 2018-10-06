<template>
  <v-content>
    <div v-if="!this.$store.state.loginState">
      <h3>Your token is: {{this.$store.state.token}}</h3>
    </div>
    <div v-if="this.$store.state.loginState">
      <h3>You do not have access to this page. Please go to the login page</h3>
      <v-btn @click="login">Login</v-btn>
    </div>
  </v-content>
</template>
  

<script>
export default {
  methods: {
    login(){
      this.$router.push('login');
    }
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
