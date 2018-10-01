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
      {{error}}
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
      error: ""
    };
  },
  components: {},
  methods: {
    async login() {
      var response;
      var check = 0; //this is to ensure that only when correct data is entered we log the user information 
      try {
        response = await AuthenticationService.loginNewUser({
          email: this.email,
          password: this.password,
          newpassword: this.newpassword

        });
      } catch (error) {
        this.error = error.response.data;
        check = 1;
      }
      if (check == 0) {
        console.log(response.data);
      }
      check = 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
