<template>
  <v-content v-if="this.access == 1">
    <div> 
      <div v-show="this.read== 1">
        <device_management v-bind:devices_prop='this.devices' @create_device=" create_device($event)" @update_device="update_device($event)" @message_display="message_display($event)"></device_management>
      </div>
      <div v-if="this.create == 1">
        <create_device v-bind:devices_prop='this.devices' @device_management= read_device($event) @device_management_no_change="cancel() " @message_display="message_display($event)"></create_device>
      </div>
      <div v-else-if="this.update== 1">
        <update_device v-bind:devices_prop='this.devices' v-bind:device_update='this.device_update' @device_management= read_device($event) @device_management_no_change="cancel()" @message_display="message_display($event)"></update_device>  <!--Dynamically passing prop to child component -->
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      bottom="bottom"
      left="left"
      multi-line="multi-line"
      right="right"
      :timeout="this.timeout"
      auto-height="auto-height"
      :color ="this.color"
    >
      {{ this.message }}
      <v-btn
        flat
        @click="snackbar = 0"
      >        Close
      </v-btn>
    </v-snackbar>
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
      access: 0,
      create: 0,
      read: 0,
      update: 0,
      devices: null,
      device_update: null,
      snackbar:0,
      timeout: 1500,
      color: "error",
      message: "blank" 
    }
  },
  created: async function () {
      try {
            if (this.$store.state.loginState == false) {
              //User logged in
              await AuthenticationService.check_permissions("devices", "post")
                .catch(err => {
                  console.log(err)
                  throw err;
                });
              this.access =1;
              this.read = 1;
            }else{
              alert('Please login.');
              this.$router.push('login');
            }
      }catch (err) {
        if(err.response.status == "401"){
          //Unauthorized.... token expired
          alert('Token expired please login.');
          this.$store.commit('logout');
          this.$router.push('login');
        }else if(err.response.status == "403"){
          //Do not have access to this resource
          alert('You do not have access to this page');
          this.$router.push('dashboard');
        }else{
          alert('You do not have access to this page');
          this.$router.push('dashboard');
        }
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
    message_display(data){
      this.snackbar=1;
      this.color =data.type;
      this.message = data.message;
    }
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
