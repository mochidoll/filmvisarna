<template>
  <div>

    <div>
      <p>Showing today ({{day}}, {{date}})</p>
    </div>

    <div class="movie col s12 m7" v-for="(movie, id) in movies" :key="id">
      <div class="card horizontal red darken-4">
        <div class="card-image">
          <img :src="movie.image">
        </div>
        <div class="card-stacked">
          <div class="card-content valign-wrapper">
            <div>
            <p class="movie-title">{{movie.title}}</p>
            <p>{{movie.genre.toString()}} | {{movie.length}} min</p>
            </div>
          </div>
          <!-- <div class="card-action">
            <a class="white-text" href="#">This is a link</a>
          </div> -->
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import moment from 'moment'

  export default {
    computed: {
      day() {
        return moment().format('dddd');  
      },
      date() {
        return moment().format("MMM Do YY");
      },
      movies() {
        return this.$store.state.movies
      },
    }
  }

</script>

<style>
  .movie .card {
    border-radius: 20px !important;
  }
  .movie .card-image {
    width: 10rem !important;
  }
  .movie .movie-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .movie .movie-title {
    font-size: 2rem;
    font-weight: bold;
  }

</style>