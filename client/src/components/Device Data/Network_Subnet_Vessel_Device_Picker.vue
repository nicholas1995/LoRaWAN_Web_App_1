<template>
  <v-layout row wrap>
    <!--Network Name-->
      <v-flex xs12 sm6 md3 class="pr-4">
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
    <!--Sub-Network Name-->
      <v-flex xs12 sm6 md3 class="pr-4">
        <v-select
          v-model="sub_network_name_form"
          :items="this.sub_network_names"
          label="Sub-Network"
          clearable
          multiple
          prepend-icon="apps"
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
            >(+{{ sub_network_name_form.length - 1 }} others)</span>
          </template>
        </v-select>
      </v-flex>
    <!--Vessel-->
      <v-flex xs12 sm6 md3 class="pr-4">
        <v-select
          v-model="vessel_name_form"
          :items="this.vessel_names"
          label="Vessel"
          clearable
          multiple
          prepend-icon="directions_boat"
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
            >(+{{ vessel_name_form.length - 1 }} others)</span>
          </template>
        </v-select>
      </v-flex>
    <!--Device-->
      <v-flex xs12 sm6 md3 class="pr-4">
        <v-select
          v-model="device_name_form"
          :items="this.device_names"
          label="Device"
          clearable
          multiple
          prepend-icon="devices"
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
            >(+{{ device_name_form.length - 1 }} others)</span>
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
      sub_networks : [], 
      vessels: [],
      devices: [],

      network_names: [], //A list that holds all the networks in id:name form
      sub_network_names : [], 
      vessel_names: [],
      device_names: [],

      network_name_form: [], //A list that holds all the networks selected on the form in id:name form
      sub_network_name_form : [], 
      vessel_name_form: [],
      device_name_form: [],

      network_id: [], //A list that holds all the network id's selected
      sub_network_id : [],
      vessel_id: [],
      device_id: [],

      sub_network_prop_update_flag: 0, //this is used for the analyst filter record. When the record has a subnetwork the subnetwork prop watcher will be executed. before this
      //the network prop watcher will be called causing the network watcher to be called which fetches the subnetworks for the networks in the analyst record. We need to wait until
      //this is completed before we can filter the sub-networks in the record. This flag will be set high if we have a subnetwork record to place on the form. 
      vessel_prop_update_flag: 0,
      device_prop_update_flag: 0, 
    };
  },
   props:[
   'network_prop',
   'sub_network_prop',
   'vessel_prop',
   'device_prop',

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

      this.sub_network_name_form = []; 
      this.vessel_name_form = [];
      this.device_name_form = [];

      this.network_id = [];
      this.sub_network_id = [];
      this.vessel_id = [];
      this.device_id = [];
      for(let i = 0; i< this.network_name_form.length; i++){
        this.network_id.push(functions.extract_id_id_name(this.network_name_form[i]))
      }
      if(this.network_id.length > 0 ){//will only run if we have a selected network
        this.sub_networks = await AuthenticationService.get_sub_networks_db_given_network(this.network_id)
          .catch(err => {
            //Error fetching sub_networks specified by network from server
            console.log(err)
          })
        this.sub_networks = this.sub_networks.data.sub_networks;
        for(let i = 0; i < this.sub_networks.length; i++){
          this.sub_network_names.push(this.sub_networks[i].sub_network_id.concat(":",this.sub_networks[i].sub_network_name));
        }
        for(let i = 0; i < this.sub_networks.length; i++){ //will get the ids of the subnets under the selected network and emit it. If generate is pressed these ids will be used to filter the data
          this.sub_network_id.push(this.sub_networks[i].sub_network_id);
        }
      }
      this.$emit('network_id', this.network_id)//this is only being emitted so we can have the networks for the analyst filter records
      this.$emit('sub_network_id', this.sub_network_id)

      if(this.sub_network_prop_update_flag  == 1){ //This is used for the analyst filter records
        this.sub_network_name_form = []; //clear the form of any previous data
        for(let i = 0; i < this.sub_network_prop.length; i++){
          for(let j = 0; j< this.sub_networks.length; j++){
            if(this.sub_network_prop[i] == this.sub_networks[j].sub_network_id){
              this.sub_network_name_form.push(this.sub_networks[j].sub_network_id.concat(":",this.sub_networks[j].sub_network_name));
              break;
            }
          }
        }
        this.sub_network_prop_update_flag = 0;
      }
    },
    sub_network_name_form: async function(){
      this.vessels = [];
      this.devices = [];

      this.vessel_names = [];
      this.device_names = [];

      this.vessel_name_form = [];
      this.device_name_form = [];

      this.sub_network_id = [];
      this.vessel_id = [];
      this.device_id = [];
      if(this.sub_network_name_form.length > 0){//will only run if we have a selected sub_network
        for(let i = 0; i< this.sub_network_name_form.length; i++){
          this.sub_network_id.push(functions.extract_id_id_name(this.sub_network_name_form[i]))
        }
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
      this.$emit('sub_network_id', this.sub_network_id)
      if(this.vessel_prop_update_flag  == 1){ //This is used for the analyst filter records
        for(let i = 0; i < this.vessel_prop.length; i++){
          for(let j = 0; j< this.vessels.length; j++){
            this.vessel_prop_update_flag = 0; //this is put here to ensure that it is only blocked after the vessels has been fetched from the db and the form record updated
            if(this.vessel_prop[i] == this.vessels[j].vessel_id){
              this.vessel_name_form.push(this.vessels[j].vessel_id+":"+this.vessels[j].vessel_name);
              break;
            }
          }
        }
      }
    },
    vessel_name_form: async function(){
      this.devices = [];
      this.device_names = [];
      this.device_name_form = [];

      this.vessel_id = [];
      this.device_id = [];
      if(this.vessel_name_form.length > 0){//will only run if we have a selected vessel
        for(let i = 0; i< this.vessel_name_form.length; i++){
          this.vessel_id.push(functions.extract_id_id_name(this.vessel_name_form[i]))
        }
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
      this.$emit('vessel_id', this.vessel_id)
      if(this.device_prop_update_flag  == 1){ //This is used for the analyst filter records
        for(let i = 0; i < this.device_prop.length; i++){
          for(let j = 0; j< this.devices.length; j++){
             this.device_prop_update_flag = 0; //this is put here because vessel name form is called when the network form is updated and then this will run becauase we have a prop
             //for the devices and it will clear the prop value. The vessel name from watcher will be called again when the sub_network name form updated with the record and this will
             //not be able to run because if the device prop update flag is outside this for loop it would have been set to 0 altho the record would not have updated the form
            if(this.device_prop[i] == this.devices[j].device_id){
              this.device_name_form.push(this.devices[j].device_id+":"+this.devices[j].device_name);
              break;
            }
          }
        }
      }
    },
    device_name_form: async function(){
      this.device_id = [];
      if(this.device_name_form.length > 0){//will only run if we have a selected device
        for(let i = 0; i< this.device_name_form.length; i++){
          this.device_id.push(functions.extract_id_id_name(this.device_name_form[i]))
        }
      }
      this.$emit('device_id', this.device_id)
    },
    network_prop: function(){
      this.network_name_form = []; //clear the form of any previous data
      for(let i = 0; i < this.network_prop.length; i++){
        for(let j = 0; j< this.networks.length; j++){
          if(this.network_prop[i] == this.networks[j].network_id){
            this.network_name_form.push(this.networks[j].network_id.concat(":",this.networks[j].network_name));
            break;
          }
        }
      }
    },
    sub_network_prop: function(){
      this.sub_network_prop_update_flag = 1;
      //Problem... this will always be ready before the network_prop causes the sub_networks to be fetched from the database hence we will not have any sub-networks 
      //available to filter from.. to over come this problem the flags will be used 
    },
    vessel_prop: function(){
      this.vessel_prop_update_flag = 1;
    },
    device_prop: function(){
      this.device_prop_update_flag = 1;
    },
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
