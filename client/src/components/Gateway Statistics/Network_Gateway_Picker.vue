<template>
  <v-layout row wrap>
    <!--Network Name-->
      <v-flex xs12 sm6 md5 class="pr-2">
        <v-select
          v-model="network_name_form"
          :items="this.network_names"
          label="Network"
          clearable
          multiple
          prepend-icon="domain"
        >
          <template
            slot="selection"
            slot-scope="{ item, index }"
          >
            <v-chip v-if="index === 0">
              <span>{{ item }}</span>
            </v-chip>
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ network_name_form.length - 1 }} others)</span>
          </template>
        </v-select>
      </v-flex>
    <!--Gateway-->
      <v-flex xs12 sm6 md5 class="mr-4">
        <v-select
          v-model="gateway_name_form"
          :items="this.gateway_names"
          label="Gateway"
          clearable
          multiple
          prepend-icon="settings_input_antenna"
        >
          <template
            slot="selection"
            slot-scope="{ item, index }"
          >
            <v-chip v-if="index === 0">
              <span>{{ item }}</span>
            </v-chip>
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ gateway_name_form.length - 1 }} others)</span>
          </template>
        </v-select>
      </v-flex>
  </v-layout>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
import functions from "./../../services/functions/forms_functions.js"

export default {
  data() {
    return {
      networks: [], //List that holds all the networks from the database
      gateways : [], 

      network_names: [], //A list that holds all the networks in id:name form
      gateway_names : [], 

      network_name_form: [], //A list that holds all the networks selected on the form in id:name form
      gateway_name_form : [], 

      network_id: [], //A list that holds all the network id's selected
      gateway_id : [],

    };
  },
   props:[
   'type_prop',
  ],
  created: async function(){
    AuthenticationService.get_networks_database().then(result => {
      this.networks = result.data.networks_db;
      for(let i = 0; i < this.networks.length; i++){
        this.network_names.push(this.networks[i].network_id.concat(":",this.networks[i].network_name));
      }
    }).catch(err => {
      //Error getting networks from server
      this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})
    })
    AuthenticationService.get_gateways_database().then(result => {
      this.gateways = result.data.gateways;
    }).catch(err => {
      //Error getting networks from server
      this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})
    })
  },
  watch: {
    network_name_form: async function(){
      this.gateway_name_form = []; 
      this.set_gateway_names_and_gateway_id_given_network_name_form(this.network_name_form);
      this.$emit('gateway_id', this.gateway_id)
     },
     gateway_name_form: async function(){
      if(this.gateway_name_form.length > 0){//will only run if we have a selected network
        this.gateway_id = [];
        for(let i = 0; i< this.gateway_name_form.length; i++){
          this.gateway_id.push(functions.extract_id_id_name(this.gateway_name_form[i]))
        }
      }else if(this.gateway_name_form.length == 0){
        //This will ensure that if i have networks selected and select an individual gateway... if i clear the selected gateways and then press generate, the gateways under the selected networks will be returned
        if(this.network_name_form.length > 0 ){//will only run if we have a selected network
          this.set_gateway_names_and_gateway_id_given_network_name_form(this.network_name_form);
        }
      }
      this.$emit('gateway_id', this.gateway_id)
    } 
  },
  methods: {
    set_gateway_names_and_gateway_id_given_network_name_form: function(network_name_form){
      this.gateway_names = []; 
      this.network_id = [];
      this.gateway_id = [];
      for(let i = 0; i< network_name_form.length; i++){
        this.network_id.push(functions.extract_id_id_name(network_name_form[i]))
      }
      if(network_name_form.length > 0 ){//will only run if we have a selected network
        for(let i = 0; i< this.network_id.length; i++){
          for(let j = 0; j< this.gateways.length; j++){
            if(this.network_id[i] == this.gateways[j].network_id){
              this.gateway_names.push(this.gateways[j].gateway_id + ":" +this.gateways[j].gateway_name);
            }
          }
        }
      }
       for(let i = 0; i < this.gateway_names.length; i++){ //will get the ids of the subnets under the selected network and emit it. If generate is pressed these ids will be used to filter the data
          this.gateway_id.push(functions.extract_id_id_name(this.gateway_names[i]));
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>