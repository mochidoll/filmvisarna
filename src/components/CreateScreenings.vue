<template>
  <div class="container">
    <div class="row">
      <h3 class="center">Create a screening</h3>

      <div class="selector-container col s12 row">
        <select class="col s12 m5 l5 selector" name="chooseMovie" v-model="movieId">
          <option value selected disabled hidden>Movie</option>
          <option v-for="movie in movies" :key="movie.id" :value="movie.id">{{ movie.title }}</option>
        </select>

        <select class="col s12 m5 l5 selector right" name="chooseAuditorium" v-model="auditoriumId">
          <option value selected disabled hidden>Auditorium</option>
          <option v-for="auditorium in auditoriums" :key="auditorium.id" :value="auditorium.id">{{ auditorium.name }}</option>
        </select>
      </div>

      <div class="container row center">
        <input type="date" id="start" name="trip-start" value="2020-02-01" min="2020-01-01" v-model="date"/>
        <input type="time" id="appt" name="appt" min="09:00" max="18:00" v-model="time" />
        
        <button @click="addScreening">Lägg till visning</button>

        <p class ="red-text" v-if="screeningAdded">The screening has been added.</p>
      </div>

      
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";

export default {
  data() {
    return {
      movieId: '',
      auditoriumId: '',
      date: '',
      time: '',
      screeningAdded: false
    };
  },

  computed: {
    movies() {
      return this.$store.state.movies;
    },

    auditoriums() {
      return this.$store.state.auditoriums;
    },
    
    screenings() {
    return this.$store.state.screenings;
  },
  },

  methods: {
    addScreening() {
      this.screeningAdded = true
      let newStartTime = new Date(this.date + ' ' + this.time)
      db.collection("screenings").add({
        auditoriumId: this.auditoriumId,
        movieId: this.movieId,
        startTime: newStartTime
      })
      
      this.movieId = ''
      this.auditoriumId = ''
      this.date = ''
      this.time = ''

      setTimeout( () => {
        this.screeningAdded = false
      }, 2000)
    },
  },

  created() {
    this.$store.dispatch("getMovies");
    this.$store.dispatch("getScreenings");
    this.$store.dispatch("getAuditoriums");
  },

  mounted() {

  }
};
</script>

<style scooped>
.selector {
  display: block !important;
  margin-right: 1rem;
}
.selector-container {
  padding: 0 !important;
}
h3 {
  margin-top: 1rem !important;
}
</style>