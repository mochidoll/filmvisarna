import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auditoriums: [],
    movies: []
  },
  mutations: {
    setAuditoriums(state, data) {
      state.auditoriums = data
    },
    setMovies(state, data) {
      state.movies = data
    }
  },
  actions: {
    async getAuditoriums({ commit }) {
      let snapshot = await db.collection('auditoriums').get()
      let data = []
      snapshot.forEach(document => {
        data.push(document.data())
      })
      commit('setAuditoriums', data)
    },
    async getMovies({ commit }) {
      let snapshot = await db.collection('movies').get()
      let data = []
      snapshot.forEach(document => {
        data.push(document.data())
      })
      commit('setMovies', data)
    }
  },
  modules: {
  }
})
