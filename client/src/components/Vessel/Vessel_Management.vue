<template>
  <v-content>
    <v-toolbar class="elevation-1" color="grey lighten-3">
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
                class="mr-1 mt-3" @click.stop="$emit('create_vessel', vessels)" >
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
                @click.stop="$emit('update_vessel',{vessel_update:props.item,vessels:vessels})"
              >
                edit
              </v-icon>
            <span>Edit {{props.item.name}}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <v-icon slot="activator"
                small
                class="pt-3 pr-3"
                @click="delete_vessel(props.item)"
              >
                delete
              </v-icon>
            <span>Delete {{props.item.name}}</span>
            </v-tooltip>
          </td>
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
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
          { text: 'Vessel ID', value: 'id' ,sortable: true},
          { text: 'Vessel Name', value: 'name' , sortable: false },
          { text: 'Sub-Network ID', value: 'sub_network_id', sortable: true }
        ],
        vessels: []
    }
  },
  created: function () {
    AuthenticationService.get_vessels(null, 0).then(result => {
      this.vessels = JSON.parse(result.data.vessels_db);
      this.$emit('message_display',{message:result.data.message, type:result.data.type})   
    }).catch(err => {
      this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})      
    })
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
        AuthenticationService.delete_vessels(vessel.id).then(result => {
          this.vessels = JSON.parse(result.data.vessels_db);
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
 