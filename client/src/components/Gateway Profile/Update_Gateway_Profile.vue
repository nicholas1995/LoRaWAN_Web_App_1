<template >
  <v-content v-if="this.access == 1" >
    <v-container fluid fill-height >
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="primary">
              <v-toolbar-title>Update Gateway Profile</v-toolbar-title>
              <v-spacer></v-spacer>
              <div v-if="this.add_channel_variable == 0">
                <v-btn class="button"
                  @click.stop="add_channel()">
                  Add Channel
                </v-btn>
              </div>
              <v-btn class="button"
                @click.stop="delete_channel()">
                Delete Channel
              </v-btn>
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
              <div v-if="this.add_channel_variable == 1">
              <!--Modulation-->
                <v-select
                  v-model="gateway_profile_modulation_form"
                  :items="this.gateway_profile_modulation"
                  label="Gateway Profile Modulation*"
                  :error-messages = "gateway_profile_modulation_form_errors"
                  @blur="$v.gateway_profile_modulation_form.$touch()" 
                >
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_profile_modulation"></tool_tips_forms>
                </v-select>
              <!--Bandwidth-->
                <v-select
                  v-model="gateway_profile_bandwidth_form"
                  :items="this.gateway_profile_bandwidth"
                  label="Bandwidth*"
                  suffix= 'KHz'
                  :error-messages = "gateway_profile_bandwidth_form_errors"
                  @blur="$v.gateway_profile_bandwidth_form.$touch()" 
                >
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_profile_bandwidth"></tool_tips_forms>
                </v-select>
              <!--Gateway Profile Frequency -->
                <v-flex >
                  <v-text-field
                    v-model="gateway_profile_frequency"
                    :error-messages = "gateway_profile_frequency_errors"
                    label="Gateway Profile Frequency*"
                    suffix= 'Hz'
                    @keyup="$v.gateway_profile_frequency.$touch()">
                  <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_profile_frequency"></tool_tips_forms>
                </v-text-field>
                </v-flex>
                <div v-if="this.gateway_profile_modulation_form=='LORA'" >
                <!--Spreading Factors -->
                  <v-combobox
                      v-model="gateway_profile_spreading_factors"
                      label="Spreading Factors*"
                      multiple
                      small-chips
                      :error-messages = "gateway_profile_spreading_factors_errors"
                    >
                      <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_profile_spreading_factors"></tool_tips_forms>
                  </v-combobox>
                </div>
                <div v-if="this.gateway_profile_modulation_form=='FSK'" >
                <!--Bit Rate -->
                  <v-flex >
                    <v-text-field
                      v-model="gateway_profile_bit_rate"
                      :error-messages = "gateway_profile_bit_rate_errors"
                      label="Bit Rate*"
                      @keyup="$v.gateway_profile_bit_rate.$touch()">
                    <tool_tips_forms slot="append-outer" v-bind:description_prop="this.description_gateway_profile_bit_rate"></tool_tips_forms>
                  </v-text-field>
                  </v-flex>
                </div>
              </div>
              </v-form>
              <div div class="text">
                {{message}} 
              </div>
              <v-btn class="button"
                @click.stop="update_gateway_profile()">
                Update Gateway Profile
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
import { required, maxLength, between, helpers } from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"
import {description_gateway_profile_name, description_gateway_profile_channels, description_network_server_id_lora, description_gateway_profile_bandwidth,
description_gateway_profile_bitrate, description_gateway_profile_frequency, description_gateway_profile_modulation, description_gateway_profile_spreading_factors,
description_gateway_profile_bit_rate} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";

const first_digit_not_0 = function(value){ 
  if(value.length >1){   //if it is more than one digit in length 
    if(value[0] == 0){
      value = parseInt(value, 10); //removes the leading 0 from a number
    }
  }else if(value.length == 0){
    value= 0
  }
  return value;
}

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
      gateway_profile_channels: {
        required,
      },       
      gateway_profile_modulation_form: {
        required,
      },     
      gateway_profile_bandwidth_form: {
        required,
      },     
      gateway_profile_frequency: {
        required,
        between: between(0, 2147483647)
      },     
      gateway_profile_spreading_factors: {
        required,
      },     
      gateway_profile_bit_rate: {
        required,
        between: between(0, 2147483647),
      },  
    },
  data() {
    return {
      access: 0,

      gateway_profile_update: '',

      gateway_profile_name: '',

      network_server_id_lora: '',

      gateway_profile_channels: [],
      gateway_profile_modulation: ['LORA', 'FSK'],
      gateway_profile_modulation_form: '0',
      gateway_profile_bandwidth: [125, 250, 500],
      gateway_profile_bandwidth_form: '0',
      gateway_profile_frequency: 0,
      gateway_profile_spreading_factors: [0],
      gateway_profile_bit_rate: 0,

      add_channel_variable: 0,

      description_gateway_profile_name: description_gateway_profile_name,
      description_gateway_profile_channels: description_gateway_profile_channels,
      description_gateway_profile_bandwidth: description_gateway_profile_bandwidth,
      description_gateway_profile_bitrate: description_gateway_profile_bitrate,
      description_gateway_profile_frequency: description_gateway_profile_frequency,
      description_gateway_profile_modulation: description_gateway_profile_modulation,
      description_gateway_profile_spreading_factors: description_gateway_profile_spreading_factors,
      description_gateway_profile_bit_rate: description_gateway_profile_bit_rate,

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
        //Get Gateway Profile
        this.gateway_profile_update = await AuthenticationService.get_gateway_profile(this.$route.params.gateway_profile_id_lora)
          .catch(err => {
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})      
          })
          this.gateway_profile_update = this.gateway_profile_update.data.gateway_profiles;
          this.gateway_profile_name = this.gateway_profile_update.gateway_profile_name
          this.gateway_profile_channels = this.gateway_profile_update.gateway_profile_channels
          this.network_server_id_lora = this.gateway_profile_update.network_server_id_lora
          this.gateway_profile_modulation_form = this.gateway_profile_update.gateway_profile_modulation
          if(this.gateway_profile_modulation_form == "LORA"){
            this.add_channel_variable = 1;
            this.gateway_profile_bandwidth_form = this.gateway_profile_update.gateway_profile_bandwidth
            this.gateway_profile_frequency = this.gateway_profile_update.gateway_profile_frequency
            this.gateway_profile_spreading_factors = this.gateway_profile_update.gateway_profile_spreading_factors
          }else if(this.gateway_profile_modulation_form =="FSK"){
            this.add_channel_variable = 1;
            this.gateway_profile_bandwidth_form = this.gateway_profile_update.gateway_profile_bandwidth
            this.gateway_profile_frequency = this.gateway_profile_update.gateway_profile_frequency
            this.gateway_profile_bit_rate = this.gateway_profile_update.gateway_profile_bit_rate
          }else{ //set all to a zero value so if we submit the form the required validation will not throw error
            this.add_channel_variable = 0;
            this.gateway_profile_modulation_form =  '0'; 
            this.gateway_profile_bandwidth_form =  '0'; 
            this.gateway_profile_frequency =  0;
            this.gateway_profile_spreading_factors =  [0];
            this.gateway_profile_bit_rate = 0;
          }

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
      !this.$v.gateway_profile_name.required && errors.push('Name is required.')
      return errors;
    },
    gateway_profile_channels_errors(){
      const errors=[];
      if (!this.$v.gateway_profile_channels.$error)return errors
      !this.$v.gateway_profile_channels.required && errors.push('A gateway profile channel is required.')
      return errors;
    },
    gateway_profile_modulation_form_errors(){
      const errors=[];
      if (!this.$v.gateway_profile_modulation_form.$error)return errors
      !this.$v.gateway_profile_modulation_form.required && errors.push('A modulation technique is required.')
      return errors;
    },
    gateway_profile_bandwidth_form_errors(){
      const errors=[];
      if (!this.$v.gateway_profile_bandwidth_form.$error)return errors
      !this.$v.gateway_profile_bandwidth_form.required && errors.push('A channel bandwidth is required.')
      return errors;
    },
    gateway_profile_frequency_errors(){
      const errors=[];
      if (!this.$v.gateway_profile_frequency.$error)return errors
      !this.$v.gateway_profile_frequency.required && errors.push('A channel frequency is required.')
      !this.$v.gateway_profile_frequency.between && errors.push('Channel Frequency must be between 0 & 2147483647.')
      return errors;
    },
    gateway_profile_spreading_factors_errors(){
      const errors=[];
      if (!this.$v.gateway_profile_spreading_factors.$error)return errors
      !this.$v.gateway_profile_spreading_factors.required && errors.push('A spreading factor is required.')
      return errors;
    },
    gateway_profile_bit_rate_errors(){
      const errors=[];
      if (!this.$v.gateway_profile_bit_rate.$error)return errors
      !this.$v.gateway_profile_bit_rate.required && errors.push('A bitrate is required.')
      !this.$v.gateway_profile_bit_rate.between && errors.push('Bitrate must be between 0 & 2147483647.')
      return errors;
    }
  },
  methods: {
    update_gateway_profile(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.gateway_profile_name.$invalid || this.$v.gateway_profile_channels.$invalid ||
      this.$v.gateway_profile_modulation_form.$invalid || this.$v.gateway_profile_bandwidth_form.$invalid || this.$v.gateway_profile_frequency.$invalid ||
      this.$v.gateway_profile_spreading_factors.$invalid || this.$v.gateway_profile_bit_rate.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.gateway_profile_bit_rate = first_digit_not_0(this.gateway_profile_bit_rate)
        this.message = "";
        AuthenticationService.update_gateway_profiles({
          gateway_profile_name: this.gateway_profile_name,
          gateway_profile_channels: this.gateway_profile_channels,
          network_server_id_lora: this.network_server_id_lora,
          gateway_profile_modulation : this.gateway_profile_modulation_form,
          gateway_profile_bandwidth : this.gateway_profile_bandwidth_form,
          gateway_profile_frequency : this.gateway_profile_frequency,
          gateway_profile_spreading_factors : this.gateway_profile_spreading_factors,
          gateway_profile_bit_rate : this.gateway_profile_bit_rate,
        }, this.$route.params.gateway_profile_id_lora).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$router.push(`/gateway_profile`)
        }).catch(err => {
          this.message = err.response.data.error;
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})    
        })
      }
    },
    add_channel(){
      this.add_channel_variable = 1;
      this.gateway_profile_modulation_form =  ''; 
      this.gateway_profile_bandwidth_form =  ''; 
      this.gateway_profile_frequency =  null;
      this.gateway_profile_spreading_factors =  [0];
      this.gateway_profile_bit_rate = 0;
    },
    delete_channel(){
      //The values for the channel are set to zero here and not empty so it can pass verification 
      this.add_channel_variable = 0;
      this.gateway_profile_modulation_form =  '0'; 
      this.gateway_profile_bandwidth_form =  '0'; 
      this.gateway_profile_frequency =  0;
      this.gateway_profile_spreading_factors =  [0];
      this.gateway_profile_bit_rate = 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
