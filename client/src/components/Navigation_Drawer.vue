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
          { title: 'Network', icon: 'domain'},
          { title: 'Sub-Network', icon: ''},
          { title: 'Gateway', icon: 'settings_input_antenna'},
          { title: 'Gateway Stats', icon: 'settings_input_antenna'},
          { title: 'End Device', icon: 'directions_boat'},
          { title: 'End Device Data', icon: 'table'},
          { title: 'Map', icon: 'map'},
          { title: 'Error Logs', icon: 'error'},
          { title: 'Account Management', icon: 'people_outlined'}
        ],
        items:[]
    };
  },
  created: function () {
    if(this.$store.state.user_class =='IoT Network Admin'){
      this.items = [this.items_all[0],this.items_all[1],this.items_all[2],this.items_all[3],this.items_all[4],this.items_all[5],this.items_all[6],this.items_all[7]];
    }else if(this.$store.state.user_class =='Software Admin'){
      this.items = [this.items_all[8],this.items_all[7],this.items_all[3],this.items_all[5],this.items_all[6]];
    }else if(this.$store.state.user_class =='Analyst'){
      this.items = [this.items_all[5],this.items_all[6]];
    }else if(this.$store.state.user_class =='Fisher'){
      this.items = [this.items_all[5],this.items_all[6]];
    }
  },
  components: {},
  methods: {
    login(item){
      if(item=="Account Management"){
        this.$router.push('accountmanagement'); 
      }
      else{
        this.$router.push('dashboard'); 
      }
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
