<template>
  <div class="container">
    <div class="row">
      <h3 class="center white-text">Skapa visning</h3>

      <div class="selector-container col s12 row">
        <select class="col s12 m5 l5 selector" name="chooseMovie" v-model="movieId">
          <option value selected disabled hidden>Movie</option>
          <option v-for="movie in movies" :key="movie.id" :value="movie.id">{{ movie.title }}</option>
        </select>

        <select class="col s12 m5 l5 selector right" name="chooseAuditorium" v-model="auditoriumId">
          <option value selected disabled hidden>Auditorium</option>
          <option
            v-for="auditorium in auditoriums"
            :key="auditorium.id"
            :value="auditorium.id"
          >{{ auditorium.name }}</option>
        </select>
      </div>

      <div class="container row center">
        <input
          type="date"
          id="start"
          name="trip-start"
          value="2020-02-01"
          min="2020-01-01"
          v-model="date"
        />
        <input type="time" id="appt" name="appt" min="09:00" max="18:00" v-model="time" />

        <button
          class="btn"
          @click="addScreening"
          :class="{disabled: this.movieId=='' || this.auditoriumId =='' || this.date=='' || this.time==''}"
        >Lägg till visning</button>

        <p class="red-text" v-if="screeningAdded">Visningen är tillagd.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
import { filterItemFromList } from "./utils/logicUtils.js";

export default {
  data() {
    return {
      movieId: "",
      auditoriumId: "",
      date: "",
      time: "",
      bookedSeats: null,
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
    }
  },

  methods: {
    addScreening() {
      this.screeningAdded = true;
      this.bookedSeats = this.setBookedSeats(this.auditoriumId);
      let newStartTime = new Date(this.date + " " + this.time);
      db.collection("screenings").add({
        auditoriumId: this.auditoriumId,
        bookedSeats: this.bookedSeats,
        movieId: this.movieId,
        startTime: newStartTime
      });

      this.movieId = "";
      this.auditoriumId = "";
      this.date = "";
      this.time = "";
      this.bookedSeats = null;

      setTimeout(() => {
        this.screeningAdded = false;
      }, 2000);
    },
    setBookedSeats(id) {
      let seatsPerRow = filterItemFromList(this.auditoriums, id)["seatsPerRow"];
      let bookedSeats = [];
      for (let row in seatsPerRow) {
        bookedSeats[row] = [];
        for (let i = 0; i < seatsPerRow[row]; i++) {
          bookedSeats[row].push(false);
        }
      }
      for (let i = 0; i < bookedSeats.length; i++) {
        bookedSeats[i] = Object.assign({}, [...bookedSeats[i]]);
      }
      //How it works: Makes a 2d array based on how many rows and seats there are in a row. Then converts the
      //2d-array into an object filled with arrays. Each seatRow has boolean (false), repesenting if a seat is
      //booked or not.
      return bookedSeats;
    }
  },

  created() {
    this.$store.dispatch("getMovies");
    this.$store.dispatch("getScreenings");
    this.$store.dispatch("getAuditoriums");
  },

  mounted() {}
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

input {
  color: white;
}
</style>