<template>
  <v-content v-if="this.access == 1">
    <v-toolbar class="elevation-1 primary" >
      <v-toolbar-title>Devices</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down ">
        <v-tooltip bottom>
          <v-icon large slot="activator"
                class="mr-1 mt-3" @click.stop="$router.push(`/device/create`)" >
            add_box
          </v-icon>
          <span>Create Device</span>
        </v-tooltip>
      </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="devices"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <!-- Update Device -->
            <v-tooltip bottom>
              <v-icon slot="activator"
                small
                class="mr-3 pt-3"
                @click.stop="$router.push(`/device/update/${props.item.device_id}`)"
              >
                edit
              </v-icon>
            <span>Edit {{props.item.device_name}}</span>
            </v-tooltip>
            <!-- Delete Device -->
            <v-tooltip bottom>
              <v-icon slot="activator"
                small
                class="mr-3 pt-3"
                @click="delete_device(props.item)"
              >
                delete
              </v-icon>
              <span>Delete {{props.item.device_name}}</span>
            </v-tooltip>
            <!-- Activate Device -->
            <v-tooltip bottom>
              <v-icon slot="activator"
                small
                class="pt-3"
                @click.stop="$router.push(`/device/activate/${props.item.device_id}`)"
              >
                power_settings_new
              </v-icon>
              <span>Activate {{props.item.device_name}}</span>
            </v-tooltip>
          </td>
          <td class="text-xs-left">{{ props.item.device_id }}</td>
          <td class="text-xs-left">{{ props.item.device_name }}</td>
          <td class="text-xs-left">{{ props.item.device_eui}}</td>
          <td class="text-xs-left">{{ props.item.device_description }}</td>
          <td class="text-xs-left">{{ props.item.sub_network_id }}</td>
          <td class="text-xs-left">{{ props.item.vessel_id }}</td>
          <td class="text-xs-left">{{ props.item.last_seen_at | return_date}}</td>
          <td class="text-xs-left">{{ props.item.device_profile_id_lora}}</td>
          <td class="text-xs-left">{{ props.item.device_profile_name }}</td>
          <td class="text-xs-left">{{ props.item.device_status_battery}}</td>
          <td class="text-xs-left">{{ props.item.device_status_battery_level }}</td>
          <td class="text-xs-left">{{ props.item.device_status_battery_level_unavailable }}</td>
          <td class="text-xs-left">{{ props.item.device_status_external_power_source }}</td>
          <td class="text-xs-left">{{ props.item.device_status_margin}}</td>
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
          { text: 'Device ID', value: 'device_id' , sortable: true },
          { text: 'Device Name', value: 'device_name' , sortable: true },
          { text: 'Device EUI', value: 'device_eui' , sortable: true },
          { text: 'Description', value: 'device_description' ,sortable: false},
          { text: 'Sub-Network ID', value: 'sub_network_id' , sortable: true },
          { text: 'Vessel ID', value: 'vessel_id' , sortable: true },
          { text: 'Last Seen', value: 'last_seen_at' , sortable: true },
          { text: 'Device Profile ID', value: 'device_profile_id_lora', sortable: true },
          { text: 'Device Profile Name', value: 'device_profile_name', sortable: false },
          { text: 'Battery Status', value: 'device_status_battery' ,sortable: false},
          { text: 'Battery Level', value: 'device_status_battery_level' , sortable: true },
          { text: 'Battery Level Unavailable', value: 'device_status_battery_level_unavailable', sortable: true },
          { text: 'External Power Source', value: 'device_status_external_power_source', sortable: false },
          { text: 'Margin Status', value: 'device_status_margin', sortable: true },
        ],
        devices: [],
        access: 0,
    }
  },
  props: [
    'devices_prop'
  ],
  watch: {
    devices_prop: function(){
      this.devices = this.devices_prop;
    }
  },
  created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("devices", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //----------------------Start------------------
        AuthenticationService.get_devices().then(result => {
          this.devices = result.data.devices_lora;
          this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
        }).catch(err => {
          //Error getting the devices from the server
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
  methods: {
    delete_device(device){
      if(confirm('Are you sure you want to delete this Device?') == true){
        AuthenticationService.delete_devices(device.device_eui).then(result => {
          this.devices  = result.data.devices_lora;
          this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
        }).catch(err => {
          //Error deleting device 
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
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
 