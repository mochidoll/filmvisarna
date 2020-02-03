<template>
  <div id="secure">
    <div class="container">
      <h1 class="center">Your bookings</h1>
      <p>This is a secure area, you successfully logged in!</p>
      <a class="btn" @click="logout">Log out</a>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  name: "Secure",
  data() {
    return {};
  },
  methods: {
      logout() {
          firebase.auth().signOut().then(
              window.console.log("log out"),
                window.console.log(firebase.auth().currentUser),
              this.$router.push('Login')
          )
      }
  }
};
</script>