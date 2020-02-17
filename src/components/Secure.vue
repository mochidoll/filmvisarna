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
import { filterItemFromList, includeItemsFromList } from "./utils/logicUtils.js"
import { auth } from "@/firebase/firebase";
import UserBooking from "./UserBooking.vue";
import M from "materialize-css"
export default {
  name: "Secure",
  components: {
    UserBooking
  },
  data() {
    return {
      user: {},
    };
  },
  watch:{
    userBookings(){
      console.log('Watched')
    }
  },
  methods: {
    logout() {
      M.toast({html: 'Logged out'})
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
      return filterItemFromList(this.users, auth.currentUser.uid)
    },
    userBookings() {
      return includeItemsFromList(this.bookings, this.bookingUser.bookings)
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
  },
};
</script>

<style scoped>
.btn {
  margin-bottom: 1%;
}
</style>