<template>
  <div class="container">
    <h2>Log in</h2>

    <div class="input-field">
      <input type="text" id="login" class="active" v-model="username" />
      <label for="login">Login</label>
    </div>

    <div class="input-field">
      <label for="password">Password</label>
      <input type="password" id="password" class="active" v-model="password" />
    </div>

    <a class="btn waves-effect waves-light red darken-4" v-if="loggedInUser" @click="login()">Log In</a>
    <a class="btn waves-effect waves-light red darken-4" v-else @click="logOut()">Log Out</a>

    <p></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      let attemptUser = this.users.filter(user => {
        return user.userName.toLowerCase() === this.username;
      })[0];

      //window.console.log(attemptUser);

      if (this.username === "admin" && this.password === attemptUser.password) {
        window.console.log("Correct");
        this.$store.commit("setLoggedInUser", attemptUser);
        this.username = "";
        this.password = "";
        this.$router.push('secure')
       // window.console.log(this.loggedInUser);
      } else {
        window.console.log("Fail");
        this.password = "";
      }
      window.console.log(this.loggedInUser);
      if (this.loggedInUser) {
        window.console.log('hej')
      }
    },
    logOut() {
      this.$store.commit("setLoggedInUser", null);
    }
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    loggedInUser() {
      return this.$store.state.loggedInUser;
    }
  }
};
</script>

<style>
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
</style>