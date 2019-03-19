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
      title: "Gateway Stats Help Page", //Variable which holds the title of the table
      questions: [
        {
          question: '<u><b>What do these records represent?',
          answer: `These records represents the gateway statistics for the gateways assoicated with the Caribbean ICT Research Programme.`,
        },
        { divider: true },
        {
          question: '<u><b>What does the list of heading at the top of the page represent?',
          answer: `This lists represents all the headings currently being displayed in the table. Heading can be removed or added to alter the heading displayed.
          To select all the heading available to be displayed the icon next to the clear icon 'x' can be used.`
        },
        { divider: true },
        {
          question: '<u><b>What does the organization and gateway pickers represent?',
          answer: `These pickers are used to filter the records based on each of the parameters.`
        },
        { divider: true },
        {
          question: '<u><b>What does both the start and end date and times represent?',
          answer: `The start and end date and time are used to filter the records which were generated after the start date and time but before the end date and time.`
        },
        { divider: true },
        {
          question: '<u><b>Why are the records not updating even though I altered the filter parameters?',
          answer: `To refresh the records to reflect the latest filter parameters set click the "Generate Filtered Gateway Stats" button.`
        },
        { divider: true },
        {
          question: '<u><b>How do I export the records?',
          answer: `To export the records, click the "Export Gateway Stats" button and then select the option either the local storage or email option. The local storage option will download
          the records to your local machine. The email option will export the records to the email address assoicated with you account.`
        },
        { divider: true },
        {
          question: '<u><b>Why are a limited number of records exported?',
          answer: `Only the filtered records are exported. If after you filter the records, only 10 records are displayed, only these 10 records are expoted if the export option is selected.
          To download all the records, clear the selected filter parameters and click the "Generate" button.`
        }
      ],
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
 