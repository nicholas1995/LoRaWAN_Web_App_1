<template>
  <v-content v-if="this.$store.state.user_class == 'IoT Network Admin'">
      <div v-show="this.read== 1">
        <network_management v-bind:network='this.network' @create_network= create_network($event) @update_network="update_network($event) "></network_management>
      </div>
      <div v-if="this.create == 1">
        <create_network v-bind:networks='this.network' @network_management= read_network($event) @network_management_no_change= cancel()></create_network>
      </div>
      <div v-else-if="this.update== 1">
        <update_network v-bind:networks='this.network' v-bind:network_update='this.network_update' @network_management= read_network($event) @network_management_no_change= cancel()></update_network>  <!--Dynamically passing prop to child component -->
      </div>

    <div v-else-if="this.$store.state.loginState">
      <h3>You do not have access to this page. Please go to the login page</h3>
      <v-btn @click="login">Login</v-btn>
    </div>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
import network_management from './Network_Management'
import create_network from './Create_Network'
import update_network from './Update_Network'

export default {
  components:{
    network_management,
    create_network,
    update_network
  },
  data(){
    return {
      create: 0,
      read: 0,
      update: 0,
      network: null,
      network_update: {} //variable to store emitted value from Network_Management to pass to Update_Network as prop
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
    create_network(data){
      this.network =data;
      this.create =1;
      this.read =0;
      this.update =0;
    },
    read_network(data){
      this.network =data; //Storing the child component [Create_Network] array of networks to the network variable. This is binded to the child component [Network_Management]
      this.create =0;
      this.read =1;
      this.update =0;
    },
    update_network(data){
      this.network = data.networks;
      this.network_update = data.network_update;
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
