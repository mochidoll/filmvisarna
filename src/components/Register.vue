<template>
<div class="container center z-depth-1">
    <div class="container row">
        <h4>Registrera</h4>
        <div class="col s12 m6">
          <div class="input-field">
            <input type="text" id="signUpFirstName" v-model="signUpFirstName" required="" aria-required="true" class="active validate" />
            <label for="signUpFirstName">Förnamn</label>
            <span class="helper-text" data-error="Ange ditt förnamn"></span>
        </div>
        </div>
        <div class="col s12 m6">
          <div class="input-field">
            <input type="text" id="signUpLastName" v-model="signUpLastName" required="" aria-required="true" class="active validate" />
            <label for="signUpLastName">Efternamn</label>
            <span class="helper-text" data-error="Ange ditt efternamn"></span>
          </div>
        </div>
        <div class="input-field col s12">
          <input type="email" id="signUpEmail" v-model="signUpEmail" class="active validate" />
          <label for="signUpEmail">Email</label>
          <span class="helper-text" data-error="Felaktig email"></span>
        </div>
        <div class="input-field col s12">
          <input type="password" id="signUpPassword" @blur="validatePassword" v-model="signUpPassword" required="" aria-required="true" class="active validate" />
          <label for="signUpPassword">Lösenord</label>
          <span class="helper-text" data-error="Lösenordet måste vara minst 6 karaktärer"></span>
        </div>
        <div class=" buttons col s12">
          <a class="btn waves-effect waves-light red darken-4" @click="signUp()">Registrera</a>
          <router-link to="/Login" class="btn waves-effect waves-light red darken-4" >Redan Medlem?</router-link>
      </div>

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
    validatePassword(e) {
      if(this.signUpPassword.length < 6) {
        e.target.classList.remove('valid')
        e.target.classList.add('invalid')
      }
    },
    async signUp() {
      if (this.signUpFirstName === "" ||
          this.signUpLastName === "" ||
          this.signUpEmail === "" ||
          this.signUpPassword === "") {
            M.toast({html: 'Fyll i alla fält för att slutföra registreringen'})
            } 
      else if(this.signUpPassword != "" & this.signUpPassword.length < 6) {
          return;
        }else {
          M.toast({html: 'Kontrollerar dina uppgifter...'})
        let cred = await auth
          .createUserWithEmailAndPassword(this.signUpEmail, this.signUpPassword)
          .catch(error => {error.message = 'Email-adressen finns redan registrerad', M.toast({html: error.message})})
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
input[type="email"]:focus, input[type="password"]:focus{
  border-bottom: 1px solid #000 !important;
}
 .input-field input:focus + label {
   color:black !important;
 }
.input-field{
  color: black !important;
}
.container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.label{
  color: black !important;
}
.col {
  padding: 1 !important;
}
.btn{
margin: 2%;  
}
</style>