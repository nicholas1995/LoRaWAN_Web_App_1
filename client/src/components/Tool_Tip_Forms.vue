<template>
      <v-tooltip
        slot="append-outer"
        bottom
        max-width='400'>
      <v-icon small  slot="activator">info</v-icon>
      {{description_prop}}
    </v-tooltip>
</template>
  
<script>
export default {
  props:[
   'description_prop'
  ],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
