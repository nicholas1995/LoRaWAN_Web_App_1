<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Update Network</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--Network Name -->
            <v-flex >
              <v-text-field
                v-model="network_name"
                label= 'Network Name*'
                :error-messages = "network_nameErrors"
                @keyup="$v.network_name.$touch()" 
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_network_name"></tool_tips_forms>
              </v-text-field>
              </v-flex>
            <!--Network Display Name-->
              <v-text-field
                v-model="network_display_name"
                label= 'Display Name*'
                :error-messages = "network_display_nameErrors"
                @keyup="$v.network_display_name.$touch()"
              >
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_network_display_name"></tool_tips_forms>
              </v-text-field>
            <!--Can Have Gateways-->
              <v-checkbox
                v-model="network_can_have_gateways"
                label="Can Have Gateways"
                required
              ></v-checkbox>

              <div div class="text">
                {{message}}
              </div>
              <v-btn class="grey lighten-2"
                @click.stop="update_network()">
                Update Network
              </v-btn>
              <v-btn class="grey lighten-2"
                @click.stop="$emit('network_management_no_change')">
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
import { maxLength, helpers, required } from 'vuelidate/lib/validators'
import {description_network_name, description_network_display_name} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";

const unique= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.networks_prop.length; i++){
    if(value ==this.networks_prop[i].network_name){
      if(value == this.network_update.network_name){
        return x;
      }else return 0;
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
      network_name: {
        required,
        maxLength: maxLength(80),
        alpha_num_dash,
        u: unique,
      },      
      network_display_name: {
        required,
        maxLength: maxLength(80),
      }
    },
  data() {
    return {
      network_name: "",
      network_display_name: "",
      network_can_have_gateways: "",
      description_network_name : description_network_name,
      description_network_display_name : description_network_display_name,
      message: ""
    };
  },
  props:[
   'networks_prop',
   'network_update'
  ],
  created: function () {
    this.network_name = this.network_update.network_name;
    this.network_display_name = this.network_update.network_display_name;
    this.network_can_have_gateways = this.network_update.network_can_have_gateways;
  },
  computed: {
    network_nameErrors(){
      const errors=[];
      if (!this.$v.network_name.$error)return errors
      !this.$v.network_name.maxLength && errors.push('Name must be 80 characters or less.')
      !this.$v.network_name.alpha_num_dash && errors.push('Name must only contain letters, numbers and dashes.')
      !this.$v.network_name.required && errors.push('Name is required.')
      !this.$v.network_name.u && errors.push('Name must be unique.')
      return errors;
    },
    network_display_nameErrors(){
      const errors=[];
      if (!this.$v.network_display_name.$error)return errors
      !this.$v.network_display_name.maxLength && errors.push('Display Name must be 80 characters or less.')
      !this.$v.network_display_name.required && errors.push('Display Name is required.')
      return errors;
    }
  },
  methods: {
    update_network() {
      this.$v.$touch();
      if(this.$v.network_name.$invalid || this.$v.network_display_name.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        AuthenticationService.update_networks({
          network_name: this.network_name,
          network_display_name: this.network_display_name,
          network_can_have_gateways: this.network_can_have_gateways
      }, this.network_update.network_id).then(result => {
          let data = JSON.parse(result.data.networks_lora);
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$emit('network_management', {data: data}); //passing the revecived array of networks to the parent component [Network]
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
