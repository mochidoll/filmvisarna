  <template>
  <div class="container center z-depth-1">
    <div class="container row">
      <div class="col s12">
        <h4 class>Logga in</h4>
        <div class="col s12">
          <div class="input-field">
            <input type="email" id="login" class="validate" v-model="username" />
            <label for="login">Email</label>
            <span class="helper-text" data-error="Felaktig format."></span>
          </div>
        </div>
        <div class="col s12">
          <div class="input-field">
            <label for="password">Lösenord</label>
            <input type="password" id="password" v-on:blur="jumpOffInput" :class="{focus:isActive}" v-model="password" />
          </div>
        </div>
        <div class="col center s12 left-align">
          <a class="btn waves-effect waves-light red darken-4" @click="login()">Logga In</a>
          <router-link to="/Register" class="btn waves-effect waves-light red darken-4">Registrera</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import { auth} from "@/firebase/firebase";
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
    jumpOffInput() {
      
    },
    async login() {
      this.isActive=false
      let user = await auth
        .signInWithEmailAndPassword(this.username, this.password)
        .catch(error => {error.message="Felaktigt användarnamn eller lösenord.";M.toast({ html: error.message })})
      if (user) {
        
        this.$router.push("secure");
      }
    },
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
.btn {
  margin: 2%;
}
</style>