<template>
  <div class="container">
    <div class="confirm-details">
      <div class="col s12">
        <h4>Confirm Details!</h4>
        <BookingInformation :data="bookingObject"></BookingInformation>
      </div>
      <div class="col s12 center">
        <router-link
          to="/booking/bookingComplete"
          class="m1 btn waves-effect waves-light black white-text"
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
.confirm-details {
  margin-left: 5%;
}
</style>
