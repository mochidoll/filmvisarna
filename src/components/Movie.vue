<template>
<div class="container">
  <div class="trailer-container">
    <h4>Insert trailer here later</h4>
  </div>
  <div class="row">
    <div class="col s12 center">
      <h3>{{movie.title}}</h3>
      </div>
      <div class="col s12 center">
      <h4>{{movie.productionYear}}</h4>
      </div>
      <div class="col s12 m4 center">
      <img :src="movie.image" alt="Movie poster">
      </div>
      <div class="col s12 m6 right">
      <p>{{movie.description}}</p>
    </div>
     <div class="col s12 m6 right">
      <p>Movie length: {{movie.length}} minutes</p>
      </div>
      <div class="col s12 m6 right">
      <p>Actors: {{movie.actors}}</p>
      </div>
      <div class="col s12 m6 right">
      <p>Directors: {{movie.directors}}</p>
      </div>
    <div class="col s12 m6 right">
      <p>Genres: {{movie.genre}}</p>
    </div>

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
      return null;
    },
    movies() {
      return this.$store.state.movies
    }
  }

}
</script>

<style>
</style>