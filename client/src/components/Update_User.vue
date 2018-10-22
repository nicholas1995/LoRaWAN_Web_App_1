<template>
  <v-content v-if="!this.$store.state.loginState " >
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Update</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--First Name -->
            <v-flex >
              <v-text-field
                v-model="first_name"
                :label="this.$store.state.update_user.user.first_name"
                hint = 'First Name'
                required
              ></v-text-field>
              </v-flex>
            <!--Last Name-->
              <v-text-field
                v-model="last_name"
                :label="this.$store.state.update_user.user.last_name"
                hint = 'Last Name'
                required
              ></v-text-field>
            <!--Address-->
              <v-text-field
                v-model="address"
                :label="this.$store.state.update_user.user.address"
                hint = 'Address'
                required
              ></v-text-field>
            <!--Home Phone-->
              <v-text-field
                :mask="mask"
                v-model="home_phone"
                :label="this.$store.state.update_user.user.home_phone"
                hint = 'Home Phone'
                required
              ></v-text-field>
            <!--Mobile Phone-->
              <v-text-field
                :mask="mask"
                v-model="mobile_phone"
                :label="this.$store.state.update_user.user.mobile_phone"
                hint = 'Mobile Phone'
                required
              ></v-text-field>
              <div div class="text">
                {{message}}
              </div>
              <v-btn class="grey lighten-2"
                @click="update_user_account"
              >
                Update User Account
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
      message: "",
      mask:'phone'
    };
  },
  beforeCreate: function () {
    if(this.$store.state.loginState){
      alert('You do not have access to this page');
      this.$router.push('dashboard');
    }
    else if(this.$store.state.update_user =={}){
      this.$router.push('dashboard');
    }
  },
  destroyed: function(){
    if(this.$store.state.update_self == 1){
      let full_name = this.first_name + " " + this.last_name;
      this.$store.commit('update_user_destroy',{full_name});
    }

    this.$store.commit('update_self', 0);//reset back to zero 
  },
  components: {},
  methods: {
    async update_user_account() {
      //This set of if statements lets the user leave fields blank. When this is done the field takes up its original value
      if(this.first_name == ""){
        this.first_name = this.$store.state.update_user.user.first_name;
      }
      if(this.last_name == ""){
        this.last_name = this.$store.state.update_user.user.last_name;
      }
      if(this.address == ""){
        this.address = this.$store.state.update_user.user.address;
      }
      if(this.home_phone == ""){
        this.home_phone = this.$store.state.update_user.user.home_phone;
      }
      if(this.mobile_phone == ""){
        this.mobile_phone = this.$store.state.update_user.user.mobile_phone;
      }

      try {
        const response = await AuthenticationService.update_user({
          first_name: this.first_name,
          last_name: this.last_name,
          address: this.address,
          home_phone: this.home_phone,
          mobile_phone: this.mobile_phone,
          email: this.$store.state.update_user.user.email
        });
        this.$store.dispatch('get_users');
        if(this.$store.state.user_class == "Software Admin"){
          this.$router.push('accountmanagement');
        }else{
          this.$router.push('dashboard');
        }
        this.message = response.data.message;
      } catch (error) {
        this.message = error.response.data.error;
      } 
    },
    login(){
      this.$router.push('login');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
