<template>
  <div>
    <h1>Register User </h1>
      <!--First Name-->
      <input  
        type="string"
        name="first_name"
        v-model="first_name"
        placeholder="First name"/> 
      <br>
      <!--Last Name-->
      <input  
        type="string"
        name="last_name"
        v-model="last_name"
        placeholder="Last name"/> 
      <br>
      <!--Address-->
      <input  
        type="string"
        name="address"
        v-model="address"
        placeholder="Address"/> 
      <br>
      <!--Home Phone-->
      <input  
        type="tel"
        name="home_phone"
        v-model="home_phone"
        placeholder="Home Phone"/> 
      <br>
      <!--Mobile Phone-->
      <input  
        type="tel"
        name="mobile_phone"
        v-model="mobile_phone"
        placeholder="Mobile Phone"/> 
      <br>
      <!--EMAIL-->
      <input    
        type="email"
        name="email"
        v-model="email"
        placeholder="Email"/> 
      <br>
      <!--Password-->
      <input    
        type="password"
        name="password"
        v-model="password"
        placeholder="Password"/> 
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
      password: ""
    }
  },
  components: {
    
  },
  methods: {
    async register (){
      const response = await AuthenticationService.register({
        first_name: this.first_name,
        last_name: this.last_name ,
        address: this.address ,
        home_phone: this.home_phone ,
        mobile_phone: this.mobile_phone ,
        email: this.email ,
        password: this.password 
      });
      console.log(response.data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
