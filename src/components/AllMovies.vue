<template>
  <div id="transparent" class="add-margin row valign-wrapper">
    <div class="hide-on-small-only">
      <div
        class="add-margin-movie card-container col s6 m6 l3"
        v-for="(movie, id) in movies"
        :key="id"
      >
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" :src="movie.image" />
          </div>
          <div id="transparentImage" class="white-text card-reveal">
            <span class="card-title">
              {{movie.title}}
              <i class="material-icons right">close</i>
            </span>
            <p>{{movie.shortDescription}}</p>
            <a
              class="btn waves-effect waves-light center red darken-4"
              @click="goToMovie(movie)"
            >Mer information</a>
          </div>
        </div>
      </div>
    </div>
    <div class="hide-on-med-and-up">
      <div
        class="add-margin-movie card-container col s6 m6 l3"
        v-for="(movie, id) in movies"
        :key="id"
      >
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img @click="goToMovie(movie)" :src="movie.image" />
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
  data() {
    return {
      show: true
    };
  },

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
#transparentImage {
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
}
.add-margin {
  margin: 1rem !important;
  padding: 0.5rem !important;
}
.add-margin-movie {
  margin: 0rem !important;
  padding: 0rem !important;
}
.row {
  display: inline-block;
}
.card .card-title {
  font-size: 1.2rem !important;
}
.card {
  margin: 0.5rem !important;
  padding: 0rem !important;
}

@media (min-width: 600px) {
  .add-margin {
    margin: 4rem !important;
    padding: 2rem !important;
  }
}
</style>