import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      token: "",
      loginState: 1
    },
    mutations: {
        login(state, token){
            this.state.token = token.token;
            this.state.loginState = !this.state.loginState;  
      },
      logout(state){
        this.state.token = "";
        this.state.loginState = !this.state.loginState;  
  }
    }
  })