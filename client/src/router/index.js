import Vue from 'vue'
import Router from 'vue-router'
import Toolbar from '@/components/Toolbar'
import Register from '@/components/Register'
import Login from '@/components/Login'
import LoginNewUser from '@/components/LoginNewUser'
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
      path: '/login/newuser',
      name: 'newuser',
      component: LoginNewUser
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
 