<template>
  <v-content>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 class="pr-4">
        <v-select
          v-model="device_tracking_form"
          :items="this.device_names"
          chips
          multiple
          label="Device Tracking"
          prepend-icon="devices"
          v-on:change="tracking"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pr-4">
        <v-select
          v-model="clear_markers_device_form"
          :items="this.device_names"
          chips
          label="Select device to clear tracks"
          clearable
          v-on:change="remove_device_tracks"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pr-4" >
        <v-btn class="grey lighten-2" large
          @click.stop="$router.push(`/map/gateway`)">
          View Gateways Only
        </v-btn>
      </v-flex>      
      <v-flex xs12 sm6 md3 class="pr-4">
        <v-btn class="grey lighten-2" large
          @click.stop="$router.push(`/map/device`)">
          View Devices Only
        </v-btn>
      </v-flex>
    </v-layout>
    <v-flex xs12 sm6 md3 class="pr-4">
      <div class="google-map" :id="map_name" ></div>
    </v-flex>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";
import functions from "./../../services/functions/forms_functions.js"

//Code to get the location of a point when the marker clicked 
/* google.maps.event.addListener(this.map, 'click', function( event ){
  alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() ); 
});
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

      device_marker_refresh_interval: 10000,
      gateway_marker_refresh_interval: 10000,

      device_data: [], //am array of all the returned devices to be plotted
      device_names: [],
      device_tracking_form: [], //an array of all the selected devices (id:name) that tracking should be enabled for 
      device_tracking_form_old: [], //an array of all the previous selected devices (id:name) that tracking should be enabled for 

      clear_markers_device_form: "", //this is a variable that holds the device whose tracks are to be cleared

      cleartick_device: [], //arrary that holds all the clearticks to stop the setinterval for a device
      cleartick_gateway: [], //arrary that holds all the clearticks to stop the setinterval for a gateways

      cleartick_device_polyline: [],

      initial: 1, //This is a flag which is initially set to 1... it is used to ensure that devices clearticks are only added to the array on the initail fetch of the data 
      device_polyline_tracker: [], //2d array to keep track of the polylines for the devices
      device_marker_tracker: [], //this is a 2d array which will be used to keep track of which marker is related to which device

      
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
        await this.get_gateway_data_initial();
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
    for(let i =0; i<this.cleartick_device.length; i++){
          let holder  = this.cleartick_device[i];
          clearInterval(holder);
    }
    for(let i =0; i<this.cleartick_gateway.length; i++){ //clear gateway intervals
          let holder  = this.cleartick_gateway[i];
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
      google.maps.event.addListener(this.map, 'click', function( event ){
        console.log( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() ); 
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
        this.device_marker_tracker.push([]);
        this.create_device_marker(this.device_data[i], 1)
        this.device_names.push(this.device_data[i].device_id +":"+this.device_data[i].device_name);
        this.cleartick_device_polyline.push(null);
        this.device_polyline_tracker.push([]);
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
        this.markers.push(marker)
        let position_in_marker_array = (this.markers.length -1);
        this.device_marker_tracker[i].push(position_in_marker_array);
        var info_window = new google.maps.InfoWindow(); //creates the instance of the infowindow
        this.set_device_info_window(marker, info_window, device); //sets the info window
        if(refresh_marker == 1){
          let x = (setInterval(this.refresh_device_marker, this.device_marker_refresh_interval, marker, info_window, device));//this is the syntax for it to work
          if(this.initial ==1){
            this.map.fitBounds(this.bounds.extend(position))
            this.cleartick_device.push(x); //adds the variable returned to the array in the same order as the device_data.. so the value returned in i will refer to the ith device in device_data
          }else if(this.initial == 0){
            this.cleartick_device[i] = x;
          }
        }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    create_gateway_marker: async function(gateway){
      let position = new google.maps.LatLng(gateway.gateway_latitude, gateway.gateway_longitude);
      let marker = new google.maps.Marker({ 
        position,
        map: this.map,
        label: `${gateway.gateway_id}`
      });
      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
      let info_window = new google.maps.InfoWindow();
      this.set_gateway_info_window(marker, info_window, gateway)
      var x = setInterval(this.refresh_gateway_marker, this.gateway_marker_refresh_interval, marker, info_window, gateway);//this is the syntax for it to work
      this.cleartick_gateway.push(x); //adds the variable returned to the array in the same order as the gateway_data.. so the value returned in i will refer to the ith gateway in gateway_data
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
    set_gateway_info_window: function(marker, info_window, gateway){
      var content;
        content = `<div>
                    <h3>Basic Gateway Information</h3>
                      <b>Gateway Name:</b> ${gateway.gateway_name} <br>
                      <b>Gateway ID LoRa:</b> ${gateway.gateway_id_lora} <br>
                      <b>Gateway Description:</b> ${gateway.gateway_description} <br>
                      <b>Network ID:</b> ${gateway.network_id}<br>
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
    tracking: function(){
      console.log('tracking called')
      let result = this.compare(this.device_tracking_form_old, this.device_tracking_form); //this is an object with the item added or deleted
      if(result.added){
        //device added to be tracked
          let i = this.find_device_array_position(result.added)
          let holder  = this.cleartick_device[i];
          clearInterval(holder);
          this.cleartick_device[i] = null ; ////////////
          let path = [];
          path = (this.create_device_polyline(this.device_data[i], path));
          var x = setInterval(this.refresh_device_polyline, 10000, path, this.device_data[i], i);//this is the syntax for it to work
          this.cleartick_device_polyline[i]  = null; 
          this.cleartick_device_polyline[i]  = x; 
      }else if(result.deleted){
        //device tracking turned off for a device
        let i = this.find_device_array_position(result.deleted)
        let holder  = this.cleartick_device_polyline[i];
        clearInterval(holder);
        this.create_device_marker(this.device_data[i], 1)
      }
      this.device_tracking_form_old = this.device_tracking_form;
    },
  //--------------------------------------------------------------------------------------------------------------------------------------------
    create_device_polyline: function(device, path){
      console.log('create device polyline')
      //creates the polyline and sets the first position to the location of the existing marker
        path.push({lat: parseFloat(device.gps_latitude),
          lng: parseFloat(device.gps_longitude)})
        let polyline = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: '#FF0088',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: this.map
        }); 
        let i = this.find_device_array_position(device.device_id);
        this.device_polyline_tracker[i].push(polyline); //this is a 2d array where the first dimension is used to store the deivce... the second stores the polylines for that device
        return path;
    },
  //--------------------------------------------------------------------------------------------------------------------------------------------
    refresh_device_polyline: async function(path, device_data, i){
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
          this.create_device_polyline(device_data_update, path)
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
    compare: function(old_value_form, new_value_form) {
      let old_value = [];
      let new_value = [];
      if(old_value_form.length > 0){
        for(let i =0; i< old_value_form.length; i++){
          old_value[i] = functions.extract_id_id_name(old_value_form[i]);
        }
      }
      if(new_value_form.length > 0){
        for(let i =0; i< new_value_form.length; i++){
          new_value[i] = functions.extract_id_id_name(new_value_form[i]);
        }
      }
      let accounted_for = [];
      let added = [];
      let deleted = [];

      for (let i = 0; i < new_value.length; i++) {
        if (old_value.length == 0) {
          added.push(new_value[i]);
          //console.log('Sub-Network Added');
        }
        for (let j = 0; j < old_value.length; j++) {
          if (new_value[i] == old_value[j]) {
            accounted_for.push(j);
            break;
          } else if (j == old_value.length - 1) {
            added.push(new_value[i]);
            //console.log('Sub-Network Added');
          } else if (new_value[i] != old_value[j]) {
          }
        }
      }
      for (let l = 0; l < old_value.length; l++) {
        let index = accounted_for.indexOf(l);
        if (index == -1) {
          deleted.push(old_value[l]);
          //console.log('subnetwork deleted')
        }
      }
      return {added: added[0], deleted: deleted[0]}
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
    remove_device_tracks: function(){
      if(this.clear_markers_device_form){
        let position = this.find_device_array_position(functions.extract_id_id_name(this.clear_markers_device_form));
        for(let i = 0; i< this.device_polyline_tracker[position].length; i++){
          this.device_polyline_tracker[position][i].setMap(null)
        }
        this.device_polyline_tracker[position] = [];
        let holder;
        for(let i = 0; i< (this.device_marker_tracker[position].length - 1); i++){
          holder = this.device_marker_tracker[position][i];
          this.markers[holder].setMap(null)
        }
      }
    },
    //--------------------------------------------------------------------------------------------------------------------------------------------
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.google-map {
  width: 1500px;
  height: 500px;
  margin: 0 auto;
  background: gray;
}
</style>
 