<template>
  <v-content>
    <v-flex xs4 sm12>
          <v-combobox
            v-model="value"
            :items="items"
            label="Headings"
            multiple
            clearable
            chips
          ></v-combobox>
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
            :headers="display"
            :items="device_data"
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
import date_time from "../services/functions/date_time.js";

export default {
  data(){
    return {
        device_data: [],
        loading: true,
        pagination: {},
        rows_per_page_items: [ 50, 100, 250, 1000, { "text": "$vuetify.dataIterator.rowsPerPageAll", "value": -1 } ],
        items: [], //Array holding the headings
        value: [],
        display: [],
        headers: []
    }
  },
  props: [
    'devices_prop'
  ],
  created: async function(){
      let result = await AuthenticationService.get_device_data_initial()
        .catch(err => {
          //Error getting the devices from the server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
          throw err;
          })
      this.device_data = JSON.parse(result.data.device_data);
      this.headers =  JSON.parse(result.data.headers);
      for(let i =0; i< this.headers.length; i++){
        this.items[i] = this.headers[i].text;
        this.value[i] = this.headers[i].text;
      }
      this.display = this.headers
      this.loading = false;
  },
  watch: {
    devices_prop: function(){
      this.devices = this.devices_prop;
    },
    pagination: async function(){
      try{
        console.log(this.value)
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

      
    },
    value: function(){
      this.display = [];
      //console.log(this.value)
      for(let i =0; i< this.headers.length; i++){ //This order is done to put back in original order
        for(let j = 0; j < this.value.length; j++)
        {
          if(this.headers[i].text == this.value[j]){
            this.display.push(this.headers[i])
          }
        }
      }
    }
  },
  mounted: async function () {
    try{

    }catch(err){
      console.log(err);
    }

  },
  methods:{
    getComponentByColumnType(header, data) {
      console.log(data[header])
      return <td> `data[header]`</td>;
    },
    update_network(){
      this.headers.pop()
    }
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
 