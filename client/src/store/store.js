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
    user:{
      user_name: '',
      email: ''
    },
    update_user: {}, //this stores the user object to be obdated
    update_self: 0, //this is used to track if the software admin is updating his account or another user
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
      this.state.user.user_name = data.user_name;
      this.state.user.email = data.email;
    },
    logout(state) { //this is to ensure that when you log out no information of the state is stored on the local storage 
      this.state.token = "";
      this.state.user_class = "";
      this.state.loginState = !this.state.loginState;
      this.state.users = [];
      this.state.user.user_name = "";
      this.state.user.email = "";
      this.state.update_user = {};
      
    },
    store_users(state, payload) {
      state.users = payload.payload;
    },
    update_user(state, user){
      state.update_user = user;
    },
    update_user_name_navigation_drawer(state, user) {
      state.user.user_name = user;
    },
    update_user_destroy(state,name){
      state.update_user = {};
      state.user.user_name = name.full_name;
    },
    get_users_destroy(state){
      state.users = [];
    },
    update_self(state, value){
      state.update_self =value;
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
          console.log('Do not have permission to view page');
        });
    }
  }
});
