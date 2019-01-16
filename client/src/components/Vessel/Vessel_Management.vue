<template>
  <v-content v-if="this.access == 1">
    <v-toolbar class="elevation-1 primary">
      <v-toolbar-title>VESSELS</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down ">
        <v-tooltip bottom>
          <v-icon large slot="activator"
                class="mr-1 mt-3" @click.stop="$router.push(`/vessel/create`)" >
            add_box
          </v-icon>
          <span>Create Vessel</span>
        </v-tooltip>
    </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="vessels"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-tooltip bottom>
              <v-icon slot="activator"
                small
                class="mr-2 pt-3 xs-left"
                @click.stop="$router.push(`/vessel/update/${props.item.vessel_id}`)"
              >
                edit
              </v-icon>
            <span>Edit {{props.item.vessel_name}}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <v-icon slot="activator"
                small
                class="pt-3 pr-3"
                @click="delete_vessel(props.item)"
              >
                delete
              </v-icon>
            <span>Delete {{props.item.vessel_name}}</span>
            </v-tooltip>
          </td>
          <td class="text-xs-left">{{ props.item.vessel_id }}</td>
          <td class="text-xs-left">{{ props.item.vessel_name }}</td>
          <td class="text-xs-left">{{ props.item.vessel_unique_vessel_identifier }}</td>
          <td class="text-xs-left">{{ props.item.vessel_international_radio_call_sign }}</td>
          <td class="text-xs-left">{{ props.item.vessel_type }}</td>
          <td class="text-xs-left">{{ props.item.sub_network_id }}</td>
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
          { text: 'Vessel ID', value: 'vessel_id' ,sortable: true},
          { text: 'Vessel Name', value: 'vessel_name' , sortable: false },
          { text: 'Unique Vessel Identifier', value: 'vessel_unique_vessel_identifier' ,sortable: true},
          { text: 'International Radio Call Sign', value: 'vessel_international_radio_call_sign' , sortable: false },
          { text: 'Vessel Type', value: 'vessel_type' , sortable: false },
          { text: 'Sub-Network ID', value: 'sub_network_id', sortable: true }
        ],
        vessels: [],
        access: 0,
    }
  },
  created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("vessels", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //---------------------------Start------------------------
        AuthenticationService.get_vessels(null, 0).then(result => {
          this.vessels = result.data.vessels_db;
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
   'vessels_prop'
  ],
  watch: {
    vessels_prop: function(){   
      this.vessels = this.vessels_prop;
      }
  },
  
  methods: {
    delete_vessel(vessel){
      if(confirm('Are you sure you want to delete this vessel?') == true){
        AuthenticationService.delete_vessels(vessel.vessel_id).then(result => {
          this.vessels = result.data.vessels_db;
          this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
        }).catch(err => {
          //Error requesting through the server to delete a vessel on the lora app server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
        })
      }; 
    }
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 