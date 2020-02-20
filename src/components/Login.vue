  <template>
  <div class="container center">
    <div class="container row z-depth-1 white login-container">
      <div class="col s12">
        <h4>Logga in</h4>
        <!-- <div class="col s12"> -->
          <div class="input-field col s12">
            <input type="email" id="login" class="validate" v-model="username" />
            <label for="login">Email</label>
           <span class="helper-text" data-error="Felaktig email"></span>
          </div>
        <!-- </div>
        <div class="col s12"> -->
          <div class="input-field col s12">
            <label for="password">Lösenord</label>
            <input
              type="password"
              id="password"
              :class="{focus:isActive}"
              v-model="password"
            />
         <!--  </div> -->
        </div>
        <div class="col center s12 left-align hide-on-small-only">
          <a class="btn waves-effect waves-light black" @click="login()">Logga In</a>
          <router-link to="/Register" class="btn waves-effect waves-light black">Registrera</router-link>
        </div>
        <div class="col center s12 left-align hide-on-med-and-up">
          <a class="btn-small waves-effect waves-light black" @click="login()">Logga In</a>
          <router-link to="/Register" class="btn-small waves-effect waves-light black">Registrera</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import { auth } from "@/firebase/firebase";
import M from "materialize-css";

export default {
  data() {
    return {
      username: "",
      password: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpEmail: "",
      signUpPassword: "",
      isActive: true
    };
  },
  methods: {
    async login() {
      this.isActive = false;
      let user = await auth
        .signInWithEmailAndPassword(this.username, this.password)
        .catch(error => {
          error.message = "Felaktigt användarnamn eller lösenord.";
          M.toast({ html: error.message });
        });
      if (user) {
        this.$router.replace("secure");
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
.login-container {
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

.input-field{
  margin-top: 6px;
  margin-bottom: 6px;
}

.input-field input[type="text"]:focus,
input[type="password"]:focus {
  border-bottom: 1px solid #000 !important;
  box-shadow: 0 1px 0 0 #000 !important;
}

.input-field label {
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

input{
  color: black;
}
</style>