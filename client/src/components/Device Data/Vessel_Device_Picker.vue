<template>
  <v-layout row wrap>
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
      vessels: [], //This contains the user_vessel records that the contains the user id joined with the name of the vessel for display
      devices: [],

      vessel_names: [],
      device_names: [],

      vessel_name_form: [],
      device_name_form: [],

      vessel_id: [],
      vessel_id_date_deleted: [], //an array of objects that contain the id of the vessel and the date it was deleted from the user
      
      device_id: [],

    };
  },
   props:[
   'type_prop',
  ],
  created: function(){
    //Note that if a user is assigned to a vessel then removed then reassigened some time after two records will be returned for the same vessel
    AuthenticationService.get_vessels(null, null).then(result => {
      this.vessels = result.data.vessels_db;
      for(let i = 0; i < this.vessels.length; i++){
        this.vessel_names.push(`${this.vessels[i].vessel_id}`.concat(":",this.vessels[i].vessel_name));
      }
    }).catch(err => {
      //Error getting networks from server
      this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})
    })
  },
  watch: {
    vessel_name_form: async function(){
      this.devices = [];

      this.device_names = [];

      this.device_name_form = [];

      this.vessel_id = [];
      this.vessel_id_date_deleted = [];

      this.device_id = [];
      if(this.vessel_name_form.length > 0){//will only run if we have a selected vessel
        let vessel_id;
        for(let i = 0; i< this.vessel_name_form.length; i++){
          vessel_id = functions.extract_id_id_name(this.vessel_name_form[i]);
          for(let j = 0 ; j< this.vessels.length; j++){
            if(vessel_id == this.vessels[j].vessel_id){
              this.vessel_id.push(functions.extract_id_id_name(this.vessel_name_form[i]))
              this.vessel_id_date_deleted.push({vessel_id: functions.extract_id_id_name(this.vessel_name_form[i]), date_deleted: this.vessels[j].date_deleted})
            }
          }
        }
        this.devices = await AuthenticationService.get_devices_self(this.vessel_id_date_deleted)
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
    },
    device_name_form: async function(){
      this.device_id = [];
      if(this.device_name_form.length > 0){//will only run if we have a selected device
        for(let i = 0; i< this.device_name_form.length; i++){
          this.device_id.push(functions.extract_id_id_name(this.device_name_form[i]))
        }
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
