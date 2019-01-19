<template>
  <v-content v-if="this.access == 1">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="primary ">
              <v-toolbar-title>Update Sub-Network</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 form_background" >
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
                v-model="sub_network_description"
                label= 'Description*'
                :error-messages = "sub_network_description_Errors"
                @keyup="$v.sub_network_description.$touch()" 
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
              <v-btn class="button"
                @click.stop="update_sub_network()">
                Update Sub-Network
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
import {description_sub_network_name, description_sub_network_descripton, description_sub_network_payload_codec} from "../../services/functions/form_descriptions_tool_tips.js";
import tool_tips_forms from "../Tool_Tip_Forms";


const unique= function(value){
  let x = 1; //0 fail, 1 pass
    for(let i=0; i< this.sub_networks_same_network.length; i++){
        if(value ==this.sub_networks_same_network[i].sub_network_name){
          if(value == this.sub_network.sub_network_name){
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
    sub_network_description: {
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
    sub_network_description_Errors(){
      const errors=[];
      if (!this.$v.sub_network_description.$error)return errors
      !this.$v.sub_network_description.maxLength && errors.push('Description must be 60 characters or longer')
      return errors;
    }
  },
  data() {
    return {
      access: 0,

      sub_networks: '',
      sub_network: {}, //object that holds the information about the sub-network to be edited
      sub_network_name: "",
      sub_network_description: "",
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

  ],
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
              //------------------------Start------------------------
              //Get Subnetworks
              await AuthenticationService.get_sub_networks().then(result => {
                  this.sub_networks = result.data.sub_networks_lora;
                  this.$emit('message_display',{message:result.data.message, type:result.data.type})  
                }).catch(err => {
                  //Error requesting the subnetworks from the server
                  this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
                })
                //Get Subnetwork to update
              this.sub_network = AuthenticationService.get_sub_network_one(this.$route.params.sub_network_id).then(result => {
                this.sub_network = result.data.sub_network;
                this.sub_network_name = this.sub_network.sub_network_name;
                this.sub_network_description = this.sub_network.sub_network_description;
                this.payload_codec_form = this.sub_network.payload_codec;
                for(let i =0; i<this.sub_networks.length; i++){
                  if(this.sub_network.network_id == this.sub_networks[i].network_id){
                    this.sub_networks_same_network.push(this.sub_networks[i]);
                  }
                }
                this.sub_network_name = this.sub_network.sub_network_name;
                this.sub_network_description = this.sub_network.sub_network_description;
              })
                  .catch(err => {
                    //Error getting network to be updated information
                    this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
                  });

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
    update_sub_network() {
      this.$v.$touch();
      if(this.$v.sub_network_name.$invalid || this.$v.sub_network_description.$invalid ){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        if(this.payload_codec_form == 'Cayenne LPP') {this.payload_codec_form = 'CAYENNE_LPP'}
        else{this.payload_codec_form = ''}
        AuthenticationService.update_sub_networks({
          sub_network_name: this.sub_network_name,
          sub_network_description: this.sub_network_description,
          network_id: this.sub_network.network_id,
          service_profile_id: this.sub_network.service_profile_id,
          payload_codec: this.payload_codec_form
          }, this.$route.params.sub_network_id)
          .then(result => {
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
