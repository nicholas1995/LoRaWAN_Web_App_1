<template>
    <v-content>   
      <v-container fluid fill-height>
        <v-layout align-center justify-center >
          <v-flex xs12 sm8 md4 >
            <v-card class=" elevation-10 ">
              <v-toolbar light class="grey lighten-2 ">
                  <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
            </v-card>
            <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5">
              <!--Email-->
              <v-text-field 
                v-model="email"
                label="E-mail*"
                :error-messages = "email_errors"
              ></v-text-field>
              <!--Password-->
              <v-text-field 
                v-model="password"
                type="password"
                label="Password*"
                :error-messages = "password_errors"
              ></v-text-field>
              <!--First time login-->
              <div v-if="(this.new_user)">
                <!--New Password-->
                <v-text-field 
                  v-model="new_password"
                  type="password"
                  label="New Password*"
                  :error-messages = "new_password_errors"
                ></v-text-field>
                <!--Confirm New Password (not putting touch here because we only want to compare when the form is submitted 
                so someone cant jus put in values until the error is gone-->
                <v-text-field 
                  v-model="new_password_confirm"
                  type="password"
                  label="Re-enter Password*"
                  :error-messages = "new_password_confirm_errors" 
                ></v-text-field>
              </div>
              <div class="text">
              {{message}}
              </div>
              <v-btn class="grey lighten-2"
                @click="login"
              >Login 
              </v-btn>
              <v-btn class="grey lighten-2"
                @click="reset_password_request"
              >Forgot Password 
              </v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>
  

<script>
import AuthenticationService from "../services/AuthenticationService.js";
import { validationMixin } from 'vuelidate'
import { required, minLength,maxLength, helpers, email } from 'vuelidate/lib/validators'

const pw_match= function(value){
  let x = 1; //0 fail, 1 pass
  if(value != this.new_password){
    x =0;
  }
  return x; 
}

const valid_pw = helpers.regex('valid_pw', /^[a-zA-Z0-9\@\_\%\&]*$/);

export default {
  mixins: [validationMixin],
  validations: {
      email: {
        required,
        email
      },      
      password: {
        required,
        valid: valid_pw,
        minLength: minLength(8),
        maxLength: maxLength(32),
      },
      new_password: {
        required,
        valid: valid_pw,
        minLength: minLength(8),
        maxLength: maxLength(32),
      },
      new_password_confirm: {
        match: pw_match
      }
    },
  data() {
    return {
      email: "",
      password: "",
      new_password: "",
      new_password_confirm: "",
      new_user: 0,
      message: ""
    };
  },
   computed: {
     email_errors(){
      const errors=[];
      if (!this.$v.email.$error)return errors
      !this.$v.email.required && errors.push('Email is required')
      !this.$v.email.email && errors.push('Must be a vaild email address.')
      return errors;
    },
    password_errors(){
      const errors=[];
      if (!this.$v.password.$error)return errors
      !this.$v.password.required && errors.push('Password Required.')
      !this.$v.password.valid && errors.push('Password shall only contain numbers, letters, @, _, %, &')
      !this.$v.password.minLength && errors.push('Must be greater than 8 characters.')
      !this.$v.password.maxLength && errors.push('Must be less than 32 characters.')
      return errors;
    },
    new_password_errors(){
      const errors=[];
      if (!this.$v.new_password.$error)return errors
      !this.$v.new_password.required && errors.push('Password Required.')
      !this.$v.new_password.valid && errors.push('Password shall only contain numbers, letters, @, _, %, &')
      !this.$v.new_password.minLength && errors.push('Must be greater than 8 characters.')
      !this.$v.new_password.maxLength && errors.push('Must be less than 32 characters.')
      return errors;
    },
    new_password_confirm_errors(){
      const errors=[];
      if (!this.$v.new_password_confirm.$error)return errors
      !this.$v.new_password_confirm.match && errors.push('New password does not match.')
      return errors;
    },
   },
  methods: {
    async login() {
      this.$v.$touch(); 
      if(this.new_user ==0){//Existing user... normal login
        if(this.$v.email.$invalid || this.$v.password.$invalid){
          this.message ="Error in Form. Please fix and resubmit!"
        }else{
          AuthenticationService.login({email: this.email,password: this.password})
          .then(result => {
            let data = result.data;
            this.$store.commit('login',{token: data.token, user_class: data.user_class, user_name: data.user_name, email: data.user.email});
            this.$router.push('dashboard');
          }).catch(err => {
            this.$v.$reset(); 
            if(err.response.status ==409){//New User
              this.new_user = err.response.data.new_user
              this.message = err.response.data.message; 
            }else if(err.response.status ==403){
              this.message = err.response.data.message;        
            }else{
              console.log(err);
            }
          })
        }
      }
      else if(this.new_user ==1){//New user login
        if(this.$v.email.$invalid || this.$v.password.$invalid 
          || this.$v.new_password.$invalid || this.$v.new_password_confirm.$invalid){
            this.message ="Error in Form. Please fix and resubmit!"
        }else{
          AuthenticationService.login_new_user({
            email: this.email,
            password: this.password,
            new_password: this.new_password
          }).then(result => {
            let data = result.data;
            this.$store.commit('login',{token: data.token, user_class: data.user_class, user_name: data.user_name, email: data.user.email});
            this.$router.push('/dashboard');
          }).catch(err => {
              if(err.response.status ==403){
                this.message = err.response.data.message;        
              }else{
                console.log(err);
              }
          })
        }
      }
      /* var response;
      try {
        response =await AuthenticationService.login({
          email: this.email,
          password: this.password,
          new_password: this.new_password,
          new_user: this.new_user
        });
        if(response.data.user.new_user==1){
          this.new_user = response.data.user.new_user;
        }else{
          this.message = response.data.message;
          this.$store.commit('login',{token: response.data.token, user_class: response.data.user_class, user_name: response.data.user_name, email: response.data.user.email});
          this.$router.push('dashboard');
        }
        this.message = response.data.message;
      } catch (error) {
        this.message = error.response.data.error;
      } */
    },
    async reset_password_request(){
      //This is the function called when a user forgets their password
      this.$v.email.$touch(); 
      if(this.$v.email.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        //Note we will not verify to provide feedback that the email entered is correct or wrong to prevent the user from fishing emails on the system
        await AuthenticationService.reset_password_request(this.email)
          .catch(err => {
            if(err.response.status ==403){
              this.message = err.response.data.message;        
            }else{
              console.log(err)
            }
          })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
