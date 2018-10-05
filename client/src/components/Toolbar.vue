<template>
  <v-toolbar fixed color ="grey lighten-2">
    <v-toolbar-title>Private Marine IoT Network Console </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down ">
      <v-btn class="grey lighten-2">
        <router-link to="login">Login</router-link>
        </v-btn>
        <v-btn class="grey lighten-2">
        <router-link to="register">Register</router-link>
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

  

<script>
export default {
  data() {
    return {

    };
  },
  components: {},
  methods: {
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
