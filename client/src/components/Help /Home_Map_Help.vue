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
      title: "Help Page", //Variable which holds the title of the table
      questions: [
        {
          question: '<u><b>What does this map show?',
          answer: `This map displays the sensor data collected at any point by the Caribbean ICT Research Programme, Marine IoT sensors. The 
          colourful areas represent places where data has been previously collected. To view the information at any point, click the point.`,
        },
        { divider: true },
        {
          question: '<u><b>What are the colourful areas on the map?',
          answer: `The colourful area is a heat map which represents places where data has been previously collected. The deeper the intensity the more data have been collected at that point.`
        },
        { divider: true},
        {
          question: '<u><b>What does the square around the marker represent?',
          answer: `The square around the marker represents the boundary of the area used to fetch the sensor data . Any sensor data which has been previously
          collected inside the boundary is displayed. The size of the area increases as the zoom level of the map decreases.`
        },
        { divider: true},
        {
          question: '<u><b>What does the values on the info-window represent?',
          answer: `The info-window displays all the sensor data collected within the boundary of the buffer zone. Each set of data represents the data collected at that listed time stamp 
          and GPS coordinate.
        `
        },
        { divider: true  },
        {
          question: '<u><b>What does the foward and back icons on the info-window represent represent?',
          answer: "The foward and back icons are used to navigate through the sensor data collected within the buffer zone. The most recent sensor data is displayed first."
        },
        { divider: true},
        {
          question: '<u><b>What does the graph represent?',
          answer:  `The graph plots the sensor data collected within the buffer zone over time. By hovering over the markers on the graph you will be able to see the value being plot as 
          well as the time stamp the sensor value was collected. The graph allows you to zoom (pinching in or out), reset zoom (right click) and pan (click and slide left or right).`
        },
        { divider: true},
        {
          question: '<u><b>How do I plot a different sensor?',
          answer: `You can plot the temperature, humdity as well as accelerometer over time. To change the parameter being plotted select from the picker the value to plot.`
        },
        { divider: true},
        {
          question: '<u><b>Why does it say "No Sensor Data at Following Position" when I click the map?',
          answer: `This message is displayed if no data has ever been collected within the boundary of the selected point.`
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
 