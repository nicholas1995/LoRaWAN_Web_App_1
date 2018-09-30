<template>
  <div>
    <h1>Register User </h1>
      <!--First Name-->
      First Name<br>
      <input  
        type="string"
        name="first_name"
        v-model="first_name"
        placeholder="First name"/> 
      <br>
      <!--Last Name-->
      Last Name<br>
      <input  
        type="string"
        name="last_name"
        v-model="last_name"
        placeholder="Last name"/> 
      <br>
      <!--Address-->
      Address<br>
      <input  
        type="string"
        name="address"
        v-model="address"
        placeholder="Address"/> 
      <br>
      <!--Home Phone-->
      Home Phone<br>
      <input  
        type="tel"
        name="home_phone"
        v-model="home_phone"
        placeholder="Home Phone"/> 
      <br>
      <!--Mobile Phone-->
      Mobile Phone<br>
      <input  
        type="tel"
        name="mobile_phone"
        v-model="mobile_phone"
        placeholder="Mobile Phone"/> 
      <br>
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
      @click= "register">Register </button>

  </div>
</template>
  

<script>
import AuthenticationService from '../services/AuthenticationService.js';
export default {
  data () {
    return {
      first_name: "",
      last_name: "",
      address: "",
      home_phone: "",
      mobile_phone: "",
      email: "",
      password: "",
      error: ""
    }
  },
  components: {
    
  },
  methods: {
    async register (){
      try{
      await AuthenticationService.register({
        first_name: this.first_name,
        last_name: this.last_name ,
        address: this.address ,
        home_phone: this.home_phone ,
        mobile_phone: this.mobile_phone ,
        email: this.email ,
        password: this.password
      });
      }catch(error){      
        console.log(error.response.data);
        this.error = error.response.data;
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
