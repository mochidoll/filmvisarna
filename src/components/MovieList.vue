<template>
  <div class="movie-list">
    <!-- <div class="date">
      <p>Today's date: ({{ dayToday }}, {{ dateToday }})</p>
    </div> -->
    <h2 class="center"><strong>VISAS NU</strong></h2>

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
        <div class="col">
          <dropdown
            :options="genres"
            :selected="chosenGenre.name"
            v-on:updateOption="updateChosenGenre"
            :placeholder="chosenGenre.name"
          ></dropdown>
        </div>
        
      </div>
    </div>

<!--     <div class="hide-on-med-and-up">
      <div class="movie" v-for="movie in filteredMovies" :key="movie.id">
        <div class="row center">
          <div class="card white small-movie-margin">
            <div class="col s12">
              <div class="card-img">
                <img @click="goToMovie(movie)" class="responive-img mobile-img" :src="movie.image" />
              </div>
            </div>
            <div class="card-stacked">
              <div class="card-contact">
                <div class="col s12">
                  <span class="movie-title center">{{ movie.title }}</span>
                </div>
                <div class="col s12">
                  <div>
                    <span>{{movie.genre.join(", ")}} | {{ movie.length }} min</span>
                  </div>
                </div>
                <div class="col s12">
                  <p>{{ movie.description }}</p>
                </div>
                <div class="col s12"></div>
                <div class="col s6 offset-s3">
                  <div v-for="screen in screeningMovies" :key="screen.id">
                    <div v-if="screen.movieId == movie">
                      <div
                        class="btn col red darken-4 s12 z-depth-0.5"
                        @click="bookMovie(screen.screeningId)"
                        v-if="screen.date.name === chosenDate.name"
                      >Boka Tid - {{screen.time}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="">
      <div class="movie" v-for="movie in filteredMovies" :key="movie.id">
        <div class="row white">
          <div class="col s3" @click="goToMovie(movie)">
            <img class="col s12 responsive-img movie-image" :src="movie.image" />
          </div>

          <div class="movieCard col s9 white">
            <h6 class="flow-text movie-title">
              <strong>{{ movie.title }}</strong>
            </h6>
            <p class="movie-genre">{{movie.genre.join(", ")}} | {{ movie.length }} min</p>
            <p class="movie-description hide-on-small-only hide-on-large-only">{{ movie.shortDescription }}</p>
            <p class="movie-description hide-on-med-and-down">{{ movie.shortDescription }}</p>

            <div v-for="screen in screeningMovies" :key="screen.id">
              <div class="timeButton col" v-if="screen.movieId == movie">
                <div
                  class="btn-small red darken-4"
                  v-if="screen.date.name === chosenDate.name"
                >{{screen.time}}</div>
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
import 'moment/locale/sv'  // without this line it didn't work
moment.locale('sv')
import dropdown from "vue-dropdowns";

export default {
  data() {
    return {
      selectedDate: "",
      movieTime: "",
      chosenDate: {
        name: "Sortera på datum"
      },
      chosenGenre:{
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
      genres.sort().forEach(genre => genresName.push({name:genre}))
      // window.console.log(genresName)
      genresName.unshift({name:"Alla genres"});
      return genresName;
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
      let date = new Date(this.chosenDate.name);
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
      this.$router.push("/allMovies/" + movie.title);
    },
    bookMovie(screenId){
      this.$store.state.bookingObject.screeningId = screenId
      this.$router.push({path: '/booking/selectTickets'})
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
}
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
.movie .card-image img {
  width: 100%;
  min-height: 185px !important;
}
.card-stacked {
  display: inline-block;
}
.movie .movie-title {
  font-size: 2rem;
  font-weight: bold;
}
.movie .card-content {
  margin-left: 2%;
  width: 100%;
}
.movie .card-image {
  max-width: 10rem !important;
}
.movie-buttons button {
  border-radius: 10px;
  margin: 0.5rem;
}
.movie .movie-container {
  align-items: center;
}
.movie .movie-title {
  font-weight: bold;
}
.movie {
  cursor: pointer;
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
.btn {
  padding-right: 5%;
}
.row .col {
  padding: 0px !important;
}
.row {
  width: 100%;
}
.movieCard {
  width: 100%;
  padding-left: 5% !important;
}
.movie-description{
  margin: 2%;
}
.movie-title{
  margin: 2%;
}
.movie-genre{
  margin:2%;
}
.btn-small{
  margin-left: 0.5rem !important;
}

@media only screen and (min-width: 893px) {
  .white-bg {
    background-color: white;
  }
}

@media only screen and (min-width: 540px) {

}

@media only screen and (max-width: 540px) {
  .movie-title {
    font-size: 1.5rem !important;
  }
  .movie-genre{
    font-size: 1rem;
    line-height: 1.1rem;
    margin: 3%;
  }
}

</style>