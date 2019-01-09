<template>
  <v-content v-if="this.access == 1">
    <v-flex xs4 sm12>
          <v-combobox
            v-model="value"
            :items="this.header_names"
            label="Headings"
            multiple
            clearable
            chips
          ></v-combobox>
        </v-flex>
        <div v-if="this.$store.state.user_class !='Fisher'">
        <network_subnetwork_vessel_device_picker
          @sub_network_id = sub_network_id_function($event)
          @vessel_id = vessel_id_function($event)
          @device_id = device_id_function($event)
        ></network_subnetwork_vessel_device_picker>
        </div>
        <div v-else-if="this.$store.state.user_class =='Fisher'">
        <vessel_device_picker
          @vessel_id = vessel_id_function($event)
          @device_id = device_id_function($event)
        ></vessel_device_picker>
        </div>
        <v-layout row wrap>
        <!-- Date Picker-->
        <v-flex xs12 sm6 md4>
        <date_time_picker v-bind:type_prop ='0' @date= start_date_function($event) @time= start_time_function($event)></date_time_picker>
        </v-flex>
        <v-flex xs12 sm6 md4>
        <date_time_picker v-bind:type_prop = 1 @date= end_date_function($event) @time= end_time_function($event)></date_time_picker>
        </v-flex>
        </v-layout>
          <v-btn v-on:click="downloadCSV(device_data)">Export</v-btn>
        <v-btn v-on:click="generate_function()">Generate</v-btn>

    <v-toolbar class="elevation-1" color="grey lighten-3">
      <v-toolbar-title>Device Uplink</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
    </v-toolbar>
      <v-data-table
            :headers="display"
            :items="this.device_data"
            :pagination.sync="pagination"
            :loading="loading"
            :rows-per-page-items= "rows_per_page_items"
            class="elevation-1"
            style="max-height: 700px; overflow-y: auto"
          >
          <template slot="no-data" >
            <v-alert :value="this.allow_no_data" color="info" icon="warning" >
              No data available.
            </v-alert>
          </template>
        <template slot="items" slot-scope="myprops">
          <tr style="height: 30px;"> 
        <td v-for="header in display"
        :key="header.text"
        :class="['column sortable text-xs-left ', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']">
        {{ myprops.item[header.value] }}
        </td>
          </tr>
      </template>
    </v-data-table>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
import date_time_picker from "./../Date_Time_Picker";
import network_subnetwork_vessel_device_picker from "./Network_Subnet_Vessel_Device_Picker";
import vessel_device_picker from "./Vessel_Device_Picker";
import date_time_functions from "../../services/functions/date_time.js"


function convertArrayOfObjectsToCSV(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;
  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }
  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';
  keys = Object.keys(data[0]);
  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;
  data.forEach(function(item) {
    ctr = 0;
    keys.forEach(function(key) {
    if (ctr > 0) result += columnDelimiter;

    result += item[key];
    ctr++;
    });
    result += lineDelimiter;
  });
  return result;
}
function return_date_time(date, time){
  let date_time = null;
  if(date){
    if(time){
      date_time = date.concat(" "+ time+ ":00")
    }else{
      date_time = date.concat(" "+ "00:00:00")
    }
  }else{
    date_time = null;
  }
  return date_time;
}

export default {
  components:{
    date_time_picker,
    network_subnetwork_vessel_device_picker,
    vessel_device_picker

  },
  data(){
    return {
        access: 0,

        device_data: [],
        loading: true,
        pagination: {},
        rows_per_page_items: [ 50, 100, 250, 1000, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],
        header_names: [], //Array holding the headings
        value: [],
        display: [],
        headers: [],
        start_date: null,
        start_time: null,
        end_date: null,
        end_time: null,
        start_date_time: null, //This holds the start date and time in the format of the data in the db
        end_date_time: null, //This holds the end date and time in the format of the data in the db
        filter_parameters: {},

        sub_network_id: null,
        vessel_id: null,
        device_id: null,

        self: 0, //This will be set high if the data user class user wants to view vessles assigned to them 
        inital: true, //this is used to prevent the refetching of data when values is first assigned... so when value changes this will be set to false
        allow_no_data: false, //This is used to prevent the no data red notice from showing up when the page is now loaded... it will be enabled after the data is first fetched
    }
  },
  props: [
    'devices_prop'
  ],
  created: async function(){
    try{
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("device_data", "get")
          .catch(err => {
            throw err;
          });
        this.access =1;
        //-------------------------Start-------------------------
        let result;
        if(this.$store.state.user_class !='Fisher' && this.self ==0){
          result = await AuthenticationService.get_device_data_initial()
          .catch(err => {
            //Error getting the devices from the server
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
            throw err;
            })
        }else{
          this.self =1; 
          result = await AuthenticationService.get_device_data_initial_self()
          .catch(err => {
            //Error getting the devices from the server
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
            throw err;
            })
        }
          if(result.status == 204){ //No Data returned 
            this.allow_no_data = true;
            this.device_data = [];
            this.filter_parameters = {}; 
            this.loading = false;
         }else{ //Data returned
            this.allow_no_data = true;
            this.device_data = result.data.device_data;
            this.headers =  result.data.headers;
            for(let i =0; i< this.headers.length; i++){
              this.header_names.push(this.headers[i].text);
              this.value.push(this.headers[i].text);
            }
            this.display = this.headers
            this.loading = false;
         }

        }else{
          alert('Please login.');
          this.$router.push('/login');
        }
    }catch(err){
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
  watch: {
    devices_prop: function(){
      this.devices = this.devices_prop;
    },
    pagination: async function(){
      try{
        if(this.inital ==false){
          this.generate_function();
        }   
        this.inital = false;
      }catch(err){
        console.log(err);
      }
    },
    value: async function(){
      try{
        if(this.inital == false){
          this.generate_function();
        }
        this.inital = false;
      }catch(err){
        console.log(err);
      }
    }
  },
  methods: {
    start_date_function(date){
      this.start_date = date;
      this.start_date_time = null;
    },
    start_time_function(time){
      this.start_time = time;
      this.start_date_time = null;
    },    
    end_date_function(date){
      this.end_date = date;
      this.end_date_time = null;
    },
    end_time_function(time){
      this.end_time = time;
      this.end_date_time = null;
    },
    downloadCSV: function(args) {
      var data, filename, link;
      var csv = convertArrayOfObjectsToCSV({
        data: this.device_data
      });
      if (csv == null) return;
      filename = args.filename || 'export.csv';
      
      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
      }
      data = encodeURI(csv);
      link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
    },
    generate_function: async function(){
      if(this.value.length > 0){ //So we do not try to fetch data from the database unless we have a specified heading or else a 404 error will occur
        this.loading = true;
        this.start_date_time = return_date_time(this.start_date, this.start_time);
        this.end_date_time =return_date_time(this.end_date, this.end_time);
        if(this.start_date_time){
          this.filter_parameters["start_date"] = this.start_date_time;
        }
        if(this.end_date_time){
          this.filter_parameters["end_date"] = this.end_date_time;
        }
        if(this.pagination.sortBy){
          this.filter_parameters["sort_by"] = this.pagination.sortBy;
          if(this.pagination.descending == false) this.filter_parameters["order"] = 'ASC';
          else this.filter_parameters["order"] = 'DESC';
        }
        if(this.device_id && this.self ==0){
          this.filter_parameters["device"] = this.device_id;
          this.filter_parameters["vessel"] = this.vessel_id;
          this.filter_parameters["sub_network"] = this.sub_network_id;
        }else if(this.device_id && this.self ==1){
          this.filter_parameters["device"] = this.device_id;
          this.filter_parameters["vessel"] = this.vessel_id;
        }else if(this.vessel_id && this.self ==0){
          this.filter_parameters["vessel"] = this.vessel_id;
          this.filter_parameters["sub_network"] = this.sub_network_id;
        }else if(this.vessel_id && this.self ==1){
          this.filter_parameters["vessel"] = this.vessel_id;
        }else if(this.sub_network_id){
          this.filter_parameters["sub_network"] = this.sub_network_id;
        }
        await AuthenticationService.device_rx_filtered(this.filter_parameters, this.value).then(result=>{
          if(result.status == 204){ //No Data returned 
          this.device_data = [];
          this.filter_parameters = {}; 
          this.loading = false;
          }else{
          this.device_data = result.data.device_data;
          this.headers =  result.data.headers; 
          this.display = this.headers
          this.filter_parameters = {}; 
          this.loading = false;
          }
        }).catch(err => {
            //Error getting the devices from the server
            console.log(err)
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
            throw err;
            }) 
      }else this.device_data = [] //If no heading selected just set the data to empty so the message appears
    },
    sub_network_id_function: function(data){
      //The if else statements were used because in the Picker we always want to emit when the value changes not only when the array is greater than 0.
      //This is because if we clear the array in the picker it will not emit to clear the id data on the device_data component.
      //Now since we are always emitting we only want to save to the local variable when it is greater than 0. Any other time we set it to null. 
      if(data.length > 0 )this.sub_network_id = data
      else this.sub_network_id = null
    },
    vessel_id_function: function(data){
      if(data.length > 0 )this.vessel_id = data
      else this.vessel_id = null
    },
    device_id_function: function(data){
      if(data.length > 0 )this.device_id = data
      else this.device_id = null
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table.v-table tbody td, table.v-table tbody th {
    height: 20px;
}
</style>
 