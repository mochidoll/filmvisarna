<template>
  <div class="container">
    <h4>Select seats from SALNAMN</h4>

    <div class="row">
      <div class=" margin-row col m12" v-for="(seats, id) in auditoriums[0].seatsPerRow" :key="'seats' + id">

        <div class="col black white-text seats" v-for="(seat, id) in seats" :key="'seat' + id">
          {{seat}}
        </div>

      </div>
      <button class="btn waves-effect waves-light black white-text right">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: 0
    };
  },
  methods: {},
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
.margin-row {
  margin-left: 20px;
  text-align: center !important;
}
</style>