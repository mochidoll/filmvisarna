<template>
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
          <router-link to="/Login" class="btn waves-effect waves-light red darken-4" >Redan Medlem?</router-link>
        </div>
      </div>
</template>



<script>
import { auth, db } from "@/firebase/firebase";
import M from "materialize-css"

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
    async signUp() {
      if (this.signUpFirstName === "" || this.signUpLastName === "") {
        alert("Please enter your name");
      } else {
        let cred = await auth
          .createUserWithEmailAndPassword(this.signUpEmail, this.signUpPassword)
          .catch(error => {
            this.errorMessage = error.message
          M.toast({html: this.errorMessage})
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