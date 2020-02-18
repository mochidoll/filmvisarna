<template>
  <div class="movie-list">
    <!-- <div class="date">
      <p>Today's date: ({{ dayToday }}, {{ dateToday }})</p>
    </div>-->
    <h2 class="center">
      <strong>VISAS NU</strong>
    </h2>

    <div class="center">
      <div class="filters">
        <div class>
          <dropdown
            id="dropdowns"
            :options="dates"
            :selected="chosenDate.name"
            v-on:updateOption="updateChosenDate"
            :placeholder="chosenDate.name"
          ></dropdown>
        </div>
        <div class>
          <dropdown
            id="dropdowns"
            :options="genres"
            :selected="chosenGenre.name"
            v-on:updateOption="updateChosenGenre"
            :placeholder="chosenGenre.name"
          ></dropdown>
        </div>
      </div>
    </div>

    <div class="movie" v-for="movie in filteredMovies" :key="movie.id">
      <!-- medium & small view -->
      <div class="row mediumrow valign-wrapper hide-on-large-only">
        <div class="col s3 container" @click="goToMovie(movie)">
          <img class="col s12 responsive-img" :src="movie.image" />
        </div>
        <div class="movieCard col s9">
          <h6 class="flow-text movie-title">
            <strong>{{ movie.title }}</strong>
          </h6>
          <p class="movie-genre">{{movie.genre.join(", ")}} | {{ movie.length }} min</p>
          <p
            class="movie-description hide-on-small-only hide-on-large-only"
          >{{ movie.shortDescription }}</p>
          <!-- <p class="movie-description hide-on-med-and-down">{{ movie.description }}</p> -->

          <div v-for="screen in screeningMovies" :key="screen.id">
            <div class="timeButton col" v-if="screen.movieId == movie">
              <div
                class="btn-small black"
                v-if="screen.date.name === chosenDate.name"
                @click="bookMovie(screen.screeningId)"
              >
                <strong>{{screen.time}}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- large view -->
      <div class="row valign-wrapper hide-on-med-and-down">
        <div class="valign-wrapper col s11 offset-s1">
          <div class="col s3 container" @click="goToMovie(movie)">
            <img class="col s12 responsive-img movie-image" :src="movie.image" />
          </div>
          <div class="movieCard2 col s9">
            <h6 class="flow-text movie-title">
              <strong>{{ movie.title }}</strong>
            </h6>
            <p class="movie-genre">{{movie.genre.join(", ")}} | {{ movie.length }} min</p>
            <p
              class="movie-description hide-on-small-only hide-on-large-only"
            >{{ movie.shortDescription }}</p>
            <p class="movie-description hide-on-med-and-down">{{ movie.shortDescription }}</p>

            <div v-for="screen in screeningMovies" :key="screen.id">
              <div class="timeButton col" v-if="screen.movieId == movie">
                <div
                  class="btn-small"
                  v-if="screen.date.name === chosenDate.name"
                  @click="bookMovie(screen.screeningId)"
                >
                  <strong>{{screen.time}}</strong>
                </div>
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
import "moment/locale/sv"; // without this line it didn't work
moment.locale("sv");
import dropdown from "vue-dropdowns";
import { filterItemFromList, includeItemsFromList } from "./utils/logicUtils";

export default {
  data() {
    return {
      selectedDate: "",
      movieTime: "",
      chosenDate: {
        name: "Sortera på datum"
      },
      chosenGenre: {
        name: "Alla genres"
      }
    };
  },
  components: {
    dropdown: dropdown
  },
  computed: {
    dayToday() {
      return moment().format("dddd");
    },
    dateToday() {
      return moment().format("ll");
    },
    movies() {
      return this.$store.state.movies;
    },
    genres() {
      let genres = [];
      let genresName = [];
      // Add genres from each movie to the genres array
      for (let movie of this.movies) {
        genres = [...genres, ...movie.genre];
      }
      // Remove duplicates from genres array
      genres = [...new Set(genres)];
      // Sort alphanumeric
      genres.sort().forEach(genre => genresName.push({ name: genre }));
      genresName.unshift({ name: "Alla genres" });
      return genresName;
    },
    filteredMovies() {
      // filter movies where the movieID is
      // in the filtered array of movieIDs
      return includeItemsFromList(this.movies, this.filteredScreens);
    },
    filteredScreens() {
      let date = new Date(this.chosenDate.name);
      let year = date.getFullYear();
      let month = date.getMonth(); //starts on 0 to 11
      let day = date.getDate();
      let screens = this.$store.state.screenings;

      // add the movie to each screening
      // if we have movies in array called movies we could
      // do it like this
      screens.forEach(screening => {
        screening.movie = filterItemFromList(this.movies, screening.movieId);
      });

      // filters array on date
      let filteredArray = screens.filter(screen => {
        let sDate = new Date(screen.startTime.toDate());
        if (
          ((sDate.getFullYear() === year &&
            sDate.getMonth() === month &&
            sDate.getDate() === day) ||
            !year) &&
          (this.chosenGenre.name === "Alla genres" ||
            screen.movie.genre.includes(this.chosenGenre.name))
        ) {
          return screen;
        }
      });
      // convert array of screens to an array of string containing movieIds
      return filteredArray.map(screen => screen.movieId);
    },
    screeningMovies() {
      let screenings = [];
      this.movies.forEach(movie => {
        this.$store.state.screenings.forEach(screening => {
          if (movie.id == screening.movieId) {
            this.$store.state.auditoriums.forEach(item => {
              if (screening.auditoriumId == item.id) {
                screenings.push({
                  movieId: movie,
                  name: movie.title,
                  screeningId: screening.id,
                  date: {
                    name: screening.startTime
                      .toDate()
                      .toLocaleDateString("sv-SV", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric"
                      })
                  },
                  time: screening.startTime
                    .toDate()
                    .toLocaleTimeString("sv-SV", {
                      hour: "numeric",
                      minute: "numeric"
                    })
                });
              }
            });
          }
        });
      });
      return screenings;
    },
    dates() {
      let datesSorted = [];
      let dateObject = [];
      this.$store.state.screenings.forEach(screening =>
        datesSorted.push(
          screening.startTime.toDate().toLocaleDateString("sv-SV", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
            // weekday: "long"
          })
        )
      );
      datesSorted = [...new Set(datesSorted)];
      datesSorted.sort().forEach(date => dateObject.push({ name: date }));
      return dateObject;
    }
  },
  methods: {
    updateChosenDate(date) {
      this.chosenDate.name = date.name;
    },
    updateChosenGenre(genre) {
      this.chosenGenre.name = genre.name;
    },
    goToMovie(movie) {
      this.$router.push({
        name: "movie",
        params: {
          movieTitle: movie.title,
          filteredChosenDate: this.chosenDate.name
        }
      });
      // this.$router.push({ params: {filteredChosenDate: this.chosenDate.name}, name: 'movie' });
      // this.$router.push({ params: {filteredChosenDate: this.chosenDate.name}, name: 'movie' });
    },
    bookMovie(screenId) {
      this.$store.state.bookingObject.screeningId = screenId;
      this.$router.push("/booking/selectTickets/" + screenId);
    }
  },
  mounted() {
    //checks for the startpage to start filtering movies with today's date.
    this.initDate = setInterval(() => {
      let todaysDate = new Date().toLocaleDateString("sv-SV", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      });
      if (this.dates.length) {
        for (let date of this.dates) {
          if (date.name === todaysDate) {
            this.chosenDate.name = todaysDate;
            clearInterval(this.initDate);
          }
        }
      }
    }, 50);
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.movie .card-image img {
  width: 100%;
  min-height: 185px !important;
}
.movie .movie-title {
  font-size: 2rem;
  font-weight: bold;
}
.movie .movie-title {
  font-weight: bold;
}
.filters {
  align-self: center;
}
h2 {
  margin: 0.6rem;
  color: white;
}
.row .col {
  padding: 0px !important;
}
.col {
  margin: 0px !important;
}
.row {
  margin: 0.8rem;
  border-radius: 15px;
  background-color: #e7c3a6;
}
.movieCard {
  width: 100%;
  padding-left: 5% !important;
}
.movie-description {
  margin: 2%;
}
.movie-title {
  margin: 2%;
}
.movie-genre {
  margin: 2%;
}
.btn-small {
  margin-left: 1rem !important;
  border-radius: 12px;
  background-color: black;
}
.movie-image {
  cursor: pointer;
}
.card2 {
  width: 55vw;
}
#dropdowns {
  min-width: 120px !important;
  margin: 4px !important;
  background-color: black;
  border-radius: 15px;
  background-image: none !important;
  padding: 0px;
}

li .dropdown-toggle {
  background-image: none !important;
  background-image: none !important;
}

@media only screen and (min-width: 893px) {
  .movie-image {
    cursor: pointer;
    max-height: 19rem;
    max-width: 13rem;
  }
  .movieCard {
    margin: 3rem;
  }
  .movie-description {
    margin-right: 1rem;
    line-height: 1.4rem;
  }
  .movie-genre {
    font-size: 0.8rem;
  }
  .btn-small {
    width: 8rem;

  }
  .btn-small:hover {
  background-color: red !important;
}
}

@media (max-width: 1100px) {
  .movie-title {
    font-size: 1.6rem !important;
  }
  .movie-description {
    font-size: 1rem;
    margin-right: 1rem;
    line-height: 1.1rem;
  }
}

@media (max-width: 670px) {
  .movie-title {
    font-size: 1.2rem !important;
  }
  .movie-genre {
    font-size: 0.8rem;
    line-height: 1rem;
    margin: 3%;
  }
  .movie-description {
    font-size: 0.9rem !important;
    line-height: 1.1rem !important;
  }
}
</style>