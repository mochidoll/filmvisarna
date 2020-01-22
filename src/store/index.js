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
      let movies = []
      snapshot.forEach(movie => {
        let data = movie.data(); // alla egenskaper utom id:t
        data.id = movie.id; // lägg till id
        movies.push(data)
      })
      window.console.log("movies with ids", movies);
      commit('setMovies', movies)
    }
  },
  modules: {
  }
})
