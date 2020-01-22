import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '@/components/Start'
import Booking from '@/components/Booking'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'start',
    component: Start
  },
  {
    path: '/booking',
    name: 'booking',
    component: Booking
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
