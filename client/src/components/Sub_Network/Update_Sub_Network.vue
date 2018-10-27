<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Update Sub-Network</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--Sub-Network Name -->
            <v-flex >
              <v-text-field
                v-model="sub_network_name"
                hint= 'Sub-Network Name'
                :label="this.sub_network.sub_network_name"
                required
              ></v-text-field>
              </v-flex>
            <!--Description  -->
            <v-flex >
              <v-text-field
                v-model="description"
                hint= 'Description'
                :label="this.sub_network.description"
                required
              ></v-text-field>
              </v-flex>
            <!--Network Name-->
              <v-combobox
                v-model="network_name"
                :items="items"
                chips
                hint= 'Network Name'
                :label="this.sub_network.network_name"
              ></v-combobox>
            <!--Service Profile Name-->
              <v-combobox
                v-model="service_profile_name"
                :items="items"
                chips
                hint= 'Service Profile Namee'
                :label="this.sub_network.service_profile_name"
              ></v-combobox>
            <!-- Message -->
              <div div class="text">
                {{message}}
              </div>
            <!-- Buttons -->
              <v-btn class="grey lighten-2"
                @click.stop="update_sub_network()">
                Update Sub-Network
              </v-btn>
             <v-btn class="grey lighten-2"
                @click.stop="$emit('sub_network_management')">
                Cancel
              </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
export default {
  data() {
    return {
      sub_network_name: "",
      description: "",
      network_name: "",
      service_profile_name: "",
      message: "",
      items:[]
    };
  },
  props:[
   'sub_network'
  ],
  created: function () {
    console.log('here 0');
  },
  destroyed: function(){
    console.log('here 4');
  },
  components: {},
  methods: {
    update_sub_network() {
      console.log('here 1');
      this.$emit('sub_network_management')
      console.log('here 2');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
