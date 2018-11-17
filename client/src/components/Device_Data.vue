<template>
  <v-content>
    <v-flex xs4 sm12>
          <v-select
            v-model="value"
            :items="this.items"
            attach
            chips
            label="Headings"
            multiple
          ></v-select>
        </v-flex>
    <v-toolbar class="elevation-1" color="grey lighten-3">
      <v-toolbar-title>Device Uplink</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
    </v-toolbar>
      <v-data-table
            :headers="headers"
            :items="device_data"
            :pagination.sync="pagination"
            :loading="loading"
            :rows-per-page-items= "rows_per_page_items"
            class="elevation-1"
          >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.application_id }}</td>
        <td class="text-xs-left">{{ props.item.application_name }}</td>
        <td class="text-xs-left">{{ props.item.device_name }}</td>
        <td class="text-xs-left">{{ props.item.device_eui }}</td>
        <td class="text-xs-left">{{ props.item.rx_info_gateway_id }}</td>
        <td class="text-xs-left">{{ props.item.rx_info_name }}</td>
        <td class="text-xs-left">{{ props.item.rx_info_time | return_date}}</td>
        <td class="text-xs-left">{{ props.item.rx_info_rssi }}</td>
        <td class="text-xs-left">{{ props.item.rx_info_lora_snr }}</td>
        <td class="text-xs-left">{{ props.item.rx_info_location_latitude }}</td>
        <td class="text-xs-left">{{ props.item.rx_info_location_longitude }}</td>
        <td class="text-xs-left">{{ props.item.rx_info_location_altitude }}</td>
        <td class="text-xs-left">{{ props.item.tx_info_frequency }}</td>
        <td class="text-xs-left">{{ props.item.tx_info_dr }}</td>
        <td class="text-xs-left">{{ props.item.adr }}</td>
        <td class="text-xs-left">{{ props.item.f_cnt }}</td>
        <td class="text-xs-left">{{ props.item.f_port }}</td>
        <td class="text-xs-left">{{ props.item.data }}</td>
        <td class="text-xs-left">{{ props.item.object_gps_location_latitude }}</td>
        <td class="text-xs-left">{{ props.item.object_gps_location_longitude }}</td>
        <td class="text-xs-left">{{ props.item.object_gps_location_altitude }}</td>
      </template>
    </v-data-table>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../services/AuthenticationService.js";
import date_time from "../services/functions/date_time.js";

export default {
  data(){
    return {
      headers: [
          { text: 'ID', value: 'id', sortable: true },
          { text: 'Sub-Network ID', value: 'application_id' , sortable: true },
          { text: 'Sub-Network Name', value: 'application_name' , sortable: true },
          { text: 'Device Name', value: 'device_name' ,sortable: true},
          { text: 'Device EUI', value: 'device_eui' , sortable: true },
          { text: 'Rx Gateway ID', value: 'rx_info_gateway_id', sortable: true },
          { text: 'Rx Gateway Name', value: 'rx_info_name' , sortable: true },
          { text: 'Rx Time', value: 'rx_info_time' , sortable: true },
          { text: 'Rx RSSI', value: 'rx_info_rssi' ,sortable: true},
          { text: 'Rx LoRa SNR', value: 'rx_info_lora_snr' , sortable: true },
          { text: 'Rx Gateway Latitude', value: 'rx_info_location_latitude', sortable: true },
          { text: 'Rx Gateway Longitude', value: 'rx_info_location_longitude' , sortable: true },
          { text: 'Rx Gateway Altitude', value: 'rx_info_location_altitude' , sortable: true },
          { text: 'Tx Frequency', value: 'tx_info_frequency' ,sortable: true},
          { text: 'Tx DR', value: 'tx_info_dr' , sortable: true },
          { text: 'Adr', value: 'adr', sortable: true },
          { text: 'FCnt', value: 'f_cnt' , sortable: true },
          { text: 'FPort', value: 'f_port' , sortable: true },
          { text: 'Encoded Data', value: 'data' ,sortable: true},
          { text: 'GPS Sensor Latitude', value: 'object_gps_location_latitude', sortable: true },
          { text: 'GPS Sensor Longitude', value: 'object_gps_location_longitude' , sortable: true },
          { text: 'GPS Sensor Altitude', value: 'object_gps_location_altitude' , sortable: true },

        ],
        device_data: [],
        loading: true,
        pagination: {},
        rows_per_page_items: [ 50, 100, 250, 1000, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],
        items: [], //Array holding the headings
        value: []
    }
  },
  props: [
    'devices_prop'
  ],
  created: function(){
      for(let i =0; i< this.headers.length; i++){
        this.items[i] = this.headers[i].text;
      }
  },
  watch: {
    devices_prop: function(){
      this.devices = this.devices_prop;
    },
    pagination: async function(){
      try{
        this.loading = true;
        let result = await AuthenticationService.get_device_data(this.pagination)
          .catch(err => {
            //Error getting the devices from the server
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
            throw err;
            })
        this.device_data = JSON.parse(result.data.device_data);
        this.loading = false;
      }catch(err){
        console.log(err);
      }

      
    }
  },
  mounted: async function () {
    try{
      let result = await AuthenticationService.get_device_data(this.pagination)
        .catch(err => {
          //Error getting the devices from the server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
          throw err;
          })
      this.device_data = JSON.parse(result.data.device_data);
      this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
      this.loading = false;
    }catch(err){
      console.log(err);
    }

  },
  destroyed: function(){
  },
  methods: {
  },
  filters: {
        //This function accepts the date and time in ISO 8601 Date and Time in UTC and return DD-MON-YY HH:MM:SS.
        //If the date is empty however it will return N/A
    return_date(date){
      let full_date;
      if(date == "" || date == null){
        full_date = "N/A"
      }else{
        date = new Date(date);
        let month = date_time.return_month(date.getMonth()); //returns the month in 3 letters
        let day = date_time.add_zero(date.getDate());
        let year = date.getUTCFullYear() -2000; //converts the full year to 2 digits 
        let hour = date_time.add_zero(date.getHours());
        let minutes = date_time.add_zero(date.getUTCMinutes());
        let seconds = date_time.add_zero(date.getUTCSeconds());
        full_date = day+"-"+month+"-"+year +" " + hour +":"+ minutes+":"+ seconds;
      }
      return full_date;
    } 
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 