<template>
  <v-content>
    <v-toolbar class="elevation-1" color="grey lighten-3">
      <v-toolbar-title>SUB-NETWORKS</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down ">
      <v-icon large 
            class="mr-1 mt-3" @click.stop="$emit('create_sub_network', sub_networks)" >
        person_add
      </v-icon>
    </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="sub_networks"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon 
              small
              class="mr-2 pt-3"
              @click.stop="$emit('update_sub_network',{'sub_network_update':props.item,'sub_networks':sub_networks})"
            >
              edit
            </v-icon>
            <v-icon 
              small
              class="pt-3"
              @click="delete_sub_neworks(props.item)"
            >
              delete
            </v-icon>
          </td>
          <td class="text-xs-left">{{ props.item.sub_network_id }}</td>
          <td class="text-xs-left">{{ props.item.sub_network_name}}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="text-xs-left">{{ props.item.network_id }}</td>
          <td class="text-xs-left">{{ props.item.service_profile_id }}</td>
          <td class="text-xs-left">{{ props.item.service_profile_name}}</td>
      </template>
    </v-data-table>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";

export default {
  data(){
    return {
      headers: [
          { text: 'Actions', value: 'name', sortable: false },
          { text: 'Sub-Network ID', value: 'sub_network_id' , sortable: true },
          { text: 'Sub-Network Name', value: 'sub_network_name' , sortable: true },
          { text: 'Description', value: 'description' ,sortable: false},
          { text: 'Network ID', value: 'network_id' , sortable: true },
          { text: 'Service Profile ID', value: 'service_profile_id', sortable: true },
          { text: 'Service Profile Name', value: 'service_profile_name', sortable: false },
        ],
        sub_networks: []
    }
  },
  props: [
    'sub_network_prop'
  ],
  watch: {
    sub_network_prop: function(){
      this.sub_networks = this.sub_network_prop;
    }
  },
  created: function () {
    AuthenticationService.get_sub_networks().then(result => {
      this.sub_networks = JSON.parse(result.data.sub_networks_lora);
    }).catch(err => {
      //Error requesting the subnetworks from the server
    })
  },
  destroyed: function(){
  },
  computed: {
    users () {
      return this.$store.state.users
    },
    user_email () {
      return this.$store.state.user.email
    }
  },
  methods: {
    delete_sub_neworks(sub_network){
      if(confirm('Are you sure you want to delete this Sub-Network?') == true){
        AuthenticationService.delete_sub_networks(sub_network.sub_network_id).then(result => {
          let data = JSON.parse(result.data.sub_networks_lora);
          this.sub_networks = data;
        }).catch(err => {

        })
      };
    }, 
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
 