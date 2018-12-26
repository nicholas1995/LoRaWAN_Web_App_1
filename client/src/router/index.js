import Vue from 'vue'
import Router from 'vue-router'
import Toolbar from '@/components/Toolbar'
import Login from '@/components/Login'
import Dashboard from './../components/Dashboard/Dashboard.vue'
import Interactive_Map from '../components/Map.vue'

import Network from '../components/Network/Network_Management.vue'
import Create_Network from "../components/Network/Create_Network.vue";
import Update_Network from "../components/Network/Update_Network.vue";

import Sub_Network from '../components/Sub_Network/Sub_Network_Management.vue'
import Create_Sub_Network from "../components/Sub_Network/Create_Sub_Network.vue";
import Update_Sub_Network from "../components/Sub_Network/Update_Sub_Network.vue";

import Vessel from "../components/Vessel/Vessel.vue";
import Device from "../components/Device/Device.vue"
import Gateway from "../components/Gateway/Gateway.vue"
import User from "../components/User/User.vue"
import Update_Profile from "../components/Update_Profile";
import Update_Password from "../components/Update_Password";
import Device_Data from "../components/Device_Data";
import Error_Logs from "../components/Error Logs/Error_Logs.vue";




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/toolbar",
      name: "toolbar",
      component: Toolbar
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
      path: "/map",
      name: "map",
      component: Interactive_Map
    },
    //-------------------------Network-------------------------
    {
      path: "/network",
      name: "network",
      component: Network
    },
    {
      path: "/network/create",
      name: "network_create",
      component: Create_Network
    },
    {
      path: "/network/update/:network_id",
      name: "network_update",
      component: Update_Network
    },
    //-------------------------Sub-Network-------------------------
    {
      path: "/subnetwork",
      name: "subnetwork",
      component: Sub_Network
    },
    {
      path: "/subnetwork/create",
      name: "subnetwork_create",
      component: Create_Sub_Network
    },
    {
      path: "/subnetwork/update/:sub_network_id",
      name: "subnetwork_update",
      component: Update_Sub_Network
    },
    {
      path: "/vessel",
      name: "vessel",
      component: Vessel
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
    },
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: "/update_profile",
      name: "update_profile",
      component: Update_Profile
    },
    {
      path: "/update_password",
      name: "update_password",
      component: Update_Password
    },
    {
      path: "/device_data",
      name: "device_data",
      component: Device_Data
    },
    {
      path: "/error_logs",
      name: "error_logs",
      component: Error_Logs
    }
  ]
});
 