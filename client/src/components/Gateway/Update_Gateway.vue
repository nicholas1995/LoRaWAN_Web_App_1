<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Update Gateway</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--Gateway Name -->
            <v-flex >
              <v-text-field
                v-model="gateway_name"
                label="Gateway Name*"
                :error-messages = "gateway_name_Errors"
                @keyup="$v.gateway_name.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_name"></tool_tips_forms>
              </v-text-field>
              </v-flex>
            <!--Description  -->
            <v-flex >
              <v-textarea
                auto-grow
                rows="1"
                v-model="description"
                label="Description*"
                :error-messages = "description_Errors"
                @keyup="$v.description.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_description"></tool_tips_forms>
              </v-textarea>
              </v-flex>
            <!--Network Server Name-->
              <v-select
                v-model="network_server_name_form"
                :items="this.network_server_names"
                label="Network Server*"
                :error-messages = "network_server_name_form_Errors"
                @blur="$v.network_server_name_form.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_network_server"></tool_tips_forms>
              </v-select>
            <!--Gateway Profile Name-->
              <v-select
                v-model="gateway_profile_name_form"
                :items="this.gateway_profile_names"
                label="Gateway Profile*"
                :error-messages = "gateway_profile_name_form_Errors"
                @blur="$v.gateway_profile_name_form.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_profile"></tool_tips_forms>
              </v-select>
            <!--Gateway Accuracy-->
              <v-flex >
                <v-text-field
                  v-model="gateway_accuracy"
                  label="Gateway Accuracy*"
                  suffix = "meters"
                  :error-messages = "gateway_accuracy_Errors"
                  @keyup="$v.gateway_accuracy.$touch()" 
                >
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_location_accuracy"></tool_tips_forms>
                </v-text-field>
                </v-flex>
            <!--Gateway Altitude-->
              <v-flex >
                <v-text-field
                  v-model="gateway_altitude"
                  label="Gateway Altitude*"
                  suffix = "meters"
                  :error-messages = "gateway_altitude_Errors"
                  @keyup="$v.gateway_altitude.$touch()" 
                >
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_location_altitude"></tool_tips_forms>
                </v-text-field>
                </v-flex>
            <!--Gateway Latitude-->
              <v-flex >
                <v-text-field
                  v-model="gateway_latitude"
                  label="Gateway Latitude*"
                  :error-messages = "gateway_latitude_Errors"
                  @keyup="$v.gateway_latitude.$touch()" 
                >
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_location_latitude"></tool_tips_forms>
                </v-text-field>
                </v-flex>
            <!--Gateway Longitude-->
              <v-flex >
                <v-text-field
                  v-model="gateway_longitude"
                  label="Gateway Longitude*"
                  :error-messages = "gateway_longitude_Errors"
                  @keyup="$v.gateway_longitude.$touch()" 
                >
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_location_longitude"></tool_tips_forms>
                </v-text-field>
                </v-flex>
            <!--Gateway Location Source-->
              <v-select
                v-model="gateway_location_source_form"
                :items="this.gateway_location_source"
                label="Source*"
                :error-messages = "gateway_location_source_form_Errors"
                @blur="$v.gateway_location_source_form.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_location_source"></tool_tips_forms>
              </v-select>
              <!--Discovery Enabled-->
                <v-checkbox
                  v-model="discovery_enabled"
                  label="Discovery Enabled"
                ></v-checkbox>
            <!--Fine Time Stamp Key-->
              <v-flex >
                <v-text-field
                  v-model="fine_time_stamp_key"
                  label="Fine Time Stamp Key"
                  :error-messages = "fine_time_stamp_key_Errors"
                  @keyup="$v.fine_time_stamp_key.$touch()" 
                >
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_fine_time_stamp_key"></tool_tips_forms>
                </v-text-field>
                </v-flex>
            <!--FPGA ID-->
              <v-flex >
                <v-text-field
                  v-model="fpga_id"
                  label="FPGA ID"
                  :error-messages = "fpga_id_Errors"
                  @keyup="$v.fpga_id.$touch()" 
                >
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_fpga_id"></tool_tips_forms>
                </v-text-field>
                </v-flex>
              <!-- Message -->
              <div div class="text">
                {{message}}
              </div>
              <!-- Buttons -->
              <v-btn class="grey lighten-2"
                @click.stop="update_gateway()">
                Update Gateway
              </v-btn>
              <v-btn class="grey lighten-2"
                @click.stop="$emit('gateway_management_no_change')">
                Cancel
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
import { required, maxLength, minLength, numeric, helpers, decimal } from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"
import {description_gateway_name, description_gateway_id, description_gateway_description, description_gateway_network,
description_gateway_network_server, description_gateway_profile, description_gateway_location_accuracy, description_gateway_location_altitude,
description_gateway_location_latitude, description_gateway_location_longitude, description_gateway_location_source, description_fine_time_stamp_key,
description_gateway_fpga_id} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";


const unique_gateway_name= function(value){
  let x = 1; //0 fail, 1 pass
  if(this.network_name_form !=''){
    for(let i=0; i< this.gateways_same_network.length; i++){
        if(value ==this.gateways_same_network[i].gateway_name){
          if(value != this.gateway_update.gateway_name){
            x= 0;
        }
      }
    }
  }
    return x;  
}

const first_digit_not_0 = function(value){ 
  let x = 1; //0 fail, 1 pass
  if(value.length >1){   //if it is more than one digit in length 
    if(value[0] == 0){
      x = 0;
    }
  }
  return x;
}

const hex = helpers.regex('hex', /^[a-fA-F0-9]*$/);
const alpha_num_dash = helpers.regex('alpha_num_dash', /^[a-zA-Z0-9\-\_]*$/);


export default {
  components:{
    tool_tips_forms
  },
  mixins: [validationMixin],
  validations: {
    gateway_name: {
      alpha_num_dash,
      required,
      u: unique_gateway_name,
      maxLength: maxLength(80),
    },
    description: {
      required,
      maxLength: maxLength(200),
    },      
    network_name_form: {
      required,
    },      
    network_server_name_form: {
      required,
    },      
    gateway_profile_name_form: {
      required,
    },      
    gateway_accuracy: {
      required,
      numeric,
      num :first_digit_not_0
    },      
    gateway_altitude: {
      required,
      numeric,
      num :first_digit_not_0
    },      
    gateway_latitude: {
      required,
      decimal
    },      
    gateway_longitude: {
      required,
      decimal
    },      
    gateway_location_source_form: {
      required
    },      
    fine_time_stamp_key: {
      hex,
      maxLength: maxLength(32),
      minLength: minLength(32),
    },      
    fpga_id: {
      hex,
      maxLength: maxLength(16),
      minLength: minLength(16),
    }
  },
  computed: {
    gateway_name_Errors(){
      const errors=[];
      if (!this.$v.gateway_name.$error)return errors
      !this.$v.gateway_name.u && errors.push('Gateway name must be unique')
      !this.$v.gateway_name.alpha_num_dash && errors.push('Name must only contain letters, numbers and dashes')
      !this.$v.gateway_name.maxLength && errors.push('Gateway name must be 80 characters or less')
      !this.$v.gateway_name.required && errors.push('Gateway name is required.')
      return errors;
    }, 
    description_Errors(){
      const errors=[];
      if (!this.$v.description.$error)return errors
      !this.$v.description.maxLength && errors.push('Description must be 200 characters or less')
      !this.$v.description.required && errors.push('Description is required.')
      return errors;
    },
    network_server_name_form_Errors(){
      const errors=[];
      if (!this.$v.network_server_name_form.$error)return errors
      !this.$v.network_server_name_form.required && errors.push('Network Server is required.')
      return errors;
    },
    gateway_profile_name_form_Errors(){
      const errors=[];
      if (!this.$v.gateway_profile_name_form.$error)return errors
      !this.$v.gateway_profile_name_form.required && errors.push('Gateway Profile is required.')     
      return errors;
    },
    gateway_accuracy_Errors(){
      const errors=[];
      if (!this.$v.gateway_accuracy.$error)return errors
      !this.$v.gateway_accuracy.required && errors.push('Gateway Accuracy is required.')   
      !this.$v.gateway_accuracy.numeric && errors.push('Gateway Accuracy must be a number.')   
      !this.$v.gateway_accuracy.num && errors.push('Reference altitude cannot start with 0.')       
      return errors;
    },
    gateway_altitude_Errors(){
      const errors=[];
      if (!this.$v.gateway_altitude.$error)return errors
      !this.$v.gateway_altitude.required && errors.push('Gateway altitude is required.')  
      !this.$v.gateway_altitude.numeric && errors.push('Gateway altitude must be a number.')     
      !this.$v.gateway_altitude.num && errors.push('Reference altitude cannot start with 0.')     
      return errors;
    },
    gateway_latitude_Errors(){
      const errors=[];
      if (!this.$v.gateway_latitude.$error)return errors
      !this.$v.gateway_latitude.required && errors.push('Gateway latitude is required.')     
      !this.$v.gateway_latitude.decimal && errors.push('Gateway latitude must be a number.')     
      return errors;
    },
    gateway_longitude_Errors(){
      const errors=[];
      if (!this.$v.gateway_longitude.$error)return errors
      !this.$v.gateway_longitude.required && errors.push('Gateway longitude is required.')    
      !this.$v.gateway_longitude.decimal && errors.push('Gateway longitude must be a number.')     
      return errors;
    },
    gateway_location_source_form_Errors(){
      const errors=[];
      if (!this.$v.gateway_location_source_form.$error)return errors
      !this.$v.gateway_location_source_form.required && errors.push('Gateway location source is required.')         
      return errors;
    },
    fine_time_stamp_key_Errors(){
      const errors=[];
      if (!this.$v.fine_time_stamp_key.$error)return errors
      !this.$v.fine_time_stamp_key.hex && errors.push('FPGA ID must be a valid HEX ')
      !this.$v.fine_time_stamp_key.maxLength && errors.push('FPGA ID must be 32 characters')
      !this.$v.fine_time_stamp_key.minLength && errors.push(`FPGA ID must be 32 characters: ${(32 - this.fine_time_stamp_key.length)}`)      
      return errors;
    },
    fpga_id_Errors(){
      const errors=[];
      if (!this.$v.fpga_id.$error)return errors
      !this.$v.fpga_id.hex && errors.push('FPGA ID must be a valid HEX ')
      !this.$v.fpga_id.maxLength && errors.push('FPGA ID must be 16 characters')
      !this.$v.fpga_id.minLength && errors.push(`FPGA ID must be 16 characters: ${(16 - this.fpga_id.length)}`)  
      return errors;
    }
  },
  data() {
    return {
      gateway_name: '',
      description: '',
      network_server_name_form: '', //this is the variable that holds the selected network server 'id:name'
      gateway_profile_name_form: '', //this is the variable that holds the selected gateway profile 'id:name'
      gateway_accuracy: '',
      gateway_altitude: '',
      gateway_latitude: '',
      gateway_longitude: '',
      gateway_location_source_form: '', //this is the variable that holds the selected gateway location source
      discovery_enabled: null,
      fine_time_stamp_key: '',
      fpga_id: '',

      network_id: '', //this is the variable that holds the id of the selected network
      network_server_id: '', //this is the network server id of the selected network server
      gateway_profile_id: '', //this is the gateway profile id of the selected gateway profile

      gateway_profiles: '',

      network_server_names: [],
      gateway_profile_names: [], 
      gateway_location_source: ['UNKNOWN','GPS', 'CONFIG', 'GEO_RESOLVER'],
      message: '',
      networks_can_have_gateways: [],//this is an array that contains all the networks that can have gateways
      gateways_same_network: [],

      description_gateway_name : description_gateway_name,
      description_gateway_id : description_gateway_id,
      description_gateway_description : description_gateway_description,
      description_gateway_network : description_gateway_network,
      description_gateway_network_server : description_gateway_network_server,
      description_gateway_profile : description_gateway_profile,
      description_gateway_location_accuracy : description_gateway_location_accuracy,
      description_gateway_location_altitude : description_gateway_location_altitude,
      description_gateway_location_latitude : description_gateway_location_latitude,
      description_gateway_location_longitude : description_gateway_location_longitude,
      description_gateway_location_source : description_gateway_location_source,
      description_fine_time_stamp_key : description_fine_time_stamp_key,
      description_gateway_fpga_id : description_gateway_fpga_id,
    };
  },
  props:[
   'gateways_prop',
   'gateway_update'
  ],
  watch: {
    network_server_name_form: function(){
        this.gateway_profile_names =[];
        this.gateway_profile_name_form =[];
        this.network_server_id=functions.extract_id_id_name(this.network_server_name_form); //extract id of network_server
        for(let i =0; i< this.gateway_profiles.length; i++){
          this.gateway_profile_names.push(this.gateway_profiles[i].gateway_profile_id + ":" +this.gateway_profiles[i].gateway_profile_name);
          if(this.gateway_profiles[i].gateway_profile_id_lora ==this.gateway_profile_id){
            this.gateway_profile_name_form =this.gateway_profile_names[i];
          }
        }
      } 
  },
  created: async function () {
    let gateway;
      await AuthenticationService.get_gateway(this.gateway_update.gateway_id_lora).then(result => {
            gateway = JSON.parse(result.data.gateway);
            this.gateway_name = gateway.gateway_name;
            this.description = gateway.gateway_description;
            this.network_id = gateway.network_id,
            this.network_Server_id = gateway.network_server_id,
            this.gateway_profile_id =gateway.gateway_profile_id,
            this.gateway_accuracy = gateway.gateway_accuracy;
            this.gateway_altitude = gateway.gateway_altitude;
            this.gateway_latitude = gateway.gateway_latitude;
            this.gateway_longitude = gateway.gateway_longitude;
            this.gateway_location_source_form = gateway.gateway_location_source_form;
            this.discovery_enabled = gateway.discovery_enabled;
            this.fine_time_stamp_key = gateway.fine_time_stamp_key; 
            this.fpga_id = gateway.fpga_id;
          }).catch(err => {
            //Error getting gateway to be updated information
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
          });
    for(let i = 0; i< this.gateways_prop.length; i++){
      if(this.gateways_prop[i].network_id == this.network_id){
        this.gateways_same_network.push(this.gateways_prop[i]);
        }
      }
    AuthenticationService.get_network_servers().then(result => {
      let network_servers = JSON.parse(result.data.network_servers_lora);
      for(let i = 0; i < network_servers.length; i++){
        this.network_server_names.push(network_servers[i].network_server_id.concat(":",network_servers[i].network_server_name));
        if(network_servers[i].network_server_id == gateway.network_server_id){
          this.network_server_name_form =this.network_server_names[i];
        }
      }
    }).catch(err => {
      //Error getting network servers from lora app server
      this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
    });
    AuthenticationService.get_gateway_profiles().then(result => {
      this.gateway_profiles = JSON.parse(result.data.gateway_profiles_lora);
      let j = 0;//fetch all the gateway profiles... filter them based on the currently selected network serve... check to see if the lora_if of the profile is the same as that on the 
      // ith gateway profile... if yes add that name to the form
      for(let i =0; i< this.gateway_profiles.length; i++){
        if(this.gateway_profiles[i].network_server_id == this.network_server_id){ //Create the array for the currently selected network server
          this.gateway_profile_names.push(this.gateway_profiles[i].gateway_profile_id + ":" +this.gateway_profiles[i].gateway_profile_name);
          if(this.gateway_profiles[i].gateway_profile_id_lora ==this.gateway_profile_id){
            this.gateway_profile_name_form =this.gateway_profile_names[j];
          }
          j = j+1;
        }
      }
    }).catch(err=> {
      //Error requesting service profiles from server
      this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
    })
  },
  methods: {
    update_gateway(){
      this.$v.$touch();
      if(this.$v.gateway_name.$invalid || this.$v.description.$invalid 
      || this.$v.network_server_name_form.$invalid || this.$v.gateway_profile_name_form.$invalid 
      || this.$v.gateway_accuracy.$invalid || this.$v.gateway_altitude.$invalid || this.$v.gateway_latitude.$invalid
      || this.$v.gateway_longitude.$invalid || this.$v.gateway_location_source_form.$invalid || this.$v.fine_time_stamp_key.$invalid
      || this.$v.fpga_id.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        if(this.discovery_enabled ==null)this.discovery_enabled =false; //needed to set empty radio to false
        this.message = "";
        this.gateway_profile_id=functions.extract_id_id_name(this.gateway_profile_name_form);//Extract id of gateway profile
        for(let i = 0; i < this.gateway_profiles.length; i++){
          if(this.gateway_profiles[i].gateway_profile_id == this.gateway_profile_id){
            this.gateway_profile_id = this.gateway_profiles[i].gateway_profile_id_lora;
            break;
          }
        }
         AuthenticationService.update_gateways({
          gateway_name: this.gateway_name,
          gateway_id: this.gateway_update.gateway_id,
          gateway_id_lora: this.gateway_update.gateway_id_lora,
          gateway_description: this.description,
          network_id: this.network_id,
          network_server_id: this.network_server_id,
          gateway_profile_id: this.gateway_profile_id,
          gateway_accuracy: this.gateway_accuracy,
          gateway_altitude: this.gateway_altitude,
          gateway_latitude: this.gateway_latitude,
          gateway_longitude: this.gateway_longitude,
          gateway_location_source: this.gateway_location_source_form,
          discovery_enabled: this.discovery_enabled,
          fine_time_stamp_key: this.fine_time_stamp_key,
          fpga_id: this.fpga_id,
        }, this.gateway_update.gateway_id_lora).then(result => {
          let data = JSON.parse(result.data.gateways_lora);
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$emit('gateway_management', data);
        }).catch(err => {
          //Error trying to create subnetwork
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


