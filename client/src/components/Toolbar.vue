<template>
  <v-toolbar fixed color ="grey lighten-2" >
      <!--This is the menu icon -->
      <v-toolbar-side-icon  flat v-if="!this.$store.state.loginState"
               class=" mt-2" @click.stop="$emit('toggle-drawer')" >
      </v-toolbar-side-icon>
    <v-toolbar-title>Private Marine IoT Network Console </v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down ">
      <v-btn class="grey lighten-2" @click="login" flat v-if="this.$store.state.loginState">
        Login
      </v-btn>
      <v-icon large @click="edit_account"  v-if="!this.$store.state.loginState" class=" mt-3 mr-3">
        account_box
      </v-icon>
      <v-btn class="grey lighten-2" @click="logout" flat v-if="!this.$store.state.loginState">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

  

<script>
import AuthenticationService from "../services/AuthenticationService.js";
export default {
  data() {
    return {

    };
  },
  components: {},
  methods: {
    login(){
      this.$router.push('login');
    },
    async edit_account() {
      try{
        this.$store.commit('update_self', 1);
        const response = await AuthenticationService.get_profile_information();
        let user = response.data.user;
        this.$store.commit('update_user', {user});
        this.$router.push('updateuser'); 
      }catch(error){
        console.log({location: "Toolbar",error})
      }
    },
    logout(){
      this.$store.commit('logout');
      this.$router.push('login');
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
