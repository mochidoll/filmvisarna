<template>
<div class="root">
  <div class="container my-bookings" >
     <div class="row inner-container white black-text" @click="isHidden = true" v-if="!isHidden">   
      <div class="col s5 image-container">
        <img :src="movie.image" alt class="responsive-img" />
      </div>

      <div class="left-align text-container colcenter">
        <h5 class="col s7"> <b>{{ movie.title}} </b></h5>
        <p class="col s6">Datum: {{ screening.startTime.toDate().toLocaleDateString() }}</p>
        <p class="col s6">Tid: {{ screening.startTime.toDate().getHours() }}:00</p>
       <p class="center col s6">Bokningsnummer: {{ bookingObject.id.slice(-6) }}</p>
 
    </div>

</div>
    </div> 
    <div>
    <div class="row inner-container white black-text test" v-if="isHidden" @click="isHidden = false"> 
  
      <h5 class="col s12 left ">Biljetter</h5>
       <span class="col s12" v-if="bookingObject.adultTickets">{{ bookingObject.adultTickets}} x vuxenbiljetter, </span>
        <span class="col s12" v-if="bookingObject.childTickets">{{ bookingObject.childTickets }}</span>
        <span class="col s7" v-if="bookingObject.seniorTickets">Pensionärsbiljetter: {{bookingObject.seniorTickets }}</span>
        <h5 class="col s12">Platser</h5>
        <span class="col s12"
          v-for="(seat, id) in bookingObject.seats"
          :key="id"
        >Parkett: rad {{ seat.y + 1 }}, plats {{ seat.x}}</span>
  </div>
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
size: 50% !important;

}
.inner-container{
  margin-left: 0;
}
.test{
  border: goldenrod 2px solid;
}

</style>