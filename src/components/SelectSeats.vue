<template>
  <div class="container">
      <h4>Select seats</h4>
    <button class="btn waves-effect waves-light black white-text right">Next</button>
    <div class="row">
      <div class="col green" v-for="(row, id) in seatsPerRow" :key=id>
        <p>{{row}}</p>
      </div>
    </div>
      <button class="btn waves-effect waves-light black white-text right">Next</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seatsPerRow: 10//this.$store.state.auditoriums[0].seatsPerRow
    }
  },
  methods: {
    
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
</style>