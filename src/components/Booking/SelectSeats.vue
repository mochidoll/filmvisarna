<template>
  <div class="container">
    <h4>Select seats from {{auditorium.name}}</h4>
    <p>max numbers of tickets: {{bookingObject.numberOfTickets}}</p>
    <p>{{positions}}</p>
    <p v-if="feedback">{{feedback}}</p>
    <div class="center">
      <img src="@/assets/images/cinema.png" alt="cinema-screen" />
    </div>
    <div class="row" v-if="auditoriums.length">
      <div
        class="center col s12"
        v-for="(row, y, id) in auditorium.seatsPerRow"
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
      <div class="col m12 center">
        <button
          @click="goToConfirmDetails"
          class="m1 btn waves-effect waves-light black white-text"
          :class="{disabled:!hasAllSeatsSelected}"
        >Next</button>
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
      this.$store.commit("setBookingObject", this.bookingObject);
      this.$router.push({
        name: "confirmDetails"
      });
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
    },
    bookingObject() {
      return this.$store.state.bookingObject;
    }
  },
  created() {
    this.$store.dispatch("getAuditoriums");
  },
  watch: {
    currentTickets(val) {
      if (val === this.bookingObject.numberOfTickets) {
        this.feedback = "Error: Du kan inte välja fler!";
        this.hasAllSeatsSelected = true;
      } else if (val < this.bookingObject.numberOfTickets) {
        this.feedback = null;
        this.hasAllSeatsSelected = false;
      }
    }
  }
};
</script>

<style scoped>
.seats {
  margin: 1%;
  border-radius: 10px;
}
</style>