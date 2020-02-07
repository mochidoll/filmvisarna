<template>
  <div class="container center">
    <div class="row z-depth-1 white">
      <div class="container center navbar">
        <div class="nav-wrapper">
          <div class="nav-choices s12">
            <router-link to="/booking/selectTickets" class="breadcrumb black-text">Select Tickets</router-link>
            <router-link to="/booking/selectSeats" class="breadcrumb black-text">Select Seats</router-link>
            <router-link to="/booking/confirmDetails" class="breadcrumb black-text">Confirm details</router-link>
            <router-link
              to="/booking/bookingComplete"
              class="breadcrumb black-text"
            >Booking complete</router-link>
          </div>
        </div>
        <div class="divider"></div>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
    auditorium: Object
  }
};
</script>

<style scoped>
.row {
  padding-top: 2rem;
  margin: 2rem 0;
}
.breadcrumb:before {
  color: black;
}
</style>