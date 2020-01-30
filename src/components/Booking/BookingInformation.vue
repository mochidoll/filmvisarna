<template>
  <div>
    <h4>Price: {{data.price}} SEK</h4>
    <h4>Tickets</h4>
    <ul>
      <li>
        <h5>Adults: {{data.adultTickets}}</h5>
      </li>
      <li>
        <h5>Children: {{data.childTickets}}</h5>
      </li>
      <li>
        <h5>Seniors: {{data.seniorTickets}}</h5>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      seatNumbers: String
    };
  }
};
</script>

<style>
</style>