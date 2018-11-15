<template>
  <v-content >
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Update Profile</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--First Name -->
            <v-flex >
              <v-text-field
                v-model="first_name"
                label="First Name*"
                :error-messages = "first_name_errors"
                @keyup="$v.first_name.$touch()" 
              ></v-text-field>
              </v-flex>
            <!--Last Name-->
              <v-text-field
                v-model="last_name"
                label="Last Name*"
                :error-messages = "last_name_errors"
                @keyup="$v.last_name.$touch()" 
              ></v-text-field>
            <!--Address-->
              <v-text-field
                v-model="address"
                label="Address*"
                :error-messages = "address_errors"
                @keyup="$v.address.$touch()" 
              ></v-text-field>
            <!--Home Phone-->
              <v-text-field
                mask='phone'
                v-model="home_phone"
                label="Home Phone*"
                :error-messages = "home_phone_errors"
                @keyup="$v.home_phone.$touch()" 
              ></v-text-field>
            <!--Mobile Phone-->
              <v-text-field
                mask='phone'
                v-model="mobile_phone"
                label="Mobile Phone*"
                :error-messages = "mobile_phone_errors"
                @keyup="$v.mobile_phone.$touch()" 
              ></v-text-field>
              <div div class="text">
                {{message}}
              </div>
              <v-btn class="grey lighten-2"
                @click="update_profile"
              >
                Update Profile
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
import { required, maxLength, minLength, helpers, email, requiredIf} from 'vuelidate/lib/validators'
import functions from "../services/functions/forms_functions.js"



export default {
mixins: [validationMixin],
  validations: {
      first_name: {
        required,
        maxLength: maxLength(32),
        
      },      
      last_name: {
        required,
        maxLength: maxLength(32),
      },
      address: {
        required,
        maxLength: maxLength(60),
      },      
      home_phone: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      mobile_phone: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10),
      }
    },
  data() {
    return {
      first_name: "",
      last_name: "",
      address: "",
      home_phone: "",
      mobile_phone: "", 
      email: "",
      message: "",

    };
  },
  props:[
   'users_prop'
  ],
  created: async function(){
    try{
        let user_information = await AuthenticationService.get_profile()
          .catch(err => {
            //Error getting profile information from user
            throw err;
          })
        user_information = JSON.parse(user_information.data.user_information);
        this.first_name = user_information.first_name;
        this.last_name = user_information.last_name;
        this.address = user_information.address;
        this.home_phone = user_information.home_phone;
        this.mobile_phone = user_information.mobile_phone;
        this.email = user_information.email;
    }catch(err){
      console.log(err);
    }
  },

  computed: {
    first_name_errors(){
      const errors=[];
      if (!this.$v.first_name.$error)return errors
      !this.$v.first_name.required && errors.push('First name is required.')
      !this.$v.first_name.maxLength && errors.push('First name must be 32 characters or less.')
      return errors;
    },
      last_name_errors(){
      const errors=[];
      if (!this.$v.last_name.$error)return errors
      !this.$v.last_name.required && errors.push('Last name is required.')
      !this.$v.last_name.maxLength && errors.push('Last name must be 32 characters or less.')
      return errors;
    },
      address_errors(){
      const errors=[];
      if (!this.$v.address.$error)return errors
      !this.$v.address.required && errors.push('Address is required.')
      !this.$v.address.maxLength && errors.push('Address must be 32 characters or less.')
      return errors;
    },
      home_phone_errors(){
      const errors=[];
      if (!this.$v.home_phone.$error)return errors
      !this.$v.home_phone.required && errors.push('Home phone is required.')
      !this.$v.home_phone.minLength && errors.push('Invalid phone number.')
      !this.$v.home_phone.maxLength && errors.push('Invalid phone number.')
      return errors;
    },
      mobile_phone_errors(){
      const errors=[];
      if (!this.$v.mobile_phone.$error)return errors
      !this.$v.mobile_phone.required && errors.push('Mobile phone is required.')
      !this.$v.mobile_phone.minLength && errors.push('Invalid phone number.')
      !this.$v.mobile_phone.maxLength && errors.push('Invalid phone number.')
      return errors;
    }
  },
  methods: {
    update_profile(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.first_name.$invalid || this.$v.last_name.$invalid || this.$v.address.$invalid || this.$v.home_phone.$invalid
      || this.$v.mobile_phone.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
          AuthenticationService.update_profile({
            first_name: this.first_name,
            last_name: this.last_name,
            address: this.address,
            home_phone: this.home_phone,
            mobile_phone: this.mobile_phone,
            email: this.email
        }).then(result => {
          let name = JSON.parse(result.data.data);
          this.$store.commit('update_user_name_navigation_drawer',name.user_name);
          this.$router.go(-1)
        }).catch(err => {
          console.log(err)
          console.log('Errror updating profile') 
        })
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
