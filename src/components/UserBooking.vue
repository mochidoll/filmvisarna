<template>
  <div class="container confirm-booking center">
    <div class="row inner-container">
      <h5 class="center col s12">Bokningsnummer: {{ bookingObject.id.slice(-6) }}</h5>

      <div class="col l6 m6 s12 image-container">
        <img :src="movie.image" alt class="responsive-img" />
      </div>

      <div class="left-align text-container col l6 m6 s12 center">
        <p>Titel: {{ movie.title }}</p>
        <p>Längd: {{ movie.length }} min</p>
        <p>Datum: {{ screening.startTime.toDate().toLocaleDateString() }}</p>
        <p>Tid: {{ screening.startTime.toDate().getHours() }}:00</p>
        <p>Salong: {{ auditorium.name }}</p>
        <p v-if="bookingObject.adultTickets">Vuxenbiljetter: {{ bookingObject.adultTickets}}</p>
        <p v-if="bookingObject.childTickets">Barnbiljetter: {{ bookingObject.childTickets }}</p>
        <p v-if="bookingObject.seniorTickets">Pensionärsbiljetter: {{bookingObject.seniorTickets }}</p>
        <p
          v-for="(seat, id) in bookingObject.seats"
          :key="id"
        >Parkett: rad {{ seat.y + 1 }}, plats {{ seat.x}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bookingObject: {
      type: Object,
      required: true
    }
  },

  computed: {
    screening() {
      return this.$store.state.screenings.filter(filterScreening => {
        if (filterScreening.id === this.bookingObject.screeningId) {
          return filterScreening;
        }
      })[0];
    },
    movie() {
      return this.$store.state.movies.filter(filterMovie => {
        if (filterMovie.id === this.screening.movieId) {
          return filterMovie;
        }
      })[0];
    },
    auditorium() {
      return this.$store.state.auditoriums.filter(filterAuditorium => {
        if (filterAuditorium.id === this.screening.auditoriumId) {
          return filterAuditorium;
        }
      })[0];
    }
  },

  created() {}
};
</script>