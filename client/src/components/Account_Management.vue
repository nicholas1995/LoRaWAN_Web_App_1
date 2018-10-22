<template>
  <v-content v-if="this.$store.state.user_class == 'Software Admin'">
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
          <td class="justify-center layout px-0">
            <v-icon v-if="user_email != props.item.email"
              small
              class="mr-2 pt-3"
              @click="update_User(props.item)"
            >
              edit
            </v-icon>
            <v-icon v-if="user_email != props.item.email"
              small
              class="pt-3"
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.first_name }}</td>
          <td class="text-xs-left">{{ props.item.last_name }}</td>
          <td class="text-xs-left">{{ props.item.address }}</td>
          <td class="text-xs-left">{{ props.item.home_phone }}</td>
          <td class="text-xs-left">{{ props.item.mobile_phone }}</td>
          <td class="text-xs-left">{{ props.item.date_created | return_date}}</td>
          <td class="text-xs-left">{{ props.item.user_class}}</td>
      </template>
    </v-data-table>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../services/AuthenticationService.js";
import date_time from "../services/functions/date_time.js";

export default {
  data(){
    return {
      headers: [
          { text: 'Actions', value: 'name', sortable: false },
          { text: 'Email', value: 'email' ,sortable: true},
          { text: 'First Name', value: 'first_name' , sortable: false },
          { text: 'Last Name', value: 'last_name' , sortable: false },
          { text: 'Address', value: 'Address', sortable: false },
          { text: 'Home Phone', value: 'home_phone', sortable: false },
          { text: 'Mobile Phone', value: 'mobile_phone', sortable: false },
          { text: 'Date Created', value: 'date_created', sortable: true },
          { text: 'User Class', value: 'user_class', sortable: true }
        ]
    }
  },
  created: function () {
    if(this.$store.state.user_class =='Software Admin'){
        this.$store.dispatch('get_users');
    }else{
      alert('You do not have access to this page');
        this.$router.push('dashboard');
      }
  },
  destroyed: function(){
    this.$store.commit('get_users_destroy');
  },
  computed: {
    users () {
      return this.$store.state.users
    },
    user_email () {
      return this.$store.state.user.email
    }
  },
  methods: {
    login(){
      this.$router.push('login');
    },
    update_User(user){
      this.$store.commit('update_user', {user});
      this.$router.push('updateuser'); 
    },
    deleteItem(user){
      if(confirm('Are you sure you want to delete this user?') == true){
        this.$store.dispatch('delete_user', {user})
      };
    }, 
    add_user(){
      this.$router.push('register'); 
    } 
  },
  filters: {
        //This function accepts the date and time in ISO 8601 Date and Time in UTC and return DD-MON-YY HH:MM:SS
    return_date(date_created){
      let date = new Date(date_created);
      let month = date_time.return_month(date.getMonth()); //returns the month in 3 letters
      let day = date_time.add_zero(date.getDate());
      let year = date.getUTCFullYear() -2000; //converts the full year to 2 digits 
      let hour = date_time.add_zero(date.getHours());
      let minutes = date_time.add_zero(date.getUTCMinutes());
      let seconds = date_time.add_zero(date.getUTCSeconds());
      let full_date = day+"-"+month+"-"+year +" " + hour +":"+ minutes+":"+ seconds;
      return full_date;
    } 
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 