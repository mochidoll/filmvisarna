<template>
  <div class="container">
    <h1>Tjääna</h1>   
    <MovieList/>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList'

export default {
  name: 'Home',
  components: {
    MovieList
  },

  created() {
    this.$store.dispatch('getMovies')
  }
}
</script>

<style>
</style>
