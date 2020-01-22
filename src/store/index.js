import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
    genres: []
  },
  mutations: {
    setMovies(state, data) {
      state.movies = data
    },
    setGenres(state, data) {
      state.genres = data
    }
  },
  actions: {
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
