<template>
  <div class="container">
    <h4>Select seats from {{auditorium.name}}</h4>

    <div class="center">
      <img src="@/assets/images/cinema.png" alt="cinema-screen" />
    </div>
    <div class="row" v-if="auditoriums.length">
      <div class="center col s12" v-for="(row, y, id) in auditorium.seatsPerRow" :key="'row' + y + id">
        <Seat
          v-for="(seat, id) in row"
          :key="'seat' + id"
          :position="{x: seat, y: y}"
          @showPosition="showPosition"
        ></Seat>
      </div>
      <div class="col m12 center">
        <router-link to="/booking/confirmDetails" class="m1 btn waves-effect waves-light black white-text">Next</router-link>
      </div>
    </div>
    <div v-else>
      <p>IS LOADING...</p>
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
      position: {}
    };
  },
  methods: {
    showPosition(position) {
      this.position = position;
    }
  },
  computed: {
    auditorium() {
      return this.auditoriums.length ? this.auditoriums[0] : {seatsPerRow: [], name: ''};
    },
    movies() {
      return this.$store.state.movies;
    },
    auditoriums() {
      return this.$store.state.auditoriums;
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