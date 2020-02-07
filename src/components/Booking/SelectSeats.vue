<template>
  <div class="container">
    <h4>Välj platser i {{ bookingObject.auditorium.name }}</h4>
    <p>Bokade biljetter: {{ bookingObject.numberOfTickets }} st</p>
    <div class="center">
      <img src="@/assets/images/cinema.png" alt="cinema-screen" />
    </div>

    <div class="row seat-wrapper" v-if="auditoriums">
      <div
        class="center col s12"
        v-for="(row, y, id) in bookingObject.auditorium.seatsPerRow"
        :key="'row' + y + id"
      >
        <Seat
          v-for="(seat, id) in row"
          :key="'seat' + id"
          :position="{x: seat, y: y}"
          :disableSeat="hasAllSeatsSelected"
          @addToCurrentTicket="addToCurrentTicket"
          @removeFromCurrentTicket="removeFromCurrentTicket"
          @pushToPositions="pushToPositions"
          @removeFromPositions="removeFromPositions"
        ></Seat>
      </div>
       <p v-if="feedback">{{feedback}}</p>

      <div class="nav-buttons row col s12">
        <button @click="goBackToSelectTickets" class="col s5 m3 l2 offset-m1 offset-l1 btn waves-effect waves-light red darken-4 white-text">Tillbaka</button>
        <button
          @click="goToConfirmDetails"
          class="col s5 m3 l2 offset-s2 offset-l6 offset-m4 btn waves-effect waves-light red darken-4 white-text"
          :class="{disabled:!hasAllSeatsSelected}"
        >Gå vidare</button>
      </div>
      
    </div>
    
    <div class="center" v-else>
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
  </div>
</template>

<script>
import Seat from "@/components/Booking/Seat";
export default {
  components: {
    Seat
  },

  props: {
    bookingObject: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      room: 0,
      positions: [],
      currentTickets: 0,
      feedback: null,
      hasAllSeatsSelected: false
    };
  },

  methods: {
    showPosition(position) {
      this.position = position;
    },
    removeFromCurrentTicket() {
      this.currentTickets--;
    },
    addToCurrentTicket() {
      this.currentTickets++;
    },
    pushToPositions(position) {
      this.positions.push(position);
    },
    removeFromPositions(position) {
      this.positions.forEach((element, index) => {
        if (element.x === position.x && element.y === position.y) {
          this.positions.splice(index, 1);
        }
      });
    },
    goToConfirmDetails() {
      this.bookingObject.seatPositions = this.positions;
      this.$router.push({
        name: "ConfirmDetails",
        params: {bookingObject: this.bookingObject}
      });
    },
    goBackToSelectTickets() {
      this.bookingObject.seatPositions = null
      this.$router.push({name: 'SelectTickets'})
    }
  },

  computed: {
    auditorium() {
      return this.auditoriums.length
        ? this.auditoriums[0]
        : { seatsPerRow: [], name: "" };
    },
    movies() {
      return this.$store.state.movies;
    },
    auditoriums() {
      return this.$store.state.auditoriums;
    }
  },

  created() {
    if(this.bookingObject.seatPositions){
      return null
    }
  },

  watch: {
    currentTickets(val) {
      if (val === this.bookingObject.numberOfTickets) {
        this.feedback =
          "Max antal platser valda. Avmarkera en plats för att välja om.";
        this.hasAllSeatsSelected = true;
      } else if (val < this.bookingObject.numberOfTickets) {
        this.feedback = null;
        this.hasAllSeatsSelected = false;
      }
    }
  }
};
</script>

<style>

  .seat-wrapper {
    user-select: none;
  }
  
  .nav-buttons {
    margin: 2rem 0 1rem !important;
  }


</style>