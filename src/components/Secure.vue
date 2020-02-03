<template>
  <div id="secure">
    <div class="container center-align">
      <h1 class="center">Your bookings</h1>
      <p>This is a secure area, you successfully logged in!</p>
      <a class="btn red darken-4" @click="logout">Log out</a>
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

<style scoped>
 .btn {
     margin-bottom: 1%;
 }
</style>