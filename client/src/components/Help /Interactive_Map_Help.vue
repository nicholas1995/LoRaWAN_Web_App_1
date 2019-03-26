<template>
  <v-card >
    <v-list three-line>
      <template v-for="(question_answer, index) in questions">
        <v-subheader
          v-if="question_answer.header"
          :key="question_answer.header"
        >
          {{ question_answer.header }}
        </v-subheader>
        <v-divider
          v-else-if="question_answer.divider"
          :key="index"
          :inset="question_answer.inset"
        ></v-divider>
        <v-list-tile
          v-else
          :key="question_answer.question"
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="question_answer.question"></v-list-tile-title>
            <v-list-tile-sub-title v-html="question_answer.answer"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>
  

<script>


export default {
  data(){
    return {
      help_dialog: false,
      title: "Interactive Map Help Page", //Variable which holds the title of the table
      questions: [
        {
          question: '<u><b>What does this map show?',
          answer: `The icons initailly loaded on the map represents all the devices and gateways associated with the console. All gateways are represented using  purple markers while all devices
          are represented using red markers. General information about both the devices and gateways can be seen by hovering over the marker associated with the device/gateway.`,
        },
        { divider: true },
        {
          question: '<u><b>What does the number associated with each marker represent?',
          answer: `The numbers assoicated with each marker represents the unique id of either the device or gateway the marker is associated with. `
        },
        { divider: true },
        {
          question: '<u><b>How do I see the sensor data assoicated with a device or the stats associated with a gateway?',
          answer: `To view the most resent sensor data for a device or the most recent stats for a gateway, right click on the marker associated with the device or gateway.`
        },
        { divider: true },
        {
          question: '<u><b>Why does a gateway marker display "No Sats Available"?',
          answer: `This message is displayed if there are no gateway stats associated with the gateway.`
        },
        { divider: true },
        {
          question: '<u><b>Why does the markers keep moving?',
          answer: `The location of both the device and gateway markers are periodically updated. Once the location is updated the marker as well as the information listed in the info-window
          for the assoicated marker is also updated.`
        },
        { divider: true },
        {
          question: '<u><b>What are the "Display Device" and "Display Gateways" toggle switches used for?',
          answer: `These toggle switches are used to either display or remove the devices or gateways from the map.`
        },
        { divider: true },
        {
          question: '<u><b>What are the Organization, Application, Vessel and Device pickers used for?',
          answer: `These pickers are used to identify devices. `
        },
        { divider: true },
        {
          question: '<u><b>What does the control panel do?',
          answer: `The control panel is used to individually control the displaying options for the devices. A devices control panel can be selected by either directly selecting the tab which 
          dislays the devices ID and name or by using the pickers to select the device. The options displayed only refer to the device whose tab is currently open.`
        },
        { divider: true },
        {
          question: '<u><b>What is "Real Time Location" used for?',
          answer: `Real time location periodically refreshes the location and info-window information of the associated device marker.`
        },
        { divider: true },
        {
          question: '<u><b>What is "Real Time Tracking" used for?',
          answer: `The real time tracking option is used to plot the real time tracks of the device. A green line is used to connect each marker of the track. The device information at 
          each point along the track can be exported using the "Download Device Realtime Tracks" option. `
        },
        { divider: true },
        {
          question: '<u><b>What is "Historic Tracking" used for?',
          answer: `Historic tracking is used to plot the historic tracks of the device. The tracks are set between the start date and time and end date and time. A pink line is used to represent
          the historic tracks.`
        }
      ]
    }
  },
  created: async function () {
    this.$emit('title_emit', this.title)
  }
}


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 