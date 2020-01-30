import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import AllMovies from '@/components/AllMovies'
import Contact from '@/components/Contact'
import Login from '@/components/Login'
import Movie from '@/components/Movie'
import CreateScreenings from '@/components/CreateScreenings'
import Secure from '@/components/Secure'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
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
    path: '/allMovies/:movie',
    name: 'movie',
    component: Movie
  },
  {
    path: '/create',
    name: 'createScreenings',
    component: CreateScreenings
  },
  {
    path: '/secure',
    name: 'sceure',
    component: Secure
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
