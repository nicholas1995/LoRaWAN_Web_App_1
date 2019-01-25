<template>
  <v-content v-if="this.$store.state.user_class == 'Software Admin'">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md10>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>REGISTER USER</v-toolbar-title>
            </v-toolbar>
            <v-stepper non-linear class = "elevation-5">
              <v-stepper-header>
                <v-stepper-step editable step="1">Basic Information</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step editable step="2">Address</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step editable step="3">Vessel</v-stepper-step>
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
                    >
                     <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_first_name"></tool_tips_forms>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 class = "pl-3">
                  <!--Last Name-->
                    <v-text-field
                      v-model="last_name"
                      label="Last Name*"
                      :error-messages = "last_name_errors"
                      @keyup="$v.last_name.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_last_name"></tool_tips_forms>
                    </v-text-field>
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
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_home_phone"></tool_tips_forms>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 class = "pl-3">
                  <!--Mobile Phone-->
                    <v-text-field
                      mask='phone'
                      v-model="mobile_phone"
                      label="Mobile Phone*"
                      :error-messages = "mobile_phone_errors"
                      @keyup="$v.mobile_phone.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_mobile_phone"></tool_tips_forms>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                  <!--Email-->
                    <v-text-field
                      v-model="email"
                      label="Email Address*"
                      :error-messages = "email_errors"
                      @keyup="$v.email.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_email"></tool_tips_forms>
                    </v-text-field>
                  <!--User Class-->
                    <v-select
                      :items="user_class"
                      v-model="user_class_selected"
                      label="User Class"
                      :error-messages = "user_class_selected_errors"
                      @keyup="$v.user_class_selected.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_user_class"></tool_tips_forms>
                    </v-select>
                  <!-- Message -->
                    <div div class="text">
                      {{message}}
                    </div>
                  <!-- Buttons -->
                    <v-btn class="grey lighten-2"
                      @click="create_user"
                      >
                      Register User
                    </v-btn>
                    <v-btn class="grey lighten-2"
                      @click.stop="$router.push(`/user`) ">
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
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_user_country"></tool_tips_forms>
                    </v-text-field>
                  <!--City-->
                    <v-text-field
                      v-model="user_city"
                      label="City*"
                      :error-messages = "user_city_errors"
                      @keyup="$v.user_city.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_user_city"></tool_tips_forms>
                    </v-text-field>
                  <!--District-->
                    <v-text-field
                      v-model="user_district"
                      label="District*"
                      :error-messages = "user_district_errors"
                      @keyup="$v.user_district.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_user_district"></tool_tips_forms>
                    </v-text-field>
                  <!--Street-->
                    <v-text-field
                      v-model="user_street"
                      label="Street*"
                      :error-messages = "user_street_errors"
                      @keyup="$v.user_street.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_user_street"></tool_tips_forms>
                    </v-text-field>
                  <!-- Message -->
                    <div div class="text">
                      {{message}}
                    </div>
                  <!-- Buttons -->
                    <v-btn class="grey lighten-2"
                      @click="create_user"
                      >
                      Register User
                    </v-btn>
                    <v-btn class="grey lighten-2"
                      @click.stop="$router.push(`/user`) ">
                      Cancel
                    </v-btn>
                </v-stepper-content>
<!--Stepper 3--><v-stepper-content step="3" >
                  <!--Network-->
                    <v-select
                      :items="network_names"
                      v-model="network_name_form"
                      label="Network"
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_user_network"></tool_tips_forms>
                    </v-select>
                  <!--Sub-Network-->
                    <v-select
                      :items="sub_network_names"
                      v-model="sub_network_name_form"
                      label="Sub-Network"
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_user_sub_network"></tool_tips_forms>
                    </v-select>
                  <!--Vessel-->
                    <v-combobox
                    v-model="vessel_name_form"
                    :items="vessel_names"
                    label="Vessel"
                    multiple
                    clearable
                    chips
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_user_vessels"></tool_tips_forms>
                    </v-combobox>
                  <!-- Message -->
                    <div div class="text">
                      {{message}}
                    </div>
                  <!-- Buttons -->
                    <v-btn class="grey lighten-2"
                      @click="create_user"
                      >
                      Register User
                    </v-btn>
                    <v-btn class="grey lighten-2"
                      @click.stop="$router.push(`/user`) ">
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
import AuthenticationService from "../../services/AuthenticationService.js";
import tool_tips_forms from "../Tool_Tip_Forms";
import {description_first_name, description_last_name, description_user_country, description_user_city, description_user_district,
description_user_street, description_home_phone, description_mobile_phone, description_email, description_user_class, 
description_user_network, description_user_sub_network, description_user_vessels} from "../../services/functions/form_descriptions_tool_tips.js";
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, helpers, email, requiredIf} from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"

const unique= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.users.length; i++){
    if(value ==this.users[i].email){
      return 0;
    }
  } 
  return x; 
}

const required_devices= function(value){
  let x = 1; //0 fail, 1 pass
  if(this.user_class_selected == 'Fisher'){
    if(this.device_name_form.length ==0){
      return 0;
    }
  }
  return x; 
}

const alpha_num_dash = helpers.regex('alpha_num_dash', /^[a-zA-Z0-9\-\_]*$/);

export default {
components:{
  tool_tips_forms
},
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
      },      
      email: {
        required,
        email,
        u: unique
      },
      user_class_selected: {
        required
      },         
      device_name_form: {
        required: required_devices
      }
    },
  data() {
    return {
      users: [],
      first_name: "",
      last_name: "",

      user_country: '',
      user_city: '',
      user_district: '',
      user_street: '',

      home_phone: "",
      mobile_phone: "",
      email: "",
      user_class_selected: "",
      user_class: ['IoT Network Admin', 'Software Admin', 'Analyst', 'Fisher'],

      networks: [], //A list of all the networks on the lora app server
      sub_networks: [], //A list of all the sub-networks on the lora app server
      vessels: [],  //A list of all the vessels on the database that is not deleted

      network_names: [],
      sub_network_names: [],
      vessel_names: [],

      network_name_form: '',
      sub_network_name_form: '',
      vessel_name_form: [],

      network_id: '',
      sub_network_id: '',
      vessel_ids: [],

      description_first_name : description_first_name,
      description_last_name : description_last_name,
      description_user_country : description_user_country,
      description_user_city : description_user_city,
      description_user_district : description_user_district,
      description_user_street : description_user_street,
      description_home_phone : description_home_phone,
      description_mobile_phone : description_mobile_phone,
      description_email : description_email,
      description_user_class : description_user_class,
      description_user_network : description_user_network,
      description_user_sub_network : description_user_sub_network,
      description_user_vessels : description_user_vessels,

      message: "",
    };
  },
  created: async function(){
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("users", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //--------------Start-------------------
        AuthenticationService.get_users().then(result => {
          this.users = JSON.parse(result.data.users);
          this.$emit('message_display',{message:result.data.message, type:result.data.type})   
        }).catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})      
        })
        AuthenticationService.get_networks().then(result => {
          this.networks = result.data.networks_lora;
          for(let i = 0; i < this.networks.length; i++){
            this.network_names.push(this.networks[i].network_id.concat(":",this.networks[i].network_name));
          }
        }).catch(err => {
          //Error getting networks from server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})
        })
        AuthenticationService.get_sub_networks().then(result => {
          this.sub_networks = result.data.sub_networks_lora;
        }).catch(err => {
          //Error getting sub-networks from server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
        })
        AuthenticationService.get_vessels(null, 0).then(result => {
          this.vessels = result.data.vessels_db;
        }).catch(err => {
          //Error getting the devices from the server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
        })
      }else{
        alert('Please login.');
        this.$router.push('/login');
      }
    }catch (err) {
      console.log(err)
      if(err.response.status == "401"){
        //Unauthorized.... token expired
        alert('Token expired please login.');
        this.$store.commit('logout');
        this.$router.push('/login');
      }else if(err.response.status == "403"){
        //Do not have access to this resource
        alert('You do not have access to this page');
        this.$router.push('/dashboard');
      }else{
        alert('You do not have access to this page');
        this.$router.push('/dashboard');
      }
    }
  },
  watch: {
    user_class_selected: function(){
      if(this.user_class_selected =='Fisher'){
      this.network_name_form = '';
      this.sub_network_name_form = '';
      this.device_name_form = [];
      }
    },
    network_name_form: function(){
      this.sub_network_names = [];
      this.sub_network_name_form = '';
      this.network_id=functions.extract_id_id_name(this.network_name_form);
      for(let i = 0; i< this.sub_networks.length; i++){
        if(this.network_id == this.sub_networks[i].network_id){
          this.sub_network_names.push(this.sub_networks[i].sub_network_id.concat(":",this.sub_networks[i].sub_network_name));
        }
      }
    },
    sub_network_name_form: function(){
      this.vessel_names = [];
      this.sub_network_id=functions.extract_id_id_name(this.sub_network_name_form);
      for(let i = 0; i< this.vessels.length; i++){
        if(this.sub_network_id == this.vessels[i].sub_network_id){
          this.vessel_names.push(`${this.vessels[i].vessel_id}`.concat(":",this.vessels[i].vessel_name));
        }
      }
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
    },
    email_errors(){
      const errors=[];
      if (!this.$v.email.$error)return errors
      !this.$v.email.required && errors.push('Email is required.')
      !this.$v.email.email && errors.push('Must be a valid email.')
      !this.$v.email.u && errors.push('Email must be unique.')
      return errors;
    },
    user_class_selected_errors(){
      const errors=[];
      if (!this.$v.user_class_selected.$error)return errors
      !this.$v.user_class_selected.required && errors.push('User class required.')
      return errors;
    }
  },
  methods: {
    create_user(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.first_name.$invalid || this.$v.last_name.$invalid || this.$v.user_country.$invalid || this.$v.user_city.$invalid 
      || this.$v.user_district.$invalid ||this.$v.user_street.$invalid || this.$v.home_phone.$invalid 
      || this.$v.mobile_phone.$invalid || this.$v.email.$invalid || this.$v.user_class_selected.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        for(let i = 0; i < this.vessel_name_form.length; i++){
          this.vessel_ids.push(functions.extract_id_id_name(this.vessel_name_form[i]));
        }
        AuthenticationService.create_users({
          first_name: this.first_name,
          last_name: this.last_name,
          user_country: this.user_country,
          user_city: this.user_city,
          user_district: this.user_district,
          user_street: this.user_street,
          home_phone: this.home_phone,
          mobile_phone: this.mobile_phone,
          email: this.email,
          user_class: this.user_class_selected,
          vessels: this.vessel_ids
        }).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$router.push(`/user`) 
        }).catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})    
        }) 
        this.vessel_ids = [];
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
