<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Update vessel</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--vessel Name -->
            <v-flex >
              <v-text-field
                v-model="vessel_name"
                label= 'vessel Name*'
                :error-messages = "vessel_nameErrors"
                @keyup="$v.vessel_name.$touch()" 
              >
              </v-text-field>
              </v-flex>
            <!--vessel Display Name-->
              <v-text-field
                v-model="display_name"
                label= 'Display Name*'
                :error-messages = "display_nameErrors"
                @keyup="$v.display_name.$touch()"
              >
              </v-text-field>
            <!--Can Have Gateways-->
              <v-checkbox
                v-model="can_have_gateways"
                label="Can Have Gateways"
                required
              ></v-checkbox>

              <div div class="text">
                {{message}}
              </div>
              <v-btn class="grey lighten-2"
                @click.stop="update_vessel()">
                Update vessel
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
import { validationMixin } from 'vuelidate'
import { maxLength, helpers, required } from 'vuelidate/lib/validators'

const unique= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.vessels_prop.length; i++){
    if(value ==this.vessels_prop[i].vessel_name){
      if(value == this.vessel_update.vessel_name){
        return x;
      }else return 0;
    }
  } 
  return x; 
}
const alpha_num_dash = helpers.regex('alpha_num_dash', /^[a-zA-Z0-9\-\_]*$/);

export default {
  mixins: [validationMixin],
  validations: {
      vessel_name: {
        required,
        maxLength: maxLength(80),
        alpha_num_dash,
        u: unique,
      },      
      display_name: {
        required,
        maxLength: maxLength(80),
      }
    },
  data() {
    return {
      vessel_name: "",
      display_name: "",
      can_have_gateways: "",
      description_vessel_name : description_vessel_name,
      description_vessel_display_name : description_vessel_display_name,
      message: ""
    };
  },
  props:[
   'vessels_prop',
   'vessel_update'
  ],
  created: function () {
    this.vessel_name = this.vessel_update.vessel_name;
    this.display_name = this.vessel_update.display_name;
    this.can_have_gateways = this.vessel_update.can_have_gateways;
  },
  computed: {
    vessel_nameErrors(){
      const errors=[];
      if (!this.$v.vessel_name.$error)return errors
      !this.$v.vessel_name.maxLength && errors.push('Name must be 80 characters or less.')
      !this.$v.vessel_name.alpha_num_dash && errors.push('Name must only contain letters, numbers and dashes.')
      !this.$v.vessel_name.required && errors.push('Name is required.')
      !this.$v.vessel_name.u && errors.push('Name must be unique.')
      return errors;
    },
    display_nameErrors(){
      const errors=[];
      if (!this.$v.display_name.$error)return errors
      !this.$v.display_name.maxLength && errors.push('Display Name must be 80 characters or less.')
      !this.$v.display_name.required && errors.push('Display Name is required.')
      return errors;
    }
  },
  methods: {
    update_vessel() {
      this.$v.$touch();
      if(this.$v.vessel_name.$invalid || this.$v.display_name.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        AuthenticationService.update_vessels({
          vessel_name: this.vessel_name,
          display_name: this.display_name,
          can_have_gateways: this.can_have_gateways
      }, this.vessel_update.vessel_id).then(result => {
          let data = JSON.parse(result.data.vessels_lora);
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$emit('vessel_management', {data: data}); //passing the revecived array of vessels to the parent component [vessel]
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
