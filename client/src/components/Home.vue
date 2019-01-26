<template>
  <v-content>
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
import AuthenticationService from "../services/AuthenticationService.js";
import functions from "./../services/functions/forms_functions.js"
import date_time_picker from "./Date_Time_Picker";
import network_subnetwork_vessel_device_picker from "./Map/Network_Subnet_Vessel_Device_Picker";

/*
So for this page I want to have a map and where ever the use clicks it will provide them with the most recent sensor data for that particular point.
In order to give the users an idea about the places which vessels have previosuly passes I will use a heat map with all the records in the DB. (might not scale well)
1) fetch all the gps coordinates in the database
2)Create an array of the coordinates using the google maps heatmap documentation

*/
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
      heat_map: null, //variable for the heat map
      gateways: '',
      icon_url: ["http://maps.google.com/mapfiles/ms/icons/red-dot.png","http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      "http://maps.google.com/mapfiles/ms/icons/green-dot.png","http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
      "http://maps.google.com/mapfiles/ms/icons/orange-dot.png","http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
      "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"],
      i: 1, //Just to fetch the device locations/// to delete

      initial: 1, //This is a flag which is initially set to 1... it is used to ensure that devices clearticks are only added to the array on the initail fetch of the data 

      start_date: null,
      start_time: null,
      start_date_time: null,
      end_date: null,
      end_time: null,
      end_date_time: null,

      snackbar:0,
      timeout: 1500,
      color: "error",
      message: "blank",

      heat_map_coordinates: [], //This is an array which holds the device uplink coordinates to be used to create the heatmap layer 
    }
  },
  mounted: async function () {
    try{
        //-------------------------Start----------------------
        let device_uplink_coordinates = await AuthenticationService.get_device_coordinates()
          .catch(err => {
            console.log(err)
          })
          device_uplink_coordinates = device_uplink_coordinates.data.device_coordinates
          for(let i = 0; i< device_uplink_coordinates.length; i ++){
            if(i == 1){
            }
            this.heat_map_coordinates.push(new google.maps.LatLng(device_uplink_coordinates[i].gps_latitude, device_uplink_coordinates[i].gps_longitude))
          }
        this.init_map();
        //Code to get the location of a point when the marker clicked 
        google.maps.event.addListener(this.map, 'click', async(event) =>{
          let device_uplink_sensor_data = await AuthenticationService.get_sensor_data_using_coordinates({lat: event.latLng.lat(), lng: event.latLng.lng()})
            .catch(err => {
              console.log(err)
            })
          device_uplink_sensor_data = device_uplink_sensor_data.data.device_uplink_sensor_data;
          if(device_uplink_sensor_data.length > 0) this.create_marker(device_uplink_sensor_data[0])
        });

    }catch(err) {
      console.log(err)

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

      this.heat_map = new google.maps.visualization.HeatmapLayer({
        data: this.heat_map_coordinates,
        map: this.map
      });
      this.heat_map.set('opacity', this.heat_map.get('opacity') ? null : 1);
      this.heat_map.set('radius', this.heat_map.get('radius') ? null : 10);
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    create_marker: async function(sensor_data){
        let position = new google.maps.LatLng(sensor_data.gps_latitude, sensor_data.gps_longitude);
        let marker;
        marker = new google.maps.Marker({ 
          position,
          map: this.map,
        });
        this.markers.push(marker)
        var info_window = new google.maps.InfoWindow(); //creates the instance of the infowindow
        this.set_marker_info_window(marker, info_window, sensor_data); //sets the info window
    },
        //--------------------------------------------------------------------------------------------------------------------------------------------
    set_marker_info_window: function(marker, info_window, sensor_data){
        var content = `<div>
                      <h3>Sensor Data</h3>
                      <b>Time Stamp</b>: ${sensor_data.time_stamp}<br>
                      <b>Temperature:</b>${sensor_data.temperature} <br>
                      <b>Humidity:</b>${sensor_data.humidity} <br>
                      <b>Accelerometer:</b>${sensor_data.accelerometer} <br>
                      <b>GPS Latitude:</b> ${sensor_data.gps_latitude}<br>
                      <b>GPS Longitude:</b> ${sensor_data.gps_longitude}<br>
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
 