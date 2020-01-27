<template>
  <div class="container">
    <h4>Select seats from {{auditoriums[0].name}}</h4>

    <div class="center">
      <img src="@/assets/images/cinema.png" alt="cinema-screen" />
    </div>
    <div class="row">
      <div
        class="center col s12"
        v-for="(row, y, id) in auditoriums[0].seatsPerRow"
        :key="'row' + y + id"
      >
        <Seat
          v-for="(seat, id) in row"
          :key="'seat' + id"
          :position="{x: seat, y: y}"
          @showPosition="showPosition"
        ></Seat>
      </div>
      {{this.position}}
      <button class="btn waves-effect waves-light black white-text right">Next</button>
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
.navbar {
  padding: 10px;
}

.container {
  padding: 20px;
}
.seats {
  margin: 1%;
  border-radius: 10px;
}
</style>