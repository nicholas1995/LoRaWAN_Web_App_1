<template>
  <v-content v-if="this.access == 1">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-toolbar light class="primary ">
            <v-toolbar-title>Create Gateway</v-toolbar-title>
          </v-toolbar>
            <v-stepper non-linear class = "elevation-5">
              <v-stepper-header>
                <v-stepper-step editable step="1">Basic Information</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step editable step="2">Gateway Location</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step editable step="3">Additional Information</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items >
<!--Stepper 1--><v-stepper-content step="1" >
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
                  <!--Gateway ID -->
                  <v-flex >
                    <v-text-field
                      v-model="gateway_id_lora"
                      label="Gateway ID*"
                      :error-messages = "gateway_id_Errors"
                      @keyup="$v.gateway_id_lora.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_id"></tool_tips_forms>
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
                  <!--Network Name-->
                    <v-select
                      v-model="network_name_form"
                      :items="this.networks_can_have_gateways"
                      label="Network*"
                      :error-messages = "network_name_form_Errors"
                      @blur="$v.network_name_form.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_network"></tool_tips_forms>
                    </v-select>
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
                  <!-- Message -->
                    <div div class="text">
                      {{message}}
                    </div>
                  <!-- Buttons -->
                    <v-btn class="grey lighten-2"
                      @click.stop="create_gateway()">
                      Create Gateway
                    </v-btn>
                    <v-btn class="grey lighten-2"
                      @click.stop="$router.push(`/gateway`)">
                      Cancel
                    </v-btn>
                </v-stepper-content>
<!--Stepper 2--><v-stepper-content step ="2">
                <!--Gateway Accuracy-->
                  <v-flex >
                    <v-text-field
                      v-model="gateway_accuracy"
                      label="Gateway Location Accuracy*"
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
                    label="Gateway Location Source*"
                    :error-messages = "gateway_location_source_form_Errors"
                    @blur="$v.gateway_location_source_form.$touch()" 
                  >
                    <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_location_source"></tool_tips_forms>
                  </v-select>
                  <!-- Message -->
                    <div div class="text">
                      {{message}}
                    </div>
                  <!-- Buttons -->
                    <v-btn class="grey lighten-2"
                      @click.stop="create_gateway()">
                      Create Gateway
                    </v-btn>
                    <v-btn class="grey lighten-2"
                      @click.stop="$router.push(`/gateway`)">
                      Cancel
                    </v-btn>
                </v-stepper-content>
<!--Stepper 3--><v-stepper-content step ="3">
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
                    @click.stop="create_gateway()">
                    Create Gateway
                  </v-btn>
                  <v-btn class="grey lighten-2"
                    @click.stop="$router.push(`/gateway`)">
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
        x= 0;
      }
    }
  }
    return x;  
}

const unique_gateway_id= function(value){ //ensures that the id is unique after 16 digits is entered
  let x = 1; //0 fail, 1 pass
  if(value.length == 16){
    for(let i=0; i< this.gateways.length; i++){
        if(value ==this.gateways[i].gateway_id_lora){
        x= 0;
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
    gateway_id_lora: {
      hex,
      maxLength: maxLength(16),
      minLength: minLength(16),
      u_id: unique_gateway_id,
      required
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
    gateway_id_Errors(){
      const errors=[];
      if (!this.$v.gateway_id_lora.$error)return errors
      !this.$v.gateway_id_lora.hex && errors.push('Gateway ID must be a valid HEX ')
      !this.$v.gateway_id_lora.u_id && errors.push('Gateway ID must be unique')
      !this.$v.gateway_id_lora.maxLength && errors.push('Gateway ID must be 16 characters')
      !this.$v.gateway_id_lora.minLength && errors.push(`Gateway ID must be 16 characters: ${(16 - this.gateway_id_lora.length)}`)
      !this.$v.gateway_id_lora.required && errors.push('Gateway ID is required.')
      return errors;
    },
    description_Errors(){
      const errors=[];
      if (!this.$v.description.$error)return errors
      !this.$v.description.maxLength && errors.push('Description must be 200 characters or less')
      !this.$v.description.required && errors.push('Description is required.')
      return errors;
    },
    network_name_form_Errors(){
      const errors=[];
      if (!this.$v.network_name_form.$error)return errors
      !this.$v.network_name_form.required && errors.push('Network is required.')
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
      access: 0,

      gateways: '',
      gateway_name: '',
      gateway_id_lora: '',
      description: '',
      network_name_form: '', //this is the variable that holds the selected network 'id:name'
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

      network_names: [],
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
  watch: {
    network_name_form: function(){
      this.gateways_same_network = [];
      this.network_id = functions.extract_id_id_name(this.network_name_form);
      for(let i = 0; i< this.gateways.length; i++){
        if(this.gateways[i].network_id == this.network_id){
          this.gateways_same_network.push(this.gateways[i]);
        }
      }
    },
    network_server_name_form: function(){
        this.gateway_profile_names =[];
        this.gateway_profile_name_form =[];
        this.network_server_id=functions.extract_id_id_name(this.network_server_name_form); //extract id of network_server
        for(let i =0; i< this.gateway_profiles.length; i++){
          if(this.network_server_id == this.gateway_profiles[i].network_server_id){
            this.gateway_profile_names.push(this.gateway_profiles[i].gateway_profile_id +":"+ this.gateway_profiles[i].gateway_profile_name);
          }
        }
        if(this.gateway_profile_names.length == 0){
          //This will route the user to the create gateway profile page if no gateway profiles exists 
          if(confirm('There are no created Gateway Profiles associated with the selected Network Server. Route to the Create Gateway Profile?') == true){
            this.$router.push(`/gateway_profile/create`)
          };
        }
      }
  },
  created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("gateways", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //-------------------------Start----------------------
        //Get Gateways
        AuthenticationService.get_gateways().then(result => {
          this.gateways = result.data.gateways_lora; 
          this.$emit('message_display',{message:result.data.message, type:result.data.type})   
        }).catch(err => {
          //Error requesting the gateways from the server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})
        })
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
            if(networks[i].network_can_have_gateways ==1){
              this.networks_can_have_gateways.push(networks[i].network_id.concat(":",networks[i].network_name));
            }
          }
          if(this.networks_can_have_gateways.length == 0){
            //This will route the user to the create network page if no network exists 
            if(confirm('There are no created Networks which can own gateways. Route to the Create Network Page?') == true){
              this.$router.push(`/network/create`)
            };
          }
        }).catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
        })
        //Get Gateway Profiles
        AuthenticationService.get_gateway_profiles()
        .then(result => {
          this.gateway_profiles = result.data.gateway_profiles_lora;
        }).catch(err=> {
          //Error requesting service profiles from server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
        })
      }else{
        alert('Please login.');
        this.$router.push('/login');
      }
    }catch (err) {
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
  methods: {
    create_gateway(){
      this.$v.$touch();
      if(this.$v.gateway_name.$invalid || this.$v.gateway_id_lora.$invalid || this.$v.description.$invalid 
      || this.$v.network_name_form.$invalid || this.$v.network_server_name_form.$invalid || this.$v.gateway_profile_name_form.$invalid 
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
         AuthenticationService.create_gateways({
          gateway_name: this.gateway_name,
          gateway_id_lora: this.gateway_id_lora,
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
        }).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$router.push('/gateway');
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


