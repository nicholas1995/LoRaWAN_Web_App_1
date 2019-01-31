<template>
  <v-layout row wrap>
    <!-- Analyst Filter Records-->
      <v-flex xs12 sm6 md3>
      <!--Filter Record Name -->
        <v-text-field
          v-model="analyst_filter_record_name"
          label="Filter Record Name*"
          :error-messages = "analyst_filter_record_name_errors"
          @keyup="$v.analyst_filter_record_name.$touch()" 
        >
        </v-text-field>
      </v-flex>
    <v-flex xs12 sm6 md2>
      <v-btn class ="grey lighten-3" v-on:click="create_analyst_filter_record" >Create Filter Record</v-btn>
    </v-flex>
    <v-flex xs12 sm6 md3 class = "pl-4">
    <!--Analyst Filter Record Name --> 
      <v-select
        v-model="analyst_filter_record_form"
        :items="this.analyst_filter_records_id_name"
        label="Filter Records*"
        v-on:change="analyst_filter_record_event_handler()"
      >
      </v-select>
    </v-flex>
  </v-layout>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
import functions from "./../../services/functions/forms_functions.js"
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
      analyst_filter_record_name: {
        required,
        maxLength: maxLength(80),
      }
    },
  data() {
    return {
        analyst_filter_record_name: '',
        analyst_filter_records: null, //array which holds all the filter records for the analsyst logged on 
        analyst_filter_records_id_name: [], //array which holds all id:name of the filter records for the analsyst logged on 
        analyst_filter_record_form: null, //the filter record selected

    };
  },
   props:[
   'analyst_filter_parameters',
  ],
  created: async function(){
    this.initizize_analyst_filter_records();
  },
  watch: {
    network_name_form: async function(){

      this.$emit('sub_network_id', this.sub_network_id)
    },
  },
  computed: {
    analyst_filter_record_name_errors(){
      const errors=[];
      if (!this.$v.analyst_filter_record_name.$error)return errors
      !this.$v.analyst_filter_record_name.maxLength && errors.push('Name must be 80 characters or less.')
      !this.$v.analyst_filter_record_name.required && errors.push('Name is required.')
      return errors;
    },
  },
  methods: {
    analyst_filter_record_event_handler: async function(event){
      //This function is called when an analyst selects a filter record and the record is used to update the filter parameters and fetches the data corresponding to the filter record
      let selected_analyst_filter_record_id = functions.extract_id_id_name(this.analyst_filter_record_form)
      let analyst_filter_record = this.get_analyst_filter_record_given_id(selected_analyst_filter_record_id)
      let headers;
      if(analyst_filter_record.analyst_filter_record_header != "null") {//leave first so this will call the generate function when the headers are set and then after
      //the other parameters are set we fetch the actual data and emit it 
        headers = JSON.parse(analyst_filter_record.analyst_filter_record_header)
        headers = headers.split(",");
        this.$emit('headers', headers)
      }else this.$emit('headers', [])
      if(analyst_filter_record.analyst_filter_record_network != "null") {//Network
        let networks = JSON.parse(analyst_filter_record.analyst_filter_record_network)
        this.$emit('networks', networks)
      }else this.$emit('networks', [])
      if(analyst_filter_record.analyst_filter_record_sub_network != "null") {//Sub-Network
        let sub_networks = JSON.parse(analyst_filter_record.analyst_filter_record_sub_network)
        this.$emit('sub_networks', sub_networks)
      }else this.$emit('sub_networks', [])
      if(analyst_filter_record.analyst_filter_record_vessel != "null") {//Vessel
        let vessels = JSON.parse(analyst_filter_record.analyst_filter_record_vessel)
        this.$emit('vessels', vessels)
      }else this.$emit('vessels', [])
      if(analyst_filter_record.analyst_filter_record_device != "null") {//Device
        let devices = JSON.parse(analyst_filter_record.analyst_filter_record_device);
        this.$emit('devices', devices)
      }else this.$emit('devices', [])
      if(analyst_filter_record.analyst_filter_record_start_date != "null") {//Start Date
        let start_date_time = analyst_filter_record.analyst_filter_record_start_date.split(" ");
        if(start_date_time[1] == "00:00:00") start_date_time.pop(); //if the time is not set pop it from the array
        else start_date_time[1] = start_date_time[1].slice(0,5) //remove the seconds from the time 
        this.$emit('start_date_time', start_date_time)
      }else this.$emit('start_date_time', '')
      if(analyst_filter_record.analyst_filter_record_end_date != "null") {//End Date
        let end_date_time = analyst_filter_record.analyst_filter_record_end_date.split(" ");
        if(end_date_time[1] == "00:00:00") end_date_time.pop();
        else end_date_time[1] = end_date_time[1].slice(0,5) //remove the seconds from the time 
        this.$emit('end_date_time', end_date_time)
      }else this.$emit('end_date_time', '')
      let analsyst_filter_record_device_data = await AuthenticationService.device_rx_filtered_analyst_filter_record(analyst_filter_record, headers)
        .catch(err => {
          //Error getting the device data based on the parameters in an analyst filter record
          console.log(err)
        })
        this.$emit('device_data', analsyst_filter_record_device_data.data.device_data)
        this.$emit('analyst_filter_parameters', analsyst_filter_record_device_data.data.analyst_filter_parameters)
        this.$emit('headers_returned', analsyst_filter_record_device_data.data.headers)//this is the headers returned from the generate data fetch
    },
    create_analyst_filter_record: async function(){
      this.$v.$touch(); 
      //This function is called when the analyst clicks the button to create a new filter record
      if(this.$v.analyst_filter_record_name.$invalid ){
      }else{
        this.analyst_filter_parameters["analyst_filter_record_name"] = this.analyst_filter_record_name
        let result = await AuthenticationService.create_analyst_filter_records(this.analyst_filter_parameters)
          .catch(err => {
            console.log(err);
          })
        this.analyst_filter_records = result.data.analyst_filter_records;
        this.analyst_filter_records_id_name = this.create_analyst_filter_record_id_name_array(this.analyst_filter_records)
      }


    },
    initizize_analyst_filter_records: async function(){
      this.analyst_filter_records = await AuthenticationService.get_analyst_filter_records()
        .catch(err => {
          //Error fetching the analyst filter records
        })
        this.analyst_filter_records = this.analyst_filter_records.data.analyst_filter_records;
        this.analyst_filter_records_id_name = this.create_analyst_filter_record_id_name_array(this.analyst_filter_records)
    },
    create_analyst_filter_record_id_name_array: function(analyst_filter_records){
      let analyst_filter_records_id_names = [];
      for(let i = 0; i< analyst_filter_records.length; i++){
        analyst_filter_records_id_names.push(analyst_filter_records[i].analyst_filter_record_id+":"+analyst_filter_records[i].analyst_filter_record_name);
      }
      return analyst_filter_records_id_names
    },
    get_analyst_filter_record_given_id: function(analyst_filter_record_id){
      //This accepts the id on an anlayst filter record and returns the analyst filter record with the given id
      for(let i = 0; i< this.analyst_filter_records.length; i++){
        if(analyst_filter_record_id == this.analyst_filter_records[i].analyst_filter_record_id){
          return this.analyst_filter_records[i]
        }
      }
      return null;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
