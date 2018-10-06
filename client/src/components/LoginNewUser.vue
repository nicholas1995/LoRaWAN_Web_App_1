<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Login Form</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class="elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5">
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
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
        this.$store.commit('login',{token: response.data.token});
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
.rounded-card{
    border-radius:50px;
}
</style>
