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
      {{error}}
      <br>
      <button
      @click= "login">Login </button>

  </div>
</template>
  

<script>
import AuthenticationService from '../services/AuthenticationService.js';
export default {
  data () {
    return {
      email: "",
      password: "",
      error: ""
    }
  },
  components: {
    
  },
  methods: {
    async login (){
      try{
      await AuthenticationService.login({
        email: this.email ,
        password: this.password
      });
      }catch(error){      
        this.error = error.response.data;
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
