<template>
  <div class>
    <div class="row">
      <div class="card-container col s12 m4 l3" v-for="(movie, id) in movies" :key="id">
        <div class="card hoverable">
          <div class="card-image waves-effect waves-block waves-light">
            <div v-if="movie.title == 'Dolittle'">
              <img class="activator" :src="movie.image" />
            </div>

            <div v-else><img class="activator add-margin" :style="{marginBottom:30+'px'}" :src="movie.image" />
            
            </div>
            
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{movie.title}}</span>
            <!-- <a class="btn waves-effect waves-light center red darken-4" @click="goToBooking(movie)">08:00</a>
            <a class="btn waves-effect waves-light center red darken-4" @click="goToBooking(movie)">15:00</a>
            <a class="btn waves-effect waves-light center red darken-4" @click="goToBooking(movie)">20:00</a>-->
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              {{movie.title}}
              <i class="material-icons right">close</i>
            </span>
            <p>{{movie.description}}</p>
            <a
              class="btn waves-effect waves-light center red darken-4"
              @click="goToMovie(movie)"
            >More information</a>
          </div>
        </div>
      </div>
    </div>

    <!-- <i class="material-icons right">more_vert</i> -->
  </div>
</template>

<script>
export default {
  name: "AllMovies",

  computed: {
    movies() {
      return this.$store.state.movies;
    }
  },

  methods: {
    goToBooking() {
      alert("Go To Booking site");
    },
    goToMovie(movie) {
      this.$router.push("/allMovies/" + movie.title);
    }
  }
};
</script>

<style>

.movie .card-image img {
  width: 100%;
}

.row {
  display: inline-block;
}
.card .card-title {
  font-size: 1.2rem !important;
}
</style>