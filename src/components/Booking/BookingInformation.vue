<template>
  <div>
    <h4>Price: {{data.price}} SEK</h4>
    <h4>Tickets</h4>
    <h5>Children: {{data.adultTickets}}</h5>
    <h5>Adults: {{data.childTickets}}</h5>
    <h5>Seniors: {{data.seniorTickets}}</h5>
    <h4>Seats</h4>
    <ul v-for="(seatPos, id) in this.data.seatPositions" :key="'seatPos' + id">
      <li>
        <h5>X:{{seatPos.x}}Y:{{seatPos.y}}</h5>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style>
</style>