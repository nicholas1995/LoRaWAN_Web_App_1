<template>
    <v-content>   
       <v-layout row wrap>
          <!-- Date Picker-->
          <v-flex xs12 sm5 md5>
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
          <v-flex xs12 sm5 md5>
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
          <v-flex xs12 sm5 md1>
            <v-icon slot="activator"
                small
                class="pt-3 pr-3"
                @click="clear_date_time()"
              >
              clear
            </v-icon>
          </v-flex>
        </v-layout>
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
    };
  },
   props:[
   'type_prop',
   'date_time_prop',//this is passed in from the device data component... this data originates from the analyst filter records and is used to update the fields with the filter record data
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
      this.$emit('date', this.date)
    },
    time: function(){
      this.$emit('time', this.time)
    },
    date_time_prop: function(){ 
      this.date = this.date_time_prop[0];
      if(this.date_time_prop.length > 1) this.time = this.date_time_prop[1]
      else this.time = null
    },
  },
  methods: {
    clear_date_time: function(){
      this.date = null;
      this.time = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
