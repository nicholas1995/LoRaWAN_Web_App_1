import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import LoginNewUser from '@/components/LoginNewUser'



Vue.use(Router)

export default new Router({
  routes: [
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
    }
  ]
})
 