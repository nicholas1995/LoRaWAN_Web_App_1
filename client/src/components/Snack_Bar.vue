<template>
  <v-content>   
    <v-snackbar
      v-model="snackbar"
      bottom="bottom"
      left="left"
      :timeout="timeout"
      :color ="this.type"
    >
      {{this.message}}
        <v-btn
          flat
          @click="snackbar = 0"
        >        Close
        </v-btn>
      </v-snackbar>
  </v-content>
</template>
  

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
    snackbar: false,
    message: '',
    type: "info",
    timeout: 2000,
    };
  },
  created: function(){
    this.$store.watch(state => state.snackbar_message, () => { //watch for changes in the message
      const msg = this.$store.state.snackbar_message
      if (msg !== '') {
        this.snackbar = true
        this.message = this.$store.state.snackbar_message
        this.type = this.$store.state.snackbar_type
        this.$store.commit('set_snackbar', {message:'',type: ''})
      }
    })
    this.$store.watch(state => state.snackbar_type, () => { //watch for changes in the type
      const msg = this.$store.state.snackbar_type
      if (msg !== '') {
        this.snackbar = true
        this.message = this.$store.state.snackbar_message
        this.type = this.$store.state.snackbar_type
        this.$store.commit('set_snackbar', {message:'',type: ''})
      }
    })
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
