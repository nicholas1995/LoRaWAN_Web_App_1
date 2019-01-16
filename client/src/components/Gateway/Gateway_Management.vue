<template>
  <v-content v-if="this.access == 1">
    <v-toolbar class="elevation-1 primary" >
      <v-toolbar-title>Gateways</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down ">
      <v-tooltip bottom>
        <v-icon large slot="activator"
              class="mr-1 mt-3" @click.stop="$router.push(`/gateway/create`)" >
          add_box
        </v-icon>
        <span>Create Gateway</span>
      </v-tooltip>
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
            <v-tooltip bottom>
              <v-icon slot="activator"
                small
                class="mr-2 pt-3"
                @click.stop="$router.push(`/gateway/update/${props.item.gateway_id}`)"
              >
                edit
              </v-icon>
            <span>Edit {{props.item.gateway_name}}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <v-icon slot="activator"
                small
                class="pt-3"
                @click="delete_gateways(props.item)"
              >
                delete
              </v-icon>
            <span>Delete {{props.item.gateway_name}}</span>
            </v-tooltip>
          </td>
          <td class="text-xs-left">{{ props.item.gateway_id}}</td>
          <td class="text-xs-left">{{ props.item.gateway_id_lora}}</td>
          <td class="text-xs-left">{{ props.item.gateway_name }}</td>
          <td class="text-xs-left">{{ props.item.gateway_description }}</td>
          <td class="text-xs-left">{{ props.item.network_id }}</td>
          <td class="text-xs-left">{{ props.item.network_server_id }}</td>
          <td class="text-xs-left">{{ props.item.gateway_created_at | return_date}}</td>
          <td class="text-xs-left">{{ props.item.gateway_updated_at | return_date}}</td>
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
          { text: 'Gateway ID', value: 'gateway_id' , sortable: true },
          { text: 'Gateway ID LoRa', value: 'gateway_id_lora' , sortable: false },
          { text: 'Gateway Name', value: 'gateway_name' , sortable: false },
          { text: 'Description', value: 'gateway_description' ,sortable: false},
          { text: 'Network ID', value: 'network_id' , sortable: true },
          { text: 'Network Server ID', value: 'network_server_id' , sortable: true },
          { text: 'Created At', value: 'created_at_time_stamp', sortable: true },
          { text: 'Updated At', value: 'updated_at_time_stamp', sortable: true },
        ],
        gateways: [],
        access: 0,
    }
  },
  created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("gateways", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //-------------------------Start----------------------
        AuthenticationService.get_gateways().then(result => {
          this.gateways = result.data.gateways_lora; 
          this.$emit('message_display',{message:result.data.message, type:result.data.type})   
        }).catch(err => {
          //Error requesting the gateways from the server
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
    delete_gateways(gateway){
      if(confirm('Are you sure you want to delete this Gateway?') == true){
        AuthenticationService.delete_gateways(gateway.gateway_id_lora).then(result => {
          this.gateways  = result.data.gateways_lora;
          this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
        }).catch(err => {
          //Error deleting gateways from the lora server
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
 