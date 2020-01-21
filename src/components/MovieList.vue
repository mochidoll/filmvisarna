<template>
  <div class="container">

    <div class="row">
      <div class="col s12 m4" v-for="(movie, id) in movies" :key="id">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" :src="movie.image">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{movie.title}}</span>
            <p><a href="#">This is a link</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">{{movie.title}}<i class="material-icons right">close</i></span>
            <p>{{movie.description}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- <i class="material-icons right">more_vert</i> -->
  
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  computed: {
    movies() {
      return this.$store.state.movies
    }
  },
}
</script>

<style>
 .row {
   display: inline-block;
 }
</style>