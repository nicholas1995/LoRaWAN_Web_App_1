<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Update Sub-Network</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--Sub-Network Name -->
            <v-flex >
              <v-text-field
                v-model="sub_network_name"
                label= 'Sub-Network Name'
                :hint="'Current Name: '+this.sub_network_update.sub_network_name"
                :error-messages = "sub_network_name_Errors"
                @keyup="$v.sub_network_name.$touch() && $v.u.$touch()" 
              ></v-text-field>
              </v-flex>
            <!--Description  -->
            <v-flex >
              <v-text-field
                v-model="description"
                label= 'Description'
                :hint="'Current Description: '+this.sub_network_update.description"
                :error-messages = "description_Errors"
                @keyup="$v.description.$touch()" 
              ></v-text-field>
              </v-flex>
             <!--Network Name-->
              <v-select
                v-model="network_name_form"
                :items="this.network_names"
                label="Network Name"
                :error-messages = "network_name_form_Errors"
                @blur="$v.network_name_form.$touch()" 
              ></v-select>
            <!--Service Profile Name-->
              <v-select
                v-model="service_profile_form"
                :items="this.service_profile_names"
                label= "Service Profile"
                :error-messages = "service_profile_form_Errors"
                @blur="$v.service_profile_form.$touch()" 
              ></v-select>
            <!-- Message -->
              <div div class="text">
                {{message}}
              </div>
            <!-- Buttons -->
              <v-btn class="grey lighten-2"
                @click.stop="update_sub_network()">
                Update Sub-Network
              </v-btn>
             <v-btn class="grey lighten-2"
                @click.stop="$emit('sub_network_management_no_change')">
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
import { required, maxLength } from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"


const unique= function(value){
  let x = 1; //0 fail, 1 pass
  if(this.network_name_form ==""){

  }else{
    for(let i=0; i< this.sub_networks_same_network.length; i++){
        if(value ==this.sub_networks_same_network[i].sub_network_name){
          if(value == this.sub_network_update.sub_network_name){

          }else{
            x= 0;
          }
        
      }
    } 

  }
    return x; 

}


export default {
  mixins: [validationMixin],
  validations: {
    sub_network_name: {
      required,
      u: unique,
      maxLength: maxLength(80),
    },      
    description: {
      required,
      maxLength: maxLength(200),
    },    
    network_name_form: {
      required,
    },      
    service_profile_form: {
      required,
    }
  },
  computed: {
    sub_network_name_Errors(){
      const errors=[];
      if (!this.$v.sub_network_name.$error)return errors
      !this.$v.sub_network_name.u && errors.push('Sub-Network name must be unique')
      !this.$v.sub_network_name.maxLength && errors.push('Sub-Network name must be 20 characters or longer')
      !this.$v.sub_network_name.required && errors.push('Sub-Network name is required.')
      return errors;
    },
    description_Errors(){
      const errors=[];
      if (!this.$v.description.$error)return errors
      !this.$v.description.maxLength && errors.push('Description must be 60 characters or longer')
      return errors;
    },
    network_name_form_Errors(){
      const errors=[];
      if (!this.$v.network_name_form.$error)return errors
      !this.$v.network_name_form.required && errors.push('Network is required.')
      return errors;
    },
    service_profile_form_Errors(){
      const errors=[];
      if (!this.$v.service_profile_form.$error)return errors
      !this.$v.service_profile_form.required && errors.push('Service Profile is required.')
      return errors;
    }
  },
  data() {
    return {
      sub_network_name: "",
      description: "",
      service_profile_form: "",
      message: "",
      service_profile_names: [],
      sub_network_update_data: {},
      network_names: [],
      network_name_form: "",
      sub_networks_same_network: [],
      network_id: '', //this is the variable that holds the id of the selected network
      check: 1 //this will be used to be sure that the service profile is only set to the default value once 
    };
  },
  props:[
   'sub_networks',
   'sub_network_update'
  ],
  watch: {
    network_name_form: function(){
      this.service_profile_names =[];
      this.service_profile_form =[];
      if (this.check ==1){
        this.service_profile_form = this.sub_network_update.service_profile_name.concat("-",this.sub_network_update.service_profile_id);
      }
      this.check = 0;
      this.network_id=functions.extract_id(this.network_name_form); //extract id of network
      for(let i =0; i<this.sub_networks.length; i++){
        if(this.network_id == this.sub_networks[i].network_id){
          this.sub_networks_same_network.push(this.sub_networks[i]);
        }
      }
      AuthenticationService.get_service_profile(this.network_id).then(result => {
        for(let i =0; i< result.data.service_profiles.length; i++){
          this.service_profile_names.push(result.data.service_profiles[i].service_profile_name.concat("-",result.data.service_profiles[i].service_profile_id));
        }
      }).catch(err=> {
        //Error requesting service profiles from server
      })
    }
  },
  created: function () {
    this.sub_network_update_data = this.sub_network_update;
    AuthenticationService.get_networks().then(result => {
      for(let i = 0; i < result.data.networks_lora.length; i++){
        this.network_names.push(result.data.networks_lora[i].id.concat("-",result.data.networks_lora[i].name));
        if(this.sub_network_update.network_id == result.data.networks_lora[i].id){
          this.network_name_form = this.network_names[i];
        }
      }

    }).catch(err => {
      //Error getting networks from server
    })
    this.sub_network_name = this.sub_network_update.sub_network_name;
    this.description = this.sub_network_update.description;
  },
  methods: {
    update_sub_network() {
      this.$v.$touch();
      if(this.$v.sub_network_name.$invalid || this.$v.description.$invalid || this.$v.network_name_form.$invalid || this.$v.service_profile_form.$invalid  ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        this.service_profile_id=functions.extract_id_service_profile(this.service_profile_form);//Extract id of service profile
        AuthenticationService.update_sub_networks({
          sub_network_name: this.sub_network_name,
          description: this.description,
          network_id: this.network_id,
          service_profile_id: this.service_profile_id,
        }, this.sub_network_update.sub_network_id).then(result => {
          let data = result.data.data;
          data = JSON.parse(data);
          this.$emit('sub_network_management', data);
        }).catch(err => {
          //Error updating sub-network
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
