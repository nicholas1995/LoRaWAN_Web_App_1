<template>
  <v-content>
    <div v-if="initial == 0">
      <div v-if="this.$store.state.user_class !='Fisher'">
        <network_subnetwork_vessel_device_picker
          @device_id = device_id_function($event)
        ></network_subnetwork_vessel_device_picker>
      </div>
      <v-tabs
        v-model="active_tab"
        dark
        color="primary"
        show-arrows
        grow
      >
        <v-tabs-slider color="secondary"></v-tabs-slider>
        <v-tab
          v-for="i in device_data.length"
          :key="i"
        >
          {{device_data[(i-1)].device_id}}: {{device_data[(i-1)].device_name}} 
        </v-tab>
        <v-tabs-items>
          <v-tab-item
            v-for="i in device_data.length"
            :key="i"
            :value="'tab-' + i"
          >
            <v-card  
              color="grey lighten-3 "
              max-height = "135">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md2 >
                    <v-radio-group
                      :mandatory="false"
                      v-on:change="update_controller_array($event, i)"
                    >
                      <v-radio
                        label="Disable Tracking"
                        value="disable_tracking"
                      ></v-radio>
                      <v-radio
                        label="Realtime Tracking"
                        value="real_time_tracking"
                      ></v-radio>
                      <v-radio
                        label="Historic Tracking"
                        value="historic_tracking"
                      ></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12 sm6 md10 >
                    <div v-if=" controller[(i-1)].action == 'disable_tracking' || controller[(i-1)].action == 'null'">
                      <v-layout row wrap>
                      <v-flex xs12 sm6 md6 >
                        <v-flex xs12 sm12 md12  >
                          <v-btn class="grey lighten-2" small 
                            @click.stop="clear_all_device_tracks(i)">
                            Clear all device tracks
                          </v-btn>
                        </v-flex>  
                        <v-flex xs12 sm12 md12  >
                          <v-btn class="grey lighten-2" small
                            @click.stop="clear_real_time_device_tracks(i)">
                            Clear device realtime tracks
                          </v-btn>
                        </v-flex>  
                        <v-flex xs12 sm12 md12  >
                          <v-btn class="grey lighten-2" small
                            @click.stop="clear_historic_device_tracks(i)">
                            Clear device historic tracks
                          </v-btn>
                        </v-flex>  
                      </v-flex>
                      <v-flex xs12 sm6 md6 >
                        <v-flex xs12 sm12 md12  >
                          <v-btn class="grey lighten-2" small 
                            @click.stop="download_csv(device_real_time_tracking_data[(i-1)], `${device_data[(i-1)].device_name}_real_time_data.csv`)">
                            Download device realtime tracks
                          </v-btn>
                        </v-flex>  
                        <v-flex xs12 sm12 md12  >
                          <v-btn class="grey lighten-2" small 
                            @click.stop="download_csv(device_historic_tracking_data[(i-1)], `${device_data[(i-1)].device_name}_historic_data.csv`)">
                            Download device historic tracks
                          </v-btn>
                        </v-flex>  
                      </v-flex>
                      </v-layout>
                    </div>
                    <div v-else-if=" controller[(i-1)].action == 'real_time_tracking'">
                    </div>
                    <div v-else-if=" controller[(i-1)].action == 'historic_tracking'">
                    <v-layout row wrap>
                        <!-- Date Picker-->
                      <v-flex xs12 sm6 md5>
                        <date_time_picker v-bind:type_prop ='0'  @date= start_date_function($event) @time= start_time_function($event)></date_time_picker>
                      </v-flex>
                      <v-flex xs12 sm6 md5>
                        <date_time_picker v-bind:type_prop = 1 @date= end_date_function($event) @time= end_time_function($event)></date_time_picker>
                      </v-flex>
                      <v-flex xs12 sm6 md2>
                        <v-btn class="grey lighten-2" 
                          @click.stop="generate_historic_device_tracks(i)">
                          Generate
                        </v-btn>
                      </v-flex>
                    </v-layout>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
        <v-layout row wrap>
        <v-flex xs12 sm6 md3 class="pr-4" >
          <v-btn class="grey lighten-2" small
            @click.stop="$router.push(`/map`)">
            View Gateways and Devices
          </v-btn>
        </v-flex>      
        <v-flex xs12 sm6 md3 class="pr-4">
          <v-btn class="grey lighten-2" small
            @click.stop="$router.push(`/map/gateway`)">
            View Gateways Only
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
    <v-flex xs12 sm6 md3 class="pr-4">
      <div class="google-map" :id="map_name" ></div>
    </v-flex>
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
import AuthenticationService from "../../services/AuthenticationService.js";
import functions from "./../../services/functions/forms_functions.js"
import date_time_picker from "./../Date_Time_Picker";
import network_subnetwork_vessel_device_picker from "./Network_Subnet_Vessel_Device_Picker";

function return_date_time(date, time){
  let date_time = null;
  if(date){
    if(time){
      date_time = date.concat(" "+ time+ ":00")
    }else{
      date_time = date.concat(" "+ "00:00:00")
    }
  }else{
    date_time = null;
  }
  return date_time;
}

function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;
    data = args.data || null;
    if (data == null || !data.length) {
      return null;
    }
    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';
    keys = Object.keys(data[0]);
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;
  
      result += item[key];
      ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  }

export default {
  components:{
    date_time_picker,
    network_subnetwork_vessel_device_picker,
  },
  name: 'google',
  props: ['name'],
  data: function () {
    return {
      map_name: this.name + "-map",
      markerCoordinates: [],
      map: null,
      bounds: null,
      markers: [],
      flightPath: null,
      markerCluster: null,
      map_center: {latitude: "10.7277795", longitude: "-61.2105507"},
      coordinates: [],
      contentString: [],
      gateways: '',
      icon_url: ["http://maps.google.com/mapfiles/ms/icons/red-dot.png","http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      "http://maps.google.com/mapfiles/ms/icons/green-dot.png","http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
      "http://maps.google.com/mapfiles/ms/icons/orange-dot.png","http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
      "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"],
      i: 1, //Just to fetch the device locations/// to delete

      device_marker_refresh_interval: 5000,

      device_data: [], //am array of all the returned devices to be plotted

      clear_markers_device_form: "", //this is a variable that holds the device whose tracks are to be cleared

      initial: 1, //This is a flag which is initially set to 1... it is used to ensure that devices clearticks are only added to the array on the initail fetch of the data 

      cleartick_device_marker: [], //arrary that holds all the clearticks to stop the set interval for a device
      cleartick_device_polyline: [], //arrary that holds all the clearticks to stop the set interval for a device polyline

      device_marker_tracker: [], //this is a 2d array which will be used to keep track of which marker is related to which device
      device_real_time_marker_tracker: [], //this is a 2d array which will be used to keep track of the realtime markers for a device
      device_historic_marker_tracker: [], //this is a 2d array which will be used to keep track of the historic trackers of a device

      device_polyline_tracker: [], //2d array to keep track of all the polylines for the devices
      device_real_time_polyline_tracker: [], //2d array to keep track of the real time polylines for the devices
      device_historic_polyline_tracker: [], //2d array to keep track of the historic  polylines for the devices

      real_time_polyline_color: "#00FF88", //variable which holds the color of the real time polylines
      historic_polyline_color: "#FF0088", //variable which holds the color of the historic polylines

      start_date: null,
      start_time: null,
      start_date_time: null,
      end_date: null,
      end_time: null,
      end_date_time: null,

      filter_parameters: {},

      self: 0, //This will be set high if the data user class user wants to view vessles assigned to them 

      controller: [], //this stores all the information about the controller... and the ith array info will refer to the ith device in the device_data array

      device_real_time_tracking_data: [], //a 2d array which stores the device real time tracking data
      device_historic_tracking_data: [], //a 2d array which stores the device historic tracking data

      device_id: '', //the device id of the device selected to control
      active_tab: '', //the tab postion to be opened. the number will be based on the device position in the device_data array

      snackbar:0,
      timeout: 1500,
      color: "error",
      message: "blank",
    }
  },
  mounted: async function () {
    try{
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("devices", "get")
          .catch(err => {
            console.log(err)
            throw err;
          });
        //-------------------------Start----------------------
        this.init_map();
        this.get_device_data_initial();
      }else{
        alert('Please login.');
        this.$router.push('/login');
      }
    }catch(err) {
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
  destroyed: async function(){//clear device intervals
    for(let i =0; i<this.cleartick_device_marker.length; i++){
          let holder  = this.cleartick_device_marker[i];
          clearInterval(holder);
    }
    for(let i =0; i<this.cleartick_device_polyline.length; i++){ //clear device polyline intervals
          let holder  = this.cleartick_device_polyline[i];
          clearInterval(holder);
    }
  },
  methods: {
    init_map: function(){
      //initiialzies the map
      this.bounds = new google.maps.LatLngBounds();
      const element = document.getElementById(this.map_name)
      this.map = new google.maps.Map(element, {
        zoom: 9,
        center: new google.maps.LatLng(this.map_center.latitude, this.map_center.longitude),
      });
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    get_device_data_initial: async function(){
      let result = await AuthenticationService.get_device_data_map_initial()
      .catch(err => {
        //Error fetching the device data
        console.log(err)
      })
      this.device_data = result.data.device_data
      for(let i =0; i< this.device_data.length; i++){
        //-----------------------------------------------------Define data types------------------------
        //----------------------------------------------------------------------------------------------
        this.cleartick_device_marker.push(null);
        this.cleartick_device_polyline.push(null);

        this.device_marker_tracker.push([]);
        this.device_real_time_marker_tracker.push([]);
        this.device_historic_marker_tracker.push([]);

        this.device_polyline_tracker.push([]);
        this.device_real_time_polyline_tracker.push([]);
        this.device_historic_polyline_tracker.push([]);

        this.device_real_time_tracking_data.push([]);
        this.device_historic_tracking_data.push([]);

        this.controller.push({
          action: 'null',
          initial: 1, //this will go to 0 when radio is moved to any option other than no_tracking on the first select
          historic_tracking: {
            start_date_time: null,
            end_date_time: null
          }
        })

        this.create_device_marker(this.device_data[i], 1)
      }
      this.initial = 0;
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    create_device_marker: async function(device, refresh_marker){
        let position = new google.maps.LatLng(device.gps_latitude, device.gps_longitude);
        let marker;
        if(device.sos == 1){
          marker = new google.maps.Marker({ 
            position,
            map: this.map,
            label: `${device.device_id}`,
            animation:google.maps.Animation.BOUNCE
          });
        }else{
          marker = new google.maps.Marker({ 
            position,
            map: this.map,
            label: `${device.device_id}`
          });
        }
        let i = this.find_device_array_position(device.device_id);
        this.markers.push(marker)
        let position_in_marker_array = (this.markers.length -1);

        //set device trackers
        this.device_marker_tracker[i].push(position_in_marker_array);
        if(this.controller[i].action == 'real_time_tracking'){
          this.device_real_time_tracking_data[i].push(device); //stores the device real time tracking data so it can be downloaded
          this.device_real_time_marker_tracker[i].push(position_in_marker_array)
        }else if(this.controller[i].action == 'historic_tracking'){
          this.device_historic_tracking_data[i].push(device); //stores the device historic tracking data so it can be downloaded
          this.device_historic_marker_tracker[i].push(position_in_marker_array)
        }

        var info_window = new google.maps.InfoWindow(); //creates the instance of the infowindow
        this.set_device_info_window(marker, info_window, device); //sets the info window
        if(refresh_marker == 1){
          let x = (setInterval(this.refresh_device_marker, this.device_marker_refresh_interval, marker, info_window, device));//this is the syntax for it to work
          if(this.initial ==1){
            this.map.fitBounds(this.bounds.extend(position))
            this.cleartick_device_marker[i]= x; //adds the variable returned to the array in the same order as the device_data.. so the value returned in i will refer to the ith device in device_data
          }else if(this.initial == 0){
            this.cleartick_device_marker[i] = x; //this is done so for each device only one marker is being updated
          }
        }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    refresh_device_marker:  async function(marker, info_window, device){
      device = await AuthenticationService.refresh_device_data_map(device.device_id)
        .catch(err => {
          //Error gettin most recent 
          console.log(err)
        })
      device = device.data.device_data[0];
      let i = this.find_device_array_position(device.device_id)
      this.device_data[i] = device;
      let position = new google.maps.LatLng(device.gps_latitude, device.gps_longitude);
      marker.setPosition(position)
      this.set_device_info_window(marker, info_window, device);
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    set_device_info_window: function(marker, info_window, device){
        var content = `<div>
                        <h3>Basic Device Information</h3>
                          <b>Device Name:</b> ${device.device_name} <br>
                          <b>Vessel Name:</b> ${device.vessel_name} <br>
                          <b>Vessel ID:</b> ${device.vessel_id}<br>
                          <b>Sub-Network ID:</b> ${device.sub_network_id}<br>
                        </div>`;
        let x = 0;
        //Open the infowindow for the device marker(ON MOUSE OVER)
        google.maps.event.addListener(marker,'mouseover', (function(marker,content,info_window){ 
          return function() {
              x = 1;
              info_window.setContent(content);
              info_window.open(this.map,marker);
          };
        })(marker,content,info_window));
        //Close the infowindow for the device marker(ON MOUSE OUT)
        google.maps.event.addListener(marker,'mouseout', (function(marker,content,info_window){ 
          return function() {
            if(x == 1){
              info_window.close(this.map,marker);
              x = 0;
            }
          };
        })(marker,content,info_window));
        content = `<div>
                      <h3>Device Sensor Data</h3>
                      <b>Time Stamp</b>: ${device.time_stamp}<br>
                      <b>Temperature:</b> <br>
                      <b>Humidity:</b> <br>
                      <b>Accelerometer:</b> <br>
                      <b>SOS:</b>${device.sos} <br>
                      <b>GPS Latitude:</b> ${device.gps_latitude}<br>
                      <b>GPS Longitude:</b> ${device.gps_longitude}<br>
                  </div>`;
      google.maps.event.addListener(marker,'rightclick', (function(marker,content,info_window){ 
        return function() {
         x = 0
            info_window.setContent(content);
            info_window.open(this.map,marker);
        };
      })(marker,content,info_window));
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    start_device_tracking: async function(i){
      console.log('tracking called')
      let device_id = this.find_device_id(i);
      let device_data_update = await AuthenticationService.refresh_device_data_map(device_id)
        .catch(err => {
          //Error gettin most recent 
          console.log(err)
        })
      device_data_update = device_data_update.data.device_data[0];
      this.device_data[i] = device_data_update;
      this.create_device_marker(device_data_update, 0)  
      this.create_device_polyline(this.device_data[i]);
      var x = setInterval(this.refresh_device_polyline, 5000, this.device_data[i], i);//this is the syntax for it to work
      this.cleartick_device_polyline[i]  = null; 
      this.cleartick_device_polyline[i]  = x; 
    },
  //--------------------------------------------------------------------------------------------------------------------------------------------
    create_device_polyline: function(device){
    //creates the polyline and sets the first position to the location of the existing marker
      console.log('create device polyline')
      let i = this.find_device_array_position(device.device_id);
      let path = [];
      path.push({lat: parseFloat(device.gps_latitude),
        lng: parseFloat(device.gps_longitude)})
        let polyline = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: this.map
        }); 
      this.device_polyline_tracker[i].push(polyline); //track all the polylines for this device
      if(this.controller[i].action == 'real_time_tracking'){
        console.log('Create realtime polyline')
        polyline.setOptions({strokeColor: `${this.real_time_polyline_color}`});
        this.device_real_time_polyline_tracker[i].push(polyline); //track the real time polylines for this device 
      }else if(this.controller[i].action == 'historic_tracking'){
        console.log('Create historic polyline')
        polyline.setOptions({strokeColor: `${this.historic_polyline_color}`});
        this.device_historic_polyline_tracker[i].push(polyline); //track the historic polylines for this device 
      }
    },
  //--------------------------------------------------------------------------------------------------------------------------------------------
    refresh_device_polyline: async function( device_data, i){
      console.log('refresh polyline')
        let device_data_update = await AuthenticationService.refresh_device_data_map(device_data.device_id)
        .catch(err => {
          //Error gettin most recent 
          console.log(err)
        })
        device_data_update = device_data_update.data.device_data[0];
        //Prevents the marker from updating if the location does not change or if the same id is present (ie same data packet)
        if( ((this.device_data[i].gps_latitude == device_data_update.gps_latitude) && (this.device_data[i].gps_longitude == device_data_update.gps_longitude)) || this.device_data[i].device_uplink_id ==device_data_update.device_uplink_id){
          this.device_data[i] = device_data_update;
        }else{
          this.device_data[i] = device_data_update;
          this.create_device_marker(device_data_update, 0)
          this.append_device_polyline(i, device_data_update, 'real_time_tracking')
        }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    append_device_polyline: function(i, device_data, action){
      console.log("append device polyline")
      //takes in an int i which represents the device position in arrays and the device data with the coordinates to append and also the action which can be either... real_time_tracking or historic_tracking
      let position = new google.maps.LatLng(device_data.gps_latitude, device_data.gps_longitude); //create the updated position of the coordinate
      if(action == 'real_time_tracking'){
        let length = this.device_real_time_polyline_tracker[i].length;
        let device_real_time_polyline_path = this.device_real_time_polyline_tracker[i][(length -1)].getPath(); //get the polyline to update... this returns an array hence we use this as a place holder
        device_real_time_polyline_path.push(position);  
      }else if(action =="historic_tracking"){
        let length = this.device_historic_polyline_tracker[i].length;
        let device_historic_polyline_tracker = this.device_historic_polyline_tracker[i][(length -1)].getPath(); //get the polyline to update... this returns an array hence we use this as a place holder
        device_historic_polyline_tracker.push(position);  
      }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    find_device_array_position: function(device_id){
      //this takes in the device id and returns the array position that that id is related to in terms of the clearticks for both the device and the device_polyline
      for(let i =0; i< this.device_data.length; i++){
        if(device_id == this.device_data[i].device_id){
          return i;
        }
      }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    find_device_id: function(array_position){
      //this takes in the device array_position and returns the device id
      return this.device_data[array_position].device_id;
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    start_date_function(date){
      this.start_date = date;
      this.start_date_time = null;
    },
    start_time_function(time){
      this.start_time = time;
      this.start_date_time = null;
    },    
    end_date_function(date){
      this.end_date = date;
      this.end_date_time = null;
    },
    end_time_function(time){
      this.end_time = time;
      this.end_date_time = null;
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    generate_function: async function(device_id){
      this.start_date_time = return_date_time(this.start_date, this.start_time);
      this.end_date_time =return_date_time(this.end_date, this.end_time);
      if(this.start_date_time){
        this.filter_parameters["start_date"] = this.start_date_time;
      }
      if(this.end_date_time){
        this.filter_parameters["end_date"] = this.end_date_time;
      }
      if(device_id && this.self ==0){
        this.filter_parameters["device"] = device_id;
      }else if(device_id && this.self ==1){
        this.filter_parameters["device"] = device_id;
      }
      let data;
      await AuthenticationService.device_historical_data(this.filter_parameters).then(result=>{
        if(result.status == 204){ //No Data returned 
        }else{
          data = result.data.device_data;
        }
      }).catch(err => {
          //Error getting the devices from the server
          console.log(err)
          this.$emit('message_display',{message:err.response.data.message, type:err.response.data.type}) 
          throw err;
      }) 
      return data;
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------  
    update_controller_array: function(action, i){
      //action refers to the action to what type of plotting is required for that device.... they relate to the radio buttons
      i = i-1; //this is done because the counter in the tabs starts at 1 and not 0 
      let previous_action = this.controller[i].action;
      if(previous_action != action && !(previous_action == 'null' && action =='disable_tracking')){ //to prevent it from updating if they keep pressing the button and from allowing the first press to be disable_tracking which is already the default value
          if(previous_action == "disable_tracking" || previous_action == 'null'){ //stops the marker set interval for the device
            let holder  = this.cleartick_device_marker[i];
            clearInterval(holder);
            this.cleartick_device_marker[i] = null ; 
            let length = this.device_marker_tracker[i].length; //anytime we switch to another option we delete the no tracking marker 
            let position = this.device_marker_tracker[i][(length-1)];
            this.markers[(position)].setMap(null)
          }else if(previous_action == "real_time_tracking"){ //stops the polyline set interval of the device
            let holder  = this.cleartick_device_polyline[i];
            clearInterval(holder);
            this.cleartick_device_polyline[i] = null ; 
          }else if(previous_action == "historic_tracking"){
            
          }
        ///-----------------------------------------------------------
        if(action == "disable_tracking" && previous_action != 'null'){
          this.controller[i].action = 'disable_tracking';
          this.controller[i].historic_tracking.start_date_time = null;
          this.controller[i].historic_tracking.end_date_time = null;
          this.create_device_marker(this.device_data[i], 1)
        }
        else if(action == "real_time_tracking"){
          this.controller[i].action = 'real_time_tracking';
          this.controller[i].historic_tracking.start_date_time = null;
          this.controller[i].historic_tracking.end_date_time = null;
          this.start_device_tracking(i);
        }else if(action == "historic_tracking"){
          this.controller[i].action = 'historic_tracking';
        }
      }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------  
    generate_historic_device_tracks: async function(i){
      i=i-1;
      this.controller[i].historic_tracking.start_date_time = return_date_time(this.start_date, this.start_time);
      this.controller[i].historic_tracking.end_date_time = return_date_time(this.end_date, this.end_time);
      let device_id = this.find_device_id(i);
      this.generate_function(device_id).then(result => {
        for(let j = 0;j < result.length; j++){
            this.create_device_marker(result[j], 0);
            if(j ==0){//create the polyline once
              this.create_device_polyline(result[j])
            }else{//append to the previously created polyline 
              this.append_device_polyline(i, result[j], 'historic_tracking')
            }
        }
      })
        .catch(err => {
          //Error fetching the historic data for the selected device
          console.log(err)
        })
    },
  //--------------------------------------------------------------------------------------------------------------------------------------------
    clear_all_device_tracks: function(i){
      i = i-1
      for(let j = 0; j< (this.device_polyline_tracker[i].length); j++){
          this.device_polyline_tracker[i][j].setMap(null)
          this.device_polyline_tracker[i][j] = null;
      }
      let holder;
      for(let j = 0; j< (this.device_marker_tracker[i].length - 1); j++){
        holder = this.device_marker_tracker[i][j];
        this.markers[holder].setMap(null)
      }
      this.device_polyline_tracker[i] = [];
      this.device_real_time_polyline_tracker[i] = [];
      this.device_real_time_marker_tracker[i] = [];
      this.device_historic_polyline_tracker[i] = [];
      this.device_historic_marker_tracker[i] = [];

      this.device_real_time_tracking_data[i] = [];
      this.device_historic_tracking_data[i] = [];
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    clear_real_time_device_tracks: function(i){
      i = i-1;
      console.log(this.device_real_time_tracking_data[i]);
      for(let j = 0; j< (this.device_real_time_polyline_tracker[i].length); j++){
        if(this.device_real_time_polyline_tracker[i][j]){
          this.device_real_time_polyline_tracker[i][j].setMap(null)
        }
      }
      let holder;
      for(let j = 0; j< (this.device_real_time_marker_tracker[i].length); j++){
        if(this.device_real_time_marker_tracker[i][j] || this.device_real_time_marker_tracker[i][j] == 0){
          holder = this.device_real_time_marker_tracker[i][j];
          this.markers[holder].setMap(null)
        }
      }
      this.device_real_time_tracking_data[i] = [];
      this.device_real_time_polyline_tracker[i] = [];
      this.device_real_time_marker_tracker[i] = [];
    },    
    //--------------------------------------------------------------------------------------------------------------------------------------------
    clear_historic_device_tracks: function(i){
      i = i-1
      for(let j = 0; j< (this.device_historic_polyline_tracker[i].length); j++){
        if(this.device_historic_polyline_tracker[i][j]){
          this.device_historic_polyline_tracker[i][j].setMap(null)
        }
      }         
      let holder;
      for(let j = 0; j< (this.device_historic_marker_tracker[i].length); j++){
        if(this.device_historic_marker_tracker[i][j]){
          holder = this.device_historic_marker_tracker[i][j];
          this.markers[holder].setMap(null)
        }
      }
      this.device_historic_tracking_data[i] = [];
      this.device_historic_polyline_tracker[i] = [];
      this.device_historic_marker_tracker[i] = [];
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    download_csv: function(download_data, name) {
      if(download_data.length >0){
        var data, filename, link;
        var csv = convertArrayOfObjectsToCSV({
          data: download_data
        });
        if (csv == null) return;
        filename = name || 'export.csv';
        
        if (!csv.match(/^data:text\/csv/i)) {
          csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
      }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    device_id_function: function(data){
      if(data){
        this.device_id = data
        if(this.find_device_array_position(this.device_id) == undefined){
          this.message_display({type: 'info', message: 'No uplink data for selected device'})
        }else{
          this.active_tab = this.find_device_array_position(this.device_id);
        }
      }
      else {
        this.device_id = null
      }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    message_display(data){
      this.snackbar=1;
      this.color =data.type;
      this.message = data.message;
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.google-map {
  width: 1200px;
  height: 500px;
  margin: 0 auto;
  background: gray;
}
</style>
 