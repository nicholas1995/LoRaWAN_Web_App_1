<template>
  <v-content >
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Update Profile</v-toolbar-title>
            </v-toolbar>
            <v-stepper non-linear class = "elevation-5">
              <v-stepper-header>
                <v-stepper-step editable step="1">Basic Information</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step editable step="2">Address</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items >
<!--Stepper 1--><v-stepper-content step="1" >
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6 class = "pr-3">
                  <!--First Name -->
                    <v-text-field
                      v-model="first_name"
                      label="First Name*"
                      :error-messages = "first_name_errors"
                      @keyup="$v.first_name.$touch()" 
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 class = "pl-3">
                  <!--Last Name-->
                    <v-text-field
                      v-model="last_name"
                      label="Last Name*"
                      :error-messages = "last_name_errors"
                      @keyup="$v.last_name.$touch()" 
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6 class = "pr-3">
                    <!--Home Phone-->
                    <v-text-field
                      mask='phone'
                      v-model="home_phone"
                      label="Home Phone*"
                      :error-messages = "home_phone_errors"
                      @keyup="$v.home_phone.$touch()" 
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 class = "pl-3">
                  <!--Mobile Phone-->
                    <v-text-field
                      mask='phone'
                      v-model="mobile_phone"
                      label="Mobile Phone*"
                      :error-messages = "mobile_phone_errors"
                      @keyup="$v.mobile_phone.$touch()" 
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                  <!-- Message -->
                    <div div class="text">
                      {{message}}
                    </div>
                  <!-- Buttons -->
                    <v-btn class="grey lighten-2"
                      @click="update_profile"
                      >
                      Update Profile
                    </v-btn>
                    <v-btn class="grey lighten-2"
                      @click.stop="$router.go(-1)">
                      Cancel
                    </v-btn>
                </v-stepper-content>
<!--Stepper 2--><v-stepper-content step="2" >
                  <!--Country-->
                    <v-text-field
                      v-model="user_country"
                      label="Country*"
                      :error-messages = "user_country_errors"
                      @keyup="$v.user_country.$touch()" 
                    ></v-text-field>
                  <!--City-->
                    <v-text-field
                      v-model="user_city"
                      label="City*"
                      :error-messages = "user_city_errors"
                      @keyup="$v.user_city.$touch()" 
                    ></v-text-field>
                  <!--District-->
                    <v-text-field
                      v-model="user_district"
                      label="District*"
                      :error-messages = "user_district_errors"
                      @keyup="$v.user_district.$touch()" 
                    ></v-text-field>
                  <!--Street-->
                    <v-text-field
                      v-model="user_street"
                      label="Street*"
                      :error-messages = "user_street_errors"
                      @keyup="$v.user_street.$touch()" 
                    ></v-text-field>
                  <!-- Message -->
                    <div div class="text">
                      {{message}}
                    </div>
                  <!-- Buttons -->
                    <v-btn class="grey lighten-2"
                      @click="update_profile"
                      >
                      Update Profile
                    </v-btn>
                    <v-btn class="grey lighten-2"
                      @click.stop="$router.go(-1)">
                      Cancel
                    </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
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
      user_country: {
        required,
        maxLength: maxLength(60),
      },      
      user_city: {
        required,
        maxLength: maxLength(60),
      },   
      user_district: {
        required,
        maxLength: maxLength(60),
      },   
      user_street: {
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
      
      user_country: '',
      user_city: '',
      user_district: '',
      user_street: '',

      home_phone: "",
      mobile_phone: "", 
      email: "",
      message: "",

    };
  },
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
        this.user_country = user_information.user_country;
        this.user_city = user_information.user_city;
        this.user_district = user_information.user_district;
        this.user_street = user_information.user_street;
        this.home_phone = user_information.home_phone;
        this.mobile_phone = user_information.mobile_phone;
        this.email = user_information.email;
        console.log(user_information)
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
    user_country_errors(){
      const errors=[];
      if (!this.$v.user_country.$error)return errors
      !this.$v.user_country.required && errors.push('Country is required.')
      !this.$v.user_country.maxLength && errors.push('Country must be 32 characters or less.')
      return errors;
    },
    user_city_errors(){
      const errors=[];
      if (!this.$v.user_city.$error)return errors
      !this.$v.user_city.required && errors.push('City is required.')
      !this.$v.user_city.maxLength && errors.push('City must be 32 characters or less.')
      return errors;
    },
    user_district_errors(){
      const errors=[];
      if (!this.$v.user_district.$error)return errors
      !this.$v.user_district.required && errors.push('District is required.')
      !this.$v.user_district.maxLength && errors.push('District must be 32 characters or less.')
      return errors;
    },
    user_street_errors(){
      const errors=[];
      if (!this.$v.user_street.$error)return errors
      !this.$v.user_street.required && errors.push('Street is required.')
      !this.$v.user_street.maxLength && errors.push('Street must be 32 characters or less.')
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
      if(this.$v.first_name.$invalid || this.$v.last_name.$invalid || this.$v.user_country.$invalid || this.$v.user_city.$invalid 
      || this.$v.user_district.$invalid ||this.$v.user_street.$invalid || this.$v.home_phone.$invalid
      || this.$v.mobile_phone.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
          AuthenticationService.update_profile({
            first_name: this.first_name,
            last_name: this.last_name,
            user_country: this.user_country,
            user_city: this.user_city,
            user_district: this.user_district,
            user_street: this.user_street,
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
