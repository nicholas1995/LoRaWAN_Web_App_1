<template>
  <v-content v-if="this.$store.state.user_class == 'IoT Network Admin'">
    <div v-if="!this.$store.state.loginState"> 

      <div v-show="this.read== 1">
        <device_management v-bind:devices_prop='this.devices'  @create_device=" create_device($event)" @update_device="update_device($event)"></device_management>
      </div>
      <div v-if="this.create == 1">
        <create_device v-bind:devices_prop='this.devices' @device_management= read_device($event) @device_management_no_change="cancel() "></create_device>
      </div>
      <div v-else-if="this.update== 1">
        <update_device v-bind:devices_prop='this.devices' v-bind:device_update='this.device_update' @device_management= read_device($event) @device_management_no_change="cancel() "></update_device>  <!--Dynamically passing prop to child component -->
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
import device_management from './Device_Management'
import create_device from './Create_Device'
import update_device from './Update_Device'

export default {
  components:{
    device_management,
    create_device,
    update_device
  },
  data(){
    return {
      create: 0,
      read: 0,
      update: 0,
      devices: null,
      device_update: null    
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
    create_device(data){
      this.devices = data
      this.create =1;
      this.read =0;
      this.update =0;
    },
    read_device(data){
      this.devices = data
      this.create =0;
      this.read =1;
      this.update =0;
    },
    update_device(data){
      this.devices = data.devices;
      this.device_update = data.device_update;
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
