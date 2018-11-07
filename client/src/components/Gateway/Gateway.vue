<template>
  <v-content v-if="this.$store.state.user_class == 'IoT Network Admin'">
    <div v-if="!this.$store.state.loginState"> 

      <div v-show="this.read== 1">
        <gateway_management v-bind:gateways_prop='this.gateways'  @create_gateway=" create_gateway($event)" @update_gateway="update_gateway($event)"></gateway_management>
      </div>
      <div v-if="this.create == 1">
        <create_gateway v-bind:gateways_prop='this.gateways' @gateway_management= read_gateway($event) @gateway_management_no_change="cancel() "></create_gateway>
      </div>
      <div v-else-if="this.update== 1">
        <update_gateway v-bind:gateways_prop='this.gateways' v-bind:gateway_update='this.gateway_update' @gateway_management= read_gateway($event) @gateway_management_no_change="cancel() "></update_gateway>  <!--Dynamically passing prop to child component -->
      </div>

    <div v-else-if="this.$store.state.loginState">
      <h3>You do not have access to this page. Please go to the login page</h3>
      <v-btn @click="login">Login</v-btn>
    </div>
    </div>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
import gateway_management from './Gateway_Management'
import create_gateway from './Create_Gateway'
import update_gateway from './Update_Gateway'

export default {
  components:{
    gateway_management,
    create_gateway,
    update_gateway
  },
  data(){
    return {
      create: 0,
      read: 0,
      update: 0,
      gateways: null,
      gateway_update: null    
    }
  },
  created: function () {
    if(this.$store.state.user_class =='IoT Network Admin'){
        this.read = 1;
    }else{
      alert('You do not have access to this page');
        this.$router.push('dashboard');
      }
  },
  computed: {
  },
  methods: {
    create_gateway(data){
      this.gateways = data;
      this.create =1;
      this.read =0;
      this.update =0;
    },
    read_gateway(data){
      this.gateways = data
      this.create =0;
      this.read =1;
      this.update =0;
    },
    update_gateway(data){
      this.gateways = data.gateways;
      this.gateway_update = data.gateway_update;
      this.create =0;
      this.read =0;
      this.update =1;
    },
    cancel(){//This was created so the prop is not updated with an empty array
      this.create =0;
      this.read =1;
      this.update =0;
    },
    login(){
      this.$router.push('dashboard');
    },
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
