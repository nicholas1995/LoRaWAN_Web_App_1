<template>
  <v-content>
    <div v-if="!this.$store.state.loginState"> 
      <div v-if="this.$store.state.user_class== 'IoT Network Admin'">
        <dashboard_iot_network_admin></dashboard_iot_network_admin>
      </div>
      <div v-else-if="this.$store.state.user_class== 'Software Admin'">
        <dashboard_software_admin></dashboard_software_admin>
      </div>
      <div v-else-if="this.$store.state.user_class== 'Analyst'">
        <dashboard_analyst></dashboard_analyst>
      </div>
      <div v-else-if="this.$store.state.user_class== 'Fisher'">
        <dashboard_fisher></dashboard_fisher>
      </div>
    </div>
    <div v-else-if="this.$store.state.loginState">
      <h3>You do not have access to this page. Please go to the login page</h3>
      <v-btn @click="login">Login</v-btn>
    </div>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
import dashboard_iot_network_admin from './Dashboard_IoT_Network_Admin'
import dashboard_software_admin from './Dashboard_Software_Admin'
import dashboard_analyst from './Dashboard_Analyst'
import dashboard_fisher from './Dashboard_Fisher'
export default {
  components:{
    dashboard_iot_network_admin,
    dashboard_software_admin,
    dashboard_analyst,
    dashboard_fisher
  },
  data(){
    return {
    }
  },
  computed: {
  },
  methods: {
    login(){
      this.$router.push('login');
    },
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
