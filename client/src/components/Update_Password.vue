<template>
    <v-content>   
      <v-container fluid fill-height>
        <v-layout align-center justify-center >
          <v-flex xs12 sm8 md4 >
            <v-card class=" elevation-10 ">
              <v-toolbar light class="grey lighten-2 ">
                  <v-toolbar-title>Update Password</v-toolbar-title>
              </v-toolbar>
            </v-card>
            <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5">
              <!--Current Password-->
              <v-text-field 
                v-model="current_password"
                type="password"
                label="Current Password*"
                :error-messages = "current_password_errors"
                @keyup="$v.current_password.$touch()" 
              ></v-text-field>
              <!--First time login-->
                <!--New Password-->
                <v-text-field 
                  v-model="new_password"
                  type="password"
                  label="New Password*"
                  :error-messages = "new_password_errors"
                  @keyup="$v.new_password.$touch()" 
                ></v-text-field>
                <!--Confirm New Password (not putting touch here because we only want to compare when the form is submitted 
                so someone cant jus put in values until the error is gone-->
                <v-text-field 
                  v-model="new_password_confirm"
                  type="password"
                  label="Re-enter Password*"
                  :error-messages = "new_password_confirm_errors" 
                ></v-text-field>
              <div class="text">
              {{message}}
              </div>
              <v-btn class="grey lighten-2"
                @click="update_password"
              >Update Password 
              </v-btn>
              <v-btn class="grey lighten-2"
                @click.stop="$router.go(-1)">
                Cancel
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
import { required, minLength, maxLength, helpers } from 'vuelidate/lib/validators'

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
      current_password: {
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
      current_password: "",
      new_password: "",
      new_password_confirm: "",
      message: ""
    };
  },
   computed: {
    current_password_errors(){
      const errors=[];
      if (!this.$v.current_password.$error)return errors
      !this.$v.current_password.required && errors.push('Password Required.')
      !this.$v.current_password.valid && errors.push('Password shall only contain numbers, letters, @, _, %, &')
      !this.$v.current_password.minLength && errors.push('Must be greater than 8 characters.')
      !this.$v.current_password.maxLength && errors.push('Must be less than 32 characters.')
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
    async update_password() {
      this.$v.$touch(); 
        if(this.$v.current_password.$invalid || this.$v.new_password.$invalid || this.$v.new_password_confirm.$invalid){
          this.message ="Error in Form. Please fix and resubmit!"
        }else{
          AuthenticationService.update_password({
            current_password: this.current_password,
            new_password: this.new_password
            })
          .then(result => {
            this.$router.go(-1)
          }).catch(err => {
            this.$v.$reset(); 
            if(err.response.status ==409){//New User
              this.message = err.response.data.message; 
            }else if(err.response.status ==403){
              this.message = err.response.data.message;        
            }else{
              console.log(err.message);
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
