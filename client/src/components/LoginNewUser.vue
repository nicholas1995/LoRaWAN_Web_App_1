<template>
  <div>
    <h1>New User Login</h1>
      <!--EMAIL-->
      Email<br>
      <input    
        type="email"
        name="email"
        v-model="email"
        placeholder="Email"/> 
      <br>
      <!--Existing Password-->
      Password<br>
      <input    
        type="password"
        name="password"
        v-model="password"
        placeholder="Password"/> 
      <br>
      <!--New Password-->
      New Password<br>
      <input    
        type="password"
        name="newpassword"
        v-model="newpassword"
        placeholder="New Password"/> 
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
      newpassword: "",
      message: ""
    };
  },
  components: {},
  methods: {
    async login() {
      var response;
      try {
        response = await AuthenticationService.loginNewUser({
          email: this.email,
          password: this.password,
          newpassword: this.newpassword
        });
        this.message = response.data.message;
        console.log('Token: '+ response.data.token);
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
