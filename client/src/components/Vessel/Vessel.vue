<template>
  <v-content v-if="this.access == 1">
      <div v-show="this.read== 1">
        <vessel_management v-bind:vessels_prop='this.vessel' @create_vessel= create_vessel($event) @update_vessel="update_vessel($event)"  @message_display="message_display($event)"></vessel_management>
      </div>
      <div v-if="this.create == 1">
        <create_vessel v-bind:vessels_prop='this.vessel' @vessel_management= read_vessel($event) @vessel_management_no_change= cancel() @message_display="message_display($event)"></create_vessel>
      </div>
      <div v-else-if="this.update== 1">
        <update_vessel v-bind:vessels_prop='this.vessel' v-bind:vessel_update='this.vessel_update' @vessel_management= read_vessel($event) @vessel_management_no_change= cancel() @message_display="message_display($event)"></update_vessel>  <!--Dynamically passing prop to child component -->
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
import vessel_management from './Vessel_Management'
import create_vessel from './Create_Vessel'
import update_vessel from './Update_Vessel'

export default {
  components:{
    vessel_management,
    create_vessel,
    update_vessel
  },
  data(){
    return {
      access: 0,
      create: 0,
      read: 0,
      update: 0,
      vessel: null,
      vessel_update: {}, //variable to store emitted value from vessel_Management to pass to Update_vessel as prop,
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
              await AuthenticationService.check_permissions("vessels", "post")
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
    create_vessel(data){
      this.vessel =data;
      this.create =1;
      this.read =0;
      this.update =0;
    },
    read_vessel(data){
      this.vessel =data.data; //Storing the child component [Create_vessel] array of vessels to the vessel variable. This is binded to the child component [vessel_Management]
      this.create =0;
      this.read =1;
      this.update =0;
    },
    update_vessel(data){
      this.vessel = data.vessels;
      this.vessel_update = data.vessel_update;
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
