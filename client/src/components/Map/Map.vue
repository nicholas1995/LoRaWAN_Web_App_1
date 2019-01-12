<template>
  <v-content>
    <div class="google-map" :id="map_name" ></div>
  </v-content>
</template>
  

<script>
import AuthenticationService from "../../services/AuthenticationService.js";

export default {
  name: 'google-map',
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

      device_marker_refresh_interval: 4000,
      gateway_marker_refresh_interval: 4000
      
    }
  },
  mounted: async function () {
    try{
      if (this.$store.state.loginState == false) {
        //User logged in
        await AuthenticationService.check_permissions("device", "get")
          .catch(err => {
            console.log(err)
            throw err;
          });
        //-------------------------Start----------------------
        this.init_map();
        this.get_gateway_data_initial();
        this.get_device_data_initial();
        //await this.fetch_locations()  
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
    get_device_data_initial: async function(){
      let result = await AuthenticationService.get_device_data_map_initial()
      .catch(err => {
        //Error fetching the device data
        console.log(err)
      })
      let device_data = result.data.device_data
      for(let i =0; i< device_data.length; i++){
        this.create_device_marker(device_data[i], i)
      }
    },
    get_gateway_data_initial: async function(){
      let result = await AuthenticationService.get_gateways_map()
      .catch(err => {
        //Error getting gateway information from server
        console.log(err);
      })
      let gateway_data = result.data.gateways
      for(let i =0; i< gateway_data.length; i++){
        this.create_gateway_marker(gateway_data[i], i)
      }
    },
    create_device_marker: async function(device ){
        let position = new google.maps.LatLng(device.gps_latitude, device.gps_longitude);
        let marker = new google.maps.Marker({ 
          position,
          map: this.map,
          label: `${device.device_id}`
        });
        this.markers.push(marker)
        this.map.fitBounds(this.bounds.extend(position))
        var info_window = new google.maps.InfoWindow(); //creates the instance of the infowindow
        this.set_device_info_window(marker, info_window, device); //sets the info window
        var cleartick = setInterval(this.refresh_device_marker, this.device_marker_refresh_interval, marker, info_window, device);//this is the syntax for it to work
    },
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
      var cleartick = setInterval(this.refresh_gateway_marker, this.gateway_marker_refresh_interval, marker, info_window, gateway);//this is the syntax for it to work
    },
    refresh_device_marker:  async function(marker, info_window, device){
      device = await AuthenticationService.refresh_device_data_map(device.device_id)
        .catch(err => {
          //Error gettin most recent 
          console.log(err)
        })
      device = device.data.device_data[0];
      let position = new google.maps.LatLng(device.gps_latitude, device.gps_longitude);
      marker.setPosition(position)
      this.set_device_info_window(marker, info_window, device);
    },
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
    fetch_locations: async function(){
      let device_uplink_data;
        device_uplink_data = await AuthenticationService.get_device_uplink_specified_id(this.i)
        .catch(err => {
          console.log(err);
        }) 
        device_uplink_data = JSON.parse(device_uplink_data.data.device_data);

        this.markerCoordinates.push({lat: parseFloat(device_uplink_data[0].gps_latitude),
        lng: parseFloat(device_uplink_data[0].gps_longitude)})
          const position = new google.maps.LatLng(this.markerCoordinates[(this.i -1)].lat, this.markerCoordinates[this.i -1].lng);
          var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
          const marker = new google.maps.Marker({ 
            position,
            map: this.map,
            icon: image
          });
          this.markers.push(marker)
                this.i = this.i+1;
          this.flightPath = new google.maps.Polyline({
          path: this.markerCoordinates,
          geodesic: true,
          strokeColor: '#FF0088',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: this.map
        }); 
        setTimeout(this.fetch_locations, 2000)
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.google-map {
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>
 