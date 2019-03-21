<template>
    <v-content>   
      <v-container fluid fill-height>
        <v-layout align-center justify-center >
          <v-flex xs12 sm8 md6 >
            <v-card class=" elevation-10 ">
              <v-toolbar light class="primary">
                  <v-toolbar-title>Create Password</v-toolbar-title>
              </v-toolbar>
            </v-card>
            <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 form_background">
              <!--First time login-->
              <div>
                <!--Password-->
                <v-text-field 
                  v-model="password"
                  type="password"
                  label="Password*"
                  :error-messages = "password_errors"
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
              <v-btn class="button black--text"
                @click="activate_account"
              >Create Password and Activate Account
              </v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
import { validationMixin } from 'vuelidate'
import { required, minLength,maxLength, helpers } from 'vuelidate/lib/validators'

const pw_match= function(value){
  let x = 1; //0 fail, 1 pass
  if(value != this.password){
    x =0;
  }
  return x; 
}

const valid_pw = helpers.regex('valid_pw', /^[a-zA-Z0-9\@\_\%\&]*$/);

export default {
  mixins: [validationMixin],
  validations: {
      password: {
        required,
        valid: valid_pw,
        minLength: minLength(8),
        maxLength: maxLength(32),
      },
      new_password_confirm: {
        required,
        match: pw_match
      }
    },
  data() {
    return {
      password: "",
      new_password_confirm: "",
      new_user: 0,
      message: ""
    };
  },
   created: async function () {
    try {
        await AuthenticationService.check_activate_account_token(this.$route.params.activate_account_token)
          .catch(err => {
            if(err.response.status ==401){
              this.message = err.response.data.error;   
              alert(`${err.response.data.error}`);
              this.$router.push('/login');     
            }
          });
    }catch (err) {
      console.log(err)

    }
  },
   computed: {
    password_errors(){
      const errors=[];
      if (!this.$v.password.$error)return errors
      !this.$v.password.required && errors.push('Password Required.')
      !this.$v.password.valid && errors.push('Password shall only contain numbers, letters, @, _, %, &')
      !this.$v.password.minLength && errors.push('Must be greater than 8 characters.')
      !this.$v.password.maxLength && errors.push('Must be less than 32 characters.')
      return errors;
    },
    new_password_confirm_errors(){
      const errors=[];
      if (!this.$v.new_password_confirm.$error)return errors
      !this.$v.new_password_confirm.required && errors.push('Confirmation Password Required.')
      !this.$v.new_password_confirm.match && errors.push('New password does not match.')
      return errors;
    },
   },
  methods: {
    async activate_account(){
      //This is the function called when a user forgets their password
      this.$v.$touch(); 
      if(this.$v.password.$invalid || this.$v.new_password_confirm.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        //Note we will not verify to provide feedback that the email entered is correct or wrong to prevent the user from fishing emails on the system
        await AuthenticationService.activate_account(this.$route.params.activate_account_token, {
          password: this.password}).then(result => {
            let data = result.data;
            this.$store.commit('login',{token: data.token, user_class: data.user_class, user_name: data.user_name, email: data.user.email});
            this.$router.push('/dashboard');
          }).catch(err => {
              if(err.response.status ==403){
                this.message = err.response.data.message;        
              }else if(err.response.status ==401){
              this.message = err.response.data.error;        
            }else{
                console.log(err);
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
