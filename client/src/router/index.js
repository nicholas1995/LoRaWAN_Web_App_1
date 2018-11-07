import Vue from 'vue'
import Router from 'vue-router'
import Toolbar from '@/components/Toolbar'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Dashboard from './../components/Dashboard/Dashboard.vue'
import Update_user from '../components/Update_User.vue'
import Account_Management from '../components/Account_Management.vue'
import Interactive_Map from '../components/Map.vue'
import Network from '../components/Network/Network.vue'
import Sub_Network from '../components/Sub_Network/Sub_Network.vue'
import Device from "../components/Device/Device.vue";
import Gateway from "../components/Gateway/Gateway.vue";




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/toolbar",
      name: "toolbar",
      component: Toolbar
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/updateuser",
      name: "updateuser",
      component: Update_user
    },
    {
      path: "/accountmanagement",
      name: "accountmanagement",
      component: Account_Management
    },
    {
      path: "/map",
      name: "map",
      component: Interactive_Map
    },
    {
      path: "/network",
      name: "network",
      component: Network
    },
    {
      path: "/subnetwork",
      name: "subnetwork",
      component: Sub_Network
    },
    {
      path: "/device",
      name: "device",
      component: Device
    },
    {
      path: "/gateway",
      name: "gateway",
      component: Gateway
    }
  ]
});
 