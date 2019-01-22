<template >
  <v-content v-if="this.access == 1" >
    <v-container fluid fill-height >
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="primary">
              <v-toolbar-title>Create Gateway Profile</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 form_background" >
            <v-form>
              <!--Network Name -->
                <v-flex >
                  <v-text-field
                    v-model="gateway_profile_name"
                    :error-messages = "gateway_profile_name_errors"
                    label="Gateway Profile Name*"
                    @keyup="$v.gateway_profile_name.$touch()">
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_profile_name"></tool_tips_forms>
                </v-text-field>
                </v-flex>
              <!--Enabled Channels -->
                <v-combobox
                      v-model="gateway_profile_channels"
                      label="Enabled Channels*"
                      multiple
                      small-chips
                      :error-messages = "gateway_profile_channels_errors"
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_profile_channels"></tool_tips_forms>
                  </v-combobox>
              <!--Network Server Name-->
                <v-select
                  v-model="network_server_name_form"
                  :items="this.network_server_names"
                  label="Network Server*"
                  :error-messages = "network_server_name_form_Errors"
                  @blur="$v.network_server_name_form.$touch()" 
                >
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_network_server_id_lora"></tool_tips_forms>
                </v-select>
              </v-form>
              <div div class="text">
                {{message}} 
              </div>
              <v-btn class="button"
                @click.stop="create_gateway_profile()">
                Create Gateway Profile
              </v-btn>
              <v-btn class="button"
                @click.stop="$router.push(`/gateway_profile`)">
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
import {description_gateway_profile_name, description_gateway_profile_channels, description_network_server_id_lora, description_gateway_profile_bandwidth,
description_gateway_profile_bitrate, description_gateway_profile_frequency, description_gateway_profile_modulation, description_gateway_profile_spreding_factors} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";


export default {
  components:{
    tool_tips_forms
  },
mixins: [validationMixin],
  validations: {
      gateway_profile_name: {
        required,
        maxLength: maxLength(80),
      },    
    network_server_name_form: {
      required,
    },      
      network_display_name: {
        required,
        maxLength: maxLength(80),
      }
    },
  data() {
    return {
      access: 0,

      network_server_names: [], 
      network_server_name_form: '',

      gateway_profile_channels: [],

      gateway_profile_name: '',
      network_display_name: "",
      network_can_have_gateways: "",

      description_gateway_profile_name: description_gateway_profile_name,
      description_gateway_profile_channels: description_gateway_profile_channels,
      description_network_server_id_lora: description_network_server_id_lora,
      description_gateway_profile_bandwidth: description_gateway_profile_bandwidth,
      description_gateway_profile_bitrate: description_gateway_profile_bitrate,
      description_gateway_profile_frequency: description_gateway_profile_frequency,
      description_gateway_profile_modulation: description_gateway_profile_modulation,
      description_gateway_profile_spreding_factors: description_gateway_profile_spreding_factors,

      message: ""
    };
  },
  props:[

  ],
 created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("gateway_profiles", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //--------------Start-------------------
        //Get Network Servers
        AuthenticationService.get_network_servers().then(result => {
          let network_servers = result.data.network_servers_lora;
          for(let i = 0; i < network_servers.length; i++){
            this.network_server_names.push(network_servers[i].network_server_id.concat(":",network_servers[i].network_server_name));
          }
          if(this.network_server_names.length == 0){
            //This will route the user to the create network server page if no network servers exists 
            if(confirm('There are no associated Network Servers. Route to the Create Network Server Page?') == true){
              this.$router.push(`/network_server/create`)
            };
          }
        }).catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
        });
      }else{
        alert('Please login.');
        this.$router.push('/login');
      }
    }catch (err) {
      console.log(err)
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
  computed: {
    gateway_profile_name_errors(){
      const errors=[];
      if (!this.$v.gateway_profile_name.$error)return errors
      !this.$v.gateway_profile_name.maxLength && errors.push('Name must be 80 characters or less.')
      !this.$v.gateway_profile_name.alpha_num_dash && errors.push('Name must only contain letters, numbers and dashes.')
      !this.$v.gateway_profile_name.required && errors.push('Name is required.')
      !this.$v.gateway_profile_name.u && errors.push('Name must be unique.')
      return errors;
    },
    network_server_name_form_Errors(){
      const errors=[];
      if (!this.$v.network_server_name_form.$error)return errors
      !this.$v.network_server_name_form.required && errors.push('Network Server is required.')
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
    create_gateway_profile(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.gateway_profile_name.$invalid || this.$v.network_display_name.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        if(this.network_can_have_gateways =="")this.network_can_have_gateways =false; //needed to set empty radio to false
        this.message = "";
        AuthenticationService.create_networks({
          gateway_profile_name: this.gateway_profile_name,
          network_display_name: this.network_display_name,
          network_can_have_gateways: this.network_can_have_gateways
        }).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$router.push(`/network`)
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
