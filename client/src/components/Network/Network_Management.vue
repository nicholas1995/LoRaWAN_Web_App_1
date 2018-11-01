<template>
  <v-content>
    <v-toolbar class="elevation-1" color="grey lighten-3">
      <v-toolbar-title>NETWORKS</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down ">
      <v-icon large 
            class="mr-1 mt-3" @click.stop="$emit('create_network', networks)" >
        person_add
      </v-icon>
    </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="networks"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon 
              small
              class="mr-2 pt-3"
              @click.stop="$emit('update_network',{network_update:props.item,networks:networks})"
            >
              edit
            </v-icon>
            <v-icon 
              small
              class="pt-3 pr-3"
              @click="delete_network(props.item)"
            >
              delete
            </v-icon>
          </td>
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.display_name }}</td>
          <td class="text-xs-left">{{ props.item.can_have_gateways }}</td>
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
          { text: 'Network ID', value: 'id' ,sortable: true},
          { text: 'Network Name', value: 'name' , sortable: false },
          { text: 'Display Name', value: 'display_name' , sortable: false },
          { text: 'Can Have Gateways', value: 'can_have_gateways', sortable: false },
          { text: 'Created At', value: 'created_at', sortable: true },
          { text: 'Updated At', value: 'updated_at', sortable: true },
        ],
        networks: []
    }
  },
  created: function () {
    AuthenticationService.get_networks().then(result => {
      this.networks = result.data.networks_lora;
    }).catch(err => {
      console.log('Error');
    })
  },
  props:[
   'network'
  ],
  watch: {
    network: function(){   
      console.log('Prop')
      this.networks = this.network;
      }
  },
  
  methods: {
    delete_network(network){
      if(confirm('Are you sure you want to delete this network?') == true){
        AuthenticationService.delete_networks(network).then(result => {
          this.networks = result.data;
        }).catch(err => {
          //Error requesting through the server to delete a network on the lora app server
        })
      }; 
    }
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
 