<template>
  <div id="secure">
    <div class="container center-align">
      <h4>{{this.user.displayName}}</h4>
      <div class="divider"></div>
      <h5 class="center" v-if="this.userBookings.length">Dina bokningar</h5>
      <h5 class="center" v-else>Inga bokningar att visa</h5>

      <ul>
        <li v-for="booking in userBookings" :key="booking.id">
          <user-booking :booking-object="booking" />
        </li>
      </ul>

      <a class="btn red darken-4" @click="logout()">Logga ut</a>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase/firebase";
import UserBooking from "./UserBooking.vue";
export default {
  name: "Secure",
  components: {
    UserBooking
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    logout() {
      auth.signOut().then(this.$router.push("Login"));
    }
  },
  computed: {
    bookings() {
      return this.$store.state.bookings;
    },
    users() {
      return this.$store.state.users;
    },
    bookingUser() {
      return this.users.filter(user => {
        if (auth.currentUser.uid === user.id) {
          return user;
        }
      })[0];
    },
    userBookings() {
      return this.bookings.filter(booking => {
        if (this.bookingUser.bookings.includes(booking.id)) {
          return booking;
        }
      });
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
    this.$store.dispatch("getBookings");
  }
};
</script>

<style scoped>
.btn {
  margin-bottom: 1%;
}
</style>