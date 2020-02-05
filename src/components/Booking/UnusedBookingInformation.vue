<template>
  <div class="row">
    <h4 class="s12 l6">Price: {{data.price}} SEK</h4>
    <h4>Tickets</h4>
    <h5 class="">Adults: {{data.adultTickets}}</h5>
    <h5 class="">Children: {{data.childTickets}}</h5>
    <h5 class="">Seniors: {{data.seniorTickets}}</h5>
    <h4 class="">Seats</h4>
    <ul class="" v-for="(seatPos, id) in this.data.seatPositions" :key="'seatPos' + id">
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