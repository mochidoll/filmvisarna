<template>
  <li>
    <h4>Price: {{data.price}} SEK</h4>
    <h5>
      UserId: {{data.userId}}
      <br />
      Movie: {{data.movie}}
      <br />
      Tickets:
      {{data.tickets.children}} children,
      {{data.tickets.adults}} adults,
      {{data.tickets.seniors}} seniors
      <br />
      date: {{data.date}}
    </h5>
  </li>
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