import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import AllMovies from '@/components/AllMovies'
import Contact from '@/components/Contact'
import Login from '@/components/Login'
import Movie from '@/components/Movie'
import CreateScreenings from '@/components/CreateScreenings'
import Booking from '@/components/Booking/Booking'
import SelectTickets from '@/components/Booking/SelectTickets'
import SelectSeats from '@/components/Booking/SelectSeats'
import ConfirmDetails from '@/components/Booking/ConfirmDetails'
import BookingComplete from '@/components/Booking/BookingComplete'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
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
    path: '/booking',
    name: 'booking',
    component: Booking,
    children: [
      {
        path: 'selectTickets',
        name: 'SelectTickets',
        component: SelectTickets
      },
      {
        path: 'selectSeats',
        name: 'SelectSeats',
        props: true,
        component: SelectSeats
      },
      {
        path: 'confirmDetails', 
        name: 'ConfirmDetails',
        props: true,
        component: ConfirmDetails
      },
      {
        path: 'bookingComplete',
        name: 'BookingComplete',
        component: BookingComplete
      },
    ]
    }
  ]
   

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
