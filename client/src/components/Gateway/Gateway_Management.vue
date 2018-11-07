<template>
  <v-content>
    <v-toolbar class="elevation-1" color="grey lighten-3">
      <v-toolbar-title>Gateways</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down ">
      <v-icon large 
            class="mr-1 mt-3" @click.stop="$emit('create_gateway', gateways)" >
        person_add
      </v-icon>
    </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="gateways"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon 
              small
              class="mr-2 pt-3"
              @click.stop="$emit('update_gateway',{'gateway_update':props.item,'gateways':gateways})"
            >
              edit
            </v-icon>
            <v-icon 
              small
              class="pt-3"
              @click="delete_gateways(props.item)"
            >
              delete
            </v-icon>
          </td>
          <td class="text-xs-left">{{ props.item.gateway_name }}</td>
          <td class="text-xs-left">{{ props.item.gateway_id}}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="text-xs-left">{{ props.item.network_id }}</td>
          <td class="text-xs-left">{{ props.item.network_server_id }}</td>
          <td class="text-xs-left">{{ props.item.created_at | return_date}}</td>
          <td class="text-xs-left">{{ props.item.updated_at | return_date}}</td>
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
          { text: 'Actions', value: 'name', sortable: false },
          { text: 'Gateway Name', value: 'gateway_name' , sortable: true },
          { text: 'Gateway ID', value: 'gateway_id' , sortable: true },
          { text: 'Description', value: 'description' ,sortable: false},
          { text: 'Network ID', value: 'network_id' , sortable: true },
          { text: 'Network Server ID', value: 'network_server_id' , sortable: true },
          { text: 'Created At', value: 'created_at', sortable: true },
          { text: 'Updated At', value: 'updated_at', sortable: false },
        ],
        gateways: []
    }
  },
  props: [
    'gateways_prop'
  ],
  watch: {
    gateways_prop: function(){
      this.gateways = this.gateways_prop;
    }
  },
  created: function () {
    AuthenticationService.get_gateways().then(result => {
      this.gateways = JSON.parse(result.data.gateways_lora);
    }).catch(err => {
      console.log(err)
      //Error requesting the gateways from the server
    })
  },
  destroyed: function(){
  },
  methods: {
    delete_gateways(gateway){
      if(confirm('Are you sure you want to delete this Gateway?') == true){
        AuthenticationService.delete_gateways(gateway.gateway_id).then(result => {
          this.gateways  = JSON.parse(result.data.gateways_lora);
        }).catch(err => {
          console.log(err);
          //Error deleting gateways from the lora server
        })
      };
    }, 
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
 