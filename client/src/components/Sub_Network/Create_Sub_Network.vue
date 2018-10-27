<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="grey lighten-2 ">
              <v-toolbar-title>Create Sub-Network</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--Sub-Network Name -->
            <v-flex >
              <v-text-field
                v-model="sub_network_name"
                label="Sub-Network Name"
                required
              ></v-text-field>
              </v-flex>
            <!--Description  -->
            <v-flex >
              <v-text-field
                v-model="description"
                label="Description"
                required
              ></v-text-field>
              </v-flex>
            <!--Network Name-->
              <v-combobox
                v-model="network_name"
                :items="items"
                chips
                label="Network Name"
              ></v-combobox>
            <!--Service Profile Name-->
              <v-combobox
                v-model="service_profile_name"
                :items="items"
                chips
                label="Service Profile Name"
              ></v-combobox>
              <!-- Message -->
              <div div class="text">
                {{message}}
              </div>
              <!-- Buttons -->
              <v-btn class="grey lighten-2"
                @click.stop="create_sub_network()">
                Create Sub-Network
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
      sub_network_name: '',
      description: '',
      network_name: '',
      service_profile_name: '',
      message: '',
      items: []
    };
  },
  beforeCreate: function () {

  },
  components: {},
  methods: {
    create_sub_network(){
      this.$emit('sub_network_management');
    },
    async register() {
      try {
        const response = await AuthenticationService.register({
          first_name: this.first_name,
          last_name: this.last_name,
          address: this.address,
          home_phone: this.home_phone,
          mobile_phone: this.mobile_phone,
          email: this.email,
          user_class: this.user_class_selected
        });
        this.$store.dispatch('get_users');
        this.$router.push('accountmanagement');
      } catch (error) {
        this.message = error.response.data.error;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
