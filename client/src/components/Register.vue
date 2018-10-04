<template>
  <div>
    <h1>Register User </h1>
      <!--First Name-->
      <form
      name = "NewUser"
      autocomplete="off">
        First Name<br>
        <input  
          type="string"
          name="first_name"
          v-model="first_name"
          autocomplete="off"
          placeholder="First name"/> 
        <br>
        <!--Last Name-->
        Last Name<br>
        <input  
          type="string"
          name="last_name"
          v-model="last_name"
          autocomplete="off"
          placeholder="Last name"/> 
        <br>
        <!--Address-->
        Address<br>
        <input  
          type="string"
          name="address"
          v-model="address"
          autocomplete="off"
          placeholder="Address"/> 
        <br>
        <!--Home Phone-->
        Home Phone<br>
        <input  
          type="tel"
          name="home_phone"
          v-model="home_phone"
          autocomplete="off"
          placeholder="Home Phone"/> 
        <br>
        <!--Mobile Phone-->
        Mobile Phone<br>
        <input  
          type="tel"
          name="mobile_phone"
          v-model="mobile_phone"
          autocomplete="off"
          placeholder="Mobile Phone"/> 
        <br>
        <!--EMAIL-->
        Email<br>
        <input    
          type="email"
          name="email"
          v-model="email"
          autocomplete="off"
          placeholder="Email"/> 
        <br>
        {{message}}
      </form>
      <button
      @click= "register">Register </button>

  </div>
</template>
  

<script>
import AuthenticationService from "../services/AuthenticationService.js";
import Axios from '../../../../../../Users/nicholasmitchell/LoRaWAN_Web_App_1/client/node_modules/axios/index.js';
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      address: "",
      home_phone: "",
      mobile_phone: "",
      email: "",
      message: ""
    };
  },
  components: {},
  methods: {
    async register() {
      try {
      const response = await AuthenticationService.register({
          first_name: this.first_name,
          last_name: this.last_name,
          address: this.address,
          home_phone: this.home_phone,
          mobile_phone: this.mobile_phone,
          email: this.email
        });
        this.message = response.data;
      } 
      catch (error) {
        this.message = error.response.data;

      } 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
