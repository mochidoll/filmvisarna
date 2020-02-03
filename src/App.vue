<template>
  <div id="app">
    <nav class="nav-wrapper red darken-4">
      <div class="container">
        <router-link class="brand-logo" to="/">
          <div>
            <img class="logo responsive-img" src="@/assets/images/Clapperboard.png" alt />
          </div>
        </router-link>

        <a href="#" data-target="slide-out" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>

        <ul class="right hide-on-med-and-down">
          <li>
            <router-link to="/">Now Showing</router-link>
          </li>
          <li>
            <router-link to="/allMovies">All Movies</router-link>
          </li>
          <li>
            <router-link to="/contact">Contact</router-link>
          </li>
          <li>
            <router-link to="/login">Login</router-link>
          </li>
        </ul>

        <ul id="slide-out" class="sidenav">
          <li>
            <router-link to="/">Now Showing</router-link>
          </li>
          <li>
            <router-link to="/allMovies">All Movies</router-link>
          </li>
          <li>
            <router-link to="/contact">Contact</router-link>
          </li>
          <li>
            <router-link to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>

  <div id="main"><router-view></router-view></div>

    <footer class="page-footer black">
      <div class="container center">
        <div>
          <span class="logo-text">B-Filmer AB</span>
        </div>
        <div class="footer-text">
          <i class="material-icons tiny">map</i>
          <span>Gladafilmersvägen 69, 225 89 Skärmen, Sverige</span>
        </div>
        <div class="footer-text">
          <i class="material-icons tiny">email</i>
          <span>bfilmer.info@bfilmer.com</span>
        </div>
        <div class="footer-text">
          <i class="material-icons tiny">phone</i>
          <span>+467012346789</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    created() {
    this.$store.dispatch("getMovies");
    this.$store.dispatch("getScreenings");
    this.$store.dispatch("getAuditoriums");
  }
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }
  
  #app {
    min-height: 100vh;
    background: #ececec;
    display: flex;
    flex-direction: column;
  
  }
  #main {
    flex: 1 0 auto;
  }
    
    

  .logo {
    width: 5rem;
  }
  .logo-text{
    font-size: 1rem;
  }
  footer span {
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
  }
  footer i {
    margin-right: 0.5rem;
    display: inline-block;
    position: relative;
    bottom:-2px;
  }
  .page-footer {
    padding-bottom: 20px;
  }
</style>
