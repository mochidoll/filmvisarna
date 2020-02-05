<template>
  <div class="container confirm-booking center">

    <div class="row inner-container">
      <h4 class="center col s12">Tack för din bokning!</h4>
      <h5 class="center col s12">Bokningsnummer: {{ bookingObject.id }}</h5>

      <div class="col l6 m6 s12 image-container   ">
        <img :src="bookingObject.movie.image" alt class="responsive-img" />
      </div>

      <div class="left-align text-container col l6 m6 s12 center">
        <p>Titel: {{ bookingObject.movie.title }}</p>
        <p>Längd: {{ bookingObject.movie.length }} min</p>
        <p>Datum: {{ bookingObject.screening.startTime.toDate().toLocaleDateString() }}</p>
        <p>Tid: {{ bookingObject.screening.startTime.toDate().getHours() }}:00</p>
        <p>Salong: {{ bookingObject.auditorium.name }}</p>
        <p v-if="bookingObject.adultTickets">Vuxenbiljetter: {{ bookingObject.adultTickets}}</p>
        <p v-if="bookingObject.childTickets">Barnbiljetter: {{ bookingObject.childTickets }}</p>
        <p v-if="bookingObject.seniorTickets">Pensionärsbiljetter: {{bookingObject.seniorTickets }}</p>
        <p v-for="(seat, id) in bookingObject.seatPositions" :key="id">Parkett: rad {{ seat.y + 1 }}, plats {{ seat.x}}</p>
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

  mounted() {
      window.console.log(this.bookingObject)
      window.console.log('In Complete', this.bookingObject.id)
  }
}
</script>

<style >

</style>