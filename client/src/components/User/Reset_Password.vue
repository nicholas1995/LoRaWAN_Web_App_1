<template>
    <v-content>   
      <v-container fluid fill-height>
        <v-layout align-center justify-center >
          <v-flex xs12 sm8 md4 >
            <v-card class=" elevation-10 ">
              <v-toolbar light class="grey lighten-2 ">
                  <v-toolbar-title>Reset Password</v-toolbar-title>
              </v-toolbar>
            </v-card>
            <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5">
              <!--First time login-->
              <div>
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
                @click="reset_password"
              >Reset Password 
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
  if(value != this.new_password){
    x =0;
  }
  return x; 
}

const valid_pw = helpers.regex('valid_pw', /^[a-zA-Z0-9\@\_\%\&]*$/);

export default {
  mixins: [validationMixin],
  validations: {
      new_password: {
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
      new_password: "",
      new_password_confirm: "",
      new_user: 0,
      message: ""
    };
  },
   created: async function () {
    try {
        await AuthenticationService.check_reset_password_token(this.$route.params.reset_password_token)
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
      !this.$v.new_password_confirm.required && errors.push('Confirmation Password Required.')
      !this.$v.new_password_confirm.match && errors.push('New password does not match.')
      return errors;
    },
   },
  methods: {
    async reset_password(){
      //This is the function called when a user forgets their password
      this.$v.$touch(); 
      if(this.$v.new_password.$invalid || this.$v.new_password_confirm.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        //Note we will not verify to provide feedback that the email entered is correct or wrong to prevent the user from fishing emails on the system
        await AuthenticationService.reset_password(this.$route.params.reset_password_token, {
          new_password: this.new_password}).then(result => {
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
