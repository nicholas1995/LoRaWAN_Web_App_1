<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Create Sub-Network</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--Sub-Network Name -->
            <v-flex >
              <v-text-field
                v-model="sub_network_name"
                label="Sub-Network Name"
                :error-messages = "sub_network_name_Errors"
                @keyup="$v.sub_network_name.$touch() && $v.u.$touch()" 
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
                label="Service Profile Name"
                :error-messages = "service_profile_form_Errors"
                @blur="$v.service_profile_form.$touch()" 
              ></v-select>
              <!-- Message -->
              <div div class="text">
                {{message}}
              </div>
              <!-- Buttons -->
              <v-btn class="grey lighten-2"
                @click.stop="create_sub_network()">
                Create Sub-Network
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
import { required, maxLength, helpers } from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"


const unique= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  //console.log(this.network_name_form);
  if(this.network_name_form ==""){
  }else{
    for(i=0; i< this.sub_networks_same_network.length; i++){
        if(value ==this.sub_networks_same_network[i].sub_network_name){
        x= 0;
      }
    } 

  }
    return x; 
}
const alpha_num_dash = helpers.regex('alpha_num_dash', /^[a-zA-Z0-9\-\_]*$/);

export default {
  mixins: [validationMixin],
  validations: {
    sub_network_name: {
      alpha_num_dash,
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
      !this.$v.sub_network_name.alpha_num_dash && errors.push('Name must only contain letters, numbers and dashes.')
      !this.$v.sub_network_name.maxLength && errors.push('Sub-Network name must be 20 characters or longer.')
      !this.$v.sub_network_name.required && errors.push('Sub-Network name is required.')
      return errors;
    },
    description_Errors(){
      const errors=[];
      if (!this.$v.description.$error)return errors
      !this.$v.description.maxLength && errors.push('Description must be 200 characters or longer')
      !this.$v.description.required && errors.push('Description is required.')
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
      sub_network_name: '',
      description: '',
      network_name_form: '', //this is the variable that holds the selected network 'id-name'
      service_profile_form: '', //this is the variable that holds the selected service profile 'id-name'
      network_id: '', //this is the variable that holds the id of the selected network
      service_profile_id: '', //this is the service profile id of the selected service profile
      service_profile_names: [], //this is the variable that holds all the names to display on the form for the service profiles 
      message: '',
      sub_networks: [],
      network_names: [],
      sub_networks_same_network: []//this is an array that contains all the sub_networks with the same network id selected
    };
  },
  props:[
   'sub_network_prop'
  ],
  watch: {
    network_name_form: function(){
        this.service_profile_names =[];
        this.service_profile_form =[];
        this.sub_networks_same_network =[];
        this.network_id=functions.extract_id_id_name(this.network_name_form); //extract id of network
        for(let i =0; i<this.sub_network_prop.length; i++){
          if(this.network_id == this.sub_network_prop[i].network_id){
            this.sub_networks_same_network.push(this.sub_network_prop[i]);
          }
        }
        AuthenticationService.get_service_profile(this.network_id).then(result => {
          let service_profiles = JSON.parse(result.data.service_profiles);
          for(let i =0; i< service_profiles.length; i++){
            this.service_profile_names.push(service_profiles[i].service_profile_name.concat(":",service_profiles[i].service_profile_id));
          }
        }).catch(err=> {
          console.log(err);
          //Error requesting service profiles from server
        })
      }
  },
  created: function () {
    AuthenticationService.get_networks().then(result => {
      let networks_lora = JSON.parse(result.data.networks_lora);
      for(let i = 0; i < networks_lora.length; i++){
        this.network_names.push(networks_lora[i].network_id.concat(":",networks_lora[i].network_name));
      }
    }).catch(err => {
      //Error getting networks from server
      console.log(err);
    })
  },
  methods: {
    create_sub_network(){
      this.$v.$touch();
      if(this.$v.sub_network_name.$invalid || this.$v.description.$invalid || this.$v.network_name_form.$invalid || this.$v.service_profile_form.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        this.service_profile_id=functions.extract_id_name_id(this.service_profile_form);//Extract id of service profile
        AuthenticationService.create_sub_networks({
          sub_network_name: this.sub_network_name,
          description: this.description,
          network_id: this.network_id,
          service_profile_id: this.service_profile_id
        }).then(result => {
          let data = JSON.parse(result.data.sub_networks_lora);
          this.$emit('sub_network_management', data);
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


