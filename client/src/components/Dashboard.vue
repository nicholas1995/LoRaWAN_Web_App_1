<template>
  <v-content>
    <div v-if="!this.$store.state.loginState"> 
      <v-btn @click="get_users">Get Users</v-btn>
      <div>
    <v-toolbar class="elevation-1" color="grey lighten-3">
      <v-toolbar-title>USERS</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down ">
      <v-icon large 
            class="mr-1 mt-3" @click="add_user" >
        person_add
      </v-icon>
    </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="users"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.first_name }}</td>
          <td class="text-xs-left">{{ props.item.last_name }}</td>
          <td class="text-xs-left">{{ props.item.address }}</td>
          <td class="text-xs-left">{{ props.item.home_phone }}</td>
          <td class="text-xs-left">{{ props.item.mobile_phone }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>

    
    </div>
    <div v-if="this.$store.state.loginState">
      <h3>You do not have access to this page. Please go to the login page</h3>
      <v-btn @click="login">Login</v-btn>
    </div>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../services/AuthenticationService.js";
export default {
  data(){
    return {
      headers: [
          { text: 'Email', value: 'email' ,sortable: false},
          { text: 'First Name', value: 'first_name' },
          { text: 'Last Name', value: 'last_name' },
          { text: 'Address', value: 'Address', sortable: false },
          { text: 'Home Phone', value: 'home_phone', sortable: false },
          { text: 'Mobile Phone', value: 'mobile_phone', sortable: false },
          { text: 'Actions', value: 'name', sortable: false }

        ]
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    }
  },
  methods: {
    login(){
      this.$router.push('login');
    },
    get_users(){
      this.$store.dispatch('get_users');
      console.log(this.$store.state.users);
    },
    deleteItem(user){
      if(confirm('Are you sure you want to delete this user?') == true){
        this.$store.dispatch('delete_user', {user})
      };
    }, 
    add_user(){
      this.$router.push('register'); 
    }
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
