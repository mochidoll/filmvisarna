<template>
  <div class="container">
    <div class="container white navbar z-depth-1">
      <div class="nav-wrapper">
        <div class="col s12 center">
          <router-link to="/booking/selectTickets" class="breadcrumb black-text">Select Tickets</router-link>
          <router-link to="/booking/selectSeats" class="breadcrumb black-text">Select Seats</router-link>
          <router-link to="/booking/confirmDetails" class="breadcrumb black-text">Confirm details</router-link>
          <router-link to="/booking/bookingComplete" class="breadcrumb black-text">Booking complete</router-link>
        </div>
        <div class="divider"></div>

        <div>
          <!--<h4>{{movie.title}}</h4>-->
        </div>

        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  }
};
</script>

<style scoped>
.navbar {
  padding: 10px;
}
.container {
  width: 90%;
  padding: 20px;
  border-radius: 20px;
}
.breadcrumb:before {
  color: black;
}
</style>