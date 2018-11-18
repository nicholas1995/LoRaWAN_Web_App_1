<template>
    <v-content>   
      <v-container fluid fill-height>
       <v-layout row wrap>
        <!-- Date Picker-->
        <v-flex xs12 sm6 md6>
          <v-menu
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="date"
              :label="type"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
          </v-menu>
      </v-flex >
      <!-- Time Picker-->
      <v-flex xs12 sm6 md6>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="40"
          :return-value.sync="time"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="time"
            :label="type_time"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker
            v-if="menu2"
            v-model="time"
            full-width
            format="24hr"
            @change="$refs.menu.save(time)"
          ></v-time-picker>
      </v-menu>
    </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>
  

<script>


export default {
  data() {
    return {
        date: null,
        menu: false,
        modal: false,
        menu2: false,
        time: null,
        modal2: false,
        type_date: "",
        type_time: "",
        date_time: ""
    };
  },
   props:[
   'type_prop',
   'generate_prop'
  ],
  created: function(){
      if(this.type_prop ==0){
        this.type = "Start Date"
        this.type_time ="Start Time"
      }else{
        this.type = "End Date"
        this.type_time ="End Time"
      }
  },
  watch: {
    date: function(){
    },
    time: function(){
      this.devices = this.devices_prop;
    },
    generate_prop: function(){
      console.log('here time')
      if(this.date){
        if(this.time){
          this.date_time = this.date.concat("T"+ this.time+ ":00Z")
          this.$emit('date', this.date_time)
        }
      }
    }
  },
  computed: {
    email_errors() {
      const errors = [];
      if (!this.$v.email.$error) return errors;
      !this.$v.email.required && errors.push("Email is required");
      !this.$v.email.email && errors.push("Must be a vaild email address.");
      return errors;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
