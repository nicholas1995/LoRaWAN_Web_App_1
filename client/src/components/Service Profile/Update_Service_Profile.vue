<template>
  <v-content v-if="this.access == 1">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
<v-toolbar light class="primary ">
            <v-toolbar-title>Update Service Profile</v-toolbar-title>
          </v-toolbar>
            <v-stepper non-linear class = "elevation-5">
              <v-stepper-header>
                <v-stepper-step editable step="1">Basic Information</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step editable step="2">Device Status Request Settings</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step editable step="3">Additional Information</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
<!--Stepper 1--><v-stepper-content step ="1">
                <!--Service Profile Name -->
                  <v-flex >
                    <v-text-field
                      v-model="service_profile_name"
                      :error-messages = "service_profile_name_Errors"
                      label="Service Profile Name*"
                      @blur="$v.service_profile_name.$touch()">
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_service_profile_name"></tool_tips_forms>
                    </v-text-field>
                  </v-flex>
                <!--Add Gateway Metadata-->
                  <v-checkbox
                    v-model="add_gw_metadata"
                    label="Add Gateway Metadata"
                    required
                  >
                  </v-checkbox>
                <!--Network Geolocation-->
                  <v-checkbox
                    v-model="network_geo_location"
                    label="Network Geolocation"
                    required
                  >
                  </v-checkbox>
                <!--Message -->
                  <div div class="text">
                    {{message}} 
                  </div>
                <!--Button -->
                  <v-btn class="grey lighten-2"
                    @click.stop="update_service_profile()">
                    Update Service Profile
                  </v-btn>
                  <v-btn class="grey lighten-2"
                    @click.stop="$router.push(`/service_profile`)">
                    Cancel
                  </v-btn>
                </v-stepper-content>
<!--Stepper 2--><v-stepper-content step ="2">
                <!--Enable device status request-->
                  <v-checkbox
                    v-model="enable_device_status_request"
                    label="Enable device status request"
                    required
                  >
                  </v-checkbox>
                <div v-if = "this.enable_device_status_request == true">
                <!--Device Status Request Frequency-->
                  <v-flex >
                    <v-text-field
                      v-model="device_status_req_frequency"
                      label="Device Status Request Frequency*"
                      :error-messages = "device_status_req_frequency_Errors"
                      @blur="$v.device_status_req_frequency.$touch()" 
                    >
                    <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_status_req_frequency"></tool_tips_forms>
                    </v-text-field>
                  </v-flex>
                <!--Report Device Status Battery-->
                  <v-checkbox
                    v-model="report_device_status_battery"
                    label="Report Device Status Battery"
                    required
                  >
                  </v-checkbox>
                <!--Report Device Status Margin-->
                  <v-checkbox
                    v-model="report_device_status_margin"
                    label="Report Device Status Margin"
                    required
                  >
                  </v-checkbox>
                </div>
                <!--Message -->
                  <div div class="text">
                    {{message}} 
                  </div>
                <!--Button -->
                  <v-btn class="grey lighten-2"
                    @click.stop="update_service_profile()">
                    Update Service Profile
                  </v-btn>
                  <v-btn class="grey lighten-2"
                    @click.stop="$router.push(`/service_profile`)">
                    Cancel
                  </v-btn>
                </v-stepper-content>
<!--Stepper 3--><v-stepper-content step ="3">
                <!--Data Rate Min-->
                  <v-flex >
                    <v-text-field
                      v-model="dr_min"
                      label="Minimum Data Rate*"
                      :error-messages = "dr_min_Errors"
                      @blur="$v.dr_min.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_dr_min"></tool_tips_forms>
                    </v-text-field>
                  </v-flex>
                <!--Data Rate Max-->
                  <v-flex >
                    <v-text-field
                      v-model="dr_max"
                      label="Maximum Data Rate*"
                      :error-messages = "dr_max_Errors"
                      @blur="$v.dr_max.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_dr_max"></tool_tips_forms>                    
                    </v-text-field>
                  </v-flex>
                <!--Message -->
                  <div div class="text">
                    {{message}} 
                  </div>
                <!--Button -->
                  <v-btn class="grey lighten-2"
                    @click.stop="update_service_profile()">
                    Update Service Profile
                  </v-btn>
                  <v-btn class="grey lighten-2"
                    @click.stop="$router.push(`/service_profile`)">
                    Cancel
                  </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
import { validationMixin } from 'vuelidate'
import { required, maxLength, numeric, helpers } from 'vuelidate/lib/validators'
import {description_service_profile_name, description_network_service_profile, description_network_server_service_profile, description_add_gw_metadata,
description_report_device_status_battery, description_report_device_status_margin, description_network_geo_location,
description_device_status_req_frequency, description_dr_min, description_dr_max} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";
import functions from "../../services/functions/forms_functions.js"

const first_digit_not_0 = function(value){ 
  //THis checks to see if the first digit is 0 and if it is removes it
  if(value.length >1){   //if it is more than one digit in length 
    if(value[0] == 0){
      value = parseInt(value, 10); //removes the leading 0 from a number
    }
  }else if(value.length == 0){
    value= 0
  }
  return value;
}

export default {
  components:{
    tool_tips_forms
  },
mixins: [validationMixin],
  validations: {
      service_profile_name: {
        required,
        maxLength: maxLength(80),
      },      
      device_status_req_frequency: {
        required,
        numeric
      },      
      dr_min: {
        required,
        numeric
      },      
      dr_max: {
        required,
        numeric
      }
    },
  data() {
    return {
      access: 0,
      service_profile_update: '', //service profile to be updated
      service_profile_name: '',
      network_id: '',
      network_server_id: '',
      add_gw_metadata: '',
      network_geo_location: '',

      enable_device_status_request: false,
      device_status_req_frequency: 0,
      report_device_status_battery: false,
      report_device_status_margin: false,

      dr_min: 0,
      dr_max: 0,

      description_service_profile_name : description_service_profile_name,
      description_network_service_profile : description_network_service_profile,
      description_network_server_service_profile : description_network_server_service_profile,
      description_add_gw_metadata : description_add_gw_metadata,
      description_report_device_status_battery : description_report_device_status_battery,
      description_report_device_status_margin : description_report_device_status_margin,
      description_network_geo_location : description_network_geo_location,
      description_device_status_req_frequency : description_device_status_req_frequency,
      description_dr_min : description_dr_min,
      description_dr_max : description_dr_max,

      message: ""
    };
  },
  watch: {
    enable_device_status_request: function(){
      if(this.enable_device_status_request == false){ 
        this.device_status_req_frequency = 0;
        this.report_device_status_battery = false;
        this.report_device_status_margin = false;
      }
    }
  },
 created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("service_profiles", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //--------------Start-------------------
        //Get Service Profiles
        this.service_profile_update = await AuthenticationService.get_service_profile(this.$route.params.service_profile_id_lora)
        .catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})      
        })
        this.service_profile_update = this.service_profile_update.data.service_profiles;
        this.service_profile_name = this.service_profile_update.service_profile_name
        this.network_id = this.service_profile_update.network_id
        this.network_server_id = this.service_profile_update.network_server_id
        this.add_gw_metadata = this.service_profile_update.add_gw_metadata
        this.report_device_status_battery = this.service_profile_update.report_device_status_battery
        this.report_device_status_margin = this.service_profile_update.report_device_status_margin
        this.network_geo_location = this.service_profile_update.network_geo_location
        this.device_status_req_frequency = this.service_profile_update.device_status_req_frequency
        this.dr_min = this.service_profile_update.dr_min
        this.dr_max = this.service_profile_update.dr_max

        if(this.device_status_req_frequency != 0){ //this is to ensure that if the device status period is >0 (ie enabled), the options appear on the form
          this.enable_device_status_request = true;
        }

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
  computed: {
    service_profile_name_Errors(){
      const errors=[];
      if (!this.$v.service_profile_name.$error)return errors
      !this.$v.service_profile_name.maxLength && errors.push('Name must be 80 characters or less.')
      !this.$v.service_profile_name.required && errors.push('Name is required.')
      return errors;
    },
      device_status_req_frequency_Errors(){
      const errors=[];
      if (!this.$v.device_status_req_frequency.$error)return errors
      !this.$v.device_status_req_frequency.numeric && errors.push('Device Status Request Frequency must be an integer.')
      !this.$v.device_status_req_frequency.required && errors.push('Device Status Request Frequency is required.')
      return errors;
    },
      dr_min_Errors(){
      const errors=[];
      if (!this.$v.dr_min.$error)return errors
      !this.$v.dr_min.numeric && errors.push('Min data rate must be an integer.')
      !this.$v.dr_min.required && errors.push('Min data rate is required.')
      return errors;
    },
      dr_max_Errors(){
      const errors=[];
      if (!this.$v.dr_max.$error)return errors
      !this.$v.dr_max.numeric && errors.push('Max data rate must be an integer.')
      !this.$v.dr_max.required && errors.push('Max data rate is required')
      return errors;
    }
  },
  methods: {
    update_service_profile(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.service_profile_name.$invalid || this.$v.device_status_req_frequency.$invalid || this.$v.dr_min.$invalid || this.$v.dr_max.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        if(this.network_can_have_gateways =="")this.network_can_have_gateways =false; //needed to set empty radio to false
        this.message = "";
        if(this.add_gw_metadata ==""){this.add_gw_metadata =false;} //needed to set empty radio to false
        if(this.report_device_status_battery ==""){this.report_device_status_battery =false;} //needed to set empty radio to false
        if(this.report_device_status_margin ==""){this.report_device_status_margin =false;} //needed to set empty radio to false
        if(this.network_geo_location ==""){this.network_geo_location =false;} //needed to set empty radio to false
        this.device_status_req_frequency = first_digit_not_0(this.device_status_req_frequency);
        this.dr_min = first_digit_not_0(this.dr_min);
        this.dr_max = first_digit_not_0(this.dr_max);
        AuthenticationService.update_service_profiles({
          service_profile_name: this.service_profile_name,
          add_gw_metadata: this.add_gw_metadata,
          report_device_status_battery: this.report_device_status_battery,
          report_device_status_margin: this.report_device_status_margin,
          network_geo_location: this.network_geo_location,
          device_status_req_frequency: this.device_status_req_frequency,
          dr_min: this.dr_min,
          dr_max: this.dr_max,
        }, this.service_profile_update.service_profile_id_lora).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$router.push(`/service_profile`)
        }).catch(err => {
          this.message = err.response.data.error;
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})    
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
