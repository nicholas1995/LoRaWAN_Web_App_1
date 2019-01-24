<template>
  <v-layout
    wrap
    style="height: 200px;"
  >
    <v-navigation-drawer
      v-model="drawer"
      class="mt-5 grey lighten-4"
      style='top: 16px'
      temporary
      fixed
      width ='270'
    >
      <v-list class="pa-1">
        <v-list-tile avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{this.$store.state.user_class}}: {{this.$store.state.user.user_name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="login(item.title)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

  

<script>
export default {
  data() {
    return {
      drawer: null,
            items_all: [
          { title: 'Network', icon: 'domain'}, //0
          { title: 'Sub-Network', icon: 'apps'}, //1
          { title: 'Service Profile', icon: 'error'}, //2
          { title: 'Vessel', icon: 'directions_boat'}, //3
          { title: 'Gateway', icon: 'settings_input_antenna'}, //4
          { title: 'Gateway Statistics', icon: 'settings_input_antenna'}, //5
          { title: 'Device', icon: 'devices'}, //6
          { title: 'Device Data', icon: 'view_comfy'}, //7
          { title: 'Map', icon: 'map'}, //8
          { title: 'Error Logs', icon: 'error'}, //9
          { title: 'Account Management', icon: 'people_outlined'}, //10
          { title: 'Device Profile', icon: 'people_outlined'}, //11
          { title: 'Gateway Profile', icon: 'settings_input_antenna'}, //12
          { title: 'Network Server', icon: 'settings_input_antenna'}, //13
        ],
        items:[]
    };
  },
  created: function () {
    if(this.$store.state.user_class =='IoT Network Admin'){
      this.items = [this.items_all[0],this.items_all[1],this.items_all[2],this.items_all[3],this.items_all[4],this.items_all[5],this.items_all[6],this.items_all[7],this.items_all[8],this.items_all[9],this.items_all[11],this.items_all[12],this.items_all[13]];
    }else if(this.$store.state.user_class =='Software Admin'){
      this.items = [this.items_all[5],this.items_all[7],this.items_all[8],this.items_all[9],this.items_all[10]];
    }else if(this.$store.state.user_class =='Analyst'){
      this.items = [this.items_all[5],this.items_all[7],this.items_all[8]];
    }else if(this.$store.state.user_class =='Fisher'){
      this.items = [this.items_all[7],this.items_all[8]];
    }
  },
  components: {},
  methods: {
    login(item){
      if(item=="Account Management"){
        this.$router.push('/user'); 
      }else if(item=="Network"){
        this.$router.push('/network'); 
      }else if(item=="Sub-Network"){
        this.$router.push('/subnetwork'); 
      }else if(item=="Service Profile"){
        this.$router.push('/service_profile'); 
      }else if(item=="Vessel"){
        this.$router.push('/vessel'); 
      }else if(item=="Gateway"){
        this.$router.push('/gateway'); 
      }else if(item=="Gateway Statistics"){
        this.$router.push('/gateway_statistics'); 
      }else if(item=="Device"){
        this.$router.push('/device'); 
      }else if(item=="Device Data"){
        this.$router.push('/device_data'); 
      }else if(item=="Map"){
        this.$router.push('/map'); 
      }else if(item=="Error Logs"){
        this.$router.push('/error_logs'); 
      }else if(item=="Device Profile"){
        this.$router.push('/device_profile'); 
      }else if(item=="Gateway Profile"){
        this.$router.push('/gateway_profile'); 
      }else if(item=="Network Server"){
        this.$router.push('/network_server'); 
      }else{
        this.$router.push('/dashboard'); 
      }
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
