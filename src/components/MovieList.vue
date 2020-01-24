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
    <div class="container">
      <div class="movies">
      <div class="movie" v-for="(movie, id) in movies" :key="id">
          <div class="row">
            <div class="movie-info red darken-4">
              <div class="movie-poster">
               <img class="responive-img col s12 m6" :src="movie.image" alt="Movie poster" />
               </div>
            <div class="col s12 m6"> 
            <div class="movie-title">
              <span>{{movie.title}}</span>
            </div>
            </div>
            <div class="col s12 m6">
            <div class="movie-genre">
              <span>{{movie.genre.join(', ')}} | {{movie.length}} minutes</span>
              </div>
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
    <div class="hide-on-small-only red">
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

<style scoped>
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
  border-radius: 20px !important;
}
.movie-buttons button {
  border-radius: 10px;
  margin: 1rem;
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
}*{
  box-sizing: border-box;
}
.movie .card {
  border-radius: 20px !important;
}
.movies{
  border-radius: 20px;
  margin-bottom: 2%;
}
.card-stacked{
  display: inline-block;
}
.movie-buttons button {
  border-radius: 10px;
  margin: 1rem;
}
img {
  width: 150px !important;
  position: relative;
  bottom: -15px;
  border-radius: 20px;
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