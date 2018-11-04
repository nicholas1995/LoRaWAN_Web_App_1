<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Create Device</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--Device Name -->
            <v-flex >
              <v-text-field
                v-model="device_name"
                label="Device Name"
                :error-messages = "device_name_Errors"
                @keyup="$v.device_name.$touch()" 
              ></v-text-field>
              </v-flex>
            <!--Description  -->
            <v-flex >
              <v-textarea
                auto-grow
                rows="1"
                v-model="description"
                label="Description"
                :error-messages = "description_Errors"
                @keyup="$v.description.$touch()" 
              ></v-textarea>
              </v-flex>
            <!--Device Profile Name-->
              <v-select
                v-model="device_profile_name_form"
                :items="this.device_profile_names"
                label="Device Profile"
                :error-messages = "device_profile_name_form_Errors"
                @blur="$v.device_profile_name_form.$touch()" 
              ></v-select>
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
                @click.stop="$emit('device_management_no_change')">
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

const alpha_num_dash = helpers.regex('alpha_num_dash', /^[a-zA-Z0-9\-\_]*$/);


export default {
  mixins: [validationMixin],
  validations: {
    device_name: {
      alpha_num_dash,
      required,
      u: unique_device_name,
      maxLength: maxLength(80),
    },         
    description: {
      required,
      maxLength: maxLength(200),
    },         
    device_profile_name_form: {
      required,
    }
  },
  computed: {
    device_name_Errors(){
      const errors=[];
      if (!this.$v.device_name.$error)return errors
      !this.$v.device_name.u && errors.push('Device name must be unique')
      !this.$v.device_name.alpha_num_dash && errors.push('Device name must only contain letters, numbers and dashes')
      !this.$v.device_name.maxLength && errors.push('Device name must be 20 characters or longer')
      !this.$v.device_name.required && errors.push('Device name is required.')
      return errors;
    }, 
    description_Errors(){
      const errors=[];
      if (!this.$v.description.$error)return errors
      !this.$v.description.maxLength && errors.push('Description must be 200 characters or less')
      !this.$v.description.required && errors.push('Description is required.')
      return errors;
    },
    device_profile_name_form_Errors(){
      const errors=[];
      if (!this.$v.device_profile_name_form.$error)return errors
      !this.$v.device_profile_name_form.required && errors.push('Device Profile is required.')
      return errors;
    }
  },
  data() {
    return {
      device_name: '',
      description: '',
      device_profile_name_form: '', //this is the variable that holds the selected device profile 'id:name'
      skip_frame_counter: "",
      device_profile_id: '', //this is the device profile id of the selected device profile
      device_profile_names: [], //this is the variable that holds all the names to display on the form for the device profiles name:id
      message: '',
      devices_same_sub_network: []//this is an array that contains all the sub_networks with the same network id selected
    };
  },
  props:[
   'devices_prop',
   'device_update'
  ],
  created: function () {
    this.device_name = this.device_update.device_name;
    this.description = this.device_update.description;
    this.device_profile_name_form = this.device_update.device_profile_name.concat(":",this.device_update.device_profile_id);
    for(let i =0; i<this.devices_prop.length; i++){ //get the devices under the same sub_network
      if(this.device_update.sub_network_id == this.devices_prop[i].sub_network_id){
        this.devices_same_sub_network.push(this.devices_prop[i]);
      }
    }
    AuthenticationService.get_device_profiles(this.device_update.sub_network_id).then(result => {
      let device_profiles = JSON.parse(result.data.device_profiles);
      for(let i = 0; i < device_profiles.length; i++){
        this.device_profile_names.push(device_profiles[i].device_profile_name.concat(":",device_profiles[i].device_profile_id));
      }
    }).catch(err => {
      //Error getting networks from server
    })
  },
  methods: {
    update_device(){
      this.$v.$touch();
      if(this.$v.device_name.$invalid || this.$v.description.$invalid || this.$v.device_profile_name_form.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        if(this.skip_frame_counter =="")this.skip_frame_counter =false; //needed to set empty radio to false
        this.message = "";
        this.device_profile_id=functions.extract_id_name_id(this.device_profile_name_form);//Extract id of device profile
        AuthenticationService.update_devices({
          device_name: this.device_name,
          device_eui: this.device_update.device_eui,
          description: this.description,
          sub_network_id: this.device_update.sub_network_id,
          device_profile_id: this.device_profile_id,
          skip_frame_counter: this.skip_frame_counter,
        }, this.device_update.device_eui).then(result => {
          let data = JSON.parse(result.data.devices_lora);
          this.$emit('device_management', data);
        }).catch(err => {
          console.log(err);
          //Error trying to create subnetwork
        })
      } 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


