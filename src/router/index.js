import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Mine from '../pages/Mine/Mine'
import Login from '../pages/Login/Login'
import Display from "../pages/Display/Display";
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/display',
      component: Display
    },
    {
      path: '/',
      redirect: '/home'
    },
  ]
})


