<template>
  <div class="container">
    <h4>Select seats from SALNAMN</h4>

    <div class="row">
      <div
        class="center col s12"
        v-for="(seats, id) in auditoriums[0].seatsPerRow"
        :key="'seats' + id"
      >
        {{seats}}
        <Seat
          class="btn btn-small waves-effect waves-black blue"
          v-for="(seat, id) in seats"
          v-bind:position="seat"
          :key="'seat' + id + seat.x + seat.y"
          @selectedSeat="selectedSeat"
          :class="{blue:empty, red:booking}"
        >
          <!-- I metoder skapa en grid som har längden av antalet sittplatser. 
          Efteråt blir det blå eller röd beroende på om det är false eller true i elementet i grid-->
        </Seat>
      </div>
      <div class="col m12 center">
        <router-link to="/booking/confirmDetails" class="m1 btn waves-effect waves-light black white-text">Next</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Seat from "@/components/Seat";
export default {
  components: {
    Seat
  },
  data() {
    return {
      room: 0,
      seats: [],
      empty: true,
      booking: false,
      seatsLength: 10,
      xValue: 0,
      yValue: 0
    };
  },
  methods: {
    chooseSeat() {
      if (this.empty) {
        this.empty = false;
        this.booking = true;
      } else {
        this.empty = true;
        this.booking = false;
      }
    },
    selectedSeat(x, y) {
      for (let row = 0; row < this.auditoriums[0].seatsPerRow.length; row++) {
        this.seats[row] = [];
        for (let col = 0; col < this.auditoriums[0].seatsPerRow[row]; col++) {
          let position = {
            x: col,
            y: row
          };

          this.seats[row].push(position);
        }
      }
      window.console.log(this.seats);
      this.xValue = x;
      this.yValue = y;
      this.chooseSeat();
    }
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    },
    auditoriums() {
      return this.$store.state.auditoriums; //ERROR
    }
  },
  created() {
    this.$store.dispatch("getAuditoriums");
  }
};
</script>

<style scoped>

.seats {
  margin: 1%;
  border-radius: 10px;
}
</style>