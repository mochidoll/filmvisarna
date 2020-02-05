<template>
  <div class="movie-list">
    <div class="date">
      <p>Today's date: ({{ dayToday }}, {{ dateToday }})</p>
    </div>

    <div class="filters">
      <div class="row">
        <div class="col">
          <dropdown
            :options="dates"
            :selected="chosenDate.name"
            v-on:updateOption="updateChosenDate"
            :placeholder="chosenDate.name"
          ></dropdown>
        </div>
      </div>
    </div>

    <div class="hide-on-med-and-up">
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <div class="row center">
          <div class="card white small-movie-margin">
            <div class="col s12">
              <div class="card-img">
                <img class="responive-img mobile-img" :src="movie.image" />
              </div>
            </div>
            <div class="card-stacked">
              <div class="card-contact">
                <div class="col s12">
                  <span class="movie-title center">{{ movie.title }}</span>
                </div>
                <div class="col s12">
                  <div>
                    <span>{{ movie.genre.toString() }} | {{ movie.length }} min</span>
                  </div>
                </div>
                <div class="col s12">
                  <p>{{ movie.description }}</p>
                </div>
                <div class="col s12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hide-on-small-only">
      <div class="movie col m7" v-for="movie in filteredMovies" :key="movie.id">
        <div class="card horizontal white">
          <div class="card-image">
            <img class="responsive-img" :src="movie.image" />
          </div>
          <div class="card-stacked white">
            <div class="card-content valign-wrapper">
              <div>
                <p class="movie-title">{{ movie.title }}</p>
                <p>{{ movie.genre.toString() }} | {{ movie.length }} min</p>
                <p>{{ movie.description }}</p>
              </div>
            </div>
          </div>

          <div class="col s3">
            <div v-for="screen in screeningMovies" :key="screen.id">
              <div v-if="screen.movieId == movie">
                <div class="btn col red" v-if="screen.date.name === chosenDate.name">{{screen.time}}</div>
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
import dropdown from "vue-dropdowns";

export default {
  data() {
    return {
      selectedDate: "",
      movieTime: "",
      chosenDate: {
        name: "Sort by Day"
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
    /* dates() {
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
    }, */
    filteredMovies() {
      // filter movies where the movieID is
      // in the filtered array of movieIDs
      return this.movies.filter(movie => {
        if (this.filteredScreens.includes(movie.id)) {
          window.console.log(movie);
          return movie;
        }
      });
    },
    filteredScreens() {
      let date = new Date(this.chosenDate.name);
      let year = date.getFullYear();
      let month = date.getMonth(); //starts on 0 to 11
      let day = date.getDate();
      let screens = this.$store.state.screenings;

      // filters array on date
      let filteredArray = screens.filter(screen => {
        let sDate = new Date(screen.startTime.toDate());
        if (
          sDate.getFullYear() == year &&
          sDate.getMonth() == month &&
          sDate.getDate() == day
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
                window.console.log(item.id);
                screenings.push({
                  movieId: movie,
                  name: movie.title,
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
.small-movie-margin {
  padding-top: 45px;
  padding-bottom: 45px;
}
.movie .card {
  border-radius: 5px !important;
}

.card-stacked {
  display: inline-block;
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

.mobile-img {
  position: relative;
  bottom: -10px;
  width: 75%;
  border-radius: 5px;
}
.btn{
  margin-right: 30px;
  margin-top: 15px;
  margin-bottom: 10px;
}
</style>