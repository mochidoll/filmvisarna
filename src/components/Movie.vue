<template>
  <div class="container">
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

      <div class="row">
        <dropdown
          :options="dates"
          class="options col s4"
          :selected="chosenDate"
          v-on:updateOption="updateChosenDate"
          :placeholder="'Select a Date'"
        ></dropdown>

      <div v-for="time in times" :key="time.id">
        <div
          class="col timeButton btn red darken-2"
          :class="{disabled: emptyAvailableSeats(time.screening) === 0}"
          @click="bookMovie(time.screening)"
        >{{time.time}}</div>
        <div class="col">
          <div>{{time.auditorium}}</div>
          <div
            v-if="emptyAvailableSeats(time.screening) > 0"
            :class="{'red-text': emptyAvailableSeats(time.screening) < 5}"
          >{{emptyAvailableSeats(time.screening)}} platser</div>
          <div v-else class="red-text">
            <b>Fullbokat</b>
          </div>
        </div>
      </div>
    
  </div>
</template>

<script>
import { returnSumOfEmptySeats } from "@/components/utils/logicUtils.js";
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
#transparent {
  background-color: rgba(0,0,0,0.6);
  color: white;
}
.dropdown-toggle{
  color: white !important;
}
.dropdown-toggle:hover{
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