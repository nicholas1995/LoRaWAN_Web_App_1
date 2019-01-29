import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home.vue'

import Login from '@/components/Login'

import Dashboard from './../components/Dashboard/Dashboard.vue'

import Device_Gateway_Map from '../components/Map/Map.vue'
import Gateway_Map from '../components/Map/Gateway Map.vue'
import Device_Map from '../components/Map/Device Map.vue'


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

import Device_Profile from "../components/Device Profile/Device_Profile_Management.vue";
import Create_Device_Profile from "../components/Device Profile/Create_Device_Profile.vue";
import Update_Device_Profile from "../components/Device Profile/Update_Device_Profile.vue";

import Gateway_Profile from "../components/Gateway Profile/Gateway_Profile_Management.vue";
import Create_Gateway_Profile from "../components/Gateway Profile/Create_Gateway_Profile.vue";
import Update_Gateway_Profile from "../components/Gateway Profile/Update_Gateway_Profile.vue";

import Network_Server from '../components/Network Server/Network_Server_Management.vue'
import Create_Network_Server from "../components/Network Server/Create_Network_Server.vue";
import Update_Network_Server from "../components/Network Server/Update_Network_Server.vue";

import User from "../components/User/User_Management.vue"
import Create_User from "../components/User/Create_User.vue"
import Update_User from "../components/User/Update_User.vue"
import Reset_Password from "../components/User/Reset_Password.vue"

import Update_Profile from "../components/Update_Profile";
import Update_Password from "../components/Update_Password";
import Device_Data from "../components/Device Data/Device_Data.vue";
import Error_Logs from "../components/Error Logs/Error_Logs.vue";




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
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
    //-------------------------MAP-------------------------
    {
      path: "/map",
      name: "map",
      component: Device_Gateway_Map
    }, 
    {
      path: "/map/gateway",
      name: "map_gateway",
      component: Gateway_Map
    },
    {
      path: "/map/device",
      name: "map_device",
      component: Device_Map
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
   //-------------------------Device_Profile-------------------------
   {
    path: "/device_profile",
    name: "device_profile",
    component: Device_Profile
    },
    {
      path: "/device_profile/create",
      name: "device_profile_create",
      component: Create_Device_Profile
    },
    {
      path: "/device_profile/update/:device_profile_id_lora", //reasons sending the lora instead of the database is because we do not need to fetch all the profiles from the server for this form this there are no requriements to the name
      name: "device_profile_update", 
      component: Update_Device_Profile
    },
   //-------------------------Gateway_Profile-------------------------
   {
    path: "/gateway_profile",
    name: "gateway_profile",
    component: Gateway_Profile
    },
    {
      path: "/gateway_profile/create",
      name: "gateway_profile_create",
      component: Create_Gateway_Profile
    },
    {
      path: "/gateway_profile/update/:gateway_profile_id_lora", 
      name: "gateway_profile_update", 
      component: Update_Gateway_Profile
    },
    //-------------------------Network Server-------------------------
    {
      path: "/network_server",
      name: "network_server",
      component: Network_Server
    },
    {
      path: "/network_server/create",
      name: "network_server_create",
      component: Create_Network_Server
    },
    {
      path: "/network_server/update/:network_server_id_lora",
      name: "network_server_update",
      component: Update_Network_Server
    },

    //-------------------------User-------------------------
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: "/user/create",
      name: "user_create",
      component: Create_User
    },
    {
      path: "/user/update/:user_id",
      name: "user_update",
      component: Update_User
    },
    {
      path: "/user/reset_password/:reset_password_token",
      name: "reset_password",
      component: Reset_Password
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
 