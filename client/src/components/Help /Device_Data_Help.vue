<template>
  <v-card >
    <v-list three-line>
      <template v-for="(question_answer, index) in questions">
        <v-subheader
          v-if="question_answer.header "
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
      title: "Device Data Help Page", //Variable which holds the title of the table
      data_user_questions: [
        {
          question: '<u><b>What do these records represent?',
          answer: `These records represents the device uplink data sent from the devices which are part of the Caribbean ICT Research Programme.`,
        },
        { divider: true },
        {
          question: '<u><b>What does the list of heading at the top of the page represent?',
          answer: `This lists represents all the headings currently being displayed in the table. Heading can be removed or added to alter the heading displayed.
          To select all the heading available to be displayed the icon next to the clear icon 'x' can be used.`
        },
        { divider: true },
        {
          question: '<u><b>What does the organization, application, vessel and device pickers represent?',
          answer: `These pickers are used to filter the records based on each of the parameters. To select an individual device the organization, application and vessel the device is on
          must be selected.`
        },
        { divider: true },
        {
          question: '<u><b>What does both the start and end date and times represent?',
          answer: `The start and end date and time are used to filter the records which were generated after the start date and time but before the end date and time.`
        },
        { divider: true },
        {
          question: '<u><b>What does the switch labelled "Display Data From Assigned Vessels Only" do?',
          answer: `This switch toggles between the displaying of all the records ever collected and the records originating from the the vessels associated with your user account. 
          If set to false, all the records collected by the console is displayed. If set to true only the records originating from your vessels are displayed.`
        },
        { divider: true },
        {
          question: '<u><b>Why are the records not updating even though I altered the filter parameters?',
          answer: `To refresh the records to reflect the latest filter parameters set click the "Generate Filtered Uplink Data" button.`
        },
        { divider: true },
        {
          question: '<u><b>How do I export the records?',
          answer: `To export the records, click the "Export Device Uplink Data" button and then select the option either the local storage or email option. The local storage option will download
          the records to your local machine. The email option will export the records to the email address assoicated with you account.`
        },
        { divider: true },
        {
          question: '<u><b>Why are a limited number of records exported?',
          answer: `Only the filtered records are exported. If after you filter the records, only 10 records are displayed, only these 10 records are expoted if the export option is selected.
          To download all the records, clear the selected filter parameters and click the "Generate" button.`
        }
      ],
      self_questions: [
        {
          question: '<u><b>What do these records represent?',
          answer: `These records represents all the Marine IoT sensor data originating from the vessels associated with your user account.`,
        },
        { divider: true },
        {
          question: '<u><b>What does the list of heading at the top of the page represent?',
          answer: `This lists represents all the headings currently being displayed in the table. Heading can be removed or added to alter the heading displayed.
          To select all the heading available to be displayed the icon next to the clear icon 'x' can be used.`
        },
        { divider: true },
        {
          question: '<u><b>What does the vessel and device pickers represent?',
          answer: `These pickers are used to filter the records based on each of the parameters. To select an individual device the organization, application and vessel the device is on
          must be selected.`
        },
        { divider: true },
        {
          question: '<u><b>What does both the start and end date and times represent?',
          answer: `The start and end date and time are used to filter the records which were generated after the start date and time but before the end date and time.`
        },
        { divider: true },
        {
          question: '<u><b>Why are the records not updating even though I altered the filter parameters?',
          answer: `To refresh the records to reflect the latest filter parameters set click the "Generate Filtered Uplink Data" button.`
        },
        { divider: true },
        {
          question: '<u><b>How do I export the records?',
          answer: `To export the records, click the "Export Device Uplink Data" button and then select the option either the local storage or email option. The local storage option will download
          the records to your local machine. The email option will export the records to the email address assoicated with you account.`
        },
        { divider: true },
        {
          question: '<u><b>Why are a limited number of records exported?',
          answer: `Only the filtered records are exported. If after you filter the records, only 10 records are displayed, only these 10 records are expoted if the export option is selected.
          To download all the records, clear the selected filter parameters and click the "Generate" button.`
        }
      ],
      questions: null,
    }
  },
  created: async function () {
    this.$emit('title_emit', this.title)
    if(this.$store.state.user_class =='Fisher') this.questions = this.self_questions;
    else this.questions = this.data_user_questions;
  }
}


</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 