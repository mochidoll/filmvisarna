<template>
  <div id="secure">
    <div v-if="user" class="container center-align">
      <h3>{{this.user.displayName}}</h3>
      <h3 class="center">Your bookings</h3>
      <a class="btn" @click="test()">Test</a>

      <a class="btn red darken-4" @click="logout()">Log out</a>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Secure",
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
    /* test() {
      window.console.log(this.bookingUser);
      window.console.log(this.userBookings);
    } */
  },
  /* computed: {
    dummyBookings() {
      return this.$store.state.dummyBookings
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
      return this.dummyBookings.filter(dummyBooking => {
        this.bookingUser.bookings.foreach(booking => {
          if (dummyBooking.id === booking.id) {
            return dummyBooking;
          }
        });
      });
    }
  }, */
  created() {
    firebase.auth().onAuthStateChanged(user => {
      window.console.log(user);
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
    /* this.$store.dispatch("getDummyBookings"); */
    this.$store.dispatch("getUsers");
  }
};
</script>

<style scoped>
.btn {
  margin-bottom: 1%;
}
</style>