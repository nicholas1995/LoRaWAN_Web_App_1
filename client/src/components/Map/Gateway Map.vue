<template>
  <v-content>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 class="pr-4" >
        <v-btn class="grey lighten-2" large
          @click.stop="$router.push(`/map`)">
          View Gateways and Devices
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

      gateway_marker_refresh_interval: 10000,

      device_tracking_form: [], //an array of all the selected devices (id:name) that tracking should be enabled for 
      device_tracking_form_old: [], //an array of all the previous selected devices (id:name) that tracking should be enabled for 

      cleartick_gateway: [], //arrary that holds all the clearticks to stop the setinterval for a gateways

      
    }
  },
  mounted: async function () {
    try{
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("gateways", "get")
          .catch(err => {
            console.log(err)
            throw err;
          });
        //-------------------------Start----------------------
        this.init_map();
        await this.get_gateway_data_initial();
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
    for(let i =0; i<this.cleartick_gateway.length; i++){ //clear gateway intervals
          let holder  = this.cleartick_gateway[i];
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
 