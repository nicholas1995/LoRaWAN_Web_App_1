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

/*
So for this page I want to have a map and where ever the use clicks it will provide them with the most recent sensor data for that particular point.
In order to give the users an idea about the places which vessels have previosuly passes I will use a heat map with all the records in the DB. (might not scale well)
1) fetch all the gps coordinates in the database
2)Create an array of the coordinates using the google maps heatmap documentation

*/

export default {
  name: 'google',
  props: ['name'],
  data: function () {
    return {
      map_name: this.name + "-map",
      markerCoordinates: [],
      map: null,
      bounds: null,
      markers: null,
      flightPath: null,
      markerCluster: null,
      map_center: {latitude: "10.7277795", longitude: "-61.2105507"},
      coordinates: [],
      contentString: [],
      heat_map: null, //variable for the heat map
      icon_url: ["http://maps.google.com/mapfiles/ms/icons/red-dot.png","http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      "http://maps.google.com/mapfiles/ms/icons/green-dot.png","http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
      "http://maps.google.com/mapfiles/ms/icons/orange-dot.png","http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
      "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"],
      
      i: 0, //this is used to track which value of the positon data returned is being displayed
      length: 0, //this is used to hold the length of the data array
      device_uplink_sensor_data: [],

      snackbar:0,
      timeout: 1500,
      color: "error",
      message: "blank",
    }
  },
  mounted: async function () {
    try{
        //-------------------------Start----------------------
        this.init_map();
        this.create_heat_map()
        //Code to get the location of a point when the marker clicked 
        google.maps.event.addListener(this.map, 'click', async(event) =>{
          this.map_click_event_handler(event);
        });
    }catch(err) {
      console.log(err)
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
    create_heat_map: async function(){
      let device_uplink_coordinates = await AuthenticationService.get_device_coordinates()
        .catch(err => {
          console.log(err)
        })
      device_uplink_coordinates = device_uplink_coordinates.data.device_coordinates
      let heat_map_coordinates =[]; //This is an array which holds the device uplink coordinates to be used to create the heatmap layer 
      for(let i = 0; i< device_uplink_coordinates.length; i ++){
        if(i == 1){
        }
        heat_map_coordinates.push(new google.maps.LatLng(device_uplink_coordinates[i].gps_latitude, device_uplink_coordinates[i].gps_longitude))
      }
      this.heat_map = new google.maps.visualization.HeatmapLayer({
        data: heat_map_coordinates,
        map: this.map
      });
      this.heat_map.set('opacity', this.heat_map.get('opacity') ? null : 1);
      this.heat_map.set('radius', this.heat_map.get('radius') ? null : 10);
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    map_click_event_handler: async function(event){
          this.i=0;
          this.length = 0;
          let coordinate = {
            gps_latitude: event.latLng.lat(),
            gps_longitude: event.latLng.lng()
          }
          this.device_uplink_sensor_data = await AuthenticationService.get_sensor_data_using_coordinates({lat: coordinate.gps_latitude, lng: coordinate.gps_longitude, zoom_level: this.map.getZoom()})
            .catch(err => {
              console.log(err)
            })
          this.device_uplink_sensor_data = this.device_uplink_sensor_data.data.device_uplink_sensor_data;
          this.length = this.device_uplink_sensor_data.length;
          if(this.device_uplink_sensor_data.length > 0) this.create_marker(this.device_uplink_sensor_data[0], 1)
          else this.create_marker(coordinate, 0)
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    create_marker: async function(data, sensor_data_present){
      //-data is an object which which stores either the most recent sensor data nearest to the selected point or either the coordinates of the selected point....
      //which is present is determined by the value of sensor_data_present 
      //-sensor data is a variable which says if the marker to be created at coordinate x has sensor data or not.... 1 for has sensor data.... 0 for has no sensor data
        let position = new google.maps.LatLng(data.gps_latitude, data.gps_longitude);
        let marker;
        if(sensor_data_present == 1){ //To diffferenciate between the markers which have data and those that dont
          marker = new google.maps.Marker({ 
            position,
            map: this.map,
            draggable: true,
          });
        }else {
          marker = new google.maps.Marker({ 
            position,
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.BOUNCE,
          });
        }
        if(this.markers != null ){this.markers.setMap(null)} //delete the marker from the map only after the first marker is created
        this.markers =marker 
        var info_window = new google.maps.InfoWindow(); //creates the instance of the infowindow
        this.set_marker_info_window(marker, info_window, data, sensor_data_present); //sets the info window
        this.markers.addListener('dragend', (event) => { //Create the marker dragging event listener
          this.map_click_event_handler(event) 
        });
    },
        //--------------------------------------------------------------------------------------------------------------------------------------------
    set_marker_info_window: function(marker, info_window, data, sensor_data_present){
      //-data is an object which which stores either the most recent sensor data nearest to the selected point or either the coordinates of the selected point....
      //which is present is determined by the value of sensor_data_present 
      //-sensor data is a variable which says if the marker to be created at coordinate x has sensor data or not.... 1 for has sensor data.... 0 for has no sensor data
      if(sensor_data_present == 1){
        var content = `<div>
                      <h3>Sensor Data</h3>
                      <b>Time Stamp</b>: ${data.time_stamp}<br>
                      <b>Temperature:</b>${data.temperature} <br>
                      <b>Humidity:</b>${data.humidity} <br>
                      <b>Accelerometer:</b>${data.accelerometer} <br>
                      <b>GPS Latitude:</b> ${data.gps_latitude}<br>
                      <b>GPS Longitude:</b> ${data.gps_longitude}<br>
                      <button class="button button2" id="back_button"><h2><<</h2></button>.${this.i + 1}..of..${this.length}.
                      <button class="button button2" id="foward_button"><h2>>></h2></button>
                  </div>`;
        info_window.setContent(content);
        google.maps.event.addListener(info_window, 'domready', ()=> {
            document.getElementById('back_button').addEventListener("click", this.back_button_event_handler);
            document.getElementById('foward_button').addEventListener("click", this.foward_button_event_handler);

        })
      }else{
        var content = `<div>
              <h3>No Sensor Data at Following Position</h3>
              <b>GPS Latitude:</b> ${data.gps_latitude}<br>
              <b>GPS Longitude:</b> ${data.gps_longitude}<br>
          </div>`;
        info_window.setContent(content);

      }
        info_window.open(this.map,marker);


        //Open the infowindow for the device marker(ON MOUSE OVER)
        google.maps.event.addListener(marker,'mouseover', (function(marker,content,info_window){ 
          return function() {
              info_window.setContent(content);
              info_window.open(this.map,marker);
          };
        })(marker,content,info_window));
    },
    back_button_event_handler: function(){
      if((this.i) >= 0){
        this.i = this.i -1;
        this.create_marker(this.device_uplink_sensor_data[this.i], 1)
      }
    },
    foward_button_event_handler: function(){
      if((this.i+1) <= this.length){
        this.i = this.i +1;
        this.create_marker(this.device_uplink_sensor_data[this.i], 1)
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
.button {
  background-color: #f44336; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

</style>
 