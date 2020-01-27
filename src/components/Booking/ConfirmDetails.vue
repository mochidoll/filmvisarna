<template>
  <div class="container">
    <div class="confirm-details">
      <div class="col s12">
    <h4>Confirm Details!</h4>
      <!--Loops through all data inside user, if we want to add more or less information in an user -->
      <ul v-for="(user, id) in users" :key="'user' + id">
        <BookingInformation :data="user"></BookingInformation>
      </ul>
      </div>
      <div class="col s12 center">
        <router-link
          to="/booking/bookingComplete"
          class="m1 btn waves-effect waves-light black white-text"
          href="#"
        >Confirm</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BookingInformation from "@/components/Booking/BookingInformation";

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
<style scoped>
.container {
  padding: 20px;
}
h2 {
  margin: 2%;

}
.confirm-details{
  margin-left: 5%;
}

</style>
