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

      network_name_form_old: [],
      sub_network_name_form_old : [],
      vessel_name_form_old: [],
      device_name_form_old: [],

      network_id: [], //A list that holds all the network id's selected
      sub_network_id : [],
      vessel_id: [],
      device_id: [],

    };
  },
   props:[
   'type_prop',
  ],
  created: function(){
    //Get Networks
    AuthenticationService.get_networks_database().then(result => {
      this.networks = result.data.networks_db;
      for(let i = 0; i < this.networks.length; i++){
        this.network_names.push(this.networks[i].network_id.concat(":",this.networks[i].network_name));
      }
    }).catch(err => {
      //Error getting networks from server
      this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})
    })
    //Get Sub-Networks
    AuthenticationService.get_sub_networks_db_given_network().then(result => {
        this.sub_networks = result.data.sub_networks;
    }).catch(err => {
        //Error fetching sub_networks specified by network from server
        console.log(err)
      })
    //Get Vessels
    AuthenticationService.get_vessels().then(result => {
        this.vessels = result.data.vessels_db;  
    }).catch(err => {
        //Error fetching sub_networks specified by network from server
        console.log(err)
      })

  },
  watch: {
    network_name_form: async function(){
      let removed = this.removed_selection(this.network_name_form_old, this.network_name_form );

      this.sub_network_names = []; 

      this.network_id = [];
      this.sub_network_id = [];
 
      this.sub_network_names = this.names_associated_with_previous_selection(this.network_name_form, this.sub_networks, 'network','sub_network');
      this.removing_selected_names_from_select(removed, this.sub_network_name_form_old, this.sub_networks, 'network', 'sub_network')
      for(let i = 0; i < this.sub_network_names.length; i++){ //will get the ids of the subnets under the selected network and emit it. If generate is pressed these ids will be used to filter the data
        this.sub_network_id.push(functions.extract_id_id_name(this.sub_network_names[i]));
      }
      this.$emit('sub_network_id', this.sub_network_id)
      this.network_name_form_old = this.network_name_form; //Store the current value to the old value 
      //this.sub_network_name_form_old = this.sub_network_name_form; //Store the current value to the old value 
    },
     sub_network_name_form: async function(){
       console.log('hereeeeeeeeee')
       let removed = this.removed_selection(this.sub_network_name_form_old, this.sub_network_name_form );
       console.log(this.sub_network_name_form_old, this.sub_network_name_form )
      this.vessel_names = [];

      //this.vessel_name_form = [];

      this.sub_network_id = [];
      this.vessel_id = [];
      this.vessel_names = this.names_associated_with_previous_selection(this.sub_network_name_form, this.vessels, 'sub_network','vessel');
      this.removing_selected_names_from_select(removed, this.vessel_name_form_old, this.vessels, 'sub_network', 'vessel')
      this.$emit('sub_network_id', this.sub_network_id)
      this.sub_network_name_form_old = this.sub_network_name_form;
      //this.vessel_name_form_old = this.vessel_name_form;

    },
    vessel_name_form: async function(){
/*       this.devices = [];

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
      } */
      this.$emit('vessel_id', this.vessel_id)
      this.vessel_name_form_old = this.vessel_name_form;
    },
/*     device_name_form: async function(){
      this.device_id = [];
      if(this.device_name_form.length > 0){//will only run if we have a selected device
        for(let i = 0; i< this.device_name_form.length; i++){
          this.device_id.push(functions.extract_id_id_name(this.device_name_form[i]))
        }
      }
      this.$emit('device_id', this.device_id)
      this.device_name_form_old = this.device_name_form;
    }  */
  },
  methods: {
    removed_selection: function(old_value, new_value) {//returns the an array of the id's removed from the select component
      let accounted_for = [];
      let added = [];
      let deleted = [];

      for (let i = 0; i < new_value.length; i++) {
        if (old_value.length == 0) {
          added.push(i);
          //console.log('Sub-Network Added');
        }
        for (let j = 0; j < old_value.length; j++) {
          if (new_value[i] == old_value[j]) {
            accounted_for.push(j);
            break;
          } else if (j == old_value.length - 1) {
            added.push(i);
            //console.log('Sub-Network Added');
          } else if (new_value[i] != old_value[j]) {
          }
        }
      }
      for (let l = 0; l < old_value.length; l++) {
        let index = accounted_for.indexOf(l);
        if (index == -1) {
          deleted.push(functions.extract_id_id_name(old_value[l]) );
          //console.log('subnetwork deleted')
        }
      }
      return deleted;
    },
    names_associated_with_previous_selection: function(previous_selection, current_values, entity_1, entity_2){
      //Accepts two arrays. previous_selection is an array of the selcted names on the selection component.
      //current values is an array of ALL the values in the selection component following previous_selection
      //entity_1 refers to the name of the previous entity
      //entity_2 refers to the name of the current entity
      let ids = []; //An array of ids associated with previous_selection
      let names = []; //An array of the id:name values filtered from current_values which has the ids in previous_selection
      let id = `${entity_2}_id`;
      let name = `${entity_2}_name`;
      if(previous_selection.length > 0){//will only run if we have a selected sub_network
        for(let i = 0; i< previous_selection.length; i++){
          ids.push(functions.extract_id_id_name(previous_selection[i]))
        }
        for(let j = 0; j< ids.length; j++){
          for(let k = 0; k < current_values.length; k++){
            if(ids[j] == current_values[k][`${entity_1}_id`]){
              names.push(current_values[k][`${entity_2}_id`] +":"+current_values[k][`${entity_2}_name`]);
            }
          }
        }
      }
      return names;
    },
    removing_selected_names_from_select: function(removed_selection, old_values, values, entity_1, entity_2){
      //removed selection is an array of the elements removed from the previous entity
      //old_values is an array of the id:names of the slected values before the previous select was updated
      let id; //the value of the id in the old_values id_name
      let selection = []; //array of the old values minus the 
      for(let i = (old_values.length - 1); i >= 0; i--){ //old sub_nets selected
        id = functions.extract_id_id_name(old_values[i]) //subnet id
        for(let j = 0; j< values.length; j++){ //values is a list of all subnets
          if(id == values[j][`${entity_2}_id`]){ //get subnet with id = id
            for(let k = 0; k < removed_selection.length; k++){ //list of all the removed networks from the selection component
                if(removed_selection[k] == values[j][`${entity_1}_id`]){
                  this.remove(i, old_values)
                  break;
                }else{
                  selection.push(values[k][`${entity_2}_id`] +":"+values[k][`${entity_2}_name`])
                }
                //break;
            }
          }
          //break;
        }
      }
    },
    remove: function(index,data){
            if (index > -1) {
                data.splice(index, 1);
                return data;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>