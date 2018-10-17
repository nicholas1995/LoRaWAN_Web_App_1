<template>
  <v-content v-if="this.$store.state.user_class == 'Analyst'">>
      Welcome Analyst
  </v-content>
</template>
  

<script>
export default {
  data(){
    return {

    }
  },
  beforeCreate: function () {
    if(this.$store.state.user_class !='Analyst'){
      alert('You do not have access to this page');
      this.$router.push('login');
    }
  },
  computed: {

  },
  methods: {

  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 