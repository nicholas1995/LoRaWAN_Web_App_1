<template>
  <v-content v-if="this.access == 1">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class=" elevation-10 ">
            <v-toolbar light class="primary">
              <v-toolbar-title>Update vessel</v-toolbar-title>
            </v-toolbar>
          </v-card>
          <v-card class=" elevation-5 pl-4 pr-4 pt-2 pb-2 grey lighten-5" >
            <!--vessel Name -->
            <v-flex >
              <v-text-field
                v-model="vessel_name"
                label= 'Vessel Name*'
                :error-messages = "vessel_nameErrors"
                @keyup="$v.vessel_name.$touch()" 
              >
              </v-text-field>
              </v-flex>
              <div div class="text">
                {{message}}
              </div>
              <v-btn class="grey lighten-2"
                @click.stop="update_vessel()">
                Update vessel
              </v-btn>
              <v-btn class="grey lighten-2"
                @click.stop="$router.push(`/vessel`)">
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
import { validationMixin } from 'vuelidate'
import { maxLength, helpers, required } from 'vuelidate/lib/validators'

const unique= function(value){
   let i;
  let x = 1; //0 fail, 1 pass
  for(i=0; i< this.vessels.length; i++){
    if(value ==this.vessels[i].vessel_name){
      if(value == this.vessel_update.vessel_name){
        return x;
      }else {
        return 0;
      }
    }
  } 
  return x; 
}
const alpha_num_dash = helpers.regex('alpha_num_dash', /^[a-zA-Z0-9\-\_]*$/);

export default {
  mixins: [validationMixin],
  validations: {
      vessel_name: {
        u: unique,
        required,
        maxLength: maxLength(80)
      }
    },
  data() {
    return {
      vessels: '',
      vessel_update: '',
      access: 0,
      vessel_name: "",
      message: ""
    };
  },
  created: async function () {
      try {
        if (this.$store.state.loginState == false) {
          //User logged in
          await AuthenticationService.check_permissions("vessels", "post")
            .catch(err => {
              console.log(err)
              throw err;
            });
          this.access =1;
          //---------------------------Start------------------------
          await AuthenticationService.get_vessels(null, 0).then(result => {
            this.vessels = result.data.vessels_db;
            this.$emit('message_display',{message:result.data.message, type:result.data.type})   
          }).catch(err => {
            this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})      
          })
          for(let i = 0; i< this.vessels.length; i++){
            if(this.vessels[i].vessel_id == this.$route.params.vessel_id){
              this.vessel_update = this.vessels[i];
              break;
            }
          }
        }else{
          alert('Please login.');
          this.$router.push('/login');
        }
      }catch (err) {
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
    this.vessel_name = this.vessel_update.vessel_name;
  },
  computed: {
    vessel_nameErrors(){
      const errors=[];
      if (!this.$v.vessel_name.$error)return errors
      !this.$v.vessel_name.maxLength && errors.push('Name must be 80 characters or less.')
      !this.$v.vessel_name.required && errors.push('Name is required.')
      !this.$v.vessel_name.u && errors.push('Name must be unique.')
      return errors;
    }
  },
  methods: {
    update_vessel() {
      this.$v.$touch();
      if(this.$v.vessel_name.$invalid){
        this.message ="Error in Form. Please fix and resubmit!"
      }else{
        this.message = "";
        AuthenticationService.update_vessels({vessel_name: this.vessel_name}, this.$route.params.vessel_id).then(result => {
          this.$emit('message_display',{message:result.data.message, type:result.data.type})  
          this.$router.push(`/vessel`)
      }).catch(err => {
          this.message = err.response.data.error; 
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type})   
      })
      }
    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
