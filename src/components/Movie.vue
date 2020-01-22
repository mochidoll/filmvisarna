<template>
<div class="container">
  <div class="trailer-container">
    <h4 class="grey-text center">Insert trailer here later</h4>
  </div>

    <div class="row">

      <div class="left col s12 center flex">
        <h3 class="left">{{movie.title}} </h3>
        <span class="movie-year">({{movie.productionYear}})</span>
      </div>

        <div class="col s12 m4 center image">
          <img :src="movie.image" alt="Movie poster" />
        </div>
        <div class="left col s12 m6 right">
          <h4>Summary</h4>
          <p class="grey-text">{{movie.length}} minutes</p>
          <p>{{movie.description}}</p>
        </div>
        <div class="col s12 m6 right">
          <span>Actors: {{movie.actors.join(", ")}}</span>
        </div>
        <div class="col s12 m6 right">
          <span>Directors: {{movie.directors.join(", ")}}
          </span>
        </div>
        <div class="col s12 m6 right">
          <span>Genre: {{movie.genre.join(", ")}}</span>
         
        </div>
    </div>
</div>
</template>

<script>
export default {
  computed: {
    movie() {
      let movies = this.movies;
      for (let movie of movies) {
        if (movie.title == this.$route.params.movie) return movie;
      }
      return null;
    },
    movies() {
      return this.$store.state.movies;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
h3 {
  margin: 0rem !important
}
.movie-year {
  font-size: 2rem;
}
.flex {
  display: flex;
  align-items: center;
   margin-bottom: 1rem;
}
.image{
min-width: 356px;
}
</style>