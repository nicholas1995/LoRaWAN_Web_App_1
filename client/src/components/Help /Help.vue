<template>
  <v-layout row justify-center >
    <v-dialog v-model="help_dialog" scrollable max-width="800" class="md-6" transition="dialog-bottom-transition">
      
      <v-card >
        <v-toolbar class="primary">
          <v-toolbar-title>
            <h2>{{title}}</h2> 
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn class="primary" flat @click="help_dialog = !help_dialog">
              Close
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <device_data_help @title_emit="set_title($event)" v-if="$router.currentRoute.path=='/device_data'"></device_data_help>
        <home_map_help @title_emit="set_title($event)" v-if="$router.currentRoute.path=='/'"></home_map_help>
        <interactive_map_help @title_emit="set_title($event)" v-if="$router.currentRoute.path=='/map'"></interactive_map_help>

      </v-card>
    </v-dialog>
  </v-layout>
</template>
  

<script>
import device_data_help from './Device_Data_Help'
import home_map_help from './Home_Map_Help'
import interactive_map_help from './Interactive_Map_Help'



export default {
  components:{
    device_data_help,
    home_map_help,
    interactive_map_help,
  },
  data(){
    return {
        help_dialog: false,
        title: '', //Variable which holds the title of the table
    }
  },
  created: async function () {
  },
  methods: {
    set_title: function(title){
      this.title = title
    }
  }
}


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 