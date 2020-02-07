<template>
  <div class="container center z-depth-1">
    <div class="row">
      <div class="row col s12 m6">
        <h4 class>Logga in</h4>
        <div class="col s12">
          <div class="input-field">
            <input type="text" id="login" class="active" v-model="username" />
            <label for="login">Email</label>
          </div>
        </div>
        <div class="col s12">
          <div class="input-field">
            <label for="password">Lösenord</label>
            <input type="password" id="password" class="active" v-model="password" />
          </div>
        </div>
        <div class="col s12 left-align">
          <a
            class="btn waves-effect waves-light red darken-4"
            @click="login()"
          >Logga In</a>
        </div>
      </div>
      <div class="row col s12 m6">
        <h4>Registrera</h4>
        <div class="col s12 l6">
          <div class="input-field">
            <input type="text" id="signUpFirstName" v-model="signUpFirstName" class="active" />
            <label for="signUpFirstName">Förnamn</label>
          </div>
        </div>
        <div class="col s12 l6">
          <div class="input-field">
            <input type="text" id="signUpLastName" v-model="signUpLastName" class="active" />
            <label for="signUpLastName">Efternamn</label>
          </div>
        </div>
        <div class="input-field col s12">
          <input type="text" id="signUpEmail" v-model="signUpEmail" class="active" />
          <label for="signUpEmail">Email</label>
        </div>
        <div class="input-field col s12">
          <input type="password" id="signUpPassword" v-model="signUpPassword" class="active" />
          <label for="signUpPassword">Lösenord</label>
        </div>
        <div class="col s12 left-align">
          <a class="btn waves-effect waves-light red darken-4" @click="signUp()">Registrera</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { auth } from "@/firebase/firebase";
import firebase from "firebase";
import { db } from "@/firebase/firebase";

export default {
  data() {
    return {
      username: "",
      password: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(user => {
          if (user) {
            /*   window.console.log(firebase.auth().currentUser);
            window.console.log("Success"); */
            this.$router.push("Secure");
          } else {
            /*   window.console.log("Failure"); */
          }
        });
    },
    signUp() {
      window.console.log(this.signUpFirstName + " " + this.signUpLastName);
      if (this.signUpFirstName === "" || this.signUpLastName === "") {
        alert("Please enter your name");
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.signUpEmail, this.signUpPassword)
          .then(cred => {
            cred.user.updateProfile({
              displayName: this.signUpFirstName + " " + this.signUpLastName
            });
            db
              .collection("users")
              .doc(cred.user.uid)
              .set({
                bookings: []
              });
          })
          .then(() => {
            this.$router.push("Secure");
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.console.log(errorCode + " " + errorMessage);
            alert(errorMessage);
          });
      }
    }
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  }
};
</script>

<style scoped>
.input-field input[type="text"]:focus,
input[type="password"]:focus {
  border-bottom: 1px solid #000 !important;
  box-shadow: 0 1px 0 0 #000 !important;
}

.input-field {
  color: black !important;
}
label {
  color: #3f3f3f !important;
}
.container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.col {
  padding: 1 !important;
}
</style>