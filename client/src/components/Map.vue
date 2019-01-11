<template>
  <div class="google-map" :id="mapName"></div>
</template>
  

<script>
import AuthenticationService from "../services/AuthenticationService.js";

export default {
  name: 'google-map',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [],
      map: null,
      bounds: null,
      markers: [],
      flightPath: null,
      markerCluster: null,
      coordinates: [],
      contentString: [],
      gateways: '',

      i: 1 //Just to fetch the device locations/// to delete
      
    }
  },
  mounted: async function () {
    this.gateways = await AuthenticationService.get_gateways_map()
      .catch(err => {
        //Error getting gateway information from server
        console.log(err);
      })
    this.gateways = this.gateways.data.gateways;

    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName)
    const mapCentre = this.gateways[0]
    const options = {
      center: new google.maps.LatLng(mapCentre.gateway_latitude, mapCentre.gateway_longitude),
      zoom: 2
    } 
    this.map = new google.maps.Map(element, options);
    for(let i = 0; i< this.gateways.length; i++){
      const position = new google.maps.LatLng(this.gateways[i].gateway_latitude, this.gateways[i].gateway_longitude);
      const marker = new google.maps.Marker({ 
        position,
        map: this.map
      });
      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
      var content = `<b>Gateway Name:</b> ${this.gateways[i].gateway_name} <br>
      <b>Gateway ID:</b> ${this.gateways[i].gateway_id_lora} <br>
      <b>Gateway Description:</b> ${this.gateways[i].gateway_description} <br>
      <b>Network ID:</b> ${this.gateways[i].network_id}<br>
      <b>Gateway Latitude:</b> ${this.gateways[i].gateway_latitude}<br>
      <b>Gateway Longitude:</b> ${this.gateways[i].gateway_longitude}<br>
      <b>Gateway Altitude:</b> ${this.gateways[i].gateway_altitude}<br>`;
      var infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
          return function() {
              infowindow.setContent(content);
              infowindow.open(this.map,marker);
          };
      })(marker,content,infowindow));
    }
        //await this.fetch_locations()        
  },
  methods: {
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
 