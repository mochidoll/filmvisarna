import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '@/firebase/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: []
  },
  mutations: {
    setMovies(state, data) {
      state.movies = data
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
