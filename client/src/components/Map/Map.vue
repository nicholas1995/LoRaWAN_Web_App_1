<template>
  <v-content>
    <div v-if="initial == 0">
      <div v-if="this.$store.state.user_class !='Fisher'">
        <v-layout row wrap>
          <v-flex xs6 sm6 md2 >
            <v-switch
              v-model="display_devices_switch"
              height=0
              :label="`Display Devices: ${display_devices_switch.toString()}`"
            ></v-switch>
          </v-flex>
          <v-flex xs6 sm6 md2 >
            <v-switch
              v-model="display_gateways_switch"
              height=0
              :label="`Display Gateways: ${display_gateways_switch.toString()}`"
            ></v-switch>
          </v-flex>
          <v-flex xs12 sm12 md8>
            <div v-show="this.display_devices_switch">
              <network_subnetwork_vessel_device_picker
                @device_id = device_id_function($event)
              ></network_subnetwork_vessel_device_picker>
            </div>
          </v-flex>
        </v-layout>

      </div>
      <div v-if="this.$store.state.user_class =='Fisher'"><!--Vessel device picker for fisher -->
        <v-flex xs12 sm12 md12>
          <div v-show="this.display_devices_switch">
            <vessel_device_picker
              @device_id = device_id_function($event)
            ></vessel_device_picker>
          </div>
        </v-flex>
      </div>
      <div v-if="this.display_devices_switch">
        <!--TAB 1 -->
        <v-tabs
        
          v-model="active_tab"
          color="primary"
          show-arrows
          grow
          height=40
        >
          <v-tabs-slider color=black></v-tabs-slider>
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
          <v-divider></v-divider>


        <v-tabs
          @input="update_controller_array($event, i)"
          v-model="active_tab_2[i]"
          color="primary"
          show-arrows
          grow
          height=30
        >
          <v-tabs-slider color="black"></v-tabs-slider>
          <v-tab
            v-for="j in controller_array_heading_text.length"
            :key="j"
          >
            {{controller_array_heading_text[(j-1)]}}
          </v-tab>
          <v-tabs-items>
            <v-tab-item
              v-for="j in controller_array_heading_text.length"
              :key="j"
              :value="'tab-' + j"
            >
              <v-card  
                color="grey lighten-3 "
                >
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs12 sm12 md12 >
                      <div v-if=" controller[(i-1)].action == 'disable_tracking' || controller[(i-1)].action == 'null'"> <!-- ////////////REAL TIME LOCATION//////////////////////////-->
                        <v-layout row wrap align-center justify-space-between>
                          <v-flex xs12 sm12 md6 lg3>
                            <v-select
                              v-model="device_real_time_location_interval_form[i-1]"
                              :items="device_real_time_location_interval"
                              label="Real Time Location Refresh Interval"
                              suffix= 'seconds'
                            > 
                            </v-select>
                          </v-flex>
                          <v-flex xs12 sm12 md6 lg3>
                            <v-btn class="button black--text"  
                              @click.stop="clear_all_device_tracks(i)">
                              Clear all device tracks
                            </v-btn>
                          </v-flex>  
                          <v-flex xs12 sm12 md6 lg3>
                            <v-btn class="button black--text" 
                              @click.stop="clear_real_time_device_tracks(i)">
                              Clear device realtime tracks
                            </v-btn>
                          </v-flex> 
                          <v-flex xs12 sm12 md6 lg3>
                            <v-btn class="button black--text"
                              @click.stop="clear_historic_device_tracks(i)">
                              Clear device historic tracks
                            </v-btn>
                          </v-flex>   
                        </v-layout>
                      </div>
                      <div v-else-if=" controller[(i-1)].action == 'real_time_tracking'"> <!-- ////////////////REAL TIME TRACKING//////////////////////-->
                        <v-layout row wrap align-center justify-space-between>
                          <v-flex xs12 sm12 md6 lg6>
                            <v-select
                              v-model="device_real_time_tracking_interval_form[i-1]"
                              :items="device_real_time_tracking_interval"
                              label="Tracking Refresh Interval"
                              suffix= 'seconds'
                            > 
                            </v-select>
                          </v-flex>
                          <v-flex xs12 sm12 md6 lg6>
                            <v-menu :nudge-width="100">
                              <v-toolbar-title slot="activator">
                                <v-btn class ="button black--text" v-on:click="export_device_data" >Export Device Realtime Tracks</v-btn>
                              </v-toolbar-title>
                              <v-list>
                                <v-list-tile
                                  v-for="item in export_options"
                                  :key="item"
                                  v-on:click="export_device_data(item, (i-1), device_real_time_tracking_data[(i-1)], `${device_data[(i-1)].device_name}_real_time_data.csv`)"
                                >
                                  <v-list-tile-title v-text="item"></v-list-tile-title>
                                </v-list-tile>
                              </v-list>
                            </v-menu>
                          </v-flex>  
                        </v-layout>
                      </div>
                      <div v-else-if=" controller[(i-1)].action == 'historic_tracking'"> <!-- ////////////////HISTORIC TRACKING//////////////////////-->
                      <v-layout row wrap>
                        <v-flex xs12 sm6 md5 lg4>
                          <date_time_picker v-bind:type_prop ='0'  @date= start_date_function($event) @time= start_time_function($event)></date_time_picker>
                        </v-flex>
                        <v-flex xs12 sm6 md5 lg4>
                          <date_time_picker v-bind:type_prop = 1 @date= end_date_function($event) @time= end_time_function($event)></date_time_picker>
                        </v-flex>
                        <v-flex xs12 sm12 md2 lg4>
                          <v-select
                            v-model="historic_device_track_max_record_amt_form[i-1]"
                            :items="historic_device_track_max_record_amt"
                            label="Max Records Returned"
                          > 
                          </v-select>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap align-center justify-space-between>
                        <v-flex xs12 sm12 md6 lg4>
                          <v-switch
                            v-model="device_historic_marker_visibility[i-1]"
                            height=0
                            :label="`Display all historic markers: ${device_historic_marker_visibility[i-1].toString()}`"
                            @change="toggle_historic_device_tracks(i)">
                          ></v-switch>
                        </v-flex>
                        <v-flex xs12 sm6 md6 lg4>
                          <v-btn class="button black--text" 
                            @click.stop="generate_historic_device_tracks(i)">
                            Generate Historic Tracks
                          </v-btn>
                        </v-flex>
                        <v-flex xs12 sm6 md12 lg4>
                          <v-menu :nudge-width="100">
                            <v-toolbar-title slot="activator">
                              <v-btn class ="button black--text" v-on:click="export_device_data" >Export Device Historic Tracks</v-btn>
                            </v-toolbar-title>
                            <v-list>
                              <v-list-tile
                                v-for="item in export_options"
                                :key="item"
                                v-on:click="export_device_data(item, (i-1), device_historic_tracking_data[(i-1)], `${device_data[(i-1)].device_name}_historic_data.csv`)"
                              >
                                <v-list-tile-title v-text="item"></v-list-tile-title>
                              </v-list-tile>
                            </v-list>
                          </v-menu>
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





            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </div>
    </div>
    <br>
    <div class="google-map" :id="map_name" ></div>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
import functions from "./../../services/functions/forms_functions.js"
import date_time_picker from "./../Date_Time_Picker";
import network_subnetwork_vessel_device_picker from "./Network_Subnet_Vessel_Device_Picker";
import vessel_device_picker from "./Vessel_Device_Picker";


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
  //Source: https://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/
  //The code used to convert the array to a CSV and to export it is not original. It was found on an online article.
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
    vessel_device_picker,
  },
  name: 'google',
  props: ['name'],
  data: function () {
    return {
      map_name: this.name + "-map",
      markerCoordinates: [],
      map: null,
      bounds: null,
      device_markers: [],
      gateway_markers: [],
      flightPath: null,
      markerCluster: null,
      map_center: {latitude: "10.7277795", longitude: "-61.2105507"},
      coordinates: [],
      contentString: [],
      gateways: '',
      icon_url: ["http://maps.google.com/mapfiles/ms/icons/red-dot.png","http://maps.google.com/mapfiles/ms/icons/blue.png",
      "http://maps.google.com/mapfiles/ms/icons/green-dot.png","http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
      "http://maps.google.com/mapfiles/ms/icons/orange-dot.png","http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
      "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"],
      i: 1, //Just to fetch the device locations/// to delete

      gateway_marker_refresh_interval: 10000,


      device_data: [], //am array of all the returned devices to be plotted

      clear_markers_device_form: "", //this is a variable that holds the device whose tracks are to be cleared

      initial: 1, //This is a flag which is initially set to 1... it is used to ensure that devices clearticks are only added to the array on the initail fetch of the data 

      cleartick_device_marker: [], //arrary that holds all the clearticks to stop the set interval for a device
      cleartick_device_polyline: [], //arrary that holds all the clearticks to stop the set interval for a device polyline
      cleartick_gateway: [], //arrary that holds all the clearticks to stop the setinterval for a gateways


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
      active_tab: null, //the tab postion to be opened. the number will be based on the device position in the device_data array

      active_tab_2: [],//the secondary tab positon opened. 

      display_gateways_switch: true,
      display_devices_switch: true,

      device_historic_marker_visibility: [], //this is a 2D array which stores the toggle state of the historic device markers
      controller_array_heading_text: ['Real Time Location', 'Real Time Tracking', 'Historic Tracking'],
      historic_device_track_max_record_amt: [5,10,20,50,100,150,200,400, 'Unlimited'], //This is used to limit the amount of records which will be returned for a historic device track
      historic_device_track_max_record_amt_form: [],//this will be a 2d array which holds the actual amount selected by the user

      device_real_time_tracking_interval: [0.5,1,2,5,10,20,40], //This is used to set the interval to set the real time tracking of the devices
      device_real_time_tracking_interval_form: [], //2d array which holds the values in the 2d array for the real time tracking

      device_real_time_location_interval: [0.5,1,2,5,10,20], //This is used to set the interval to set the real time location of the devices
      device_real_time_location_interval_form: [], //2d array which holds the values in the 2d array for the real time location

      export_options: ["Local Storage", "Email"],
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
        if(this.$store.state.user_class !='Fisher') this.get_gateway_data_initial();
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
    for(let i =0; i<this.cleartick_gateway.length; i++){ //clear gateway intervals
        let holder  = this.cleartick_gateway[i];
        clearInterval(holder);
    }
  },
  watch: {
    display_gateways_switch: function(){
      if(this.display_gateways_switch == true){
        this.get_gateway_data_initial();

      }else if(this.display_gateways_switch == false){
        this.clear_all_gateway_data();
      }
    },
    display_devices_switch: function(){
      if(this.display_devices_switch == true){
        this.get_device_data_initial();

      }else if(this.display_devices_switch == false){
        this.clear_all_device_data()
      }
    },
    active_tab: function(){
      this.center_map_around_device(this.active_tab)
    },
    device_real_time_tracking_interval_form: async function(){ //This allows for the dynamic updating of the marker tracking refreshing interval
    //To update the refresh rate for the real time tracking we need to first cancel the previous interval... fetch the latest data and then recreate a new interval with the new rate
      if(this.initial == 0 && this.active_tab != null){ //This ensures that it is only executed when the user updates the field and not when the console initally sets the values
        let i = this.active_tab; //set the active tab before we initate the async function because if the request takes long to process the active tab can change
        let device_id = this.find_device_id(i);
        let holder  = this.cleartick_device_polyline[i];
        clearInterval(holder); //We first clear the prviously set intwerval that was set to the old rate
        this.cleartick_device_polyline[i] = null ; 
        let device_data_update = await AuthenticationService.refresh_device_data_map(device_id) //Refresh the data to get the latest device uplink record
          .catch(err => {
            //Error gettin most recent 
            console.log(err)
          })
        device_data_update = device_data_update.data.device_data[0]; //Update the latest record
        this.device_data[i] = device_data_update;
        var x = setInterval(this.refresh_device_polyline, (this.device_real_time_tracking_interval_form[i]*1000), this.device_data[i], i);//create the new interval with the new rate
        this.cleartick_device_polyline[i]  = x; 
      }
    },
    device_real_time_location_interval_form: async function(){ //This allows for the dynamic updating of the real time marker refreshing interval
    //To update the refresh rate for the real time location we need to first cancel the previous interval... fetch the latest data and then recreate a new interval with the new rate
      if(this.initial == 0 && this.active_tab != null){ //This ensures that it is only executed when the user updates the field and not when the console initally sets the values
        let i = this.active_tab; //set the active tab before we initate the async function because if the request takes long to process the active tab can change
        let holder  = this.cleartick_device_marker[i];
        clearInterval(holder); //Clear the interval of the previous device marker
        this.cleartick_device_marker[i] = null ; 
        let length = this.device_marker_tracker[i].length; //anytime we switch to another option we delete the no tracking marker 
        let position = this.device_marker_tracker[i][(length-1)];
        this.device_markers[(position)].setMap(null); //delete the previous marker from the map
        this.create_device_marker(this.device_data[i], 1) //generate the new marker and enable refreshing
      }
    }
  },
  methods: {
    init_map: function(){
      //initiialzies the map
      this.bounds = new google.maps.LatLngBounds();
      const element = document.getElementById(this.map_name)
      this.map = new google.maps.Map(element, {
        zoom: 11,
        center: new google.maps.LatLng(this.map_center.latitude, this.map_center.longitude),
        mapTypeId: google.maps.MapTypeId.HYBRID
      });
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    get_device_data_initial: async function(){
      let result = await AuthenticationService.get_device_data_map_initial()
      .catch(err => {
        //Error fetching the device data
        console.log(err)
      })
      if(result.data.device_data.length == 0) {
        //This will occur if the user is not assigned to any vessels or no data is stored for the devices the user is assigned to.
        alert(`${result.data.message}`)
        //We only want to route away the fisher because the other users will be interested in viewing the gateways 
        if(this.$store.state.user_class =='Fisher') this.$router.push('/dashboard')  
      }
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

        this.device_historic_marker_visibility.push(false); //Set all the historic track markers to not visable (false) initially
        this.active_tab_2.push(0); //This creates the amount of secondary tabs needed for the system
        this.historic_device_track_max_record_amt_form.push(20); //this sets the amount of values which can be selected for the 2d array
        this.device_real_time_tracking_interval_form.push(5); //this sets the amount of values which can be selected for the 2d array for the real time tracking interval (set to initially update every 5 seconds)
        this.device_real_time_location_interval_form.push(5); //this sets the amount of values which can be selected for the 2d array for the real time location interval (set to initially update every 5 seconds)

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
    get_gateway_data_initial: async function(){
      let result = await AuthenticationService.get_gateways_map()
      .catch(err => {
        //Error getting gateway information from server
        console.log(err);
      })
      let gateway_data = result.data.gateways
      for(let i =0; i< gateway_data.length; i++){
        this.create_gateway_marker(gateway_data[i])
      }
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
        this.device_markers.push(marker)
        let position_in_marker_array = (this.device_markers.length -1);

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
          let x = (setInterval(this.refresh_device_marker, (this.device_real_time_location_interval_form[i]*1000), marker, info_window, device));//this is the syntax for it to work
          if(this.initial ==1){
            this.map.fitBounds(this.bounds.extend(position))
            this.cleartick_device_marker[i]= x; //adds the variable returned to the array in the same order as the device_data.. so the value returned in i will refer to the ith device in device_data
          }else if(this.initial == 0){
            this.cleartick_device_marker[i] = x; //this is done so for each device only one marker is being updated
          }
        }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    create_gateway_marker: async function(gateway){
      let position = new google.maps.LatLng(gateway.gateway_latitude, gateway.gateway_longitude);
      let marker = new google.maps.Marker({ 
        position,
        map: this.map,
        label: `${gateway.gateway_id}`,
        icon: this.icon_url[1]
      });
      this.gateway_markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
      let info_window = new google.maps.InfoWindow();
      this.set_gateway_info_window(marker, info_window, gateway)
      var x = setInterval(this.refresh_gateway_marker, this.gateway_marker_refresh_interval, marker, info_window, gateway);//this is the syntax for it to work
      this.cleartick_gateway.push(x); //adds the variable returned to the array in the same order as the gateway_data.. so the value returned in i will refer to the ith gateway in gateway_data
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    refresh_device_marker:  async function(marker, info_window, device){
      console.log('Refresh marker')
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
    refresh_gateway_marker: async function(marker,info_window,gateway){
      gateway = await AuthenticationService.refresh_gateway_data_map(gateway.gateway_id, gateway.gateway_id_lora)
        .catch(err => {
          //Error gettin most recent 
          console.log(err)
        })
      gateway = gateway.data.gateway_data;
      let position = new google.maps.LatLng(gateway.gateway_latitude, gateway.gateway_longitude);
      marker.setPosition(position)
      this.set_gateway_info_window(marker, info_window, gateway);
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    set_device_info_window: function(marker, info_window, device){
        var content = `<div>
                        <h3>Basic Device Information</h3>
                          <b>Device Name:</b> ${device.device_name} <br>
                          <b>Vessel Name:</b> ${device.vessel_name} <br>
                          <b>Vessel ID:</b> ${device.vessel_id}<br>
                          <b>Application ID:</b> ${device.sub_network_id}<br>
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
                      <b>Temperature:</b> ${device.temperature}<br>
                      <b>Humidity:</b>${device.humidity} <br>
                      <b>Accelerometer:</b>${device.accelerometer} <br>
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
    set_gateway_info_window: function(marker, info_window, gateway){
      console.log(gateway)
      var content;
        content = `<div>
                    <h3>Basic Gateway Information</h3>
                      <b>Gateway Name:</b> ${gateway.gateway_name} <br>
                      <b>Gateway ID LoRa:</b> ${gateway.gateway_id_lora} <br>
                      <b>Gateway Description:</b> ${gateway.gateway_description} <br>
                      <b>Organization ID:</b> ${gateway.network_id}<br>
                      <b>Gateway Latitude:</b> ${gateway.gateway_latitude}<br>
                      <b>Gateway Longitude:</b> ${gateway.gateway_longitude}<br>
                      <b>Gateway Altitude:</b> ${gateway.gateway_altitude}<br>
                    </div>`;
      //Open the infowindow for the gateway marker(ON MOUSE OVER)
      let x = 0;
      google.maps.event.addListener(marker,'mouseover', (function(marker,content,info_window){ 
        return function() {
            x = 1;
            info_window.setContent(content);
            info_window.open(this.map,marker);
        };
      })(marker,content,info_window));
      //Close the infowindow for the gateway marker(ON MOUSE OUT)
      google.maps.event.addListener(marker,'mouseout', (function(marker,content,info_window){ 
          return function() {
            if(x == 1){
              info_window.close(this.map,marker);
              x = 0;
            }
          };
      })(marker,content,info_window));
      //Right click
      //Open the infowindow for the gateway marker(ON RIGHT CLICK)
      if(gateway.time_stamp){
        content = `<div>
                      <h3>Gateway Statistics</h3>
                        <b>Time Stamp</b>: ${gateway.time_stamp}<br>
                        <b>Uplink Packets Received</b>: ${gateway.rx_packets_received}<br>
                        <b>Uplink Packets Received Ok</b>: ${gateway.rx_packets_received_ok}<br>
                        <b>Downlink Packets Received</b>: ${gateway.tx_packets_received}<br>
                        <b>Downlink Packets Received Ok</b>: ${gateway.tx_packets_emitted}<br>
                  </div>`;
      }else{
        content = `<div>
                    <h3>Gateway Statistics</h3>
                      No gateway stats available
                  </div>`;
      }
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
      var x = setInterval(this.refresh_device_polyline, (this.device_real_time_tracking_interval_form[i]*1000), this.device_data[i], i);//this is the syntax for it to work
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
      this.filter_parameters = {}; //need to clear or else the old parameters will be stuck if we do not reset
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
      let i =this.find_device_array_position(device_id);
      if(this.historic_device_track_max_record_amt_form[i]){ //This is used to specify the filter parameter to limit the amount of records returned
        this.filter_parameters["max_record_amt"] = this.historic_device_track_max_record_amt_form[i];
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
      switch(action){//This is to jus map the old method (radio buttons) to the new method (tabs)
        case 0: 
          action = 'disable_tracking'
          break;
        case 1:
          action = 'real_time_tracking'
          break;
        case 2:
          action = 'historic_tracking'
          break;
        default : break;
      }
      console.log(i, action)
      let previous_action = this.controller[i].action;
      if(previous_action != action && !(previous_action == 'null' && action =='disable_tracking')){ //to prevent it from updating if they keep pressing the button and from allowing the first press to be disable_tracking which is already the default value
          if(previous_action == "disable_tracking" || previous_action == 'null'){ //stops the marker set interval for the device
            let holder  = this.cleartick_device_marker[i];
            clearInterval(holder);
            this.cleartick_device_marker[i] = null ; 
            let length = this.device_marker_tracker[i].length; //anytime we switch to another option we delete the no tracking marker 
            let position = this.device_marker_tracker[i][(length-1)];
            this.device_markers[(position)].setMap(null)
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
    center_map_around_device: function(i){
      //This method is used to recenter a map around the most recent device marker when the tab for the device is opened
      console.log(i)
      var latLng = new google.maps.LatLng(this.device_data[i].gps_latitude, this.device_data[i].gps_longitude);
      this.map.panTo(latLng);
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------  
    generate_historic_device_tracks: async function(i){
      i=i-1;
      console.log(this.historic_device_track_max_record_amt_form[i])
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
        this.toggle_historic_device_tracks(i+1);//we add one because in the toggle function we minus one already
        if(this.device_historic_marker_tracker[i].length > 1000){
          alert(`Device- ${this.device_data[(i)].device_id}: ${this.device_data[(i)].device_name} has a more than 1000 historic track markers associated with it. This will decrease the responsiveness of the map. Delete the device historic markers or toggle them to off to increase responsiveness.`); //Inform the user that 
        }
      })
        .catch(err => {
          //Error fetching the historic data for the selected device
          console.log(err)
        })
    },
  //--------------------------------------------------------------------------------------------------------------------------------------------
    clear_all_device_tracks: function(i, clear_all){
      //if clear_all is set high (1) then this will clear all the makers associated with that deivce. Hence there will be no markers associated with that device again
      //if it is set to 0 or null then it will leave the most recent marker for that device (jus remove the tracks)
      i = i-1
      for(let j = 0; j< (this.device_polyline_tracker[i].length); j++){
          this.device_polyline_tracker[i][j].setMap(null)
          this.device_polyline_tracker[i][j] = null;
      }
      let holder;
      if(clear_all ==1){
        for(let j = 0; j< (this.device_marker_tracker[i].length); j++){
          holder = this.device_marker_tracker[i][j];
          this.device_markers[holder].setMap(null)
        }
      }else{
        for(let j = 0; j< (this.device_marker_tracker[i].length - 1); j++){
          holder = this.device_marker_tracker[i][j];
          this.device_markers[holder].setMap(null)
        }
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
          this.device_markers[holder].setMap(null)
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
          this.device_markers[holder].setMap(null)
        }
      }
      this.device_historic_tracking_data[i] = [];
      this.device_historic_polyline_tracker[i] = [];
      this.device_historic_marker_tracker[i] = [];
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    toggle_historic_device_tracks: function(i){
      i = i-1 
      let holder;
      for(let j = 1; j< (this.device_historic_marker_tracker[i].length); j++){
        if(this.device_historic_marker_tracker[i][j]){
          holder = this.device_historic_marker_tracker[i][j];
          this.device_markers[holder].setVisible(this.device_historic_marker_visibility[i])
        }
      }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    export_device_data: async function(option, i, download_data, name){
      if(name != null){ //This will handle the false click event when the button is initailly clicked to view the options from the menu. We only want to handle this when we select an option
        if(download_data.length > 40000){
          alert('Amount of records attempting to be exported exceeds 40000. Please reduce.');
          }else{
          if(download_data.length > 0){
            if(option =="Local Storage"){
              this.download_csv(download_data, name)
            }else if(option == 'Email'){
              let type = null; //this holds either 1 or 2 where 1 is for real time tracking and 2 is for historic tracking
              if(this.controller[i].action == "real_time_tracking"){type =1}
              else if(this.controller[i].action == "historic_tracking"){type =2}
              this.download_email(download_data, name, type);
            }
          }else alert('No records to export.');
        }
      }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    download_email: async function(download_data, name, type){
      let device_uplink_data_csv = convertArrayOfObjectsToCSV({
        data: download_data
      });
      let result = await AuthenticationService.device_uplink_export_via_email(device_uplink_data_csv, type)
        .catch(err => {
          console.log(err);
        })
      this.$store.commit('set_snackbar',{message: result.data.message, type: result.data.type}) 
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    download_csv: function(download_data, name) { 
      //Source: https://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/
      //The code used to convert the array to a CSV and to export it is not original. It was found on an online article.
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
        this.$store.commit('set_snackbar',{message: "Device Tracking data exported", type: "success"})         
      }
      else{
        alert(`No data to be exported.`)
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
    clear_all_device_data: function(){
      //This function clears all the information about all the devices being displayed on the map. It is used when the display device data is set to false
      for(let i =0; i<this.cleartick_device_marker.length; i++){
        let holder  = this.cleartick_device_marker[i];
        clearInterval(holder);
      }
      for(let i =0; i<this.cleartick_device_polyline.length; i++){ //clear device polyline intervals
        let holder  = this.cleartick_device_polyline[i];
        clearInterval(holder);
      }
      for(let i =0; i< this.device_data.length; i++){
        //Clear all the tracks associated with all the devices
        this.clear_all_device_tracks(i+1, 1);
      }
        this.cleartick_device_marker = [];
        this.cleartick_device_polyline = [];

        this.device_marker_tracker = [];
        this.device_real_time_marker_tracker = [];
        this.device_historic_marker_tracker = [];

        this.device_polyline_tracker = [];
        this.device_real_time_polyline_tracker = [];
        this.device_historic_polyline_tracker = [];

        this.device_real_time_tracking_data = [];
        this.device_historic_tracking_data = [];
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    clear_all_gateway_data: function(){
      //This function clears all the information about all the gateways being displayed on the map. It is used when the display gateway data is set to false
      for(let i = 0; i< (this.gateway_markers.length); i++){
        this.gateway_markers[i].setMap(null)
      }
      for(let i =0; i<this.cleartick_gateway.length; i++){ //clear gateway intervals
        let holder  = this.cleartick_gateway[i];
        clearInterval(holder);
      }
      this.gateway_markers = [];
      this.cleartick_gateway = [];
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.google-map {
  width: 100%;
  height: 55vh;
  margin: 0 auto;
  background: gray;
}
</style>
 