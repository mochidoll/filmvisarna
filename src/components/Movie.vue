<template>
  <div class="container">
    <div class="trailer-container"></div>

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
        :options="dates"
        class="options"
        :selected="chosenDate"
        v-on:updateOption="updateChosenDate"
        :placeholder="'Select an Date'"
      ></dropdown>

      <div v-for="time in times" :key="time.id">
        <div class="col timeButton btn red darken-2">{{time.screeningTime.time}}</div>
        <div class="col">{{time.screeningTime.auditorium}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dropdown from "vue-dropdowns";

export default {
  data() {
    return {
      chosenDate: {
        name: "Choose Date"
      },
      chosenTime: {
        name: "Choose Time"
      }
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
    screeningMovie() {
      let screenings = [];
      this.$store.state.screenings.forEach(screening => {
        if (this.movie.id === screening.movieId) {
          this.$store.state.auditoriums.forEach(item => {
            if (screening.auditoriumId === item.id) {
              screenings.push({
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
                time: 
                  screening.startTime
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
      return screenings;
    },
    dates() {
      let datesSorted = [];
      let dateObject = [];
      this.screeningMovie.forEach(screening =>
        datesSorted.push(screening.date.name)
      );
      datesSorted = [...new Set(datesSorted)];
      datesSorted.sort().forEach(date => dateObject.push({ name: date }));
      return dateObject;
    },
    times() {
      let timeSorted = [];
      this.screeningMovie.forEach(screening => {
        if (screening.date.name == this.chosenDate.name) {
          timeSorted.push({
            screeningTime: {
              time: screening.time,
              auditorium: screening.auditorium
            }
          });
        }
      });
      timeSorted.sort((a, b) =>
        a.time > b.time ? 1 : b.time > a.time ? -1 : 0
      );
      return timeSorted;
    }
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
.dropdown-menu {
  height: 200px !important;
  overflow: auto !important;
}
/* .timeButton {
  margin-top: 1.5rem;
  margin-right: 1rem;
} */
</style>