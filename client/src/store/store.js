import Vue from "vue";
import Vuex from "vuex";
import AuthenticationService from "../services/AuthenticationService";

import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: "",
    loginState: 1,
    user_class: '',
    users: [] 
  },
  mutations: {
    login(state, data) {
      this.state.token = data.token;
      this.state.loginState = !this.state.loginState;
      this.state.user_class = data.user_class;
    },
    logout(state) { //this is to ensure that when you log out no information of the state is stored on the local storage 
      this.state.token = "";
      this.state.user_class = "";
      this.state.loginState = !this.state.loginState;
      this.state.users = [];
      
    },
    store_users(state, payload) {
      state.users = payload.payload;
    }
  },
  actions: {
    get_users(context) {
      AuthenticationService.get_users()
        .then(result => {
          let payload = result.data.users;
          context.commit("store_users", { payload });
        })
        .catch(err => {
          console.log('Do not have permission to view page');
        });
    },
    delete_user(context, { user }) {
      AuthenticationService.delete_user({
        email: user.email
      })
        .then(result => {
          context.dispatch("get_users");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
