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
            <!--Service Profile Name-->
              <v-combobox
                v-model="service_profile_form"
                :placeholder ="'Current SP: '+this.sub_network_update.service_profile_id"
                :items="service_profile_names"
                label= 'Service Profile'
              ></v-combobox>
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
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"


const unique= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.sub_networks.length; i++){
    if(value ==this.sub_networks[i].sub_network_name){
      if(value == this.sub_network_update.sub_network_name){
        return x;
      }else return 0;
    }
  } 
  return x; 
}


export default {
  mixins: [validationMixin],
  validations: {
    sub_network_name: {
      u: unique,
      maxLength: maxLength(20),
      minLength: minLength(2)
    },      
    description: {
      maxLength: maxLength(60),
      minLength: minLength(2)
    }
  },
  computed: {
    sub_network_name_Errors(){
      const errors=[];
      if (!this.$v.sub_network_name.$error)return errors
      !this.$v.sub_network_name.u && errors.push('Sub-Network name must be unique')
      !this.$v.sub_network_name.maxLength && errors.push('Sub-Network name must be 20 characters or longer')
      !this.$v.sub_network_name.minLength && errors.push('Sub-Network name must be 2 characters or longer.')
      return errors;
    },
    description_Errors(){
      const errors=[];
      if (!this.$v.description.$error)return errors
      !this.$v.description.maxLength && errors.push('Description must be 60 characters or longer')
      !this.$v.description.minLength && errors.push('Description must be 2 characters or longer.')
      return errors;
    }
  },
  data() {
    return {
      sub_network_name: "",
      description: "",
      service_profile_form: "",
      message: "",
      service_profile_names: []
    };
  },
  props:[
   'sub_networks',
   'sub_network_update'
  ],
  created: function () {
    AuthenticationService.get_service_profile(this.sub_network_update.network_id).then(result => {
      for(let i =0; i< result.data.service_profiles.length; i++){
          this.service_profile_names.push(result.data.service_profiles[i].serviceProfileID.concat("-",result.data.service_profiles[i].name));
        }
      }).catch(err=> {
        //Error requesting service profiles from server
      })
  },
  methods: {
    update_sub_network() {
      if(this.$v.sub_network_name.$invalid || this.$v.description.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        if(this.sub_network_name == ""){
          this.sub_network_name = this.sub_network_update.sub_network_name;
        }
        if(this.description == ""){
          this.description = this.sub_network_update.description;
        }
        if(this.service_profile_form == ""){
          this.service_profile_id = this.sub_network_update.service_profile_id;
        }
        else{
          this.service_profile_id=functions.extract_id(this.service_profile_form);
        }
        this.message = "";
        AuthenticationService.update_sub_networks({
          sub_network_name: this.sub_network_name,
          description: this.description,
          network_id: this.sub_network_update.network_id,
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
