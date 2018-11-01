<template>
  <v-content v-if="this.$store.state.user_class == 'IoT Network Admin'">
    <div v-if="!this.$store.state.loginState"> 

      <div v-show="this.read== 1">
        <sub_network_management v-bind:sub_network='this.sub_networks'  @create_sub_network=" create_sub_network($event)" @update_sub_network="update_sub_network($event)"></sub_network_management>
      </div>
      <div v-if="this.create == 1">
        <create_sub_network v-bind:sub_network='this.sub_networks' @sub_network_management= read_sub_network($event) @sub_network_management_no_change="cancel() "></create_sub_network>
      </div>
      <div v-else-if="this.update== 1">
        <update_sub_network v-bind:sub_networks='this.sub_networks' v-bind:sub_network_update='this.sub_network_update' @sub_network_management= read_sub_network($event) @sub_network_management_no_change="cancel() "></update_sub_network>  <!--Dynamically passing prop to child component -->
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
import sub_network_management from './Sub_Network_Management'
import create_sub_network from './Create_Sub_Network'
import update_sub_network from './Update_Sub_Network'

export default {
  components:{
    sub_network_management,
    create_sub_network,
    update_sub_network
  },
  data(){
    return {
      create: 0,
      read: 0,
      update: 0,
      sub_networks: null,
      sub_network_update: null    
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
    create_sub_network(data){
      this.sub_networks = data
      this.create =1;
      this.read =0;
      this.update =0;
    },
    read_sub_network(data){
      this.sub_networks = data
      this.create =0;
      this.read =1;
      this.update =0;
    },
    update_sub_network(data){
      this.sub_networks = data.sub_networks;
      this.sub_network_update = data.sub_network_update;
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
