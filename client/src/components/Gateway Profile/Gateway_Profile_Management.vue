<template>
  <v-content v-if="this.access == 1">
    <v-toolbar class="elevation-1 primary" >
      <v-toolbar-title>GATEWAY PROFILES</v-toolbar-title>
      <v-divider
        class="mx-2 secondary"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down ">
        <v-tooltip bottom>
          <v-icon large slot="activator"
            class="mr-1 mt-3" @click.stop="$router.push(`/gateway_profile/create`)" >
            add_box
          </v-icon>
          <span>Create Gateway Profile</span>
        </v-tooltip>
    </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="gateway_profiles"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0 ">
            <v-tooltip bottom>
              <v-icon slot="activator"
                small
                class="mr-2 pt-3"
                @click.stop="$router.push(`/gateway_profile/update/${props.item.gateway_profile_id_lora}`)"
              >
                edit
              </v-icon>
            <span>Edit {{props.item.gateway_profile_name}}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <v-icon slot="activator"
                small
                class="pt-3 pr-3"
                @click="delete_gateway_profile(props.item)"
              >
                delete
              </v-icon>
            <span>Delete {{props.item.gateway_profile_name}}</span>
            </v-tooltip>
          </td>
          <td class="text-xs-left">{{ props.item.gateway_profile_id }}</td>
          <td class="text-xs-left">{{ props.item.gateway_profile_id_lora }}</td>
          <td class="text-xs-left">{{ props.item.gateway_profile_name }}</td>
          <td class="text-xs-left">{{ props.item.network_server_id }}</td>
          <td class="text-xs-left">{{ props.item.network_server_name }}</td>
          <td class="text-xs-left">{{ props.item.gateway_profile_created_at | return_date}}</td>
          <td class="text-xs-left">{{ props.item.gateway_profile_updated_at | return_date}}</td>
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
          { text: 'Gateway Profile ID', value: 'gateway_profile_id' ,sortable: true},
          { text: 'Gateway Profile ID LoRa', value: 'gateway_profile_id_lora' ,sortable: false},
          { text: 'Gateway Profile Name', value: 'gateway_profile_name' , sortable: true },
          { text: 'Network Server ID', value: 'network_server_id' , sortable: true },
          { text: 'Network Server Name', value: 'network_server_name', sortable: true },
          { text: 'Created At', value: 'gateway_profile_created_at', sortable: true },
          { text: 'Updated At', value: 'gateway_profile_updated_at', sortable: true },
        ],
        gateway_profiles: [],
        access: 0
    }
  },
  created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("gateway_profiles", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //--------------Start-------------------
        this.gateway_profiles = await AuthenticationService.get_gateway_profiles()
        .catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})      
        })
        this.gateway_profiles = this.gateway_profiles.data.gateway_profiles_lora;
      }else{
        alert('Please login.');
        this.$router.push('/login');
      }
    }catch (err) {
      console.log(err)
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
  
  methods: {
    delete_gateway_profile(gateway_profile){
      if(confirm('Are you sure you want to delete this gateway profile?') == true){
        AuthenticationService.delete_gateway_profiles(gateway_profile.gateway_profile_id_lora).then(result => {
          this.gateway_profiles = result.data.gateway_profiles;
          this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
        }).catch(err => {
          //Error requesting through the server to delete a network on the lora app server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
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
 