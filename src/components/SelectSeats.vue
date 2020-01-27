<template>
  <div class="container">
    <h4>Select seats from SALNAMN</h4>

    <div class="row">
      <div
        class="center col m12"
        v-for="(seats, id) in auditoriums[0].seatsPerRow"
        :key="'seats' + id"
      >
        <a
          class="btn-floating btn-small waves-effect waves-black"
          v-for="(seat, id) in seats"
          :key="'seat' + id"
          @click="value()"
          :ref="seat"
          :class="{ blue: empty, 
                    red: booking}"
        >
          {{seat}}
          <!-- I metoder skapa en grid som har längden av antalet sittplatser. 
          Efteråt blir det blå eller röd beroende på om det är false eller true i elementet i grid-->
        </a>
      </div>

      <button class="btn waves-effect waves-light black white-text right">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: 0,
      grid: [true, false],
      empty: true,
      booking: false
    };
  },
  methods: {
    value() {
      if (this.empty) {
        this.empty = false;
        this.booking = true;
      } else {
        this.empty = true;
        this.booking = false;
      }
    },
    valuegrid() {
      if (this.grid[0]) {
        //NEED TO LOOK BACK TO FIND A SOLUTION ON THIS
        this.grid[0] = false;
        this.grid[1] = true;
      } else {
        this.grid[0] = true;
        this.grid[1] = false;
      }
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