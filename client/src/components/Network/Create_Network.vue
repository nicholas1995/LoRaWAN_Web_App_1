<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Create Network</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <v-form>
              <!--$touch is used to manually set dirty when the event occurs
              and dirty is used to validate the data field--> 
              <!--Network Name -->
              <v-flex >
                <v-text-field
                  v-model="network_name"
                  :error-messages = "network_nameErrors"
                  label="Network Name*"
                  @keyup="$v.network_name.$touch()">
                <v-tooltip
                  slot="append-outer"
                  bottom>
                <v-icon small  slot="activator">info</v-icon>
                I'm a tooltip
              </v-tooltip>
            </v-text-field>
                </v-flex>
              <!--Display Name-->
                <v-text-field
                  v-model="display_name"
                  :error-messages = "display_nameErrors"
                  label="Display Name*"
                  @keyup="$v.display_name.$touch()">
                <v-tooltip
                  slot="append-outer"
                  bottom
                  max-width='400' >
                  <v-icon small  slot="activator"  >info</v-icon>
                  uhygas dfug asuydf ausdgf asgdfg \n
                  asdfiy gsasdfiyuh gasdfhg sdfhja sdfasdfiu gsdf asdfh 
                  u gasdfh asdfuhygas dfug asuydf ausdgf asgdfg \n
                  asdfiy gsasdfiyuh gasdfhg sdfhja sdfasdfiu gsdf asdfh 
                  u gasdfh asdfuhygas dfug asuydf ausdgf asgdfg \n
                  asdfiy gsasdfiyuh gasdfhg sdfhja sdfasdfiu gsdf asdfh 
                  u gasdfh asdfuhygas dfug asuydf ausdgf asgdfg \n
                  asdfiy gsasdfiyuh gasdfhg sdfhja sdfasdfiu gsdf asdfh 
                  u gasdfh asdf
                </v-tooltip>
              </v-text-field>
              <!--Can Have Gateways-->
                <v-checkbox
                  v-model="can_have_gateways"
                  label="Can Have Gateways"
                  required
                >
                </v-checkbox>
              </v-form>
              <div div class="text">
                {{message}} 
              </div>
              <v-btn class="grey lighten-2"
                @click.stop="create_network()">
                Create Network
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
import { required, maxLength, helpers } from 'vuelidate/lib/validators'

const unique= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.networks_prop.length; i++){
    if(value ==this.networks_prop[i].network_name){
      return 0;
    }
  } 
  return x; 
}
const alpha_num_dash = helpers.regex('alpha_num_dash', /^[a-zA-Z0-9\-\_]*$/);

export default {
mixins: [validationMixin],
  validations: {
      network_name: {
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
      network_name: '',
      display_name: "",
      can_have_gateways: "",
      message: ""
    };
  },
  props:[
   'networks_prop'
  ],
  beforeCreate: function () {

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
      display_nameErrors(){
      const errors=[];
      if (!this.$v.display_name.$error)return errors
      !this.$v.display_name.maxLength && errors.push('Display Name must be 80 characters or less.')
      !this.$v.display_name.required && errors.push('Display Name is required.')
      return errors;
    }
  },
  methods: {
    create_network(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.network_name.$invalid || this.$v.display_name.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        if(this.can_have_gateways =="")this.can_have_gateways =false; //needed to set empty radio to false
        this.message = "";
        AuthenticationService.create_networks({
          network_name: this.network_name,
          display_name: this.display_name,
          can_have_gateways: this.can_have_gateways
        }).then(result => {
          let data = JSON.parse(result.data.networks_lora);
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$emit('network_management', {data: data}); //passing the revecived array of networks to the parent component [Network]
        }).catch(err => {
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
