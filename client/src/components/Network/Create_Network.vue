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
                  v-model="name"
                  :error-messages = "nameErrors"
                  label="Network Name"
                  @keyup="$v.name.$touch()" 
                ></v-text-field>
                </v-flex>
              <!--Display Name-->
                <v-text-field
                  v-model="display_name"
                  :error-messages = "display_nameErrors"
                  label="Display Name"
                  @keyup="$v.display_name.$touch()"
                ></v-text-field>
              <!--Can Have Gateways-->
                <v-checkbox
                  v-model="can_have_gateways"
                  label="Can Have Gateways"
                  required
                ></v-checkbox>
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
      name: '',
      display_name: "",
      can_have_gateways: "",
      message: "",
    };
  },
  beforeCreate: function () {

  },
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
    create_network(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.name.$invalid || this.$v.display_name.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        if(this.can_have_gateways =="")this.can_have_gateways =false; //needed to set empty radio to false
        this.message = "";
        AuthenticationService.create_networks({
          name: this.name,
          display_name: this.display_name,
          can_have_gateways: this.can_have_gateways
      }).then(result => {
        this.$emit('network_management', result.data); //passing the revecived array of networks to the parent component [Network]
      }).catch(err => {
        
      })
      

      }

    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
