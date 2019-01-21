<template>
  <v-content v-if="this.access == 1"> 
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="primary ">
              <v-toolbar-title>Create Sub-Network</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 form_background" >
            <!--Sub-Network Name -->
            <v-flex >
              <v-text-field
                v-model="sub_network_name"
                label="Sub-Network Name*"
                :error-messages = "sub_network_name_Errors"
                @keyup="$v.sub_network_name.$touch() && $v.u.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_sub_network_name"></tool_tips_forms>
              </v-text-field>
              </v-flex>
            <!--Description  -->
            <v-flex >
              <v-textarea
                auto-grow
                rows="1"
                v-model="sub_network_description"
                label="Description*"
                :error-messages = "sub_network_description_Errors"
                @keyup="$v.sub_network_description.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_sub_network_descripton"></tool_tips_forms>
              </v-textarea>
              </v-flex>
            <!--Network Name-->
              <v-select
                v-model="network_name_form"
                :items="this.network_names"
                label="Network*"
                :error-messages = "network_name_form_Errors"
                @blur="$v.network_name_form.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_sub_network_network_name"></tool_tips_forms>
              </v-select>
            <!--Service Profile Name-->
              <v-select
                v-model="service_profile_form"
                :items="this.service_profile_names"
                label="Service Profile*"
                :error-messages = "service_profile_form_Errors"
                @blur="$v.service_profile_form.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_sub_network_service_profile"></tool_tips_forms>
              </v-select>
            <!--Payload Codec-->
              <v-select
                v-model="payload_codec_form"
                :items="this.payload_codec"
                label="Payload Codec*"
                :error-messages = "payload_codec_form_Errors"
                @blur="$v.payload_codec_form.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_sub_network_payload_codec"></tool_tips_forms>
              </v-select>
              <!-- Message -->
              <div div class="text">
                {{message}}
              </div>
              <!-- Buttons -->
              <v-btn class="button"
                @click.stop="create_sub_network()">
                Create Sub-Network
              </v-btn>
              <v-btn class="button"
                @click.stop="$router.push(`/subnetwork`)">
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
import {description_sub_network_name, description_sub_network_descripton, description_sub_network_network_name, description_sub_network_service_profile, description_sub_network_payload_codec} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";


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
  components:{
    tool_tips_forms
  },
  mixins: [validationMixin],
  validations: {
    sub_network_name: {
      alpha_num_dash,
      required,
      u: unique,
      maxLength: maxLength(80),
    },      
    sub_network_description: {
      required,
      maxLength: maxLength(200),
    },      
    network_name_form: {
      required,
    },      
    service_profile_form: {
      required,
    },
    payload_codec_form: {
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
    sub_network_description_Errors(){
      const errors=[];
      if (!this.$v.sub_network_description.$error)return errors
      !this.$v.sub_network_description.maxLength && errors.push('Description must be 200 characters or longer')
      !this.$v.sub_network_description.required && errors.push('Description is required.')
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
    },
    payload_codec_form_Errors(){
      const errors=[];
      if (!this.$v.payload_codec_form.$error)return errors
      !this.$v.payload_codec_form.required && errors.push('Payload Codec is required.')
      return errors;
    }
  },
  data() {
    return {
      access: 0,

      sub_networks: '',
      sub_network_name: '',
      sub_network_description: '',
      payload_codec: ['Cayenne LPP', 'None'],
      payload_codec_form: 'None',
      network_name_form: '', //this is the variable that holds the selected network 'id-name'
      service_profile_form: '', //this is the variable that holds the selected service profile 'id-name'
      network_id: '', //this is the variable that holds the id of the selected network

      service_profile: '',
      service_profile_id: '', //this is the service profile id of the selected service profile
      service_profile_names: [], //this is the variable that holds all the names to display on the form for the service profiles 
      message: '',
      sub_networks: [],
      network_names: [],
      sub_networks_same_network: [],//this is an array that contains all the sub_networks with the same network id selected,
      description_sub_network_name : description_sub_network_name,
      description_sub_network_descripton : description_sub_network_descripton,
      description_sub_network_network_name : description_sub_network_network_name,
      description_sub_network_service_profile : description_sub_network_service_profile,
      description_sub_network_payload_codec : description_sub_network_payload_codec,

    };
  },
  props:[

  ],
  watch: {
    network_name_form: function(){
      this.service_profile_names =[];
      this.service_profile_form =[];
      this.sub_networks_same_network =[];
      this.network_id=functions.extract_id_id_name(this.network_name_form); //extract id of network
      for(let i =0; i<this.sub_networks.length; i++){
        if(this.network_id == this.sub_networks[i].network_id){
          this.sub_networks_same_network.push(this.sub_networks[i]);
        }
      }
      for(let i =0; i< this.service_profile.length; i++){
        if(this.service_profile[i].network_id == this.network_id){
          this.service_profile_names.push(this.service_profile[i].service_profile_id +":" + this.service_profile[i].service_profile_name);
        }
      }
      if(this.service_profile_names.length == 0){
        //This will route the user to the create service profile page if no service profiles exists under selected network
        if(confirm('No Service Profiles under selected Network. Route to Create Service Profile Page?') == true){
          this.$router.push(`/service_profile/create`)
        };
      }
    }
  },
  created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("sub_networks", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //--------------------Start-------------------
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
          this.sub_networks = result.data.sub_networks_lora;
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
            }).catch(err => {
              //Error requesting the subnetworks from the server
              this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
            })
        //Get Service Profiles
          AuthenticationService.get_service_profiles().then(result => {
            this.service_profile = result.data.service_profiles;
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
    create_sub_network(){
      this.$v.$touch();
      if(this.$v.sub_network_name.$invalid || this.$v.sub_network_description.$invalid || this.$v.network_name_form.$invalid || this.$v.service_profile_form.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        this.service_profile_id=functions.extract_id_id_name(this.service_profile_form);//Extract id of service profile
        for(let i = 0; i < this.service_profile.length; i++){
          if(this.service_profile[i].service_profile_id == this.service_profile_id){
            this.service_profile_id = this.service_profile[i].service_profile_id_lora;
            break;
          }
        }
        if(this.payload_codec_form == 'Cayenne LPP') {this.payload_codec_form = 'CAYENNE_LPP'}
        else{this.payload_codec_form = ''}
         AuthenticationService.create_sub_networks({
          sub_network_name: this.sub_network_name,
          sub_network_description: this.sub_network_description,
          network_id: this.network_id,
          service_profile_id: this.service_profile_id,
          payload_codec: this.payload_codec_form
        }).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$router.push(`/subnetwork`)
        }).catch(err => {
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


