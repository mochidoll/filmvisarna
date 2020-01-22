import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import AllMovies from '@/components/AllMovies'
import Contact from '@/components/Contact'
import Login from '@/components/Login'
import Booking from '@/components/Booking'
import Movie from '@/components/Movie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/booking',
    name: 'booking',
    component: Booking
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/allMovies',
    name: 'allMovies',
    component: AllMovies
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/movie:movie',
    name: 'movie',
    component: Movie
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
