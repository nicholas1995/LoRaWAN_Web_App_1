<template>
    <v-content>   
      <v-container fluid fill-height>
        <v-layout align-center justify-center >
          <v-flex xs12 sm8 md4 >
            <v-card class=" elevation-10 ">
              <v-toolbar light class="grey lighten-2 ">
                  <v-toolbar-title>Login Form</v-toolbar-title>
              </v-toolbar>
            </v-card>
            <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5">
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
              <div v-if="(this.newuser)">
                <v-text-field 
                  v-model="newpassword"
                  type="password"
                  label="New Password"
                  required
                ></v-text-field>
              </div>
              <div class="text">
              {{message}}
              </div>
              <v-btn class="grey lighten-2"
                @click="login"
              >Login 
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
      newuser: 0,
      message: ""
    };
  },
  components: {},
  methods: {

    async login() {
      var response;
      try {
        response =await AuthenticationService.login({
          email: this.email,
          password: this.password,
          newpassword: this.newpassword,
          newuser: this.newuser
        });
        if(response.data.user.new_user==1){
          this.newuser = response.data.user.new_user;
        }
        else{
        this.message = response.data.message;
        this.$store.commit('login',{token: response.data.token});
        this.$router.push('dashboard');
        }
        this.message = response.data.message;
      } catch (error) {
        this.message = error.response.data.error;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
