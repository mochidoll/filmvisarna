<template>
  <div>
    <h2>Booking Complete!</h2>
    <!--Loops through all data inside user, if we want to add more or less information in an user -->
    <ul v-for="(user, id) in users" :key="'user' + id">
      <BookingInformation :data="user"></BookingInformation>
    </ul>
    <h2>Thanks for booking!</h2>
  </div>
</template>

<script>
import BookingInformation from "@/components/BookingInformation";

export default {
  components: {
    BookingInformation
  },
  data() {
    return {
      users: [
        {
          userId: 20,
          movie: "Random film of greatest random times",
          theatre: "Stora Salongen",
          tickets: {
            children: 0,
            adults: 1,
            seniors: 0
          },
          seats: [2],
          price: 85,
          date: "2020-03-02 18:00"
        }
      ]
    };
  }
};
</script>

<style>
</style>