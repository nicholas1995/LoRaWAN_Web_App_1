<template>
  <v-content v-if="this.access == 1">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md12>
            <v-toolbar light class="primary">
              <v-toolbar-title>Create Device Profile</v-toolbar-title>
            </v-toolbar>
              <v-stepper non-linear>
                <v-stepper-header>
                  <v-stepper-step editable step="1">Basic Information</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step editable step="2">Activation</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step editable step="3">Class B Settings</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step editable step="4">Class C Settings</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
  <!--Stepper 1--><v-stepper-content step="1">
                    <!--Devie Profile Name -->
                      <v-flex >
                        <v-text-field
                          v-model="device_profile_name"
                          :error-messages = "device_profile_name_errors"
                          label="Device Profile Name*"
                          @keyup="$v.device_profile_name.$touch()">
                          <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_profile_name"></tool_tips_forms>
                        </v-text-field>
                      </v-flex>
                    <!--LoRaWAN MAC Version-->
                      <v-select
                        v-model="mac_version_form"
                        :items="this.mac_version"
                        label="LoRaWAN MAC Version*"
                        :error-messages = "mac_version_form_errors"
                        @blur="$v.mac_version_form.$touch()" 
                      >
                        <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_mac_version"></tool_tips_forms>
                      </v-select>
                    <!--LoRaWAN Regional Paraeters revision-->
                      <v-select
                        v-model="reg_params_revision_form"
                        :items="this.reg_params_revision"
                        label="LoRaWAN Regional Parameters revision*"
                        :error-messages = "reg_params_revision_form_errors"
                        @blur="$v.reg_params_revision_form.$touch()" 
                      >
                        <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_reg_params_revision"></tool_tips_forms>
                      </v-select>
                    <!--Network -->
                      <v-select
                        v-model="network_name_form"
                        :items="this.network_names"
                        label="Network*"
                        :error-messages = "network_name_form_errors"
                        @blur="$v.network_name_form.$touch()" 
                      >
                        <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_network_device_profile"></tool_tips_forms>
                      </v-select>
                    <!--Network Server-->
                      <v-select
                        v-model="network_server_name_form"
                        :items="this.network_server_names"
                        label="Network Server*"
                        :error-messages = "network_server_name_form_errors"
                        @blur="$v.network_server_name_form.$touch()" 
                      >
                        <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_network_server_device_profile"></tool_tips_forms>
                      </v-select>
                    <!--MAX EIRP-->
                      <v-flex >
                        <v-text-field
                          v-model="max_eirp"
                          :error-messages = "max_eirp_errors"
                          label="Max EIRP*"
                          @keyup="$v.max_eirp.$touch()">
                          <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_max_eirp"></tool_tips_forms>
                        </v-text-field>
                      </v-flex>
                      <!-- Message -->
                        <div div class="text">
                          {{message}}
                        </div>
                    <!--Buttons-->
                    <v-btn class="grey lighten-2"
                      @click.stop="create_device_profile()">
                      Create Device Profile
                    </v-btn>
                    <v-btn class="grey lighten-2"
                      @click.stop="$router.push(`/device_profile`)">
                      Cancel
                    </v-btn>
                  </v-stepper-content>
  <!--Stepper 2--><v-stepper-content step="2">
                    <!--End Device Supports Join-->
                      <v-checkbox
                        v-model="supports_join"
                        label="End Device Supports Join"
                        required
                      >
                      </v-checkbox>
                      <div v-if= "this.supports_join == false">
                    <!--RX 1 Delay -->
                      <v-flex >
                        <v-text-field
                          v-model="rx_delay_1"
                          :error-messages = "rx_delay_1_errors"
                          label="Class A RX 1 Delay*"
                          @keyup="$v.rx_delay_1.$touch()">
                          <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_rx_delay_1"></tool_tips_forms>
                        </v-text-field>
                      </v-flex>
                    <!--RX 1 DR Offset -->
                      <v-flex >
                        <v-text-field
                          v-model="rx_dr_offset_1"
                          :error-messages = "rx_dr_offset_1_errors"
                          label="RX 1 DR Offset*"
                          @keyup="$v.rx_dr_offset_1.$touch()">
                          <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_rx_dr_offset_1"></tool_tips_forms>
                        </v-text-field>
                      </v-flex>
                    <!--RX 2 DR -->
                      <v-flex >
                        <v-text-field
                          v-model="rx_dr_2"
                          :error-messages = "rx_dr_2_errors"
                          label="RX 2 Data Rate*"
                          @keyup="$v.rx_dr_2.$touch()">
                          <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_rx_dr_2"></tool_tips_forms>
                        </v-text-field>
                      </v-flex>
                    <!--RX 2 Channel Frequency -->
                      <v-flex >
                        <v-text-field
                          v-model="rx_frequency_2"
                          :error-messages = "rx_frequency_2_errors"
                          label="RX 2 Channel Frequency*"
                          suffix= 'Hz'
                          @keyup="$v.rx_frequency_2.$touch()">
                          <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_rx_frequency_2"></tool_tips_forms>
                        </v-text-field>
                      </v-flex>
                    <!--Factory Preset Frequencies -->
                      <v-combobox
                          v-model="factory_preset_frequencies"
                          label="Factory Preset Frequencies*"
                          suffix= 'Hz'
                          multiple
                          small-chips
                          :error-messages = "factory_preset_frequencies_errors"
                        >
                          <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_factory_preset_frequencies"></tool_tips_forms>
                      </v-combobox>
                    </div>
                    <!-- Message -->
                      <div div class="text">
                        {{message}}
                      </div>
                    <!--Buttons-->
                      <v-btn class="grey lighten-2"
                        @click.stop="create_device_profile()">
                        Create Device Profile
                      </v-btn>
                      <v-btn class="grey lighten-2"
                        @click.stop="$router.push(`/device_profile`)">
                        Cancel
                      </v-btn>
                  </v-stepper-content>
  <!--Stepper 3--><v-stepper-content step="3">
                    <!--End Device Supports Class B-->
                      <v-checkbox
                        v-model="supports_class_b"
                        label="End Device Supports Class B"
                        required
                      >
                      </v-checkbox>
                      <div v-if= "this.supports_class_b == true">
                    <!--Class B Timeout-->
                      <v-flex >
                        <v-text-field
                          v-model="class_b_timeout"
                          :error-messages = "class_b_timeout_errors"
                          label="Class B Timeout*"
                          suffix= 'seconds'
                          @keyup="$v.class_b_timeout.$touch()">
                          <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_class_b_timeout"></tool_tips_forms>
                        </v-text-field>
                      </v-flex>
                    <!--Ping Slot Period-->
                      <v-select
                        v-model="ping_slot_period_form"
                        :items="this.ping_slot_period"
                        label="Ping Slot Period*"
                        suffix= 'seconds'
                        :error-messages = "ping_slot_period_form_errors"
                        @blur="$v.ping_slot_period_form.$touch()" 
                      >
                        <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_ping_slot_period"></tool_tips_forms>
                      </v-select>
                    <!--Ping Slot DR -->
                      <v-flex >
                        <v-text-field
                          v-model="ping_slot_dr"
                          :error-messages = "ping_slot_dr_errors"
                          label="Ping Slot DR*"
                          @keyup="$v.ping_slot_dr.$touch()">
                          <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_ping_slot_dr"></tool_tips_forms>
                        </v-text-field>
                      </v-flex>
                    <!--Ping Slot Frequency -->
                      <v-flex >
                        <v-text-field
                          v-model="ping_slot_frequency"
                          :error-messages = "ping_slot_frequency_errors"
                          label="Ping Slot Frequency*"
                          suffix= 'Hz'
                          @keyup="$v.ping_slot_frequency.$touch()">
                          <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_ping_slot_frequency"></tool_tips_forms>
                        </v-text-field>
                      </v-flex>
                    </div>
                    <!-- Message -->
                      <div div class="text">
                        {{message}}
                      </div>
                    <!--Buttons-->
                      <v-btn class="grey lighten-2"
                        @click.stop="create_device_profile()">
                        Create Device Profile
                      </v-btn>
                      <v-btn class="grey lighten-2"
                        @click.stop="$router.push(`/device_profile`)">
                        Cancel
                      </v-btn>
                  </v-stepper-content>
  <!--Stepper 4--><v-stepper-content step="4">
                    <!--End Device Supports Class C-->
                      <v-checkbox
                        v-model="supports_class_c"
                        label="End Device Supports Class C"
                        required
                      >
                      </v-checkbox>
                      <div v-if= "this.supports_class_c == true">
                    <!--Class C Timeout-->
                      <v-flex >
                        <v-text-field
                          v-model="class_c_timeout"
                          :error-messages = "class_c_timeout_errors"
                          label="Class C Timeout*"
                          suffix= 'seconds'
                          @keyup="$v.class_c_timeout.$touch()">
                          <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_class_c_timeout"></tool_tips_forms>
                        </v-text-field>
                      </v-flex>
                    </div>
                    <!-- Message -->
                      <div div class="text">
                        {{message}}
                      </div>
                    <!--Buttons-->
                      <v-btn class="grey lighten-2"
                        @click.stop="create_device_profile()">
                        Create Device Profile
                      </v-btn>
                      <v-btn class="grey lighten-2"
                        @click.stop="$router.push(`/device_profile`)">
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
import { required, maxLength, numeric, between, helpers } from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"
import {description_device_profile_name, description_mac_version, description_reg_params_revision,
description_max_eirp, description_supports_join, description_rx_delay_1, description_rx_dr_offset_1, description_rx_dr_2, description_rx_frequency_2,
description_factory_preset_frequencies, description_supports_class_b, description_class_b_timeout, description_ping_slot_period, description_ping_slot_dr, description_ping_slot_frequency,
description_supports_class_c, description_class_c_timeout, description_network_device_profile, description_network_server_device_profile} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";

const first_digit_not_0 = function(value){ 
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
      device_profile_name: {
        required,
        maxLength: maxLength(80),
      },      
      mac_version_form: {
        required,
      },
      reg_params_revision_form: {
        required,
      },
      network_name_form: {
        required,
      },      
      network_server_name_form: {
        required,
      },     
      max_eirp: {
        required,
        numeric,
        between: between(0, 2147483647)
      },
      rx_delay_1: {
        required,
        numeric,
        between: between(0, 15)
      },
      rx_dr_offset_1: {
        required,
        numeric,
        between: between(0, 2147483647)
      },
      rx_dr_2: {
        required,
        numeric,
        between: between(0, 2147483647)
      },
      rx_frequency_2: {
        required,
        numeric,
        between: between(0, 2147483647)
      },
      factory_preset_frequencies: {
        required,
      },
      class_b_timeout: {
        required,
        numeric,
        between: between(0, 2147483647)
      },
      ping_slot_period_form: {
        required,
        numeric,
        between: between(0, 2147483647)
      },
      ping_slot_dr: {
        required,
        numeric,
        between: between(0, 2147483647)
      },
      ping_slot_frequency: {
        required,
        numeric,
        between: between(0, 2147483647)
      },
      class_c_timeout: {
        required,
        numeric,
        between: between(0, 2147483647)
      },
      
    },
  data() {
    return {
      access: 0,
      network_names: [], //a list of all the networks
      network_name_form: '',
      network_id: '',
      network_server_names: [],
      network_server_name_form: '',
      network_server_id: '',

      device_profile_name: '',
      mac_version: ['1.0.0', '1.0.1', '1.0.2', '1.0.3', '1.1.0'],
      mac_version_form: '',
      reg_params_revision: ['A', 'B'],
      reg_params_revision_form: '',
      max_eirp: 0,

      supports_join: false,
      rx_delay_1: 0,
      rx_dr_offset_1: 0,
      rx_dr_2: 0,
      rx_frequency_2: 0,
      factory_preset_frequencies: ['0'],

      supports_class_b: false,
      class_b_timeout: 0,
      ping_slot_period_form: 1,
      ping_slot_period: [1,2,4,8,16,32,64,128],
      ping_slot_dr: 0,
      ping_slot_frequency: 0,

      supports_class_c: false,
      class_c_timeout: 0,

      //Description tool tips
      description_device_profile_name : description_device_profile_name,
      description_mac_version : description_mac_version,
      description_reg_params_revision : description_reg_params_revision,
      description_network_device_profile : description_network_device_profile, 
      description_network_server_device_profile : description_network_server_device_profile,
      description_max_eirp : description_max_eirp,
      description_supports_join : description_supports_join,
      description_rx_delay_1 : description_rx_delay_1,
      description_rx_dr_offset_1 : description_rx_dr_offset_1,
      description_rx_dr_2 : description_rx_dr_2,
      description_rx_frequency_2 : description_rx_frequency_2,
      description_factory_preset_frequencies : description_factory_preset_frequencies,
      description_supports_class_b : description_supports_class_b,
      description_class_b_timeout : description_class_b_timeout,
      description_ping_slot_period : description_ping_slot_period,
      description_ping_slot_dr : description_ping_slot_dr,
      description_ping_slot_frequency : description_ping_slot_frequency,
      description_supports_class_c : description_supports_class_c,
      description_class_c_timeout : description_class_c_timeout,

      message: ""
    };
  },
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
        //Get Network Servers
        AuthenticationService.get_network_servers().then(result => {
          let network_servers = result.data.network_servers_lora;
          for(let i = 0; i < network_servers.length; i++){
            this.network_server_names.push(network_servers[i].network_server_id.concat(":",network_servers[i].network_server_name));
          }
         if(this.network_server_names.length == 0){
            //This will route the user to the create network server page if no network servers exists 
            if(confirm('There are no associated Network Servers. Route to the Create Network Server Page?') == true){
              this.$router.push(`/network_server/create`)
            };
          }
        }).catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
        });
        //Get Networks
        AuthenticationService.get_networks().then(result => {
          let networks = result.data.networks_lora;
          for(let i = 0; i < networks.length; i++){
              this.network_names.push(networks[i].network_id.concat(":",networks[i].network_name));
          }
         if(this.network_names.length == 0){
            //This will route the user to the create network page if no networks exists 
            if(confirm('There are no created Networks. Route to the Create Network Page?') == true){
              this.$router.push(`/network/create`)
            };
          }
        }).catch(err => {
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
  computed: {
    device_profile_name_errors(){
      const errors=[];
      if (!this.$v.device_profile_name.$error)return errors
      !this.$v.device_profile_name.maxLength && errors.push('Name must be 80 characters or less.')
      !this.$v.device_profile_name.required && errors.push('Name is required.')
      return errors;
    },
    mac_version_form_errors(){
      const errors=[];
      if (!this.$v.mac_version_form.$error)return errors
      !this.$v.mac_version_form.required && errors.push('A LoRaWAN MAC Version is required.')
      return errors;
    },
    reg_params_revision_form_errors(){
      const errors=[];
      if (!this.$v.reg_params_revision_form.$error)return errors
      !this.$v.reg_params_revision_form.required && errors.push('A LoRaWAN Regional Parameter is required.')
      return errors;
    },
    network_name_form_errors(){
      const errors=[];
      if (!this.$v.network_name_form.$error)return errors
      !this.$v.network_name_form.required && errors.push('Network is required.')
      return errors;
    },
    network_server_name_form_errors(){
      const errors=[];
      if (!this.$v.network_server_name_form.$error)return errors
      !this.$v.network_server_name_form.required && errors.push('Network Server is required.')
      return errors;
    },
    max_eirp_errors(){
      const errors=[];
      if (!this.$v.max_eirp.$error)return errors
      !this.$v.max_eirp.numeric && errors.push('Max EIRP must be an integer.')
      !this.$v.max_eirp.between && errors.push('Max EIRP must be between 0 & 2147483647.')
      !this.$v.max_eirp.required && errors.push('Maximum EIRP is required.')
      return errors;
    },
    rx_delay_1_errors(){
      const errors=[];
      if (!this.$v.rx_delay_1.$error)return errors
      !this.$v.rx_delay_1.numeric && errors.push('Class A RX 1 Delay must be an integer.')
      !this.$v.rx_delay_1.between && errors.push('Class A RX 1 Delay must be between 0 & 15.')
      !this.$v.rx_delay_1.required && errors.push('Class A RX 1 Delay is required.')
      return errors;
    },    
    rx_dr_offset_1_errors(){
      const errors=[];
      if (!this.$v.rx_dr_offset_1.$error)return errors
      !this.$v.rx_dr_offset_1.numeric && errors.push('RX 1 DR Offset must be an integer.')
      !this.$v.rx_dr_offset_1.between && errors.push('RX 1 DR Offset must be between 0 & 2147483647.')
      !this.$v.rx_dr_offset_1.required && errors.push('RX 1 DR Offset is required.')
      return errors;
    },
    rx_dr_2_errors(){
      const errors=[];
      if (!this.$v.rx_dr_2.$error)return errors
      !this.$v.rx_dr_2.numeric && errors.push('RX 2 Data Rate must be an integer.')
      !this.$v.rx_dr_2.between && errors.push('RX 2 Data Rate must be between 0 & 2147483647.')
      !this.$v.rx_dr_2.required && errors.push('RX 2 Data Rate is required.')
      return errors;
    },
    rx_frequency_2_errors(){
      const errors=[];
      if (!this.$v.rx_frequency_2.$error)return errors
      !this.$v.rx_frequency_2.numeric && errors.push('RX 2 Channel Frequency must be an integer.')
      !this.$v.rx_frequency_2.between && errors.push('RX 2 Channel Frequency must be between 0 & 2147483647.')
      !this.$v.rx_frequency_2.required && errors.push('RX 2 Channel Frequency is required.')
      return errors;
    },
    factory_preset_frequencies_errors(){
      const errors=[];
      if (!this.$v.factory_preset_frequencies.$error)return errors
      !this.$v.factory_preset_frequencies.required && errors.push('A Factory Preset Frequency is required.')
      //Should also add in a check to ensure that each eleement in the array is a number
      return errors;
    },
    class_b_timeout_errors(){
      const errors=[];
      if (!this.$v.class_b_timeout.$error)return errors
      !this.$v.class_b_timeout.numeric && errors.push('Class B Timeout must be an integer.')
      !this.$v.class_b_timeout.between && errors.push('Class B Timeout must be between 0 & 2147483647.')
      !this.$v.class_b_timeout.required && errors.push('Class B Timeout is required.')
      return errors;
    },
    ping_slot_period_form_errors(){
      const errors=[];
      if (!this.$v.ping_slot_period_form.$error)return errors
      !this.$v.ping_slot_period_form.numeric && errors.push('Ping Slot Period must be an integer.')
      !this.$v.ping_slot_period_form.between && errors.push('Ping Slot Period must be between 0 & 2147483647.')
      !this.$v.ping_slot_period_form.required && errors.push('Ping Slot Period is required.')
      return errors;
    },
    ping_slot_dr_errors(){
      const errors=[];
      if (!this.$v.ping_slot_dr.$error)return errors
      !this.$v.ping_slot_dr.numeric && errors.push('Ping Slot DR must be an integer.')
      !this.$v.ping_slot_dr.between && errors.push('Ping Slot DR must be between 0 & 2147483647.')
      !this.$v.ping_slot_dr.required && errors.push('Ping Slot DR is required.')
      return errors;
    },
    ping_slot_frequency_errors(){
      const errors=[];
      if (!this.$v.ping_slot_frequency.$error)return errors
      !this.$v.ping_slot_frequency.numeric && errors.push('Ping Slot Frequency must be an integer.')
      !this.$v.ping_slot_frequency.between && errors.push('Ping Slot Frequency must be between 0 & 2147483647.')
      !this.$v.ping_slot_frequency.required && errors.push('Ping Slot Frequency is required.')
      return errors;
    },
    class_c_timeout_errors(){
      const errors=[];
      if (!this.$v.class_c_timeout.$error)return errors
      !this.$v.class_c_timeout.numeric && errors.push('Class C Timeout must be an integer.')
      !this.$v.class_c_timeout.between && errors.push('Class C Timeout must be between 0 & 2147483647.')
      !this.$v.class_c_timeout.required && errors.push('Class C Timeout is required.')
      return errors;
    },

  },
  methods: {
    create_device_profile(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.device_profile_name.$invalid || this.$v.mac_version_form.$invalid || this.$v.reg_params_revision_form.$invalid
      || this.$v.network_name_form.$invalid || this.$v.network_server_name_form.$invalid
      || this.$v.max_eirp.$invalid || this.$v.rx_delay_1.$invalid || this.$v.rx_dr_offset_1.$invalid ||this.$v.rx_dr_2.$invalid
      || this.$v.rx_frequency_2.$invalid || this.$v.factory_preset_frequencies.$invalid || this.$v.class_b_timeout.$invalid
      || this.$v.ping_slot_period_form.$invalid || this.$v.ping_slot_dr.$invalid || this.$v.ping_slot_frequency.$invalid
      || this.$v.class_c_timeout.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        if(this.supports_join =="")this.supports_join =false; //needed to set empty radio to false
        if(this.supports_class_b =="")this.supports_class_b =false; //needed to set empty radio to false
        if(this.supports_class_c =="")this.supports_class_c =false; //needed to set empty radio to false
        this.message = "";
        this.max_eirp = first_digit_not_0(this.max_eirp);
        this.rx_delay_1 = first_digit_not_0(this.rx_delay_1);
        this.rx_dr_offset_1 = first_digit_not_0(this.rx_dr_offset_1);
        this.rx_dr_2 = first_digit_not_0(this.rx_dr_2);
        this.rx_frequency_2 = first_digit_not_0(this.rx_frequency_2);
        this.class_b_timeout = first_digit_not_0(this.class_b_timeout);
        this.ping_slot_dr = first_digit_not_0(this.ping_slot_dr);
        this.ping_slot_frequency = first_digit_not_0(this.ping_slot_frequency);
        this.network_id=functions.extract_id_id_name(this.network_name_form);//Extract id of the selected network
        this.network_server_id=functions.extract_id_id_name(this.network_server_name_form);//Extract id of selected network server

        AuthenticationService.create_device_profiles({
          device_profile_name : this.device_profile_name,
          mac_version : this.mac_version_form,
          reg_params_revision : this.reg_params_revision_form,
          network_id: this.network_id,
          network_server_id: this.network_server_id,
          max_eirp : this.max_eirp,
          supports_join : this.supports_join,
          rx_delay_1 : this.rx_delay_1,
          rx_dr_offset_1 : this.rx_dr_offset_1,
          rx_dr_2 : this.rx_dr_2,
          rx_frequency_2 : this.rx_frequency_2,
          factory_preset_frequencies : this.factory_preset_frequencies,
          supports_class_b : this.supports_class_b,
          class_b_timeout : this.class_b_timeout,
          ping_slot_period : this.ping_slot_period_form,
          ping_slot_dr : this.ping_slot_dr,
          ping_slot_frequency : this.ping_slot_frequency,
          supports_class_c : this.supports_class_c,
          class_c_timeout : this.class_c_timeout,
        }).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$router.push(`/device_profile`)
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
