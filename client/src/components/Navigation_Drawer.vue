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
            items: [
          { title: 'Account Management', icon: 'people_outlined'},
          { title: 'Gateway Stats', icon: 'settings_input_antenna'},
          { title: 'End Device Data', icon: 'directions_boat'},
          { title: 'Map', icon: 'map'}
        ]
    };
  },
  components: {},
  create: function(){
    console.log('created');
  },
  methods: {
    login(item){
      if(item=="Account Management"){
        console.log('here');
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
