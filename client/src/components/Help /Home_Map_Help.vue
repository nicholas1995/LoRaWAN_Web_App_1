<template>
      <v-card >
        1) Click any where on the map. <br>
        2)
      </v-card>
</template>
  

<script>


export default {
  data(){
    return {
        help_dialog: false,
        title: "Help Page", //Variable which holds the title of the table
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
 