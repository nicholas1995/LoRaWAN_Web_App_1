<template>
  <v-content v-if="this.access == 1">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-toolbar light class="primary ">
            <v-toolbar-title>Create Device</v-toolbar-title>
          </v-toolbar>
            <v-stepper non-linear class = "elevation-5">
              <v-stepper-header>
                <v-stepper-step editable step="1">Basic Information</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step editable step="2">Other</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
<!--Stepper 1--><v-stepper-content step ="1">
                  <!--Device Name -->
                    <v-flex >
                      <v-text-field
                        v-model="device_name"
                        label="Device Name*"
                        :error-messages = "device_name_Errors"
                        @keyup="$v.device_name.$touch()" 
                      >
                        <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_name"></tool_tips_forms>
                      </v-text-field>
                      </v-flex>
                    <!--Device EUI -->
                    <v-flex >
                      <v-text-field
                        v-model="device_eui"
                        label="Device EUI*"
                        :error-messages = "device_eui_Errors"
                        @keyup="$v.device_eui.$touch()" 
                      >
                        <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_eui"></tool_tips_forms>
                      </v-text-field> 
                      </v-flex>
                    <!--Description  -->
                    <v-flex >
                      <v-textarea
                        auto-grow
                        rows="1"
                        v-model="device_description"
                        label="Description*"
                        :error-messages = "device_description_Errors"
                        @keyup="$v.device_description.$touch()" 
                      >
                        <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_description"></tool_tips_forms>
                      </v-textarea>
                    </v-flex>
                  <!--Reference Altitude-->
                    <v-flex >
                      <v-text-field
                        v-model="reference_altitude"
                        label="Reference Altitude"
                        suffix = "meters"
                        :error-messages = "reference_altitude_Errors"
                        @keyup="$v.reference_altitude.$touch()" 
                      >
                        <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_reference_altitude"></tool_tips_forms>
                      </v-text-field>
                      </v-flex>
                    <!--Skip Frame Counter-->
                      <v-checkbox
                        v-model="skip_frame_counter"
                        label="Skip Frame Counter"
                      ></v-checkbox>
                  <!-- Message -->
                    <div div class="text">
                      {{message}}
                    </div>
                  <!-- Buttons -->
                    <v-btn class="grey lighten-2"
                      @click.stop="create_device()">
                      Create Device
                    </v-btn>
                    <v-btn class="grey lighten-2"
                      @click.stop="$router.push(`/device`)">
                      Cancel
                    </v-btn>
                </v-stepper-content>
<!--Stepper 2--><v-stepper-content step ="2">
                  <!--Network Name-->
                    <v-select
                      v-model="network_name_form"
                      :items="this.network_names"
                      label="Network*"
                      :error-messages = "network_name_form_Errors"
                      @blur="$v.network_name_form.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_network"></tool_tips_forms>
                    </v-select>
                  <!--Sub-Network Name-->
                    <v-select
                      v-model="sub_network_name_form"
                      :items="this.sub_network_names"
                      label="Sub-Network*"
                      :error-messages = "sub_network_name_form_Errors"
                      @blur="$v.sub_network_name_form.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_sub_network"></tool_tips_forms>
                    </v-select>
                  <!--Vessel-->
                    <v-select
                      v-model="vessel_name_form"
                      :items="this.vessel_names"
                      label="Vessel"
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_vessel_device"></tool_tips_forms>                    
                    </v-select>
                  <!--Device Profile Name-->
                    <v-select
                      v-model="device_profile_name_form"
                      :items="this.device_profile_names"
                      label="Device Profile*"
                      :error-messages = "device_profile_name_form_Errors"
                      @blur="$v.device_profile_name_form.$touch()" 
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_device_device_profile"></tool_tips_forms>
                    </v-select>
                  <!-- Message -->
                    <div div class="text">
                      {{message}}
                    </div>
                  <!-- Buttons -->
                    <v-btn class="grey lighten-2"
                      @click.stop="create_device()">
                      Create Device
                    </v-btn>
                    <v-btn class="grey lighten-2"
                      @click.stop="$router.push(`/device`)">
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
import { required, maxLength, minLength, numeric, helpers } from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"
import {description_device_name, description_device_eui, description_device_description, description_device_reference_altitude, description_skip_frame_counter,
description_device_network, description_device_sub_network, description_vessel_device, description_device_device_profile} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";


const unique_device_name= function(value){
  let x = 1; //0 fail, 1 pass
  if(this.sub_network_name_form ==""){
  }else{
    for(let i=0; i< this.devices_same_sub_network.length; i++){
        if(value ==this.devices_same_sub_network[i].device_name){
        x= 0;
      }
    } 
  }
    return x;  
}
const unique_device_eui= function(value){
  let x = 1; //0 fail, 1 pass
    for(let i=0; i< this.devices.length; i++){
      if(value ==this.devices[i].device_eui){      
      x= 0;
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
    device_name: {
      alpha_num_dash,
      required,
      u: unique_device_name,
      maxLength: maxLength(80),
    },         
    device_eui: {
      hex,
      maxLength: maxLength(16),
      minLength: minLength(16),
      required,
      u:unique_device_eui
    },
    device_description: {
      required,
      maxLength: maxLength(200),
    },      
    network_name_form: {
        required,
      },  
    sub_network_name_form: {
      required,
    },      
    device_profile_name_form: {
      required,
    },      
    reference_altitude: {
      numeric,
      num :first_digit_not_0
    }
  },
  computed: {
    device_name_Errors(){
      const errors=[];
      if (!this.$v.device_name.$error)return errors
      !this.$v.device_name.u && errors.push('Sub-Network name must be unique')
      !this.$v.device_name.alpha_num_dash && errors.push('Name must only contain letters, numbers and dashes')
      !this.$v.device_name.maxLength && errors.push('Sub-Network name must be 80 characters or less')
      !this.$v.device_name.required && errors.push('Sub-Network name is required.')
      return errors;
    }, 
    device_eui_Errors(){
      const errors=[];
      if (!this.$v.device_eui.$error)return errors
      !this.$v.device_eui.hex && errors.push('Device EUI must be a valid HEX ')
      !this.$v.device_eui.maxLength && errors.push('Device EUI must be 16 characters')
      !this.$v.device_eui.minLength && errors.push(`Device EUI must be 16 characters: ${(16 - this.device_eui.length)}`)
      !this.$v.device_eui.u && errors.push('Device EUI must be unique.')
      !this.$v.device_eui.required && errors.push('Device EUI is required.')
      return errors;
    },
    device_description_Errors(){
      const errors=[];
      if (!this.$v.device_description.$error)return errors
      !this.$v.device_description.maxLength && errors.push('Description must be 200 characters or less')
      !this.$v.device_description.required && errors.push('Description is required.')
      return errors;
    },
    network_name_form_Errors(){
      const errors=[];
      if (!this.$v.network_name_form.$error)return errors
      !this.$v.network_name_form.required && errors.push('Network is required.')
      return errors;
    },
    sub_network_name_form_Errors(){
      const errors=[];
      if (!this.$v.sub_network_name_form.$error)return errors
      !this.$v.sub_network_name_form.required && errors.push('Sub-Network is required.')
      return errors;
    },
    device_profile_name_form_Errors(){
      const errors=[];
      if (!this.$v.device_profile_name_form.$error)return errors
      !this.$v.device_profile_name_form.required && errors.push('Device Profile is required.')
      return errors;
    },
    reference_altitude_Errors(){
      const errors=[];
      if (!this.$v.reference_altitude.$error)return errors
      !this.$v.reference_altitude.numeric && errors.push('Reference altitude must be a number.')     
      !this.$v.reference_altitude.num && errors.push('Reference altitude cannot start with 0.')     
      return errors;
    }
  },
  data() {
    return {
      access: 0, 

      devices: '',
      device_name: '',
      device_eui: '',
      device_description: '',
      sub_networks_lora : [], //a list of all the subnetworks on the app server
      network_name_form: '', //this is the variable that holds the selected network 'id-name'
      sub_network_name_form: '', //this is the variable that holds the selected sub_network 'id:name'
      vessel_name_form: '', //this is the variable that holds the selected vessel 'id:name'
      device_profile_name_form: '', //this is the variable that holds the selected device profile 'id:name'
      reference_altitude: '',
      skip_frame_counter: '',
      network_id: '', //this is the variable that holds the id of the selected network
      sub_network_id: '', //this is the variable that holds the id of the selected sub_network
      vessel_id: '', //this is the variable that holds the id of the selected vessel

      device_profiles: '',
      device_profile_id: '', //this is the device profile id of the selected device profile
      network_names: [],
      sub_network_names: [],
      vessels: '',
      vessel_names: [],
      device_profile_names: [], //this is the variable that holds all the names to display on the form for the device profiles 
      message: '',
      devices_same_sub_network: [],//this is an array that contains all the sub_networks with the same network id selected

      description_device_name : description_device_name,
      description_device_eui : description_device_eui,
      description_device_description : description_device_description,
      description_device_reference_altitude : description_device_reference_altitude,
      description_skip_frame_counter : description_skip_frame_counter,
      description_device_network : description_device_network,
      description_device_sub_network : description_device_sub_network,
      description_vessel_device : description_vessel_device,
      description_device_device_profile : description_device_device_profile,
    };
  },
  watch: {
    network_name_form: function(){
      this.sub_network_names =[];
      this.sub_network_name_form ='';
      this.network_id=functions.extract_id_id_name(this.network_name_form); //extract id of network
      for(let i = 0; i < this.sub_networks_lora.length; i++){
        if(this.sub_networks_lora[i].network_id == this.network_id){
          this.sub_network_names.push(this.sub_networks_lora[i].sub_network_id.concat(":",this.sub_networks_lora[i].sub_network_name));
        }
      }
      if(this.sub_network_names.length == 0){
        //This will route the user to the create sub-network page if no sub-networks exists under selected network 
        if(confirm('There are no associated Sub-Networks under selected Network. Route to the Create Sub-Network Page?') == true){
          this.$router.push(`/subnetwork/create`)
        };
      }
      for(let i =0; i< this.device_profiles.length; i++){ //Filter the device profile based on the selected network
        if(this.network_id == this.device_profiles[i].network_id){
          this.device_profile_names.push(this.device_profiles[i].device_profile_id +":"+ this.device_profiles[i].device_profile_name);
        }
      }
      if(this.device_profile_names.length == 0){
        //This will route the user to the create device profile page if no device profile is associated with the selected network 
        if(confirm('There are no associated Device Profiles with the selected Network. Route to the Create Device Profile Page?') == true){
          this.$router.push(`/device_profile/create`)
        };
      }
    },
    sub_network_name_form: function(){
      this.device_profile_names =[];
      this.vessel_names =[];
      this.device_profile_name_form ='';
      this.vessel_name_form ='';
      this.vessel_id = '';
      this.devices_same_sub_network =[];
      if(this.sub_network_name_form){ //to ensure that this only runs when we select a value for the subnetwork and not switch networks
        this.sub_network_id=functions.extract_id_new(this.sub_network_name_form); //extract id of sub_network
        for(let i =0; i<this.devices.length; i++){
          if(this.sub_network_id == this.devices[i].sub_network_id){
            this.devices_same_sub_network.push(this.devices[i]);
          }
        }
      }
      for(let i =0; i< this.vessels.length; i++){ //Filter the vessels based on the selected sub network
        if(this.sub_network_id == this.vessels[i].sub_network_id){
          this.vessel_names.push(this.vessels[i].vessel_id +":"+ this.vessels[i].vessel_name);
        }
      }
      if(this.vessel_names.length == 0){
        //This will route the user to the create vessel page if no vessel is associated with the selected sub-network 
        if(confirm('There are no associated Vessels with the selected Sub-Network. Route to the Create Vessel Page?') == true){
          this.$router.push(`/vessel/create`)
        };
      }
    }
  },
  created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("devices", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //----------------------Start------------------
        //Get Devices
        AuthenticationService.get_devices().then(result => {
          this.devices = result.data.devices_lora;
          this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
        }).catch(err => {
          //Error getting the devices from the server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
        })
        //Get Networks
        AuthenticationService.get_networks().then(result => {
          let networks_lora = result.data.networks_lora;
          for(let i = 0; i < networks_lora.length; i++){
            this.network_names.push(networks_lora[i].network_id.concat(":",networks_lora[i].network_name));
          }
          if(this.network_names.length == 0){
            //This will route the user to the create network page if no networks exists 
            if(confirm('There are no created Networks. Route to the Create Network Page?') == true){
              this.$router.push(`/network/create`)
            };
          }
        }).catch(err => {
          //Error getting networks from server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})
        })
        //Get Subnetworks
        AuthenticationService.get_sub_networks().then(result => {
          this.sub_networks_lora = result.data.sub_networks_lora;
        }).catch(err => {
          //Error getting sub-networks from server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
        })
        //Get Device Profiles
        AuthenticationService.get_device_profiles().then(result => { //Fetch Device Profiles
          this.device_profiles = result.data.device_profiles_lora;
        }).catch(err=> {
          //Error requesting device profiles from server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
        })
        //Get Vessels
        AuthenticationService.get_vessels(null, 0).then(result => { //Fetch Vessels
          this.vessels = result.data.vessels_db; 
        }).catch(err => {
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
    create_device(){
      this.$v.$touch();
      if(this.$v.device_name.$invalid || this.$v.device_eui.$invalid || this.$v.device_description.$invalid 
      || this.$v.sub_network_name_form.$invalid || this.$v.device_profile_name_form.$invalid || this.$v.reference_altitude.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        if(this.skip_frame_counter =="")this.skip_frame_counter =false; //needed to set empty radio to false
        this.message = "";
        this.device_profile_id=functions.extract_id_name_id(this.device_profile_name_form);//Extract id of device profile
        if(this.vessel_name_form){
          this.vessel_id=functions.extract_id_id_name(this.vessel_name_form)
        }
        this.device_profile_id=functions.extract_id_id_name(this.device_profile_name_form);//Extract id of device profile
        for(let i = 0; i < this.device_profiles.length; i++){
          if(this.device_profiles[i].device_profile_id == this.device_profile_id){
            this.device_profile_id = this.device_profiles[i].device_profile_id_lora;
            break;
          }
        }
        AuthenticationService.create_devices({
          device_name: this.device_name,
          device_eui: this.device_eui,
          device_description: this.device_description,
          sub_network_id: this.sub_network_id,
          vessel_id: this.vessel_id,
          device_profile_id_lora: this.device_profile_id,
          reference_altitude: this.reference_altitude,
          skip_frame_counter: this.skip_frame_counter,
        }).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
          this.$router.push(`/device`);
        }).catch(err => {
          //Error trying to create device
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


