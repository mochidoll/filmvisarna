<template>
  <li>
    <h4>Price: {{data.price}} SEK</h4>
    <h5>
      Salong: {{data.theatre}}
      <br />
      Movie: {{data.movie}}
      <br />
      Tickets:
      {{data.tickets.children}} children,
      {{data.tickets.adults}} adults,
      {{data.tickets.seniors}} seniors
      <br />
      date: {{data.date}} <br>
      UserId: {{data.userId}}
      <br />
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