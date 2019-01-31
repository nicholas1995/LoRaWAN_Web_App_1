<template>
  <v-content>
  <v-toolbar fixed class = 'primary' >
      <!--This is the menu icon -->
      <v-toolbar-side-icon  flat v-if="!this.$store.state.loginState"
        class=" mt-2" @click.stop="$emit('toggle-drawer')" >
      </v-toolbar-side-icon>
    <v-toolbar-title>
      <v-btn  @click.stop="$router.push(`/`)" flat>
        <h2>Private Marine IoT Network Console</h2> 
      </v-btn>
    </v-toolbar-title>
      <v-divider
        class="mx-2 secondary"
        inset
        vertical
      ></v-divider>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn class="primary" @click="login" flat v-if="this.$store.state.loginState">
        Login
      </v-btn>
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
            <v-icon large @click="profile"  v-if="!this.$store.state.loginState" class="mr-3 primary">
              account_box
            </v-icon>
        </v-toolbar-title>

        <v-list>
          <v-list-tile
            v-for="item in items"
            :key="item"
            @click="profile(item)"
          >
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn class="primary"  @click="logout" flat v-if="!this.$store.state.loginState">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-snackbar
  v-model="snackbar"
  bottom="bottom"
  left="left"
  multi-line="multi-line"
  right="right"
  :timeout="this.timeout"
  auto-height="auto-height"
  :color ="this.color"
>
  {{ this.message }}
  <v-btn
    flat
    @click="snackbar = 0"
  >        Close
  </v-btn>
</v-snackbar>
  </v-content>
</template>

  

<script>
import AuthenticationService from "../services/AuthenticationService.js";
export default {
  data() {
    return {
      items: ["Update Profile", "Update Password"],
      snackbar:0,
      timeout: 1500,
      color: "error",
      message: "blank"
    };
  },
  components: {},
  methods: {
    login(){
      this.$router.push('/login');
    },
    profile(option) {
      if(option == 'Update Profile'){
        this.$router.push('/update_profile');
      }else if(option == 'Update Password'){
        this.$router.push('/update_password');
      } 
    },
    logout(){
      this.$store.commit('logout');
      this.$router.push('/login');
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
