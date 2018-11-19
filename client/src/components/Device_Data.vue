<template>
  <v-content>
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
        <v-btn v-on:click="downloadCSV(device_data)">Export</v-btn>
        <v-btn v-on:click="generate_function()">Generate</v-btn>
        <v-layout row wrap>
        <!-- Date Picker-->
        <v-flex xs12 sm6 md4>
        <date_time_picker v-bind:type_prop = 0 v-bind:generate_prop = this.generate @date= start_date_time_function($event)></date_time_picker>
        </v-flex>
        <v-flex xs12 sm6 md4>
        <date_time_picker v-bind:type_prop = 1 v-bind:generate_prop = this.generate @date= end_date_time_function($event)></date_time_picker>
        </v-flex>
        </v-layout>

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
          >
        <template slot="items" slot-scope="myprops">
        <td v-for="header in display"
        :key="header.text"
        :class="['column sortable text-xs-left', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']">
        {{ myprops.item[header.value] }}
        </td>
      </template>
    </v-data-table>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../services/AuthenticationService.js";
import date_time_picker from "./Date_Time_Picker";


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
export default {
  components:{
    date_time_picker,
  },
  data(){
    return {
        device_data: [],
        loading: true,
        pagination: {},
        rows_per_page_items: [ 50, 100, 250, 1000, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],
        header_names: [], //Array holding the headings
        value: [],
        display: [],
        headers: [],
        generate: 0, //set this high when the user selects generate
        start_date_time: "", //This holds the start date and time in the format of the data in the db
        end_date_time: "" //This holds the end date and time in the format of the data in the db
    }
  },
  props: [
    'devices_prop'
  ],
  created: async function(){
    try{
      let result = await AuthenticationService.get_device_data_initial()
        .catch(err => {
          //Error getting the devices from the server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
          throw err;
          })
      this.device_data = JSON.parse(result.data.device_data);
      this.headers =  JSON.parse(result.data.headers);
      for(let i =0; i< this.headers.length; i++){
        this.header_names.push(this.headers[i].text);
        this.value.push(this.headers[i].text);
      }
      this.display = this.headers
      this.loading = false;
    }catch(err){
      console.log(err);
    }
  },
  watch: {
    devices_prop: function(){
      this.devices = this.devices_prop;
    },
    pagination: async function(){
      try{
        this.loading = true;
        let result = await AuthenticationService.get_device_data_specific_heading(this.pagination, this.value)
          .catch(err => {
            //Error getting the devices from the server
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
            throw err;
            })
        this.device_data = JSON.parse(result.data.device_data);
        this.headers =  JSON.parse(result.data.headers);
        this.display = this.headers
        this.loading = false;
      }catch(err){
        console.log(err);
      }
    },
    value: async function(){
      try{
        this.loading = true;
        let result = await AuthenticationService.get_device_data_specific_heading(this.pagination, this.value)
          .catch(err => {
            //Error getting the devices from the server
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
            throw err;
            })
        this.device_data = JSON.parse(result.data.device_data);
        this.headers =  JSON.parse(result.data.headers);
        this.display = this.headers
        this.loading = false;
      }catch(err){
        console.log(err);
      }
    }
  },
  methods: {
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
    generate_function: function(){
      this.generate = 1;
      
    },
    start_date_time_function: function(data){
      this.start_date_time = data;
    },
    end_date_time_function: async function(data){
      console.log('heree')
      this.end_date_time = data;
      this.loading = true;
        let result = await AuthenticationService.get_device_data_specific_heading_specified_date(this.pagination, this.value, this.start_date_time, this.end_date_time)
          .catch(err => {
            //Error getting the devices from the server
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
            throw err;
            })
        this.device_data = JSON.parse(result.data.device_data);
        this.headers =  JSON.parse(result.data.headers);
        this.display = this.headers
        this.generate = 0;
        this.loading = false;
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 