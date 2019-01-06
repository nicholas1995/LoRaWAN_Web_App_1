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

import Vessel from "../components/Vessel/Vessel_Management.vue";
import Create_Vessel from "../components/Vessel/Create_Vessel.vue";
import Update_Vessel from "../components/Vessel/Update_Vessel.vue";

import Device from "../components/Device/Device_Management.vue"
import Create_Device from "../components/Device/Create_Device.vue";
import Update_Device from "../components/Device/Update_Device.vue";
import Activate_Device from "../components/Device/Activate_Device.vue";

import Gateway from "../components/Gateway/Gateway_Management.vue"
import Create_Gateway from "../components/Gateway/Create_Gateway.vue";
import Update_Gateway from "../components/Gateway/Update_Gateway.vue";
import Gateway_Statistics from "../components/Gateway Statistics/Gateway_Statistics.vue";

import Service_Profile from "../components/Service Profile/Service_Profile_Management.vue";
import Create_Service_Profile from "../components/Service Profile/Create_Service_Profile.vue";
import Update_Service_Profile from "../components/Service Profile/Update_Service_Profile.vue";

import User from "../components/User/User.vue"
import Update_Profile from "../components/Update_Profile";
import Update_Password from "../components/Update_Password";
import Device_Data from "../components/Device Data/Device_Data.vue";
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
    //-------------------------Vessel-------------------------
    {
      path: "/vessel",
      name: "vessel",
      component: Vessel
    },
    {
      path: "/vessel/create",
      name: "vessel_create",
      component: Create_Vessel
    },
    {
      path: "/vessel/update/:vessel_id",
      name: "vessel_update",
      component: Update_Vessel
    },
    //-------------------------Device-------------------------
    {
      path: "/device",
      name: "device",
      component: Device
    },
    {
      path: "/device/create",
      name: "device_create",
      component: Create_Device
    },
    {
      path: "/device/update/:device_id",
      name: "device_update",
      component: Update_Device
    },
    {
      path: "/device/activate/:device_id",
      name: "device_activate",
      component: Activate_Device
    },
    //-------------------------Gateway-------------------------
    {
      path: "/gateway",
      name: "gateway",
      component: Gateway
    },
    {
      path: "/gateway/create",
      name: "gateway_create",
      component: Create_Gateway
    },
    {
      path: "/gateway/update/:gateway_id",
      name: "gateway_update",
      component: Update_Gateway
    },
    {
      path: "/gateway_statistics",
      name: "gateway_statistics",
      component: Gateway_Statistics
    },
    //-------------------------Service_Profile-------------------------
    {
      path: "/service_profile",
      name: "service_profile",
      component: Service_Profile
    },
    {
      path: "/service_profile/create",
      name: "service_profile_create",
      component: Create_Service_Profile
    },
    {
      path: "/service_profile/update/:service_profile_id_lora", //reasons sending the lora instead of the database is because we do not need to fetch all the profiles from the server for this form this there are no requriements to the name
      name: "service_profile_update",
      component: Update_Service_Profile
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
 