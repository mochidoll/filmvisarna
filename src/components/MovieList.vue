<template>
  <div class="movie-list">
    <div>
      <p>Today's date: ({{ day }}, {{ date }})</p>
    </div>

    <div class="filters">
      <div class="row">
        <div class="col s12 m6">
      <div class="date-selector">
        <select name="date" id="choose-date">
          <option value selected disabled hidden>Date</option>
          <option value v-for="(date, id) in dates" :key="id">{{ date }}</option>
        </select>
      </div>
      </div>
      <div class="col s12 m6">
      <div class="genre-selector">
        <select name="genre" id="choose-genre">
          <option value selected disabled hidden>Genre</option>
          <option value v-for="(genre, id) in genres" :key="id">{{ genre }}</option>
        </select>
      </div>
    </div>
    </div>
    </div>

    <div class="hide-on-med-and-up blue">
    <div class="movie" v-for="(movie, id) in movies" :key="id">
     <div class="row">
      <div class="card red darken-4">
        <div class="col s12 m2">
        <div class="card-image center">
          <img class="responive-img" :src="movie.image" />
        </div>
         </div>
        <div class="card-stacked">
          <div class="card-content ">
            <div class="col m4">
              <span class="movie-title">{{ movie.title }}</span>
              </div>
            <div class="col s12">
              <div>
              <span>{{ movie.genre.toString() }} | {{ movie.length }} min</span>
            </div>
            </div>
            <div class="col s12 m12">
            <div class="movie-buttons">
              <button class="btn black waves-effect waves-light">Time</button>
              <button class="btn black waves-effect waves-light">Time</button>
              <button class="btn black waves-effect waves-light">Time</button>
              </div>
            </div>
            </div>
      </div>
       </div>
    </div>
    </div>
    </div>
  <div class="red">
   <div class="movie col s12 m7" v-for="(movie, id) in movies" :key="id">
      <div class="card horizontal red darken-4">
        <div class="card-image">
          <img class :src="movie.image" />
        </div>
        <div class="card-stacked">
          <div class="card-content valign-wrapper">
            <div>
              <p class="movie-title">{{ movie.title }}</p>
              <p>{{ movie.genre.toString() }} | {{ movie.length }} min</p>
            </div>
            <div class="movie-buttons">
              <button class="btn black waves-effect waves-light">Time</button>
              <button class="btn black waves-effect waves-light">Time</button>
              <button class="btn black waves-effect waves-light">Time</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    day() {
      return moment().format("dddd");
    },
    date() {
      return moment().format("MMM Do YY");
    },
    movies() {
      return this.$store.state.movies;
    },
    genres() {
      let genres = [];
      // Add genres from each movie to the genres array
      for (let movie of this.movies) {
        genres = [...genres, ...movie.genre];
      }
      // Remove duplicates from genres array
      genres = [...new Set(genres)];
      // Sort alphanumeric
      genres.sort();
      return genres;
    },
    dates() {
      let screenings = [];
      for (let screening of this.$store.state.screenings) {
        screenings.push(
          screening.startTime
            .toDate()
            .toLocaleDateString("sv-SV", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              weekday: "long"
            })
        );
      }
      screenings = [...new Set(screenings)];
      screenings.sort();
      return screenings;
    }
  }
};
</script>

<style>
*{
  box-sizing: border-box;
}
.movie .card {
  border-radius: 20px !important;
}

.card-stacked{
  display: inline-block;
}
.movie .card-image img {
  width: 100%;
}
.movie-buttons button {
  border-radius: 10px;
  margin: 1rem;
}
.movie .movie-container {
  
}
.movie .movie-title {
  font-size: 2rem;
  font-weight: bold;
}

.filters select {
  text-align: center;
  display: block !important;
  height: 2rem;
  padding: 0;
}
.filters .date-selector {
  margin-right: 1rem;
}
@media only screen and (min-width: 601px) {

}
</style>