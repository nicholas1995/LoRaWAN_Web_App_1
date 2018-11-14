<template>
  <v-content v-if="this.access == 1">
      <div v-show="this.read== 1">
        <user_management v-bind:users_prop='this.user' @create_user ="create_user($event)" @update_user="update_user($event)"  @message_display="message_display($event)"></user_management>
      </div>
      <div v-if="this.create == 1">
        <create_user v-bind:users_prop='this.user' @user_management= read_user($event) @user_management_no_change=cancel() @message_display="message_display($event)"></create_user>
      </div>
      <div v-else-if="this.update== 1">
        <update_user v-bind:user_update='this.user_update' @user_management= read_user($event) @user_management_no_change=cancel() @message_display="message_display($event)"></update_user>  <!--Dynamically passing prop to child component -->
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
import user_management from './User_Management'
import create_user from './Create_User'
import update_user from './Update_User'

export default {
  components:{
    user_management,
    create_user,
    update_user
  },
  data(){
    return {
      access: 0,
      create: 0,
      read: 0,
      update: 0,
      user: null,
      user_update: {}, //variable to store emitted value from Network_Management to pass to Update_Network as prop,
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
              await AuthenticationService.check_permissions("users", "post")
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
    create_user(data){
      this.user =data;
      this.create =1;
      this.read =0;
      this.update =0;
    },
    read_user(data){
      this.user =data.data; //Storing the child component [Create_Network] array of networks to the network variable. This is binded to the child component [Network_Management]
      this.create =0;
      this.read =1;
      this.update =0;
    },
    update_user(data){
      this.user = data.users;
      this.user_update = data.user_update;
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
