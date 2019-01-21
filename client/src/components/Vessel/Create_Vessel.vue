<template>
  <v-content v-if="this.access == 1">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="primary">
              <v-toolbar-title>Create Vessel</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <v-form>
              <!--$touch is used to manually set dirty when the event occurs
              and dirty is used to validate the data field--> 
            <!--vessel Name -->
              <v-flex >
                <v-text-field
                  v-model="vessel_name"
                  :error-messages = "vessel_name_errors"
                  label="Vessel Name*"
                  @keyup="$v.vessel_name.$touch()">
                </v-text-field>
              </v-flex>       
            <!--Unique Vessel Identifier --> 
              <v-flex >
                <v-text-field
                  v-model="vessel_unique_vessel_identifier"
                  :error-messages = "vessel_unique_vessel_identifier_errors"
                  label="Unique Vessel Identifier*"
                  @keyup="$v.vessel_unique_vessel_identifier.$touch()">
                </v-text-field>
              </v-flex>
            <!--International radio call sign --> 
              <v-flex >
                <v-text-field
                  v-model="vessel_international_radio_call_sign"
                  :error-messages = "vessel_international_radio_call_sign_errors"
                  label="International Radio Call Sign*"
                  @keyup="$v.vessel_international_radio_call_sign.$touch()">
                </v-text-field>
              </v-flex>
            <!--Vessel Type-->
              <v-select
                v-model="vessel_type_form"
                :items="this.vessel_type"
                label="Vessel Type*"
                :error-messages = "vessel_type_form_errors"
                @blur="$v.vessel_type_form.$touch()" 
              >
              </v-select>
            <!--Network Name-->
              <v-select
                v-model="network_name_form"
                :items="this.network_names"
                label="Network*"
                :error-messages = "network_name_form_Errors"
                @blur="$v.network_name_form.$touch()" 
              >
              </v-select>
            <!--Sub-Network Name-->
              <v-select
                v-model="sub_network_name_form"
                :items="this.sub_network_names"
                label="Sub-Network*"
                :error-messages = "sub_network_name_form_Errors"
                @blur="$v.sub_network_name_form.$touch()" 
              >
              </v-select>
              </v-form>
              <div div class="text">
                {{message}} 
              </div>
              <v-btn class="grey lighten-2"
                @click.stop="create_vessel()">
                Create vessel
              </v-btn>
              <v-btn class="grey lighten-2"
                @click.stop="$router.push(`/vessel`)">
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
import functions from "../../services/functions/forms_functions.js"
import { validationMixin } from 'vuelidate'
import { required, maxLength, helpers } from 'vuelidate/lib/validators'


const unique_vessel_name= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.vessels.length; i++){
    if(value ==this.vessels[i].vessel_name){
      return 0;
    }
  } 
  return x; 
}

const unique_vessel_unique_vessel_identifier= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.vessels.length; i++){
    if(value ==this.vessels[i].vessel_unique_vessel_identifier){
      return 0;
    }
  } 
  return x; 
}

const unique_vessel_international_radio_call_sign= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.vessels.length; i++){
    if(value ==this.vessels[i].vessel_international_radio_call_sign){
      return 0;
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
        u: unique_vessel_name,
      },    
      vessel_unique_vessel_identifier: {
        required,
        maxLength: maxLength(80),
        u: unique_vessel_unique_vessel_identifier,
      },
      vessel_international_radio_call_sign: {
        required,
        maxLength: maxLength(80),
        u: unique_vessel_international_radio_call_sign,
      },        
      vessel_type_form: {
        required,
      },    
      network_name_form: {
        required,
      },   
      sub_network_name_form: {
        required,
    },    
    },
  data() {
    return {
      access: 0,

      vessels: '',
      vessel_name: '',
      vessel_unique_vessel_identifier: '',
      vessel_international_radio_call_sign: '',
      vessel_type: ['Fishing', 'Commercial', 'Rental', 'Coast Guard'],
      vessel_type_form: '',
      sub_networks_lora : [], //a list of all the subnetworks on the app server
      network_names: [],
      sub_network_names: [],
      network_name_form: '', //this is the variable that holds the selected network 'id-name'
      sub_network_name_form: '', //this is the variable that holds the selected sub_network 'id:name'
      network_id: '', //this is the variable that holds the id of the selected network
      sub_network_id: '',
      message: ""
    };
  },
  created: async function () { //get all the networks and sub-networks on creation of the component. This is done so we do not need to keep fetching data from the lora app server
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("vessels", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //---------------------------Start------------------------
        //Get Vessels
        AuthenticationService.get_vessels(null, 0).then(result => {
          this.vessels = result.data.vessels_db;
          this.$emit('message_display',{message:result.data.message, type:result.data.type})   
        }).catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})      
        })
        //Get Networks
        AuthenticationService.get_networks().then(result => {
          let networks_lora = result.data.networks_lora;
          for(let i = 0; i < networks_lora.length; i++){
            this.network_names.push(networks_lora[i].network_id.concat(":",networks_lora[i].network_name));
          }
          if(this.network_names.length == 0){
            //This will route the user to the create network page if no network exists 
            if(confirm('There are no created Networks. Route to the Create Network Page?') == true){
              this.$router.push(`/network/create`)
            };
          }
        }).catch(err => {
          //Error getting networks from server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})
        })
        //Get Subnetworks
        AuthenticationService.get_sub_networks().then(result => {
            this.sub_networks_lora = result.data.sub_networks_lora;
          }).catch(err => {
            //Error getting sub-networks from server
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
          })
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
  watch: { //filter the subnetworks depending on the networks. 
    network_name_form: function(){
      this.sub_network_names =[];
      this.sub_network_name_form ='';
      this.network_id=functions.extract_id_id_name(this.network_name_form); //extract id of network
      for(let i = 0; i < this.sub_networks_lora.length; i++){
        if(this.sub_networks_lora[i].network_id == this.network_id){
          this.sub_network_names.push(this.sub_networks_lora[i].sub_network_id.concat(":",this.sub_networks_lora[i].sub_network_name));
        }
      }
      if(this.sub_network_names.length == 0){
        //This will route the user to the create sub-network page if no sub-network exists under selected network 
        if(confirm('There are no Sub-Networks associated with the selected Network. Route to the Create Sub-Network Page?') == true){
          this.$router.push(`/subnetwork/create`)
        };
      }
    }
  },
  computed: {
    vessel_name_errors(){
      const errors=[];
      if (!this.$v.vessel_name.$error)return errors
      !this.$v.vessel_name.maxLength && errors.push('Name must be 80 characters or less.')
      !this.$v.vessel_name.required && errors.push('Name is required.')
      !this.$v.vessel_name.u && errors.push('Name must be unique.')
      return errors;
    },
      vessel_unique_vessel_identifier_errors(){
      const errors=[];
      if (!this.$v.vessel_unique_vessel_identifier.$error)return errors
      !this.$v.vessel_unique_vessel_identifier.required && errors.push('Vessel Unique Vessel Identifier is required.')
      !this.$v.vessel_unique_vessel_identifier.u && errors.push('Vessel Unique Vessel Identifier must be unique.')
      return errors;
    },
      vessel_international_radio_call_sign_errors(){
      const errors=[];
      if (!this.$v.vessel_international_radio_call_sign.$error)return errors
      !this.$v.vessel_international_radio_call_sign.required && errors.push('Vessel International Radio Call Sign is required.')
      !this.$v.vessel_international_radio_call_sign.u && errors.push('Vessel International Radio Call Sign must be unique.')
      return errors;
    },
      vessel_type_form_errors(){
      const errors=[];
      if (!this.$v.vessel_type_form.$error)return errors
      !this.$v.vessel_type_form.required && errors.push('Vessel Type is required.')
      !this.$v.vessel_type_form.u && errors.push('Vessel Type must be unique.')
      return errors;
    },
    network_name_form_Errors(){
      const errors=[];
      if (!this.$v.network_name_form.$error)return errors
      !this.$v.network_name_form.required && errors.push('Network is required.')
      return errors;
    },
      sub_network_name_form_Errors(){
      const errors=[];
      if (!this.$v.sub_network_name_form.$error)return errors
      !this.$v.sub_network_name_form.required && errors.push('Sub-Network is required.')
      return errors;
    },
  },
  methods: {
    create_vessel(){
      this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
      //text fields are used it will still show an error
      if(this.$v.vessel_name.$invalid || this.$v.vessel_unique_vessel_identifier.$invalid || this.$v.vessel_international_radio_call_sign.$invalid 
      || this.$v.vessel_type_form.$invalid || this.$v.network_name_form.$invalid || this.$v.sub_network_name_form.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        this.sub_network_id=functions.extract_id_new(this.sub_network_name_form); //extract id of sub_network
        AuthenticationService.create_vessels({
          vessel_name: this.vessel_name,
          vessel_unique_vessel_identifier: this.vessel_unique_vessel_identifier,
          vessel_international_radio_call_sign: this.vessel_international_radio_call_sign,
          vessel_type: this.vessel_type_form,
          sub_network_id: this.sub_network_id,
        }).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$router.push(`/vessel`)
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
