<template>
  <div class="google-map" :id="mapName"></div>
</template>
  

<script>
export default {
  name: 'google-map',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [{
        lat: 10.431135,
        lng: -61.623766
      }, {
        lat: 10.584085,
        lng: -61.702689
      }, {
        lat: 10.731110,
        lng: -61.703193
      }],
      map: null,
      bounds: null,
      markers: [],
      flightPath: null,
      markerCluster: null
      
    }
  },
  mounted: function () {
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName)
    const mapCentre = this.markerCoordinates[0]
    const options = {
      center: new google.maps.LatLng(mapCentre.lat, mapCentre.lng)
    }
    this.map = new google.maps.Map(element, options);
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.lat, coord.lng);
      const marker = new google.maps.Marker({ 
        position,
        map: this.map
      });
    this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
    });
    this.flightPath = new google.maps.Polyline({
          path: this.markerCoordinates,
          geodesic: true,
          strokeColor: '#FF0088',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: this.map
        });
    
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
 