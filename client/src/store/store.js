import Vue from "vue";
import Vuex from "vuex";
import AuthenticationService from "../services/AuthenticationService";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  //plugins: [createPersistedState()],
  state: {
    token: "",
    loginState: 1,
    users: []
  },
  mutations: {
    login(state, token) {
      this.state.token = token.token;
      this.state.loginState = !this.state.loginState;
    },
    logout(state) {
      this.state.token = "";
      this.state.loginState = !this.statec.loginState;
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
          console.log(err);
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
