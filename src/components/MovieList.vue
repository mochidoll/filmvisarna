<template>
  <div class="movie-list">
    <div class="date">
      <p>Today's date: ({{ dayToday }}, {{ dateToday }})</p>
    </div>

    <div class="filters">
      <div class="row">
        <div class="col s12 m6">
          <div class="date-selector">
            <select v-model="selectedDate" name="date" id="choose-date">
              <option :value="date" v-for="(date, id) in dates" :key="id">{{ date }}</option>
            </select>
          </div>
        </div>
        <div class="col s12 m6">
          <div class="genre-selector">
            <select name="genre" id="choose-genre" v-model="selectedGenre">
              <option value selected disabled hidden>Genre</option>
              <option v-for="(genre, id) in genres" :key="id">{{ genre }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="hide-on-med-and-up">
      <div class="movie" v-for="movie in filteredMovies" :key="movie.id">
        <div class="row center">
          <div class="card">
            <div class="col s12">
              <div class="card-img">
                <img class="responive-img mobile-img" :src="movie.image" />
              </div>
            </div>
            <div class="card-stacked">
              <div class="card-con">
                <div class="col s12">
                  <span class="movie-title center">{{ movie.title }}</span>
                </div>
                <div class="col s12">
                  <div>
                    <span>{{ movie.genre.toString() }} | {{ movie.length }} min</span>
                  </div>
                </div>
                <div class="col s12">
                  <div class="movie-buttons-mobile">
                    <button class="btn black waves-effect waves-light mobile">{{movie.id}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hide-on-small-only">
      <div class="movie col m7" v-for="movie in filteredMovies" :key="movie.id">
        <div class="card horizontal">
          <div class="card-image">
            <img class="responsive-img" :src="movie.image" />
          </div>
          <div class="card-stacked">
            <div class="card-content valign-wrapper">
              <div>
                <p class="movie-title">{{ movie.title }}</p>
                <p>{{ movie.genre.toString() }} | {{ movie.length }} min</p>
              </div>
              <!-- <div class="movie-buttons" v-on="checkForTime(movie.id)">
                <button class="btn black waves-effect waves-light">{{movieTime}}</button>
              </div>-->
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
  data() {
    return {
      selectedDate: "",
      selectedGenre: "All genres",
      movieTime: ""
    };
  },

  computed: {
    dayToday() {
      return moment().format("dddd");
    },
    dateToday() {
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
      // Add All genres at the top
      genres.unshift("All genres");
      return genres;
    },
    dates() {
      let screenings = [];
      for (let screening of this.$store.state.screenings) {
        screenings.push(
          screening.startTime.toDate().toLocaleDateString("sv-SV", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
            // weekday: "long"
          })
        );
      }
      screenings = [...new Set(screenings)];
      screenings.sort();
      return screenings;
    },
    filteredMovies() {
      // filter movies where the movieID is
      // in the filtered array of movieIDs
      return this.movies.filter(movie => {
        if (this.filteredScreens.includes(movie.id)) {
          return movie;
        }
      });
    },
    filteredScreens() {
      let date = new Date(this.selectedDate);
      //let genre = this.selectedGenre; // ??

      // maybe we do not want a selected date
      // if so set year = 0/false

      let year = date.getFullYear();
      let month = date.getMonth(); //starts on 0 to 11
      let day = date.getDate();

      let screens = this.$store.state.screenings;

      // add the movie to each screening
      // if we have movies in array called movies we could
      // do it like this
      screens.forEach(screening => {
        screening.movie = this.movies.filter(movie => {
          return movie.id === screening.movieId;
        })[0];
      });

      // filters array on date
      let filteredArray = screens.filter(screen => {
        let sDate = new Date(screen.startTime.toDate());
        if (
          (sDate.getFullYear() === year &&
            sDate.getMonth() === month &&
            sDate.getDate() === day) ||
            !year) &&
          (this.selectedGenre === "All genres" ||
            screen.movie.genre.includes(this.selectedGenre))
        ) {
          return screen;
        }
      });
      // convert array of screens to an array of string containing movieIds
      return filteredArray.map(screen => screen.movieId);
    }
  },

  mounted() {
    this.initDate = setInterval(() => {
      //window.console.log(this.dates[0])
      if (this.dates.length) {
        this.selectedDate = this.dates[0];
        clearInterval(this.initDate);
      }
    }, 50);
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.movie .card {
  border-radius: 20px !important;
}

.card-stacked {
  display: inline-block;
}
.movie .card-image img {
  width: 100%;
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
}

.movie .card-content {
  display: flex;
  justify-content: space-between;
}
.movie .card-image {
  max-width: 10rem !important;
}
.movie-buttons button {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 1rem;
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

.mobile {
  margin: 1% !important;
}
.responsive-img {
  border-radius: 20px !important;
}
.mobile-img {
  border-radius: 20px;
  position: relative;
  bottom: -10px;
  width: 75%;
}
</style>