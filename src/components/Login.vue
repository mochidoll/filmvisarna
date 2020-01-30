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

    <a class="btn waves-effect waves-light red darken-4" href>Log In</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  }
};
</script>

<style>
.input-field input[type=text]:focus, input[type=password]:focus{
     border-bottom: 1px solid #000 !important;
     box-shadow: 0 1px 0 0 #000 !important;
   }
 
    .input-field{
      color: black !important;
    }
    label{
      color: #3f3f3f !important; 
    }
</style>