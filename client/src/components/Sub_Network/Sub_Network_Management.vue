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
            class="mr-1 mt-3" @click.stop="$emit('create-sub_network')" >
        person_add
      </v-icon>
    </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="sub_network"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon 
              small
              class="mr-2 pt-3"
              @click.stop="$emit('update-sub_network',props.item)"
            >
              edit
            </v-icon>
            <v-icon 
              small
              class="pt-3"
              @click="delete_sub_network(props.item)"
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
          { text: 'Service Profile Name', value: 'service_profile_name', sortable: true },
        ],
        sub_network: [{
          sub_network_id: '111',
          sub_network_name: 'High Street',
          description: 'This subnetwork is located on high street',
          network_id: '111',
          service_profile_id: '123',
          service_profile_name: 'Service'
        },{
          sub_network_id: '222',
          sub_network_name: 'La Romain',
          description: 'This subnetwork is located on la romain',
          network_id: '222',
          service_profile_id: '123',
          service_profile_name: 'Service 1'
        },{
          sub_network_id: '333',
          sub_network_name: 'Port of Spain',
          description: 'This subnetwork is located on POS',
          network_id: '333',
          service_profile_id: '123',
          service_profile_name: 'Service 3'
        },
        ]
      
    }
  },
  created: function () {
  },
  destroyed: function(){
    this.$store.commit('get_users_destroy');
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
    login(){
      this.$router.push('login');
    },
    update_User(user){
      this.$store.commit('update_user', {user});
      this.$router.push('updateuser'); 
    },
    deleteItem(user){
      if(confirm('Are you sure you want to delete this user?') == true){
        this.$store.dispatch('delete_user', {user})
      };
    }, 
    add_user(){
      this.$router.push('register'); 
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
 