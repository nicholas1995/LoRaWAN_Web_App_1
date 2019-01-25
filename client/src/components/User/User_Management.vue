<template>
  <v-content>
    <v-toolbar class="elevation-1" color="grey lighten-3">
      <v-toolbar-title>USERS</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down ">
      <v-tooltip bottom>
        <v-icon large slot="activator"
              class="mr-1 mt-3" @click.stop="$router.push(`/user/create`)"  >
          person_add
        </v-icon>
        <span>Add User</span>
      </v-tooltip>
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
            <v-tooltip bottom>
              <v-icon slot="activator"
                v-if="user_email != props.item.email"
                small
                class="mr-2 pt-3"
                @click="$router.push(`/user/update/${props.item.id}`)"
              >
                edit
              </v-icon>
              <span>Edit {{props.item.first_name}}</span>
             </v-tooltip>
            <v-tooltip bottom>
              <v-icon slot="activator"
                v-if="user_email != props.item.email"
                small
                class="pt-3"
                @click="delete_user(props.item)"
              >
                delete
              </v-icon>
              <span>Delete {{props.item.first_name}}</span>
            </v-tooltip>
          </td>
          <td class="text-xs-left">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.first_name }}</td>
          <td class="text-xs-left">{{ props.item.last_name }}</td>
          <td class="text-xs-left">{{ props.item.user_class}}</td>
          <td class="text-xs-left">{{ props.item.user_country}}</td>
          <td class="text-xs-left">{{ props.item.user_city}}</td>
          <td class="text-xs-left">{{ props.item.user_district}}</td>
          <td class="text-xs-left">{{ props.item.user_street}}</td>
          <td class="text-xs-left">{{ props.item.home_phone }}</td>
          <td class="text-xs-left">{{ props.item.mobile_phone }}</td>
          <td class="text-xs-left">{{ props.item.date_created | return_date}}</td>
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
          { text: 'ID', value: 'id' ,sortable: true},
          { text: 'Email', value: 'email' ,sortable: true},
          { text: 'First Name', value: 'first_name' , sortable: true },
          { text: 'Last Name', value: 'last_name' , sortable: true },
          { text: 'User Class', value: 'user_class', sortable: true },
          { text: 'Country', value: 'user_country', sortable: true },
          { text: 'City', value: 'user_city', sortable: false },
          { text: 'District', value: 'user_district', sortable: false },
          { text: 'Street', value: 'user_street', sortable: false },
          { text: 'Home Phone', value: 'home_phone', sortable: false },
          { text: 'Mobile Phone', value: 'mobile_phone', sortable: false },
          { text: 'Date Created', value: 'date_created', sortable: true },
        ],
        users: []
    }
  },
  created: async function () {
    try {
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("users", "post")
          .catch(err => {
            console.log(err)
            throw err;
          });
        this.access =1;
        //--------------Start-------------------
        AuthenticationService.get_users().then(result => {
          this.users = JSON.parse(result.data.users);
          this.$emit('message_display',{message:result.data.message, type:result.data.type})   
        }).catch(err => {
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})      
        })
      }else{
        alert('Please login.');
        this.$router.push('/login');
      }
    }catch (err) {
      console.log(err)
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
   'users_prop'
  ],
  watch: {
    users_prop: function(){
      this.users = this.users_prop;
    }
  },
  computed: {
    user_email () {
      return this.$store.state.user.email
    }
  },
  methods: {
    delete_user(user){
      if(confirm('Are you sure you want to delete this user?') == true){
        AuthenticationService.delete_users(user.id).then(result => {
          this.users = result.data.users;
          this.$emit('message_display',{message:result.data.message, type:result.data.type}) 
        }).catch(err => {
          //Error requesting through the server to delete a network on the lora app server
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})  
        })
      }; 
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
 