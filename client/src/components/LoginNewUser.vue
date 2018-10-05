<template>
<v-content>
  <v-layout >
    <v-flex xs4 offset-xs4>
      <div>
 <v-form class=" elevation-3 pl-4 pr-4 pt-2 pb-2">
   <!--Email-->
    <v-text-field
      v-model="email"
      label="E-mail"
      required
    ></v-text-field>
   <!--Password-->
    <v-text-field
      v-model="password"
      type="password"
      label="Password"
      required
    ></v-text-field>
    <!--New Password-->
    <v-text-field
      v-model="newpassword"
      type="password"
      label="New password"
      required
    ></v-text-field>
    <div>
      {{message}}
    </div>
    <v-btn class="grey lighten-2"
      @click="login"
    >
      Login
    </v-btn>
  </v-form>
  </div>
  </v-flex>
</v-layout>
  </v-content>
</template>


<script>
import AuthenticationService from "../services/AuthenticationService.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      newpassword: "",
      message: ""
    };
  },
  components: {},
  methods: {
    async login() {
      var response;
      try {
        response = await AuthenticationService.loginNewUser({
          email: this.email,
          password: this.password,
          newpassword: this.newpassword
        });
        this.message = response.data.message;
        console.log('Token: '+ response.data.token);
        this.$router.push('../dashboard');
      } catch (error) {
        this.message = error.response.data;
      } 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
