<template>
  <v-content v-if="this.access == 1">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="primary">
              <v-toolbar-title>Device Activation</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <v-form>
              <!--Device Address -->
              <v-flex >
                <v-text-field
                  v-model="dev_addr"
                  :error-messages = "dev_addr_Errors"
                  label="Device Address*"
                  maxlength="8"
                  @keyup="$v.dev_addr.$touch()">
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_dev_addr"></tool_tips_forms>
                </v-text-field>
                </v-flex>
              <!--Network Session Key-->
                <v-text-field
                  v-model="nwk_s_enc_key"
                  :error-messages = "nwk_s_enc_key_Errors"
                  label="Network Session Key*"
                  maxlength="32"
                  @keyup="$v.nwk_s_enc_key.$touch()">
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_nwk_s_enc_key"></tool_tips_forms>
                </v-text-field>
              <!--Application Session Key-->
                <v-text-field
                  v-model="app_s_key"
                  :error-messages = "app_s_key_Errors"
                  label="Application Session Key*"
                  maxlength="32"
                  @keyup="$v.app_s_key.$touch()">
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_app_s_key"></tool_tips_forms>
                </v-text-field>
              <!--Uplink Frame Counter-->
                <v-text-field
                  v-model="f_cnt_up"
                  :error-messages = "f_cnt_up_Errors"
                  label="Uplink Frame Counter*"
                  @keyup="$v.f_cnt_up.$touch()">
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_f_cnt_up"></tool_tips_forms>
                </v-text-field>
              <!--Downlink Frame Counter (Network)-->
                <v-text-field
                  v-model="n_f_cnt_down"
                  :error-messages = "n_f_cnt_down_Errors"
                  label="Downlink Frame Counter*"
                  @keyup="$v.n_f_cnt_down.$touch()">
                <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_n_f_cnt_down"></tool_tips_forms>
              </v-text-field>
              </v-form>
              <div div class="text">
                {{message}} 
              </div>
              <v-btn class="grey lighten-2"
                @click.stop="activate_device()">
                <div v-if="this.dev_addr ==''">
                  Activate Device
                </div>
                <div v-else>
                  Re-Activate Device
                </div>
              </v-btn>
              <v-btn class="grey lighten-2"
                @click.stop="$router.push(`/device`)">
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
import { required, minLength, maxLength, numeric, helpers } from 'vuelidate/lib/validators'
import {description_dev_addr, description_nwk_s_enc_key, description_app_s_key, description_f_cnt_up, 
description_n_f_cnt_down} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";

const hex = helpers.regex('hex', /^[a-fA-F0-9]*$/);

export default {
  components:{
    tool_tips_forms
  },
mixins: [validationMixin],
  validations: {
      dev_addr: {
        hex,
        required,
        minLength: minLength(8),
        maxLength: maxLength(8),

      },      
      nwk_s_enc_key: {
        hex,
        required,
        mminLength: minLength(32),
        maxLength: maxLength(32),

      },
      app_s_key: {
        hex,
        required,
        mminLength: minLength(32),
        maxLength: maxLength(32),

      },      
      f_cnt_up: {
        required,
        numeric,
      },      
      n_f_cnt_down: {
        required,
        numeric,
      }
    },
  data() {
    return {
      access: 0,
      device: '',
      device_activate: '',

      device_activation: null,
      dev_addr: '',
      nwk_s_enc_key: "",
      app_s_key: "",
      f_cnt_up: '',
      n_f_cnt_down: '',
      description_dev_addr : description_dev_addr,
      description_nwk_s_enc_key : description_nwk_s_enc_key,
      description_app_s_key : description_app_s_key,
      description_f_cnt_up : description_f_cnt_up,
      description_n_f_cnt_down : description_n_f_cnt_down,
      message: ""
    };
  },
  created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("devices", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //----------------------Start------------------
        //Get Devices
        await AuthenticationService.get_devices().then(result => {
          this.devices = result.data.devices_lora;
          this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
        }).catch(err => {
          //Error getting the devices from the server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
        })
        for(let i = 0; i < this.devices.length; i++){
          if(this.devices[i].device_id == this.$route.params.device_id){
            this.device_activate = this.devices[i];
            break;
          }
        }
        this.device_activation = await AuthenticationService.get_devices_activation(this.device_activate.device_eui)
          .catch(err => {
              //Error getting network to be updated information
              this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
            });
        this.device_activation = this.device_activation.data.device_activation;
        this.dev_addr = this.device_activation.dev_addr;
        this.nwk_s_enc_key = this.device_activation.nwk_s_enc_key;
        this.app_s_key = this.device_activation.app_s_key;
        this.f_cnt_up = this.device_activation.f_cnt_up;
        this.n_f_cnt_down = this.device_activation.n_f_cnt_down;
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
  computed: {
    dev_addr_Errors(){
      const errors=[];
      if (!this.$v.dev_addr.$error)return errors
      !this.$v.dev_addr.required && errors.push('Device Address is required.')
      !this.$v.dev_addr.hex && errors.push('Device Address must be a valid HEX.')
      !this.$v.dev_addr.maxLength && errors.push('Device Address must be 8 characters.')
      !this.$v.dev_addr.minLength && errors.push(`Device Address must be 8 characters: ${(8 - this.dev_addr.length)}`)
      return errors;
    },
    nwk_s_enc_key_Errors(){
      const errors=[];
      if (!this.$v.nwk_s_enc_key.$error)return errors
      !this.$v.nwk_s_enc_key.required && errors.push('Network Session Key is required.')
      !this.$v.nwk_s_enc_key.hex && errors.push('Network Session Key must be a valid HEX.')
      !this.$v.nwk_s_enc_key.maxLength && errors.push('Network Session Key must be 32 characters or less.')
      !this.$v.nwk_s_enc_key.minLength && errors.push(`Network Session Key must be 32 characters: ${(32 - this.nwk_s_enc_key.length)}`)
      return errors;
    },
    app_s_key_Errors(){
      const errors=[];
      if (!this.$v.app_s_key.$error)return errors
      !this.$v.app_s_key.required && errors.push('Application Session Key is required.')
      !this.$v.app_s_key.hex && errors.push('Application Session Key must be a valid HEX.')
      !this.$v.app_s_key.maxLength && errors.push('Application Session Key must be 32 characters or less.')
      !this.$v.app_s_key.minLength && errors.push(`Application Session Key must be 32 characters: ${(32 - this.app_s_key.length)}`)
      return errors;
    },
    f_cnt_up_Errors(){
      const errors=[];
      if (!this.$v.f_cnt_up.$error)return errors
      !this.$v.f_cnt_up.required && errors.push('Uplink Frame Counter is required.')
      !this.$v.f_cnt_up.numeric && errors.push('Uplink Frame Counter must be an integer.')
      return errors;
    },
    n_f_cnt_down_Errors(){
      const errors=[];
      if (!this.$v.n_f_cnt_down.$error)return errors
      !this.$v.n_f_cnt_down.required && errors.push('Downlink Frame Counter is required.')
      !this.$v.n_f_cnt_down.numeric && errors.push('Downlink Frame Counter must be an integer.')
      return errors;
    }
  },
  methods: {
    activate_device: async function(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.dev_addr.$invalid || this.$v.nwk_s_enc_key.$invalid || this.$v.app_s_key.$invalid || this.$v.f_cnt_up.$invalid
      || this.$v.n_f_cnt_down.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        let result = await AuthenticationService.create_devices_activation({
          device_eui : this.device_activate.device_eui, 
          dev_addr : this.dev_addr,
          nwk_s_enc_key : this.nwk_s_enc_key,
          app_s_key : this.app_s_key,
          f_cnt_up : this.f_cnt_up,
          n_f_cnt_down : this.n_f_cnt_down,
        }, this.device_activate.device_eui)
          .catch(err => {
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})    
          })
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$router.push(`/device`)
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
