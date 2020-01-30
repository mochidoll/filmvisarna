<template>
<div class="container">
  <div class="trailer-container">
    <h4 class="grey-text center">Insert trailer here later</h4>
  </div>

    <div class="row">

      <div class="left col s12 center flex">
        <h3 class="left">{{movie.title}} <span class="movie-year">({{movie.productionYear}})</span></h3>
        
      </div>

        <div class="col s12 m6 center image">
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

        <dropdown :options="arrayOfObjects" :selected="object" v-on:updateOption="methodToRunOnSelect"></dropdown>

    </div>
</div>
</template>

<script>

import dropdown from 'vue-dropdowns';

export default {
  data() {
          return {
            arrayOfObjects: [],
            object: {
              name: 'Choose Date',
            }
          }
        },
            components: {
            'dropdown': dropdown,
        },

        methods: {
          methodToRunOnSelect(payload) {
            this.object = payload;
          }
        },
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
  margin: 0rem !important;
  padding-bottom: 2%;
}
h4{
  margin-top: 0 !important;
}
.movie-year {
  font-size: 2rem;
  display: inline-block;
  position: relative;
  top: -4px;
}

.image img{
width: 100%;
padding-right: 10% !important;
}
</style>