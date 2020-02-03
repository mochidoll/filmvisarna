<template>
  <div class="container">
    <div class="booking-confirmation">
      <h4>Booking Complete!</h4>
      <!--Loops through all data inside user, if we want to add more or less information in an user -->
      <BookingInformation :data="bookingObject"></BookingInformation>
      <h2>Thanks for booking!</h2>
    </div>
  </div>
</template>

<script>
import BookingInformation from "@/components/Booking/BookingInformation";

export default {
  components: {
    BookingInformation
  },
  computed: {
    bookingObject() {
      return this.$store.state.bookingObject;
    }
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
.col {
  margin-bottom: 1%;
}
.booking-confirmation {
  margin-left: 5%;
}
</style>