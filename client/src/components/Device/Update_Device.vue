<template>
  <v-content v-if="this.access == 1">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="primary">
              <v-toolbar-title>Update Device</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
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
            <!--Vessel-->
            <v-select
              v-model="vessel_name_form"
              :items="this.vessel_names"
              label="Vessel"
              clearable
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
            <!--Reference Altitude-->
              <v-flex >
                <v-text-field
                  v-model="reference_altitude"
                  label="Reference Altitude*"
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
                @click.stop="update_device()">
                Update Device
              </v-btn>
              <v-btn class="grey lighten-2"
                @click.stop="$router.push(`/device`)">
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
import { required, maxLength, minLength, numeric, helpers } from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"
import {description_device_name, description_device_description, description_vessel_device, description_device_device_profile,
 description_device_reference_altitude, description_skip_frame_counter} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";


const unique_device_name= function(value){
  let x = 1; //0 fail, 1 pass
  if(this.sub_network_name_form ==""){
  }else{
    for(let i=0; i< this.devices_same_sub_network.length; i++){
        if(value ==this.devices_same_sub_network[i].device_name){
          if(value ==this.device_update.device_name){
          }else{
            x = 0;
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
    device_description: {
      required,
      maxLength: maxLength(200),
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
      !this.$v.device_name.u && errors.push('Device name must be unique')
      !this.$v.device_name.alpha_num_dash && errors.push('Device name must only contain letters, numbers and dashes')
      !this.$v.device_name.maxLength && errors.push('Device name must be 80 characters or less')
      !this.$v.device_name.required && errors.push('Device name is required.')
      return errors;
    }, 
    device_description_Errors(){
      const errors=[];
      if (!this.$v.device_description.$error)return errors
      !this.$v.device_description.maxLength && errors.push('Description must be 200 characters or less')
      !this.$v.device_description.required && errors.push('Description is required.')
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
      device_update: '',
      device_name: '',
      device_description: '',
      vessel_name_form: '', //this is the variable that holds the selected vessel 'id:name'
      device_profile_name_form: '', //this is the variable that holds the selected device profile 'id:name'
      skip_frame_counter: "",
      reference_altitude: '',

      device_profiles: '',
      device_profile_id: '', //this is the device profile id of the selected device profile
      vessel_id: '', //this is the variable that holds the id of the selected vessel
      device_profile_names: [], //this is the variable that holds all the names to display on the form for the device profiles name:id
      vessel_names: [],
      message: '',
      devices_same_sub_network: [],//this is an array that contains all the devices with the same sub_networks id selected

      description_device_name : description_device_name,
      description_device_description : description_device_description,
      description_vessel_device : description_vessel_device,
      description_device_device_profile : description_device_device_profile,
      description_device_reference_altitude : description_device_reference_altitude,
      description_skip_frame_counter : description_skip_frame_counter,
    };
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
        await AuthenticationService.get_devices().then(result => {
          this.devices = result.data.devices_lora;
          this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
        }).catch(err => {
          //Error getting the devices from the server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
        })
        for(let i = 0; i < this.devices.length; i++){
          if(this.devices[i].device_id == this.$route.params.device_id){
            this.device_update = this.devices[i];
            break;
          }
        }
        let device;
        //Fetch all the vessels associated with the subnetwork the deivce was assigned to when created
        //Create the id name pairs for these vessels
        //Look for the vessel that that device is currently assigned to if any and assign the id name pair to the form
        await AuthenticationService.get_vessels(this.device_update.sub_network_id, 0).then(result =>{
            let vessels = result.data.vessels_db;
            for(let i =0; i< vessels.length; i++){
              this.vessel_names.push(vessels[i].vessel_id +":"+vessels[i].vessel_name);
              if(vessels[i].vessel_id == this.device_update.vessel_id){
                this.vessel_name_form = this.vessel_names[i] ;
              }
            }
            if(this.vessel_names.length == 0){
              //This will route the user to the create vessel page if no vessel is associated with the selected sub-network 
              if(confirm('There are no associated Vessels with the selected Sub-Network. Route to the Create Vessel Page?') == true){
                this.$router.push(`/vessel/create`)
              };
            }
          }).catch(err => {
            //Error getting network to be updated information
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
          });
        await AuthenticationService.get_device(this.device_update.device_eui).then(result =>{
            device = result.data.device;
            this.device_name = device.device_name;
            this.device_description = device.device_description;
            this.reference_altitude = device.reference_altitude;
            this.skip_frame_counter = device.skip_frame_counter
          }).catch(err => {
            //Error getting network to be updated information
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
          });
        this.device_profile_name_form = this.device_update.device_profile_name.concat(":",this.device_update.device_profile_id);
        for(let i =0; i<this.devices.length; i++){ //get the devices under the same sub_network
          if(this.device_update.sub_network_id == this.devices[i].sub_network_id){
            this.devices_same_sub_network.push(this.devices[i]);
          }
        }
        await AuthenticationService.get_device_profiles_specified_sub_network(this.device_update.sub_network_id).then(result => {
          this.device_profiles = result.data.device_profiles_lora;
          let j = 0;
          for(let i = 0; i < this.device_profiles.length; i++){
            this.device_profile_names.push(this.device_profiles[i].device_profile_id + ":" + this.device_profiles[i].device_profile_name);
            if(this.device_update.device_profile_id_lora == this.device_profiles[i].device_profile_id_lora){
              this.device_profile_name_form = this.device_profile_names[j];
            }
            j = j + 1;
          }
        }).catch(err => {
          //Error getting networks from server
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
    update_device(){
      this.$v.$touch();
      if(this.$v.device_name.$invalid || this.$v.device_description.$invalid 
      || this.$v.device_profile_name_form.$invalid || this.$v.reference_altitude.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        if(this.skip_frame_counter =="")this.skip_frame_counter =false; //needed to set empty radio to false
        this.message = "";

        this.device_profile_id=functions.extract_id_id_name(this.device_profile_name_form);//Extract id of device profile
        for(let i = 0; i < this.device_profiles.length; i++){
          if(this.device_profiles[i].device_profile_id == this.device_profile_id){
            this.device_profile_id = this.device_profiles[i].device_profile_id_lora;
            break;
          }
        }

        if(this.vessel_name_form)this.vessel_id=functions.extract_id_id_name(this.vessel_name_form);//Extract id of the selected vessel
        AuthenticationService.update_devices({
          device_id: this.device_update.device_id,
          device_name: this.device_name,
          device_eui: this.device_update.device_eui,
          device_description: this.device_description,
          sub_network_id: this.device_update.sub_network_id,
          vessel_id: this.vessel_id,
          device_profile_id_lora: this.device_profile_id,
          reference_altitude: this.reference_altitude,
          skip_frame_counter: this.skip_frame_counter,
        }, this.device_update.device_eui).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
          this.$router.push(`/device`)
        }).catch(err => {
          //Error trying to update device
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


