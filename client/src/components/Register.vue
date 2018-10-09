<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5">
            <!--First Name -->
              <v-text-field
                v-model="first_name"
                label="First Name"
                required
              ></v-text-field>
            <!--Last Name-->
              <v-text-field
                v-model="last_name"
                label="Last Name"
                required
              ></v-text-field>
            <!--Address-->
              <v-text-field
                v-model="address"
                label="Address"
                required
              ></v-text-field>
            <!--Home Phone-->
              <v-text-field
                :mask="mask"
                v-model="home_phone"
                label="Home Phone"
                required
              ></v-text-field>
            <!--Mobile Phone-->
              <v-text-field
                :mask="mask"
                v-model="mobile_phone"
                label="Mobile Phone"
                required
              ></v-text-field>
            <!--User Class-->
              <v-text-field
                v-model="user_class"
                label="User Class"
                required
              ></v-text-field>
            <!--Email-->
              <v-text-field
                v-model="email"
                label="Email Address"
                required
              ></v-text-field>
              <div div class="text">
                {{message}}
              </div>
              <v-btn class="grey lighten-2"
                @click="register"
              >
                Register User
              </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

  

<script>
import AuthenticationService from "../services/AuthenticationService.js";
import Axios from "../../../../../../Users/nicholasmitchell/LoRaWAN_Web_App_1/client/node_modules/axios/index.js";
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      address: "",
      home_phone: "",
      mobile_phone: "",
      email: "",
      message: "",
      mask:'phone',
      user_class: ""
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
          email: this.email,
          user_class: this.user_class
        });
        this.$store.dispatch('get_users');
        this.$router.push('dashboard');
      } catch (error) {
        this.message = error.response.data.error;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
