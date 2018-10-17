import Vue from 'vue'
import Router from 'vue-router'
import Toolbar from '@/components/Toolbar'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Update_user from '../components/Update_User.vue'
import Account_Management from '../components/Account_Management.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/toolbar',
      name: 'toolbar',
      component: Toolbar
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/updateuser',
      name: 'updateuser',
      component: Update_user
    },
    {
      path: '/accountmanagement',
      name: 'accountmanagement',
      component: Account_Management
    }
  ]
})
 