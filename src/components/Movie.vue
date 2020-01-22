<template>
<div class="container">
  <div class="trailer-container">
    <h1>Insert trailer here later</h1>
  </div>
  <div class="container">
      <p>{{movie.title}}</p>
    </div>

</div>
</template>

<script>
export default {
  computed: {
    movie(){
      let movies = this.movies;
      for (let movie of movies){
        if (movie.title == this.$route.params.movie)
        return movie;
      }
      return null
    },
    movies() {
      return this.$store.state.movies
    }
  }

}
</script>

<style>

</style>