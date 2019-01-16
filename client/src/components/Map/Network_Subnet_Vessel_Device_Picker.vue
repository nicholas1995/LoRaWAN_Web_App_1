<template>
  <v-layout row wrap>
    <!--Network Name-->
      <v-flex xs12 sm6 md3 class="pr-4">
        <v-select
          v-model="network_name_form"
          :items="this.network_names"
          label="Network"
          clearable
          prepend-icon="domain"
        >
        </v-select>
      </v-flex>
    <!--Sub-Network Name-->
      <v-flex xs12 sm6 md3 class="pr-4">
        <v-select
          v-model="sub_network_name_form"
          :items="this.sub_network_names"
          label="Sub-Network"
          clearable
          prepend-icon="apps"
        >
        </v-select>
      </v-flex>
    <!--Vessel-->
      <v-flex xs12 sm6 md3 class="pr-4">
        <v-select
          v-model="vessel_name_form"
          :items="this.vessel_names"
          label="Vessel"
          clearable
          prepend-icon="directions_boat"
        >
        </v-select>
      </v-flex>
    <!--Device-->
      <v-flex xs12 sm6 md3 class="pr-4">
        <v-select
          v-model="device_name_form"
          :items="this.device_names"
          label="Device"
          clearable
          prepend-icon="devices"
        >
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
      sub_networks : [], 
      vessels: [],
      devices: [],

      network_names: [], //A list that holds all the networks in id:name form
      sub_network_names : [], 
      vessel_names: [],
      device_names: [],

      network_name_form: null, //A list that holds all the networks selected on the form in id:name form
      sub_network_name_form : null, 
      vessel_name_form: null,
      device_name_form: null,

      network_id: null, //A list that holds all the network id's selected
      sub_network_id : null,
      vessel_id: null,
      device_id: null,

    };
  },
   props:[
   'type_prop',
  ],
  created: function(){
    AuthenticationService.get_networks_database().then(result => {
      this.networks = result.data.networks_db;
      for(let i = 0; i < this.networks.length; i++){
        this.network_names.push(this.networks[i].network_id.concat(":",this.networks[i].network_name));
      }
    }).catch(err => {
      //Error getting networks from server
      this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})
    })
  },
  watch: {
    network_name_form: async function(){
      this.sub_networks = [];
      this.vessels = [];
      this.devices = [];

      this.sub_network_names = []; 
      this.vessel_names = [];
      this.device_names = [];

      this.sub_network_name_form = null; 
      this.vessel_name_form = null;
      this.device_name_form = null;

      this.network_id = null;
      this.sub_network_id = null;
      this.vessel_id = null;
      this.device_id = null;
      if(this.network_name_form){//will only run if we have a selected network
        this.network_id = functions.extract_id_id_name(this.network_name_form);
        this.sub_networks = await AuthenticationService.get_sub_networks_db_given_network(this.network_id)
          .catch(err => {
            //Error fetching sub_networks specified by network from server
            console.log(err)
          })
        this.sub_networks = this.sub_networks.data.sub_networks;
        for(let i = 0; i < this.sub_networks.length; i++){
          this.sub_network_names.push(this.sub_networks[i].sub_network_id.concat(":",this.sub_networks[i].sub_network_name));
        }
      }
    },
    sub_network_name_form: async function(){
      this.vessels = [];
      this.devices = [];

      this.vessel_names = [];
      this.device_names = [];

      this.vessel_name_form = null;
      this.device_name_form = null;

      this.sub_network_id = null;
      this.vessel_id = null;
      this.device_id = null;
      if(this.sub_network_name_form){//will only run if we have a selected sub_network
        this.sub_network_id = functions.extract_id_id_name(this.sub_network_name_form);
        this.vessels = await AuthenticationService.get_vessels(this.sub_network_id, null)
          .catch(err => {
            //Error fetching sub_networks specified by network from server
            console.log(err)
          })
        this.vessels = this.vessels.data.vessels_db;
        for(let j = 0; j < this.vessels.length; j++){
          this.vessel_names.push(this.vessels[j].vessel_id +":"+this.vessels[j].vessel_name);
        }
      }
    },
    vessel_name_form: async function(){
      this.devices = [];

      this.device_names = [];

      this.device_name_form = null;

      this.vessel_id = null;
      this.device_id = null;
      if(this.vessel_name_form){//will only run if we have a selected vessel
          this.vessel_id = functions.extract_id_id_name(this.vessel_name_form)
        this.devices = await AuthenticationService.get_devices_db_given_vessels(this.vessel_id)
          .catch(err => {
            //Error fetching devices specified by vessel from server
            console.log(err)
          })
        this.devices = this.devices.data.devices;
        for(let j = 0; j < this.devices.length; j++){
          this.device_names.push(this.devices[j].device_id +":"+this.devices[j].device_name);
        }
      }
    },
    device_name_form: async function(){
      this.device_id = null;
      if(this.device_name_form){//will only run if we have a selected device
          this.device_id = functions.extract_id_id_name(this.device_name_form);
      }
      this.$emit('device_id', this.device_id)
    }
  },
  methods: {
/*     clear_date_time: function(){
      this.date = null;
      this.time = null;
    } */
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
