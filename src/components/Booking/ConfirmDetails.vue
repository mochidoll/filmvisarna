<template>
  <div class="container confirm-booking center">
    <div class="row inner-container">
      <h4 class="center col s12">Kontrollera din bokning..</h4>
      <div class="movie-info col s12 row left center valign-wrapper">
        <div class="col s12 image-container">
          <img :src="bookingObject.movie.image" alt class="responsive-img" />
        </div>
        <div class="left-align text col s12 center">
          <p>Titel: {{ bookingObject.movie.title }}</p>
          <p>Längd: {{ bookingObject.movie.length }} min</p>
          <p>Datum: {{ bookingObject.screening.startTime.toDate().toLocaleDateString() }}</p>
          <p>Tid: {{ bookingObject.screening.startTime.toDate().getHours() }}:00</p>
          <p>Salong: {{ bookingObject.auditorium.name }}</p>
        </div>
      </div>
      <div class="nav-buttons col s12">
      </div>
        <button @click="backToSelectSeats" class="btn red darken-4 col s3 offset-s1">Tillbaka</button>
        <button @click="confirmBooking" class="btn red darken-4 col s3 offset-s4">Bekräfta</button>
    </div>
  </div>
</template>

<script>
// import BookingInformation from "@/components/Booking/BookingInformation";

export default {
  components: {
    // BookingInformation
  },

  props: {
    bookingObject: {
      type: Object,
      required: true
    }
  },

  methods: {
    backToSelectSeats() {
      this.$router.push({name: 'SelectSeats', params: {bookingObject: this.bookingObject}})
    },

    confirmBooking() {
      window.console.log('Confirm booking')
    },
  },

};
</script>
<style>
  .confirm-booking .inner-container {
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px; 
    margin-top: 1rem;
    padding: 1rem;
  }
  .confirm-booking h4 {
    margin: 1rem 0 1.5rem !important;
    /* margin-top: 2rem !important; */
  }
  .confirm-booking .text p {
  margin: 0 0 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .confirm-booking img {
    max-height: 200px;
  }
</style>
