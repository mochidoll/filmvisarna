<template>
  <div id="secure">
    <div v-if="user" class="container center-align">
      <h3>{{this.user.displayName}}</h3>
      <h3 class="center">Your bookings</h3>
      <p>This is a secure area, you successfully logged in!</p>
      <a class="btn red darken-4" @click="logout">Log out</a>
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
    }
  },
  /* computed: {
      user() {
          let user = null;
          firebase.auth().currentUser.then( (currentuser) => {
            if (currentuser){
                user = currentuser
            }
          });
          return user
      }
  }, */
  created() {
    firebase.auth().onAuthStateChanged(user => {
        window.console.log(user)
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style scoped>
.btn {
  margin-bottom: 1%;
}
</style>