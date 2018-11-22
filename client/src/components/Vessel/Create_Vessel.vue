<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Create Vessel</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <v-form>
              <!--$touch is used to manually set dirty when the event occurs
              and dirty is used to validate the data field--> 
            <!--vessel Name -->
              <v-flex >
                <v-text-field
                  v-model="name"
                  :error-messages = "name_errors"
                  label="Vessel Name*"
                  @keyup="$v.name.$touch()">
                </v-text-field>
              </v-flex>
            <!--Network Name-->
              <v-select
                v-model="network_name_form"
                :items="this.network_names"
                label="Network*"
                :error-messages = "network_name_form_Errors"
                @blur="$v.network_name_form.$touch()" 
              >
              </v-select>
            <!--Sub-Network Name-->
              <v-select
                v-model="sub_network_name_form"
                :items="this.sub_network_names"
                label="Sub-Network*"
                :error-messages = "sub_network_name_form_Errors"
                @blur="$v.sub_network_name_form.$touch()" 
              >
              </v-select>
              </v-form>
              <div div class="text">
                {{message}} 
              </div>
              <v-btn class="grey lighten-2"
                @click.stop="create_vessel()">
                Create vessel
              </v-btn>
              <v-btn class="grey lighten-2"
                @click.stop="$emit('vessel_management_no_change')">
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
import functions from "../../services/functions/forms_functions.js"
import { validationMixin } from 'vuelidate'
import { required, maxLength, helpers } from 'vuelidate/lib/validators'


const unique= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.vessels_prop.length; i++){
    if(value ==this.vessels_prop[i].name){
      return 0;
    }
  } 
  return x; 
}
const alpha_num_dash = helpers.regex('alpha_num_dash', /^[a-zA-Z0-9\-\_]*$/);

export default {
mixins: [validationMixin],
  validations: {
      name: {
        required,
        maxLength: maxLength(80),
        u: unique,
      },      
      network_name_form: {
        required,
      },   
      sub_network_name_form: {
        required,
    },    
    },
  data() {
    return {
      name: '',
      sub_networks_lora : [], //a list of all the subnetworks on the app server
      network_names: [],
      sub_network_names: [],
      network_name_form: '', //this is the variable that holds the selected network 'id-name'
      sub_network_name_form: '', //this is the variable that holds the selected sub_network 'id:name'
      network_id: '', //this is the variable that holds the id of the selected network
      sub_network_id: '',
      message: ""
    };
  },
  props:[
   'vessels_prop'
  ],
  created: function () { //get all the networks and sub-networks on creation of the component. This is done so we do not need to keep fetching data from the lora app server
    AuthenticationService.get_networks().then(result => {
      let networks_lora = JSON.parse(result.data.networks_lora);
      for(let i = 0; i < networks_lora.length; i++){
        this.network_names.push(networks_lora[i].network_id.concat(":",networks_lora[i].network_name));
      }
    }).catch(err => {
      //Error getting networks from server
      this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})
    })
    AuthenticationService.get_sub_networks().then(result => {
        this.sub_networks_lora = JSON.parse(result.data.sub_networks_lora);
      }).catch(err => {
        //Error getting sub-networks from server
        this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
      })
  },
  watch: { //filter the subnetworks depending on the networks. 
    network_name_form: function(){
      this.sub_network_names =[];
      this.sub_network_name_form ='';
      this.network_id=functions.extract_id_id_name(this.network_name_form); //extract id of network
      for(let i = 0; i < this.sub_networks_lora.length; i++){
        if(this.sub_networks_lora[i].network_id == this.network_id){
          this.sub_network_names.push(this.sub_networks_lora[i].sub_network_id.concat(":",this.sub_networks_lora[i].sub_network_name));
        }
      }
    }
  },
  computed: {
    name_errors(){
      const errors=[];
      if (!this.$v.name.$error)return errors
      !this.$v.name.maxLength && errors.push('Name must be 80 characters or less.')
      !this.$v.name.required && errors.push('Name is required.')
      !this.$v.name.u && errors.push('Name must be unique.')
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
  },
  methods: {
    create_vessel(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.name.$invalid || this.$v.sub_network_name_form.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        this.sub_network_id=functions.extract_id_new(this.sub_network_name_form); //extract id of sub_network
        AuthenticationService.create_vessels({
          name: this.name,
          sub_network_id: this.sub_network_id,
        }).then(result => {
          let data = JSON.parse(result.data.vessels_db);
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$emit('vessel_management', {data: data}); //passing the revecived array of vessels to the parent component [vessel]
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
