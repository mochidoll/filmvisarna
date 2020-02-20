<template>
  <div class="container confirm-booking booking-confirmed">
    <div class="row inner-container">

      <div>
        <h5 class="">Tack för din bokning!</h5>
        <h6>Bokningsnummer: {{ bookingObject.id.slice(-6) }}</h6>
      </div>
   
      <div class="movie-info-wrapper valign-wrapper">
        <div class="col s5 image-wrapper">
          <img :src="bookingObject.movie.image" alt class="responsive-img" />
        </div>

        <div class="text-wrapper col s7">
          <p class="movie-title">{{ bookingObject.movie.title }}</p>
          <p>Datum: {{ bookingObject.screening.startTime.toDate().toLocaleDateString() }}</p>
          <p>Tid: {{ bookingObject.screening.startTime.toDate().getHours() }}:00</p>
          <p>{{ bookingObject.auditorium.name }}</p>
          <p><b>Totalt pris: {{ bookingObject.totalTicketPrice}} kr</b></p> 
        </div>
      </div>

      <div class="booking-detail-wrapper left-align col s12">
        <div class="ticket-details col s6">
          <p class="tickets"><b>Biljetter:</b></p>
          <p v-if="bookingObject.adultTickets">Vuxenbiljetter: {{ bookingObject.adultTickets}}</p>
          <p v-if="bookingObject.childTickets">Barnbiljetter: {{ bookingObject.childTickets }}</p>
          <p v-if="bookingObject.seniorTickets">Pensionärsbiljetter: {{bookingObject.seniorTickets }}</p>
        </div>
        <div class="seat-details col s6">
          <p class="seats"><b>Platser:</b></p>
          <p
            v-for="(seat, id) in bookingObject.seatPositions"
            :key="id"
          >
          Rad {{ seat.y + 1 }}, Plats {{ seat.x}}
          </p>
        </div>
      </div>

      <div class="nav-buttons col s12 m6 push-m3">
        <button
          class="btn waves-effect waves-light black col s12"
        >Till startsidan
        </button>
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

  created() {
    if(!this.bookingObject) {
      this.$router.replace({
        path: "/booking/selectTickets/" + this.$route.params.screeningId
      });
    }
    
    this.$emit('changeNavText', this.$store.state.navTexts[4])  
  }
}
</script>

<style>
  .booking-confirmed h5 {
    margin: 0;
  }
  .booking-confirmed h6{
      margin: 0.5em 0 1em 0 ;
  }
  .booking-confirmed .nav-buttons {
    margin: 1em 0 0.5em 0 !important;
  }
  .booking-confirmed .btn {
    border-radius: 12px;
  }
  .booking-confirmed .inner-container {
    margin: 1em 0 0 0;
  }
  h2 {
    margin: 2%;
  }
  .col {
    margin-bottom: 1%;
  }
  .booking-confirmation {
    margin-left: 5%;
  }
</style>