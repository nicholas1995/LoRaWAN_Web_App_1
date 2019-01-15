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
    <v-layout row wrap>
      <v-flex xs4 sm6>
        <network_gateway_picker
          @gateway_id = gateway_id_function($event)
        ></network_gateway_picker>
      </v-flex>
    <!-- Date Picker-->
      <v-flex xs12 sm6 md3>
        <date_time_picker v-bind:type_prop ='0' @date= start_date_function($event) @time= start_time_function($event)></date_time_picker>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <date_time_picker v-bind:type_prop = 1 @date= end_date_function($event) @time= end_time_function($event)></date_time_picker>
      </v-flex>
    </v-layout>
    <v-toolbar class="elevation-1" color="grey lighten-3">
      <v-toolbar-title>Gateway Statistics</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-toolbar-items >
        <v-menu :nudge-width="100">
          <v-toolbar-title slot="activator">
            <v-btn flat class ="grey lighten-3" v-on:click="export_gateway_statistics" >Export Gateway Stats</v-btn>
          </v-toolbar-title>
          <v-list>
            <v-list-tile
              v-for="item in export_options"
              :key="item"
              v-on:click="export_gateway_statistics(item)"
            >
              <v-list-tile-title v-text="item"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat class ="grey lighten-3" v-on:click="generate_function()">Generate Filtered Gateway Stats</v-btn>
      </v-toolbar-items>
    </v-toolbar>
      <v-data-table
            :headers="display"
            :items="this.gateway_statistics"
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
import network_gateway_picker from "./Network_Gateway_Picker";
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
    network_gateway_picker,

  },
  data(){
    return {
        access: 0,
        initial_state :0, //This is to ensure that when value is updated initially it does not cause the value watcher to execute

        gateway_statistics: [],
        loading: true,
        pagination: {},
        rows_per_page_items: [ 50, 100, 250, 1000, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],
        headers: [], //Array of objects that holds all the headers database and table names {value: , text: } (static)
        header_names: [], //Array holding the headings, onlt the text (static)
        value: [], //Currently selected list of headers which will be displayed in the picker 
        display: [], //Header value names used for the table it self
        start_date: null,
        start_time: null,
        end_date: null,
        end_time: null,
        start_date_time: null, //This holds the start date and time in the format of the data in the db
        end_date_time: null, //This holds the end date and time in the format of the data in the db
        filter_parameters: {},

        gateway_id: null,

        allow_no_data: false, //This is used to prevent the no data red notice from showing up when the page is now loaded... it will be enabled after the data is first fetched

        export_options: ["Local Storage", "Email"],
    }
  },
  created: async function(){
    try{
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("gateway_statistics", "get")
          .catch(err => {
            throw err;
          });
        this.access =1;
        //-------------------------Start-------------------------
        //Get gateway stats and headers
        this.data = await AuthenticationService.get_gateway_statistics_initial()
          .catch(err => {
            //Error getting the gateway stats from the server
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
            throw err;
            })
        if(this.data.status == 204){ //No data returned
            this.allow_no_data = true;
            this.gateway_statistics = [];
            this.filter_parameters = {}; 
            this.loading = false;
        }else{//Data returned
          this.headers = this.data.data.headers;
          this.allow_no_data = true;
          for(let i =0; i< this.headers.length; i++){
            this.header_names.push(this.headers[i].text);
            this.value.push(this.headers[i].text);
          }
          this.display = this.headers;
          this.gateway_statistics = this.data.data.gateway_statistics;
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
    pagination: async function(){
      try{
        if(this.initial_state != 0){
          this.generate_function();
        }
        this.initial_state = 1;
      }catch(err){
        console.log(err);
      }
    },
    value: async function(){
      try{
        if(this.initial_state != 0){
          this.generate_function();
        }
        this.initial_state = 1;
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
    download_csv: function(name) {
      var data, filename, link;
      var csv = convertArrayOfObjectsToCSV({
        data: this.gateway_statistics
      });
      if (csv == null) return;
      filename = name || 'export.csv';
      
      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
      }
      data = encodeURI(csv);
      link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
    },
    download_email: async function(){
      let csv_data = convertArrayOfObjectsToCSV({
        data: this.gateway_statistics
      });
      await AuthenticationService.gateway_statistics_export_via_email(csv_data)
        .catch(err => {
          console.log(err);
        })
    },
    export_gateway_statistics: function(option){
      if(this.gateway_statistics.length > 0){
        if(option =="Local Storage"){
          this.download_csv("gateway_statistics.csv")
        }else if(option == 'Email'){
          this.download_email();
        }
      }
    },
    generate_function: async function(){
      if(this.value.length > 0){
        this.loading = true;
        this.start_date_time = return_date_time(this.start_date, this.start_time);
        this.end_date_time =return_date_time(this.end_date, this.end_time);
        if(this.start_date_time){
          this.start_date_time = date_time_functions.convert_picker_date_to_UTC(this.start_date_time);
          this.filter_parameters["start_date"] = this.start_date_time;
        }
        if(this.end_date_time){
          this.end_date_time = date_time_functions.convert_picker_date_to_UTC(this.end_date_time);
          this.filter_parameters["end_date"] = this.end_date_time;
        }
        if(this.pagination.sortBy){
          this.filter_parameters["sort_by"] = this.pagination.sortBy;
          if(this.pagination.descending == false) this.filter_parameters["order"] = 'ASC';
          else this.filter_parameters["order"] = 'DESC';
        }
        if(this.gateway_id){
          this.filter_parameters["gateway_id"] = this.gateway_id;
        }
        let result = await AuthenticationService.gateway_statistics_filtered(this.filter_parameters, this.value)
            .catch(err => {
              //Error getting the gateway statistics from the server
              this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
              throw err;
              }) 
        this.gateway_statistics = result.data.gateway_statistics;
        if(this.gateway_statistics.length > 0 ){ //This is so if no data is returned we do not get an error in the table because we need at least one objec to be able
        //to create the headers of the table. So if no data is returns we leave the table with the previous headers and just display no data
          this.display = result.data.headers;
        }
        this.filter_parameters = {}; 
        this.loading = false;
      }else this.gateway_statistics = []
    },
    gateway_id_function: function(data){
      //The if else statements were used because in the Picker we always want to emit when the value changes not only when the array is greater than 0.
      //This is because if we clear the array in the picker it will not emit to clear the id data on the gateway_Stats component.
      //Now since we are always emitting we only want to save to the local variable when it is greater than 0. Any other time we set it to null. 
      if(data.length > 0 ){this.gateway_id = data}
      else {this.gateway_id = null}
    },
    add_zero: function(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    convert_picker_date_to_UTC: function(date){
      date = new Date(date);
      let month = this.add_zero(date.getUTCMonth() + 1); //returns the month in 3 letters
      let day = this.add_zero(date.getUTCDay());
      let year = date.getUTCFullYear(); //converts the full year to 2 digits 
      let hour = this.add_zero(date.getUTCHours());
      let minutes = this.add_zero(date.getUTCMinutes());
      let seconds = this.add_zero(date.getUTCSeconds());
      let full_date = year + "-" + month + "-" + day + "T" + hour + ":" + minutes + ":" + seconds + "Z";
      return(full_date);
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
 