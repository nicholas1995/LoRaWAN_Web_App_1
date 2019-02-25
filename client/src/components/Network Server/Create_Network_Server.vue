<template>
  <v-content v-if="this.access == 1">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm12 md10>
          <v-toolbar light class="primary ">
            <v-toolbar-title>Create Service Profile</v-toolbar-title>
          </v-toolbar>
            <v-stepper non-linear class = "elevation-5">
              <v-stepper-header>
                <v-stepper-step editable step="1">Basic Information</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step editable step="2">Gateway Discovery</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step editable step="3">TLS Certificates</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
<!--Stepper 1--><v-stepper-content step ="1">
                <!--Network Server Name -->
                  <v-flex >
                    <v-text-field
                      v-model="service_profile_name"
                      :error-messages = "service_profile_name_Errors"
                      label="Network Server Name*"
                      @blur="$v.service_profile_name.$touch()">
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_service_profile_name"></tool_tips_forms>
                    </v-text-field>
                  </v-flex>
                <!--Network Server Server-->
                  <v-select
                    v-model="network_name_form"
                    :items="this.network_names"
                    label="Network Server Server*"
                    :error-messages = "network_name_form_Errors"
                    @blur="$v.network_name_form.$touch()" 
                  >
                    <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_network_service_profile"></tool_tips_forms>
                  </v-select>
                <!--Message -->
                  <div div class="text">
                    {{message}} 
                  </div>
                <!--Button -->
                  <v-btn class="grey lighten-2"
                    @click.stop="create_service_profile()">
                    Create Network Server
                  </v-btn>
                  <v-btn class="grey lighten-2"
                    @click.stop="$router.push(`/network_server`)">
                    Cancel
                  </v-btn>
                </v-stepper-content>
<!--Stepper 2--><v-stepper-content step ="2">
                <!--Enable gateway discovery-->
                  <v-checkbox
                    v-model="enable_gateway_discovery"
                    label="Enable gateway discovery"
                    required
                  >
                  </v-checkbox>
                <div v-if = "this.enable_gateway_discovery == true">
                <!--Device Status Request Frequency-->
                  <v-flex >
                    <v-text-field
                      v-model="device_status_req_frequency"
                      label="Interval Per Day*"
                      :error-messages = "device_status_req_frequency_Errors"
                      @blur="$v.device_status_req_frequency.$touch()" 
                    >
                    <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_status_req_frequency"></tool_tips_forms>
                    </v-text-field>
                  </v-flex>
                <!--Tx Frequency-->
                  <v-flex >
                    <v-text-field
                      v-model="device_status_req_frequency"
                      label="Interval Per Day*"
                      :error-messages = "device_status_req_frequency_Errors"
                      @blur="$v.device_status_req_frequency.$touch()" 
                    >
                    <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_status_req_frequency"></tool_tips_forms>
                    </v-text-field>
                  </v-flex>
                <!--Tx data rate-->
                  <v-flex >
                    <v-text-field
                      v-model="device_status_req_frequency"
                      label="Tx Data Rate*"
                      :error-messages = "device_status_req_frequency_Errors"
                      @blur="$v.device_status_req_frequency.$touch()" 
                    >
                    <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_status_req_frequency"></tool_tips_forms>
                    </v-text-field>
                  </v-flex>
                </div>
                <!--Message -->
                  <div div class="text">
                    {{message}} 
                  </div>
                <!--Button -->
                  <v-btn class="grey lighten-2"
                    @click.stop="create_service_profile()">
                    Create Service Profile
                  </v-btn>
                  <v-btn class="grey lighten-2"
                    @click.stop="$router.push(`/network_server`)">
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
                    @click.stop="create_service_profile()">
                    Create Service Profile
                  </v-btn>
                  <v-btn class="grey lighten-2"
                    @click.stop="$router.push(`/network_server`)">
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
import { required, maxLength, helpers } from 'vuelidate/lib/validators'
import {description_network_name, description_network_display_name} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";


const unique= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.networks.length; i++){
    if(value ==this.networks[i].network_name){
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
      network_name: {
        required,
        maxLength: maxLength(80),
        alpha_num_dash,
        u: unique,
      },      
      network_display_name: {
        required,
        maxLength: maxLength(80),
      }
    },
  data() {
    return {
      access: 0,
      networks: '', //a list of all the networks
      network_name: '',
      network_display_name: "",
      network_can_have_gateways: "",
      description_network_name : description_network_name,
      description_network_display_name : description_network_display_name,
      message: "",

      enable_gateway_discovery: false,
    };
  },
  props:[

  ],
 created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("networks", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //--------------Start-------------------
        this.networks = await AuthenticationService.get_networks()
        .catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})      
        })
        this.networks = this.networks.data.networks_lora;
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
    network_nameErrors(){
      const errors=[];
      if (!this.$v.network_name.$error)return errors
      !this.$v.network_name.maxLength && errors.push('Name must be 80 characters or less.')
      !this.$v.network_name.alpha_num_dash && errors.push('Name must only contain letters, numbers and dashes.')
      !this.$v.network_name.required && errors.push('Name is required.')
      !this.$v.network_name.u && errors.push('Name must be unique.')
      return errors;
    },
      network_display_nameErrors(){
      const errors=[];
      if (!this.$v.network_display_name.$error)return errors
      !this.$v.network_display_name.maxLength && errors.push('Display Name must be 80 characters or less.')
      !this.$v.network_display_name.required && errors.push('Display Name is required.')
      return errors;
    }
  },
  methods: {
    create_network(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.network_name.$invalid || this.$v.network_display_name.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        if(this.network_can_have_gateways =="")this.network_can_have_gateways =false; //needed to set empty radio to false
        this.message = "";
        AuthenticationService.create_networks({
          network_name: this.network_name,
          network_display_name: this.network_display_name,
          network_can_have_gateways: this.network_can_have_gateways
        }).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$router.push(`/network`)
        }).catch(err => {
          this.message = err.response.data.error;
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})    
        })
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
