<template>
  <div class="my-bookings" >

     <div class="white black-text" @click="isHidden = true" v-if="!isHidden">   
      <div class="col s5 image-container">
        <img :src="movie.image" alt class="responsive-img image" />
      </div>

      <div class="left-align text-container">
        <h5 class="col s7"> <b>{{ movie.title}} </b></h5>
        <span class="col s7">Datum: {{ screening.startTime.toDate().toLocaleDateString() }}</span>
        <span class="col s7">Tid: {{ screening.startTime.toDate().getHours() }}:00</span>
      <span class="col s7">Pris: {{ bookingObject.totalTicketPrice }} kronor</span>
       <span class="col s7"><b>Bokningsnummer: {{ bookingObject.id.slice(-6) }}</b></span>
    </div>

</div>
   
    <div class="inner-container white black-text test left-align" v-if="isHidden" @click="isHidden = false">
      <h5 class="col s9 ">Biljetter</h5>
       <span class="col s9" v-if="bookingObject.adultTickets">{{ bookingObject.adultTickets}} x vuxenbiljett, </span>
        <span class="col s9" v-if="bookingObject.childTickets">{{ bookingObject.childTickets }} x barnbiljett</span>
        <span class="col s9" v-if="bookingObject.seniorTickets">{{bookingObject.seniorTickets }} x pensionär</span>
        <h5 class="col s9">Platser</h5>
        <span class="col s9"
          v-for="(seat, id) in bookingObject.seats"
          :key="id"
        >Parkett: rad {{ seat.y + 1 }}, plats {{ seat.x}}</span>
  </div>
  </div>
 
  
</template>

<script>
import {filterItemFromList} from './utils/logicUtils.js'

export default {
  data(){
    return{
      isHidden: false
    }
  },
  props: {
    bookingObject: {
      type: Object,
      required: true
    }
  },
  methods:{
    hideInfo(){
      window.console.log("State " + this.isHidden)
      if(this.isHidden == false){
    this.isHidden = true;
    }
    else if (this.isHidden == true){
      this.isHidden = false
    }
    }
  },
  computed: {
    screening() {
      return filterItemFromList(this.$store.state.screenings, this.bookingObject.screeningId)
  },
    movie() {
      return filterItemFromList(this.$store.state.movies, this.screening.movieId)
    },
    auditorium() {
      return filterItemFromList(this.$store.state.auditoriums, this.screening.auditoriumId)
    }
  }
}
</script>
<style scoped>
.my-bookings{
  border: red 2px solid;
 
}
.image{
width: 100%;
min-height: 185px !important;


}
.inner-container{
  border-radius: 10px;
  max-height: 50% !important;
}
.test{
  border: goldenrod 2px solid;
}
.hidden-img{
  opacity: 0;
  width: 5%;
}
.image-container{
  margin: 0 !important;
  padding: 0 !important;
}

</style>