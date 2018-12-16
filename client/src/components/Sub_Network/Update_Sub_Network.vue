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
                label= 'Sub-Network Name*'
                :error-messages = "sub_network_name_Errors"
                @keyup="$v.sub_network_name.$touch() && $v.u.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_sub_network_name"></tool_tips_forms>
              </v-text-field>
              </v-flex>
            <!--Description  -->
            <v-flex >
              <v-text-field
                v-model="description"
                label= 'Description*'
                :error-messages = "description_Errors"
                @keyup="$v.description.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_sub_network_descripton"></tool_tips_forms>  
              </v-text-field>
              </v-flex>
            <!--Payload Codec-->
              <v-select
                v-model="payload_codec_form"
                :items="this.payload_codec"
                label="Payload Codec*"
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_sub_network_payload_codec"></tool_tips_forms>
              </v-select>
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
import { required, maxLength, helpers } from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"
import {description_sub_network_name, description_sub_network_descripton, description_sub_network_payload_codec} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";


const unique= function(value){
  let x = 1; //0 fail, 1 pass
    for(let i=0; i< this.sub_networks_same_network.length; i++){
        if(value ==this.sub_networks_same_network[i].sub_network_name){
          if(value == this.sub_network_update.sub_network_name){
          }else{
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
    description: {
      required,
      maxLength: maxLength(200),
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
      !this.$v.description.maxLength && errors.push('Description must be 60 characters or longer')
      return errors;
    }
  },
  data() {
    return {
      sub_network: {}, //object that holds the information about the sub-network to be edited
      sub_network_name: "",
      description: "",
      payload_codec: ['Cayenne LPP', 'None'],
      payload_codec_form: '',
      message: "",
      sub_networks_same_network: [],
      description_sub_network_name : description_sub_network_name,
      description_sub_network_descripton : description_sub_network_descripton,
      description_sub_network_payload_codec : description_sub_network_payload_codec,
    };
  },
  props:[
   'sub_network_prop',
   'sub_network_update'
  ],
  created: async function () {
      this.sub_network= await AuthenticationService.get_sub_network_one(this.sub_network_update.sub_network_id)
        .catch(err => {
          //Error getting network to be updated information
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
        });
        this.sub_network = JSON.parse(this.sub_network.data.sub_network);
        this.sub_network_name = this.sub_network.sub_network_name;
        this.description = this.sub_network.description;
        this.payload_codec_form = this.sub_network.payload_codec;

    for(let i =0; i<this.sub_network_prop.length; i++){
      if(this.sub_network_update.network_id == this.sub_network_prop[i].network_id){
        this.sub_networks_same_network.push(this.sub_network_prop[i]);
      }
    }
    this.sub_network_name = this.sub_network_update.sub_network_name;
    this.description = this.sub_network_update.description;
  },
  methods: {
    update_sub_network() {
      this.$v.$touch();
      if(this.$v.sub_network_name.$invalid || this.$v.description.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        if(this.payload_codec_form == 'Cayenne LPP') {this.payload_codec_form = 'CAYENNE_LPP'}
        else{this.payload_codec_form = ''}
        AuthenticationService.update_sub_networks({
          sub_network_name: this.sub_network_name,
          description: this.description,
          network_id: this.sub_network_update.network_id,
          service_profile_id: this.sub_network_update.service_profile_id,
          payload_codec: this.payload_codec_form
          }, this.sub_network_update.sub_network_id)
          .then(result => {
            let data = JSON.parse(result.data.sub_networks_lora);
            this.$emit('message_display',{message:result.data.message, type:result.data.type})  
            this.$emit('sub_network_management', data);
          }).catch(err => {
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
