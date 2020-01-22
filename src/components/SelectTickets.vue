<template>
  <div class="container">
    <h2>Select Tickets</h2>
    <p>
      Adult Tickets
      <a class="btn-floating" @click="addAdultTicket()">-</a>
      {{tickets}}
      <a class="btn-floating">+</a>
    </p>
    <p></p>
    <p></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tickets: 0,
      seniorTickets: 0,
      childTickets: 0
    };
  },
  methods() {
    addAdultTicket() {
      tickets++;
    }
  },
};
</script>

<style scoped>
</style>