import Vue from 'vue'
import Router from 'vue-router'
import Toolbar from '@/components/Toolbar'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Dashboard_Software_Admin from '@/components/Dashboard_Software_Admin'
import Dashboard from '@/components/Dashboard'





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
    }
  ]
})
 