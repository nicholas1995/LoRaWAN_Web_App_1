<template>
  <v-content>
    <v-toolbar class="elevation-1" color="grey lighten-3">
      <v-toolbar-title>Error Logs</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down ">
        <v-tooltip bottom>
          <v-icon large slot="activator"
            class="mr-1 mt-3" @click.stop="$emit('create_network', networks)" >
            add_box
          </v-icon>
          <span>Create Network</span>
        </v-tooltip>
    </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="error_logs"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.error_log_id }}</td>
          <td class="text-xs-left">{{ props.item.user_id }}</td>
          <td class="text-xs-left">{{ props.item.error_user_class }}</td>
          <td class="text-xs-left">{{ props.item.error_user_action }}</td>
          <td class="text-xs-left">{{ props.item.error_user_device }}</td>
          <td class="text-xs-left">{{ props.item.error_user_ip_address }}</td>
          <td class="text-xs-left">{{ props.item.error_time_stamp | return_date}}</td>
          <td class="text-xs-left">{{ props.item.error_name }}</td>
          <td class="text-xs-left">{{ props.item.error_message}}</td>
          <td class="text-xs-left">{{ props.item.error_stack }}</td>
      </template>
    </v-data-table>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
import date_time from "../../services/functions/date_time.js";

export default {
  data(){
    return {
      headers: [
          { text: 'Error ID', value: 'error_log_id' ,sortable: true},
          { text: 'User ID', value: 'user_id' , sortable: true },
          { text: 'User Class', value: 'error_user_class' , sortable: true },
          { text: 'Action', value: 'error_user_action', sortable: false },
          { text: 'User Device', value: 'error_user_device', sortable: false },
          { text: 'User IP Address', value: 'error_user_ip_address', sortable: true },
          { text: 'Error Time Stamp', value: 'error_time_stamp', sortable: true },
          { text: 'Error Name', value: 'error_name', sortable: true },
          { text: 'Error Message', value: 'error_message', sortable: false },
          { text: 'Stack', value: 'error_stack', sortable: false },
        ],
        error_logs: []
    }
  },
  created: function () {
    AuthenticationService.get_error_logs().then(result => {
      this.error_logs = JSON.parse(result.data.error_logs);
      this.$emit('message_display',{message:result.data.message, type:result.data.type})   
    }).catch(err => {
      this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})      
    })
  },
  props:[
  ],
  watch: {
  },
  methods: {
  },
  filters: {
        //This function accepts the date and time in ISO 8601 Date and Time in UTC and return DD-MON-YY HH:MM:SS
    return_date(date_created){
      let date = new Date(date_created);
      let month = date_time.return_month(date.getMonth()); //returns the month in 3 letters
      let day = date_time.add_zero(date.getDate());
      let year = date.getUTCFullYear() -2000; //converts the full year to 2 digits 
      let hour = date_time.add_zero(date.getHours());
      let minutes = date_time.add_zero(date.getUTCMinutes());
      let seconds = date_time.add_zero(date.getUTCSeconds()); 
      let full_date = day+"-"+month+"-"+year +" " + hour +":"+ minutes+":"+ seconds;
      return full_date;
    } 
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 