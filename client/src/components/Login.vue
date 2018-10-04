<template>
  <div>
    <h1>User Login</h1>
      <!--EMAIL-->
      Email<br>
      <input    
        type="email"
        name="email"
        v-model="email"
        placeholder="Email"/> 
      <br>
      <!--Password-->
      Password<br>
      <input    
        type="password"
        name="password"
        v-model="password"
        placeholder="Password"/> 
      <br>
      {{message}}
      <br>
      <button
      @click= "login">Login </button>

  </div>
</template>
  

<script>
import AuthenticationService from "../services/AuthenticationService.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      message: ""
    };
  },
  components: {},
  methods: {
    async login() {
      var response;
      try {
        response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        });
        this.message = response.data.message;
        console.log('token: ' +response.data.token);

      } catch (error) {
        this.message = error.response.data;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
