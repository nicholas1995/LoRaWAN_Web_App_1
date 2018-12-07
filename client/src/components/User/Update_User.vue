<template>
  <v-content v-if="this.$store.state.user_class == 'Software Admin'">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>UPDATE USER</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--First Name -->
            <v-flex >
              <v-text-field
                v-model="first_name"
                label="First Name*"
                :error-messages = "first_name_errors"
                @keyup="$v.first_name.$touch()" 
              ></v-text-field>
              </v-flex>
            <!--Last Name-->
              <v-text-field
                v-model="last_name"
                label="Last Name*"
                :error-messages = "last_name_errors"
                @keyup="$v.last_name.$touch()" 
              ></v-text-field>
            <!--Address-->
              <v-text-field
                v-model="address"
                label="Address*"
                :error-messages = "address_errors"
                @keyup="$v.address.$touch()" 
              ></v-text-field>
            <!--Home Phone-->
              <v-text-field
                mask='phone'
                v-model="home_phone"
                label="Home Phone*"
                :error-messages = "home_phone_errors"
                @keyup="$v.home_phone.$touch()" 
              ></v-text-field>
            <!--Mobile Phone-->
              <v-text-field
                mask='phone'
                v-model="mobile_phone"
                label="Mobile Phone*"
                :error-messages = "mobile_phone_errors"
                @keyup="$v.mobile_phone.$touch()" 
              ></v-text-field>
            <!--User Class-->
              <v-select
                :items="user_class"
                v-model="user_class_selected"
                label="User Class"
                :error-messages = "user_class_selected_errors"
                @keyup="$v.user_class_selected.$touch()" 
              ></v-select>
              <!--Network-->
                <v-select
                  :items="network_names"
                  v-model="network_name_form"
                  label="Network"
                ></v-select>
                <!--Sub-Network-->
                <v-select
                  :items="sub_network_names"
                  v-model="sub_network_name_form"
                  label="Sub-Network"
                ></v-select>
                <!--Vessel-->
                <v-combobox
                v-model="vessel_name_form"
                :items="vessel_names"
                label="Vessel"
                multiple
                clearable
                chips
                ></v-combobox>
              <div div class="text">
                {{message}}
              </div>
              <v-btn class="grey lighten-2"
                @click="update_user"
              >
                Update User
              </v-btn>
              <v-btn class="grey lighten-2"
                @click.stop="$emit('user_management_no_change')">
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
import { required, maxLength, minLength, helpers, requiredIf} from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"

const unique= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.users_prop.length; i++){
    if(value ==this.users_prop[i].email){
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
      address: {
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
      user_class_selected: {
        required
      },         
      device_name_form: {
        required: required_devices
      }
    },
  data() {
    return {
      first_name: "",
      last_name: "",
      address: "",
      home_phone: "",
      mobile_phone: "",
      user_class_selected: "",
      user_class: ['IoT Network Admin', 'Software Admin', 'Analyst', 'Fisher'],

      networks: [], //A list of all the networks on the lora app server
      sub_networks: [], //A list of all the sub-networks on the lora app server
      vessels: [],  //A list of all the vessels not deleted in the database

      network_names: [],
      sub_network_names: [],
      vessel_names: [],
      devices_db: [],

      network_name_form: '',
      sub_network_name_form: '',
      vessel_name_form: [],

      network_id: '',
      sub_network_id: '',
      vessel_ids: [],

      user_vessels: [], //Array that holds the devices already associated with the user account to be editied

      message: "",
    };
  },
  props:[
   'user_update'
  ],
  created: async function () {
    this.first_name = this.user_update.first_name;
    this.last_name = this.user_update.last_name;
    this.address = this.user_update.address;
    this.home_phone = this.user_update.home_phone;
    this.mobile_phone = this.user_update.mobile_phone;
    this.user_class_selected = this.user_update.user_class;
    try{
      await this.fetch_networks_sub_networks_vessels();
        this.user_vessels =await AuthenticationService.get_user_vessels(this.user_update.id)
          .catch(err => {
            //Error getting devices associated with user account
            console.log(err);
          });
        this.user_vessels = JSON.parse(this.user_vessels.data.user_vessels);
        for(let i = 0; i< this.user_vessels.length; i++){ 
          for(let j =0; j< this.vessels.length; j++){
            if(this.user_vessels[i].vessel_id == this.vessels[j].id){
              this.vessel_name_form.push(`${this.vessels[j].id}`.concat(":",this.vessels[j].name));
            }
          }
        }
    }catch(err){
      console.log(err)
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
          this.vessel_names.push(`${this.vessels[i].id}`.concat(":",this.vessels[i].name));
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
      address_errors(){
      const errors=[];
      if (!this.$v.address.$error)return errors
      !this.$v.address.required && errors.push('Address is required.')
      !this.$v.address.maxLength && errors.push('Address must be 32 characters or less.')
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
      user_class_selected_errors(){
      const errors=[];
      if (!this.$v.user_class_selected.$error)return errors
      !this.$v.user_class_selected.required && errors.push('User class required.')
      return errors;
    },
      device_name_form_errors(){
      const errors=[];
      if (!this.$v.device_name_form.$error)return errors
      !this.$v.device_name_form.required && errors.push('Device required. One or multiple.')
      return errors;
    }
  },
  methods: {
    async update_user() {
      this.$v.$touch();
      if(this.$v.first_name.$invalid || this.$v.last_name.$invalid || this.$v.address.$invalid || this.$v.home_phone.$invalid
      || this.$v.mobile_phone.$invalid || this.$v.user_class_selected.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
/*         if(this.user_class_selected =='Fisher'){
          for(let i = 0; i < this.device_name_form.length; i++){
            let sub_network_id_device = functions.extract_id_id_name(this.device_name_form[i]);
            let device_name_device = functions.extract_name_id_name(this.device_name_form[i]);
            for(let j =0; j< this.devices.length; j++){
              if(this.devices[j].sub_network_id == sub_network_id_device){
                if(this.devices[j].device_name == device_name_device){
                  this.device_euis_selected.push(this.devices[j].device_eui)
                }
              }
            }
          }
        } */
        for(let i = 0; i < this.vessel_name_form.length; i++){
          this.vessel_ids.push(functions.extract_id_id_name(this.vessel_name_form[i]));
        }
        let vessels_updated = this.compare_user_vessels(this.vessel_ids, this.user_vessels);
        AuthenticationService.update_users({
          first_name: this.first_name,
          last_name: this.last_name,
          address: this.address,
          home_phone: this.home_phone,
          mobile_phone: this.mobile_phone,
          id: this.user_update.id,
          email: this.user_update.email,
          user_class: this.user_class_selected,
          vessels: vessels_updated,
        }).then(result => {
          let data = JSON.parse(result.data.users);
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$emit('user_management', {data: data}); //passing the revecived array of networks to the parent component [Network] 
        }).catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})    
        })  
        this.device_euis_selected = [];
      }
    },
    async fetch_networks_sub_networks_vessels(){
        await AuthenticationService.get_networks().then(result => {
          this.networks = JSON.parse(result.data.networks_lora);
          for(let i = 0; i < this.networks.length; i++){
            this.network_names.push(this.networks[i].network_id.concat(":",this.networks[i].network_name));
          }
        }).catch(err => {
          //Error getting networks from server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})
        })
        await AuthenticationService.get_sub_networks().then(result => {
          this.sub_networks = JSON.parse(result.data.sub_networks_lora);
        }).catch(err => {
          //Error getting sub-networks from server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
        })
        await AuthenticationService.get_vessels(null).then(result => {
          this.vessels = JSON.parse(result.data.vessels_db);
        }).catch(err => {
          //Error getting the vessels from the server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
        })
    },
    compare_user_vessels(updated, existing){ //updated is the ones in the form, existing is what is currently in the database
      let accounted_for =[];
      let added = [];
      let deleted = [];
      try{
        for(let i=0; i<updated.length; i++){
          if(existing.length ==0){
            added.push(updated[i]);
          }
          for(let j =0; j<existing.length; j++){
            if(updated[i]==existing[j].vessel_id){
              accounted_for.push(j);
              break;
            } 
            else if(j ==(existing.length-1)){
              added.push(updated[i]);
            }else if(updated[i].sub_network_id!=existing[j].id){
              //
            }
          }
        }
        for(let l=0; l<existing.length; l++){
            let index = accounted_for.indexOf(l);
            if(index ==-1){
              deleted.push(existing[l].vessel_id)
            }
        }
        return{added : added, deleted : deleted}
      } catch (err) {
          throw error.error_message("compare", err.message);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
