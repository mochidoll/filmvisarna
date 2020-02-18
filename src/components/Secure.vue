<template>
  <div id="secure">
    <div class="outer-container container" id="transparent">
      <h4 class="center">{{this.user.displayName}}</h4>
      <div class="divider"></div>
      <h5 class="center" v-if="this.userBookings.length">Dina bokningar</h5>
      <h5 class="center" v-else>Inga bokningar att visa</h5>

     <div >
        <div  v-for="booking in userBookings" :key="booking.id">
          <user-booking class="valign-wrapper row" :booking-object="booking" />
        
  
        </div>
      </div>
  </div>

      <a class="btn red darken-4" @click="logout()">Logga ut</a>
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
#transparent {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
}
.btn {
  margin-bottom: 1%;
}

</style>