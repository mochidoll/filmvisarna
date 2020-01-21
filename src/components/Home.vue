<template>
  <div class="container">
    <h3><b>NOW SHOWING</b></h3>   
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
  }, 
  
}
</script>

<style>
</style>
