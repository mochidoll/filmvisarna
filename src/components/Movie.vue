<template>
  <div class="container">
    <div class="trailer-container">
      <h4 class="grey-text center">Insert trailer here later</h4>
    </div>

    <div class="row">
      <div class="left col s12 center flex">
        <h3 class="left">
          {{movie.title}}
          <span class="movie-year">({{movie.productionYear}})</span>
        </h3>
      </div>

      <div class="col s12 m6 center image">
        <img :src="movie.image" alt="Movie poster" />
      </div>
      <div class="left col s12 m6 right">
        <h4>Summary</h4>
        <p class="grey-text">{{movie.length}} minutes</p>
        <p>{{movie.description}}</p>
      </div>
      <div class="col s12 m6 right">
        <span>Actors: {{movie.actors.join(", ")}}</span>
      </div>
      <div class="col s12 m6 right">
        <span>Directors: {{movie.directors.join(", ")}}</span>
      </div>
      <div class="col s12 m6 right">
        <span>Genre: {{movie.genre.join(", ")}}</span>
      </div>

      <dropdown
        :options="viewingDates"
        class="options"
        :selected="chosenDate"
        v-on:updateOption="updateChosenDate"
        :placeholder="'Select an Item'"
      ></dropdown>
    </div>
  </div>
</template>

<script>
import dropdown from "vue-dropdowns";

export default {
  data() {
    return {
      viewingDates: [
        { name: "23-09-2010"},
      ],
      
      chosenDate: {
        name: "Choose Date"
      }
    };
  },
  components: {
    dropdown: dropdown
  },

  methods: {
    updateChosenDate(date) {
      this.chosenDate = date;
    }
  },
  computed: {
    movie() {
      let movies = this.movies;
      for (let movie of movies) {
        if (movie.title == this.$route.params.movie) return movie;
      }
      return null;
    },
    movies() {
      return this.$store.state.movies;
    },
    dates() {
      let screenings = this.viewingDates;
      for (let screening of this.$store.state.screenings) {
        screenings.push({name:
          screening.startTime.toDate().toLocaleDateString("sv-SV", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
            // weekday: "long"
          })}
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

<style>
* {
  box-sizing: border-box;
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
  padding-right: 10% !important;
}
.options {
  color: blue;
}
</style>