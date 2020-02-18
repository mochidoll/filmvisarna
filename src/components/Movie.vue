<template>
  <div class="container" v-if="movie">
    <youtube class="trailer-container" :video-id="movie.videoId"></youtube>

    <div id="transparent" class="movie-info-container row">
      <div class="left col s12 center">
        <h3 class="center">
          {{movie.title}}
          <span class="movie-year">({{movie.productionYear}})</span>
        </h3>
      </div>

      <div class="col s12 m6 center image">
        <img :src="movie.image" alt="Movie poster" />
      </div>
      <div class="left col s12 m6 right">
        <h4>Sammanfattning</h4>
        <p class="grey-text">{{movie.length}} minuter</p>
        <p>{{movie.description}}</p>
      </div>
      <div class="col s12 m6 right">
        <span>Skådespelare: {{movie.actors.join(", ")}}</span>
      </div>
      <div class="col s12 m6 right">
        <span>Regissörer: {{movie.directors.join(", ")}}</span>
      </div>
      <div class="col s12 m6 right">
        <span>Genre: {{movie.genre.join(", ")}}</span>
      </div>
    </div>

    <div class="row time-choices large hide-on-small-only">
      <dropdown
        :options="dates"
        class="options col s4 push-s1"
        :selected="chosenDate"
        v-on:updateOption="updateChosenDate"
        :placeholder="'Select a Date'"
      ></dropdown>

      <div v-for="time in times" :key="time.id">
        <div class="booking-choice col s10 push-s1 red darken-4 white-text valign-wrapper">
          <div class="booking-info col s9 white-text">
            <p class="">
              <span class="span-time-large">{{time.time}} | </span>
              <span class="span-audi-large">{{ time.auditorium }}</span> -
              <span class="span-seats-large">{{ emptyAvailableSeats(time.screening) }} platser kvar</span>
            </p>
          </div>

          <div
            class="col s3 time-button btn black right"
            :class="{disabled: emptyAvailableSeats(time.screening) === 0}"
            @click="bookMovie(time.screening)"
          >Boka</div>
        </div>
      </div>
    </div>
<!-- -------------------------------------------------------------------------- -->

      <div class="row time-choices small hide-on-med-and-up">

        <div class="col s12 dropdown-wrapper">
          <dropdown
            :options="dates"
            class="options col s4"
            :selected="chosenDate"
            v-on:updateOption="updateChosenDate"
            :placeholder="'Select a Date'"
          ></dropdown>
        </div>

        <div v-for="time in times" :key="time.id">
          <div 
            class="booking-choice col s12 red darken-4 white-text valign-wrapper"
            @click="bookMovie(time.screening)"
          >
            <div class=" col s2 booking-info-time-small">
              <p>
                <span class="span-time-small">{{time.time}}</span>
              </p>
            </div>

            <div class="booking-info-audi-seat-small col s7 white-text center">
                <div>
                  <span class="span-audi-small">{{ time.auditorium }}</span>
                </div>
                <div>
                  <span class="span-seats-small">{{ emptyAvailableSeats(time.screening) }} platser kvar</span>
                </div>
            </div>

            <div
              class="col s3 time-button btn black right"
              :class="{disabled: emptyAvailableSeats(time.screening) === 0}"
            >Boka
            </div>

          </div>
        </div>

      </div>

  </div>
  <div class="valign-wrapper" id="loadingmovie" v-else>
    <div class="preloader-wrapper active big">
        <div class="spinner-layer spinner-red-only center">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import dropdown from "vue-dropdowns";
import Vue from "vue";
import VueYouTubeEmbed from "vue-youtube-embed";
Vue.use(VueYouTubeEmbed);
import {
  returnSumOfEmptySeats,
  filterItemFromList
} from "./utils/logicUtils.js";

export default {
  props: ["movieTitle", "filteredChosenDate"],
  data() {
    return {
      chosenTime: {
        name: "Välj Tid"
      },
      dataChosenDate: ""
    };
  },
  components: {
    dropdown: dropdown
  },

  methods: {
    updateChosenDate(date) {
      this.chosenDate = date;
    },
    updateChosenTime(time) {
      this.chosenTime = time;
    },
    bookMovie(screenId) {
      this.$store.state.bookingObject.screeningId = screenId;
      this.$router.push("/booking/selectTickets/" + screenId);
    },
    emptyAvailableSeats(screening) {
      let bookedSeats = filterItemFromList(
        this.$store.state.screenings,
        screening
      ).bookedSeats;
      return returnSumOfEmptySeats(bookedSeats);
    }
  },
  computed: {
    movie() {
      let movies = this.movies;
      for (let movie of movies) {
        if (movie.title == this.movieTitle) return movie;
      }
      return null;
    },
    movies() {
      return this.$store.state.movies;
    },
    screeningMovies() {
      let screenings = [];
      this.$store.state.screenings.forEach(screening => {
        if (this.movie.id === screening.movieId) {
          this.$store.state.auditoriums.forEach(item => {
            if (screening.auditoriumId === item.id) {
              screenings.push({
                name: this.movie.title,
                image: this.movie.image,
                auditorium: item.name,
                screening: screening.id,
                date: {
                  name: screening.startTime
                    .toDate()
                    .toLocaleDateString("sv-SV", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric"
                    })
                },
                time: screening.startTime.toDate().toLocaleTimeString("sv-SV", {
                  hour: "numeric",
                  minute: "numeric"
                })
              });
            }
          });
        }
      });
      return screenings;
    },
    dates() {
      let datesSorted = [];
      let dateObject = [];
      this.screeningMovies.forEach(screening =>
        datesSorted.push(screening.date.name)
      );
      datesSorted = [...new Set(datesSorted)];
      datesSorted.sort().forEach(date => dateObject.push({ name: date }));
      return dateObject;
    },
    times() {
      let timeSorted = [];
      this.screeningMovies.forEach(screeningMovie => {
        if (screeningMovie.date.name == this.chosenDate.name) {
          timeSorted.push(screeningMovie);
        }
      });
      timeSorted.sort((a, b) =>
        a.time > b.time ? 1 : b.time > a.time ? -1 : 0
      );
      return timeSorted;
    },
    chosenDate: {
      get() {
        if (this.dataChosenDate) {
          return { name: this.dataChosenDate };
        } else {
          return { name: "Välj Datum" };
        }
      },
      set(newVal) {
        this.dataChosenDate = newVal.name;
      }
    }
  },
  created() {
    this.dataChosenDate = this.filteredChosenDate;
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
.time-choices {
  display: block;
  margin-top: 0 !important;
}
.booking-choice {
  border-radius: 10px;
  line-height: 1;
  margin: 0.5rem 0 !important;
  padding: 0.5rem !important;
}
.booking-choice .time-button {
  border-radius: 10px;
  margin: 0;
  padding: 0 !important;
}
.span-seats-small, .span-seats-large{
 color: lightgray;
}
.large .dropdown-toggle, .small .dropdown-toggle {
  background-color: black !important;
} 

.large .booking-choice p{
  margin: 0.5rem 0!important;
}
.span-time-large{
  font-size: 1.4rem;
}
.span-audi-large{
  font-size: 1.2rem;
}
.span-seats-large{
  font-size: 0.8rem;
}

.small .booking-choice{
  cursor: pointer;
}
.span-seats-small{
  font-size: 0.8rem;
}
.span-audi-small{
  font-size: 1.2rem;
}
.booking-info-time-small{
  font-size: 1.6rem;
  margin: 0 !important;
  padding: 0 !important;
}
.booking-info-time-small p{
  margin: 0;
}
.booking-info-audi-seat-small{
  margin: 0 !important;
  padding: 0 !important;
}

#transparent {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
}
.dropdown-toggle {
  color: white !important;
}
.dropdown-toggle:hover {
  background-color: rgb(51, 50, 50) !important;
}
.trailer-container {
  display: block;
  margin: 2rem 0 1rem;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
  position: relative;
}
.trailer-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.movie-info-container {
  margin-top: 0 !important;
}
#loadingmovie {
  height: 60vh;
  justify-content: center;
}

h3 {
  margin: 0rem !important;
  padding-bottom: 2%;
}
h4 {
  margin-top: 0 !important;
}
.movie-year {
  font-size: 2rem;
  display: inline-block;
  position: relative;
  top: -4px;
}

.image img {
  width: 100%;
}
.dropdown-menu {
  height: 200px !important;
  overflow: auto !important;
}
</style>