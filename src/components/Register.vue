<template>
  <div class="container center">
    <div class="container row z-depth-1 white registration-container">
      <div class="col s12">
        <h4>Registrera</h4>
        <div class="col s12 m6">
          <div class="input-field">
            <input
              type="text"
              id="signUpFirstName"
              v-model="signUpFirstName"
              required
              aria-required="true"
              class="active validate"
            />
            <label for="signUpFirstName">Förnamn</label>
          </div>
        </div>
        <div class="col s12 m6">
          <div class="input-field">
            <input
              type="text"
              id="signUpLastName"
              v-model="signUpLastName"
              required
              aria-required="true"
              class="active validate"
            />
            <label for="signUpLastName">Efternamn</label>
          </div>
        </div>
        <div class="input-field col s12">
          <input type="email" id="signUpEmail" v-model="signUpEmail" class="active validate" />
          <label for="signUpEmail">Email</label>
        </div>
        <div class="input-field col s12">
          <input
            type="password"
            id="signUpPassword"
            @blur="validatePassword"
            v-model="signUpPassword"
            required
            aria-required="true"
            class="active validate"
          />
          <label for="signUpPassword">Lösenord</label>
        </div>
        <div class="buttons col s12 hide-on-small-only">
          <a class="btn waves-effect waves-light black" @click="signUp()">Registrera</a>
          <router-link to="/Login" class="btn waves-effect waves-light black">Tillbaka</router-link>
        </div>
        <div class="buttons col s12 hide-on-med-and-up">
          <a class="btn-small waves-effect waves-light black" @click="signUp()">Registrera</a>
          <router-link to="/Login" class="btn-small waves-effect waves-light black">Tillbaka</router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { auth, db } from "@/firebase/firebase";
import M from "materialize-css";

export default {
  data() {
    return {
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: "",
      errorMessage: ""
    };
  },
  methods: {
    validatePassword(e) {
      if (this.signUpPassword.length < 6) {
        e.target.classList.remove("valid");
        e.target.classList.add("invalid");
      }
    },
    async signUp() {
      if (
        this.signUpFirstName === "" ||
        this.signUpLastName === "" ||
        this.signUpEmail === "" ||
        this.signUpPassword === ""
      ) {
        M.toast({ html: "Fyll i alla fält för att slutföra registreringen" });
      } else if (
        (this.signUpPassword != "") &
        (this.signUpPassword.length < 6)
      ) {
        return;
      } else {
        M.toast({ html: "Kontrollerar dina uppgifter..." });
        let cred = await auth
          .createUserWithEmailAndPassword(this.signUpEmail, this.signUpPassword)
          .catch(error => {
            (error.message = "Email-adressen finns redan registrerad"),
              M.toast({ html: error.message });
          });
        await cred.user.updateProfile({
          displayName: this.signUpFirstName + " " + this.signUpLastName
        });
        await db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            bookings: []
          });
        await this.$store.dispatch("getUsers");

        this.$router.push("allMovies");
      }
    }
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  }
};
</script>
<style scoped>
.registration-container {
  border-radius: 15px;
}

h4 {
  padding-top: 14px;
  font-weight: bold;
}

.btn {
  border-radius: 12px;
  margin: 2%;
}

.btn-small {
  border-radius: 12px;
  margin-left: 7px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.input-field {
  margin-top: 6px;
  margin-bottom: 6px;
}

.input-field input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-bottom: 1px solid #000 !important;
}
.input-field input:focus + label {
  color: black !important;
}
.input-field label {
  color: black !important;
}
.label {
  color: #3f3f3f !important;
}
.container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.col {
  padding: 1 !important;
}

input{
  color:black;
}
</style>