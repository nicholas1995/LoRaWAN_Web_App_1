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
                v-model="name"
                hint= 'Network Name'
                :error-messages = "nameErrors"
                :label="this.network.name"
                @keyup="$v.name.$touch()" 
              ></v-text-field>
              </v-flex>
            <!--Network Display Name-->
              <v-text-field
                v-model="display_name"
                :error-messages = "display_nameErrors"
                hint= 'Display Name'
                :label="this.network.display_name"
                @keyup="$v.display_name.$touch()"
              ></v-text-field>
            <!--Can Have Gateways-->
              <v-checkbox
                :v-model="can_have_gateways"
                :label="`Can Have Gateways: ${this.network.can_have_gateways}`"
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
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
      name: {
        required,
        maxLength: maxLength(20),
        minLength: minLength(2)
      },      
      display_name: {
        required,
        maxLength: maxLength(20),
        minLength: minLength(2)
      }
    },
  data() {
    return {
      name: "",
      display_name: "",
      can_have_gateways: "",
      message: ""
    };
  },
  props:[
   'network'
  ],
  computed: {
    nameErrors(){
      const errors=[];
      if (!this.$v.name.$error)return errors
      !this.$v.name.maxLength && errors.push('Name must be 20 characters or longer')
      !this.$v.name.minLength && errors.push('Name must be 2 characters or longer.')
      !this.$v.name.required && errors.push('Name is required.')
      return errors;
    },
    display_nameErrors(){
      const errors=[];
      if (!this.$v.display_name.$error)return errors
      !this.$v.display_name.maxLength && errors.push('Display Name must be 20 characters or longer')
      !this.$v.display_name.minLength && errors.push('Display Name must be 2 characters or longer.')
      !this.$v.display_name.required && errors.push('Display Name is required.')
      return errors;
    }
  },
  methods: {
    update_network() {
      this.$v.$touch();
      if(this.$v.name.$invalid || this.$v.display_name.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        console.log(this.network);
        if(this.can_have_gateways =="")this.can_have_gateways =false; //needed to set empty radio to false
        this.message = "";
        AuthenticationService.update_networks({
          id: this.network.id,
          name: this.name,
          display_name: this.display_name,
          can_have_gateways: this.can_have_gateways
      }).then(result => {
        this.$emit('network_management', result.data); //passing the revecived array of networks to the parent component [Network]
      }).catch(err => {
        console.log(err);
      })
      }
    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
