<template>
  <div class="container">
    <div class="container black navbar">
      <div class="nav-wrapper">
        <div class="col s12 center">
          <router-link to="/booking/selectTickets" class="breadcrumb">Select Tickets</router-link>
          <router-link to="/booking/selectSeats" class="breadcrumb">Select Seats</router-link>
          <router-link to="/booking/confirmDetails" class="breadcrumb">Confirm details</router-link>
          <router-link to="/booking/bookingComplete" class="breadcrumb">Booking complete</router-link>
        </div>

        <router-view></router-view>
      </div>
    </div>

    <button class="btn waves-effect waves-light">Change Active</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  padding: 10px;
}
.container {
  padding: 10px;
}
</style>