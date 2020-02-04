import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    screenings: [],
    auditoriums: [],
    users: [],
    dummyBookings: [], 
  },
  mutations: {

    setMovies(state, data) {
      state.movies = data
    }, 

    setScreenings(state, data) {
      state.screenings = data
    },

    setAuditoriums(state, data) {
      state.auditoriums = data
    },

    setUsers(state, data) {
      state.users = data
    },

   /*  setDummyBookings(state, data) {
      state.dummyBookings = data
    },
 */

  },
  actions: {

    async getMovies({ commit }) {
      let snapshot = await db.collection('movies').get()
      let movies = []
      snapshot.forEach(movie => {
        let data = movie.data(); // alla egenskaper utom id:t
        data.id = movie.id; // lägg till id
        movies.push(data)
      })
      commit('setMovies', movies)
    },

    async getScreenings({ commit }) {
      let snapshot = await db.collection('screenings').get()
      let screenings = []
      snapshot.forEach(screening => {
        let data = screening.data(); // alla egenskaper utom id:t
        data.id = screening.id; // lägg till id
        screenings.push(data)
      })
      commit('setScreenings', screenings)
    },

    async getAuditoriums({ commit }) {
      let snapshot = await db.collection('auditoriums').get()
      let auditoriums = []
      snapshot.forEach(auditorium => {
        let data = auditorium.data(); // alla egenskaper utom id:t
        data.id = auditorium.id; // lägg till id
        auditoriums.push(data)
      })
      commit('setAuditoriums', auditoriums)
    },

    async getUsers({ commit }) {
      let snapshot = await db.collection('users').get()
      let users = []
      snapshot.forEach(user => {
        let data = user.data(); // alla egenskaper utom id:t
        data.id = user.id; // lägg till id
        users.push(data)
      })
      commit('setUsers', users)
    },

   /*  async getDummyBookings({ commit }) {
      let snapshot = await db.collection('dummyBookings').get()
      let dummyBookings = []
      snapshot.forEach(dummyBooking=> {
        let data = dummyBooking.data(); // alla egenskaper utom id:t
        data.id = dummyBooking.id; // lägg till id
        dummyBookings.push(data)
      })
      commit('setDummyBookings', dummyBookings)
    }, */
    
  },
  modules: {
  }
})
