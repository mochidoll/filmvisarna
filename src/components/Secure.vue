<template>
  <div id="secure">
    <div class="container center-align">
      <h4>{{this.user.displayName}}</h4>
      <div class="divider"></div>
      <h5 class="center">Dina bokningar</h5>
      

      <ul>
        <li v-for="booking in userBookings" :key="booking.id">
          <user-booking :booking-object="booking" />
        </li>
      </ul>

      <a class="btn" @click="test()">Test</a>
      <a class="btn red darken-4" @click="logout()">Log out</a>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import UserBooking from './UserBooking.vue'
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
      firebase
        .auth()
        .signOut()
        .then(
          window.console.log("log out"),
          window.console.log(firebase.auth().currentUser),
          this.$router.push("Login")
        );
    },
    test() {
      /*  window.console.log(this.bookingUser);
      window.console.log(this.userBookings); */
      /*  window.console.log(this.users) */
      /*  window.console.log(this.dummyBookings) */
      /* window.console.log(this.filteredScreenings); */
      window.console.log(this.userBookings[0])
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
        if (firebase.auth().currentUser.uid === user.id) {
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
    },
    filteredScreenings() {
      let screeningFilter = this.userBookings.map(
        booking => booking.screeningId
      );
      return this.$store.state.screenings.filter(screening => {
        if (screeningFilter.includes(screening.id)) {
          return screening;
        }
      });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
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