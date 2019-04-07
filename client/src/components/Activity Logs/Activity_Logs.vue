<template>
  <v-content v-if="this.access == 1">
    <v-toolbar class="elevation-1" color="primary">
      <v-toolbar-title>ACTIVITY LOGS</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="activity_logs"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.activity_log_id }}</td>
          <td class="text-xs-left">{{ props.item.activity_log_time_stamp | return_date}}</td>
          <td class="text-xs-left">{{ props.item.activity_log_user_id }}</td>
          <td class="text-xs-left">{{ props.item.activity_log_user_class }}</td>
          <td class="text-xs-left">{{ props.item.activity_log_method }}</td>
          <td class="text-xs-left">{{ props.item.activity_log_route }}</td>
          <td class="text-xs-left">{{ props.item.activity_log_user_device }}</td>
          <td class="text-xs-left">{{ props.item.activity_log_details }}</td>
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
          { text: 'Activity Log ID', value: 'activity_log_id' ,sortable: true},
          { text: 'Error Time Stamp', value: 'activity_log_time_stamp', sortable: true },
          { text: 'User ID', value: 'activity_log_user_id' , sortable: true },
          { text: 'User Class', value: 'activity_log_user_class' , sortable: true },
          { text: 'Method', value: 'activity_log_method', sortable: true },
          { text: 'Route', value: 'activity_log_route', sortable: true },
          { text: 'User Device', value: 'activity_log_user_device', sortable: true },
          { text: 'Activity Details', value: 'activity_log_details', sortable: false },
        ],
        activity_logs: [],
        access: 0,
    }
  },
  created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("activity_logs", "get").catch(err => {
            console.log(err)
            throw err;
          });
          this.access =1;
        //---------------------------Start------------------------
        await AuthenticationService.get_activity_logs().then(result => {
          this.activity_logs = result.data.activity_logs;
          console.log(this.activity_logs)
          this.$emit('message_display',{message:result.data.message, type:result.data.type})   
        }).catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})      
        })
      }else{
        alert('Please login.');
        this.$router.push('/login');
      }
    }catch (err) {
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
 