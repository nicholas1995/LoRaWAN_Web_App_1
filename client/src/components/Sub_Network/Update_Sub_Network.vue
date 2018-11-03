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
                :error-messages = "sub_network_name_Errors"
                @keyup="$v.sub_network_name.$touch() && $v.u.$touch()" 
              ></v-text-field>
              </v-flex>
            <!--Description  -->
            <v-flex >
              <v-text-field
                v-model="description"
                label= 'Description'
                :error-messages = "description_Errors"
                @keyup="$v.description.$touch()" 
              ></v-text-field>
              </v-flex>
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
import { required, maxLength, alphaNum } from 'vuelidate/lib/validators'
import functions from "../../services/functions/forms_functions.js"


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


export default {
  mixins: [validationMixin],
  validations: {
    sub_network_name: {
      alphaNum,
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
      !this.$v.sub_network_name.alphaNum && errors.push('Name must only contain letters and numbers')
      !this.$v.sub_network_name.maxLength && errors.push('Sub-Network name must be 20 characters or longer')
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
      sub_network_name: "",
      description: "",
      message: "",
      sub_networks_same_network: []
    };
  },
  props:[
   'sub_networks',
   'sub_network_update'
  ],
  created: function () {
    for(let i =0; i<this.sub_networks.length; i++){
      if(this.sub_network_update.network_id == this.sub_networks[i].network_id){
        this.sub_networks_same_network.push(this.sub_networks[i]);
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
        AuthenticationService.update_sub_networks({
          sub_network_name: this.sub_network_name,
          description: this.description,
          network_id: this.sub_network_update.network_id,
          service_profile_id: this.sub_network_update.service_profile_id,
        }, this.sub_network_update.sub_network_id).then(result => {
          let data = result.data.sub_networks_lora;
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
