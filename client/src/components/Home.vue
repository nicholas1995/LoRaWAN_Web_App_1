<template>
  <v-content>
    <div class="google-map" :id="map_name"></div>
    <v-progress-linear  color="primary" height="1" :indeterminate="isLoading" ></v-progress-linear>
    <v-layout row wrap >
      <v-flex xs12 sm6 md2 class="pt-5">
        <div v-show="this.device_uplink_sensor_data.length>1">
        <v-select
          v-model="sensor_value_to_plot"
          :items="this.sensor_values"
          :error-messages = "sensor_value_to_plot_errors"
          label="Sensor Value to Plot"
          v-on:change="plot_graph(device_uplink_sensor_data)"
        >
        </v-select>
        </div>
      </v-flex>
      <v-flex xs12 sm6 md10 >
        <div class="google-chart" id="chart_div"></div>
      </v-flex>
    </v-layout>
  </v-content>
</template>
  

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import AuthenticationService from "../services/AuthenticationService.js";
import functions from "./../services/functions/forms_functions.js"
import math from "mathjs"
import date_time from "../services/functions/date_time.js";


/*
So for this page I want to have a map and where ever the use clicks it will provide them with the most recent sensor data for that particular point.
In order to give the users an idea about the places which vessels have previosuly passes I will use a heat map with all the records in the DB. (might not scale well)
1) fetch all the gps coordinates in the database
2)Create an array of the coordinates using the google maps heatmap documentation

*/

export default {
  name: 'google',
  props: ['name'],
  mixins: [validationMixin],
  validations: {
      sensor_value_to_plot: {
        required,
      },      
    },
  data: function () {
    return {
      map_name: this.name + "-map",
      map: null,
      bounds: null,
      markers: null,
      marker_sqare: [], //this is an array to hold the marker values
      polyline_tracker: [], //array which holds the polyline data
      map_center: {latitude: "10.7277795", longitude: "-61.2105507"},
      coordinates: [],
      heat_map: null, //variable for the heat map
      
      i: 0, //this is used to track which value of the positon data returned is being displayed
      length: 0, //this is used to hold the length of the data array
      device_uplink_sensor_data: [],
      sensor_values: ["Temperature", "Humidity", "Acceleration"],
      chart: '', //variable which holds the chart instance
      isLoading: false,
      sensor_value_to_plot: 'Temperature', //Plot Temperature by Default
      sensor_value_graph_info: [
        {
          graph_title: 'Temperature vs Time',
          v_axis: 'Temperature (°C)',
          value_to_plot: 'temperature'
        },{
          graph_title: 'Humidity vs Time',
          v_axis: 'Humidity %',
          value_to_plot: 'humidity'
        },{
          graph_title: 'Acceleration vs Time',
          v_axis: 'Acceleration (g)',
          value_to_plot_1: 'accelerometer_x',
          value_to_plot_2: 'accelerometer_y',
          value_to_plot_3: 'accelerometer_z',

        }
      ],
      gradient: [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]

    }
  },
  mounted: async function () {
    try{
        //-------------------------Start----------------------
        this.isLoading = true;
        this.init_map();
        this.create_heat_map()
        //Code to get the location of a point when the marker clicked 
        google.maps.event.addListener(this.map, 'click', async(event) =>{
          this.map_click_event_handler(event);
        });
        await google.charts.load('current', {packages: ['corechart', 'line']});
        this.chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        this.isLoading = false;
    }catch(err) {
      console.log(err)
    }      
  },
  computed: {
    sensor_value_to_plot_errors(){
      const errors=[];
      if (!this.$v.sensor_value_to_plot.$error)return errors
      !this.$v.sensor_value_to_plot.required && errors.push('Select to plot sensor data')
      return errors;
    },
  },
  methods: {
    init_map: function(){
      //initiialzies the map
      this.bounds = new google.maps.LatLngBounds();
      const element = document.getElementById(this.map_name)
      this.map = new google.maps.Map(element, {
        zoom: 9,
        center: new google.maps.LatLng(this.map_center.latitude, this.map_center.longitude),
        mapTypeId: google.maps.MapTypeId.HYBRID,
        minZoom: 8
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
      //this.heat_map.set('gradient', this.heat_map.get('gradient') ? null : this.gradient);
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    map_click_event_handler: async function(event){
      this.isLoading = true;
      this.i=0;
      this.length = 0;
      let coordinate = {
        gps_latitude: event.latLng.lat(),
        gps_longitude: event.latLng.lng()
      }
      this.create_box_aroung_coordinate(coordinate); ///////
      this.device_uplink_sensor_data = await AuthenticationService.get_sensor_data_using_coordinates({lat: coordinate.gps_latitude, lng: coordinate.gps_longitude, zoom_level: this.map.getZoom()})
        .catch(err => {
          console.log(err)
        })
      this.device_uplink_sensor_data = this.device_uplink_sensor_data.data.device_uplink_sensor_data;
      this.length = this.device_uplink_sensor_data.length;
      if(this.device_uplink_sensor_data.length > 0) { //Will generate the info_window with the sensor data if 1 record returned
        this.create_marker(this.device_uplink_sensor_data[0], 1)
        this.$v.$touch(); //this will ensure that if the form is submitted before any of the 
        if(this.device_uplink_sensor_data.length > 1) google.charts.setOnLoadCallback(this.plot_graph(this.device_uplink_sensor_data)); //will only plot graph if more than 1 record returned
      }
      else {
        this.create_marker(coordinate, 0);
        this.chart.clearChart(); 
      }
      this.isLoading = false;
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
    create_marker_square: async function(data){
      //this method creates the markers for the square around the coordinate clicked
        let position = new google.maps.LatLng(data.gps_latitude, data.gps_longitude);
        let marker;
        marker = new google.maps.Marker({ 
          position,
          map: this.map,
        });
        this.marker_sqare.push(marker);
        //if(this.markers != null ){this.markers.setMap(null)} //delete the marker from the map only after the first marker is created
        //this.markers =marker 
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    set_marker_info_window: function(marker, info_window, data, sensor_data_present){
      //-data is an object which which stores either the most recent sensor data nearest to the selected point or either the coordinates of the selected point....
      //which is present is determined by the value of sensor_data_present 
      //-sensor data is a variable which says if the marker to be created at coordinate x has sensor data or not.... 1 for has sensor data.... 0 for has no sensor data
      if(sensor_data_present == 1){
        var content = `<div>
                      <h3>Sensor Data</h3>
                      <b>Time Stamp</b>: ${this.convert_date(data.time_stamp)}<br>
                      <b>Organization Name</b>: ${data.network_name}<br>
                      <b>Application Name</b>: ${data.sub_network_name}<br>
                      
                      <b>Temperature:</b>${data.temperature} °C<br>
                      <b>Humidity:</b> ${data.humidity}%<br>
                      <b>Acceleration X-Axis:</b>${data.accelerometer_x} g<br>
                      <b>Acceleration Y-Axis:</b>${data.accelerometer_y} g<br>
                      <b>Acceleration Z-Axis:</b>${data.accelerometer_z} g<br>
                      <b>GPS Latitude:</b> ${data.gps_latitude} °N<br>
                      <b>GPS Longitude:</b> ${data.gps_longitude} °W<br>
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
    convert_date: function(date){
      let full_date;
      if(date == "" || date == null){
        full_date = "N/A"
      }else{
        date = new Date(date);
        let month = date_time.return_month(date.getMonth()); //returns the month in 3 letters
        let day = date_time.add_zero(date.getDate());
        let year = date.getUTCFullYear() -2000; //converts the full year to 2 digits 
        let hour = date_time.add_zero(date.getHours());
        let minutes = date_time.add_zero(date.getUTCMinutes());
        let seconds = date_time.add_zero(date.getUTCSeconds());
        full_date = day+"-"+month+"-"+year +" " + hour +":"+ minutes+":"+ seconds;
      }
      return full_date;
    },
  //--------------------------------------------------------------------------------------------------------------------------------------------
    create_polyline: function(coordinate){
      let path = [];
      path.push({lat: parseFloat(coordinate.gps_latitude),lng: parseFloat(coordinate.gps_longitude)})
      let polyline = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeOpacity: 0.8,
        strokeWeight: 1,
        map: this.map
      }); 
      this.polyline_tracker.push(polyline); //track all the polylines for this device
      polyline.setOptions({strokeColor: `#00FF88`});
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    append_polyline: function(coordinate){
      //takes in an int i which represents the device position in arrays and the device data with the coordinates to append and also the action which can be either... real_time_tracking or historic_tracking
      let position = new google.maps.LatLng(coordinate.gps_latitude, coordinate.gps_longitude); //create the updated position of the coordinate
      let length = this.polyline_tracker.length;
      let polyline_path = this.polyline_tracker[(length -1)].getPath(); //get the polyline to update... this returns an array hence we use this as a place holder
      polyline_path.push(position);  
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    back_button_event_handler: function(){
      if((this.i) >= 0){
        this.i = this.i -1;
        this.create_marker(this.device_uplink_sensor_data[this.i], 1)
      }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    foward_button_event_handler: function(){
      if((this.i+1) <= this.length){
        this.i = this.i +1;
        this.create_marker(this.device_uplink_sensor_data[this.i], 1)
      }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    plot_graph: function(device_uplink_sensor_data) {
      try{
        if(this.sensor_value_to_plot != ''){
          this.isLoading = true;
          let sensor_array_position = this.get_sensor_array_position(this.sensor_value_to_plot);

          this.chart.clearChart(); 
          var data = new google.visualization.DataTable();
          if(this.sensor_value_to_plot != "Acceleration"){
            data.addColumn('datetime', 'Date');
            data.addColumn('number', this.sensor_value_to_plot);
            let sensor_data = this.generate_graph_data(device_uplink_sensor_data, sensor_array_position);
                        console.log(sensor_data)
            data.addRows(sensor_data);
          }else{
            data.addColumn('datetime', 'Date');
            data.addColumn('number', 'X-Axis');
            data.addColumn('number', 'Y-Axis');
            data.addColumn('number', 'Z-Axis');

            let sensor_data = this.generate_graph_data(device_uplink_sensor_data, sensor_array_position);
            console.log(sensor_data)
            data.addRows(sensor_data);
          }

          var options = {
            title: this.sensor_value_graph_info[sensor_array_position].graph_title,
            hAxis: {
              title: 'Time'
            },
            vAxis: {
              title: this.sensor_value_graph_info[sensor_array_position].v_axis
            },
            series: {
              1: {curveType: 'function'}
            },
            pointSize: 5, //Sets the size of the point on the graph
            explorer: {
              maxZoomIn: .001,
              keepInBounds: true,
              zoomDelta: 0.9,
              axis: 'horizontal',
            },
            lineDashStyle: [4,1],
            curveType: 'function',
            //legend: { position: 'top' }
          };
          this.chart.draw(data, options);
          this.isLoading = false;
        }
      }catch(err){
        console.log(err)
      }

    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    generate_graph_data: function(device_uplink_sensor_data, sensor_array_position){
      console.log(sensor_array_position)
      //This function generates the data in the format for the graph. It takes as an input parameter an array of all the device uplink sensor data which will be used on the map
      //and retunrs an object with 3 arrays one for temperature_data, accelerometer_data and humidity_data.
/*       let return_data = [];
      for(let i =0; i< device_uplink_sensor_data.length; i++){
        return_data.push([new Date(device_uplink_sensor_data[i].time_stamp), parseFloat(Math.round(device_uplink_sensor_data[i][this.sensor_value_graph_info[sensor_array_position].value_to_plot] * 100) / 100).toFixed(2)])
      }
      return return_data; */
      let return_data = [];
      let value ;
      if(sensor_array_position != 2){
        for (var i=0; i<device_uplink_sensor_data.length; i++){
            //value = parseFloat(Math.round(device_uplink_sensor_data[i][this.sensor_value_graph_info[sensor_array_position].value_to_plot] * 100) / 100).toFixed(2);
            console.log(sensor_array_position, this.sensor_value_graph_info[sensor_array_position].value_to_plot)
            value = parseFloat(device_uplink_sensor_data[i][this.sensor_value_graph_info[sensor_array_position].value_to_plot]);
            value = Math.round(value * 10) / 10;
            return_data.push([new Date(device_uplink_sensor_data[i].time_stamp), value]);
        }
      }else{
        let value_1, value_2;
        for (var i=0; i<device_uplink_sensor_data.length; i++){
            //value = parseFloat(Math.round(device_uplink_sensor_data[i][this.sensor_value_graph_info[sensor_array_position].value_to_plot] * 100) / 100).toFixed(2);
            value = parseFloat(device_uplink_sensor_data[i][this.sensor_value_graph_info[sensor_array_position].value_to_plot_1]);
            value = Math.round(value * 100) / 100;
            value_1 = parseFloat(device_uplink_sensor_data[i][this.sensor_value_graph_info[sensor_array_position].value_to_plot_2]);
            value_1 = Math.round(value_1 * 100) / 100;
            value_2 = parseFloat(device_uplink_sensor_data[i][this.sensor_value_graph_info[sensor_array_position].value_to_plot_3]);
            value_2 = Math.round(value_2 * 100) / 100;
            return_data.push([new Date(device_uplink_sensor_data[i].time_stamp), value, value_1, value_2]);
        }
      }

      return return_data;
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    get_sensor_array_position: function(sensor){
      //This is used to get the array positon of the sensor to plot so we can get the info about the axis from the array of objects defined above
      if(sensor == 'Temperature') return 0
      else if(sensor =='Humidity') return 1
      else if(sensor =='Acceleration') return 2
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    create_box_aroung_coordinate: function(coordinate){
      //This functions generates a box on the map around the coordinate of the click
      for(let i = 0; i<4; i++){
        if(this.marker_sqare.length != 0 )this.marker_sqare[i].setMap(null)
        if(this.polyline_tracker.length != 0 ) if(i ==0)this.polyline_tracker[i].setMap(null)
      }
      this.marker_sqare = [];
      this.polyline_tracker = [];
      let buffer = this.generate_buffer_using_map_zoom(this.map.getZoom());
      coordinate = this.create_sensor_data_search_coordinate_box({lat: coordinate.gps_latitude, lng: coordinate.gps_longitude}, buffer);
      let box_coordinates = [{gps_latitude: coordinate.lat.max,gps_longitude: coordinate.lng.max},{gps_latitude: coordinate.lat.min,gps_longitude: coordinate.lng.max},
      {gps_latitude: coordinate.lat.min,gps_longitude: coordinate.lng.min},{gps_latitude: coordinate.lat.max,gps_longitude: coordinate.lng.min}];
      for (let i =0; i<box_coordinates.length; i++){
        //this.create_marker_square(box_coordinates[i])
        if(i ==0) this.create_polyline(box_coordinates[i])
        else this.append_polyline(box_coordinates[i])
      }
      this.append_polyline(box_coordinates[0])
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    create_sensor_data_search_coordinate_box: function(coordinate, buffer){
    //This function takes an object with the lat and lng of a coordinate and returns a min and max for both 
    //LAT
    let lat_min, lat_max;
    lat_min = coordinate.lat-buffer/2
    lat_max = coordinate.lat+buffer/2
    lat_min = math.round(1000000*lat_min)/1000000
    lat_max = math.round(1000000*lat_max)/1000000

    //LNG
    let lng_min, lng_max;
    lng_min = coordinate.lng-buffer/2
    lng_max = coordinate.lng+buffer/2
    lng_min = math.round(1000000*lng_min)/1000000
    lng_max = math.round(1000000*lng_max)/1000000
    return {
        lat: {
            min: lat_min,
            max: lat_max
        },
        lng: {
            min: lng_min,
            max: lng_max,
        }
      }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    generate_buffer_using_map_zoom: function (map_zoom){
      //Creates the buffer for the map box
      if (map_zoom ==19) return 0.0001
      else return (0.0001*(math.pow(2, (19-map_zoom))))
    },
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
.google-chart {
  width: 100%;
  height: 30vh;
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
 