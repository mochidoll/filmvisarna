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

    <router-view></router-view>

    <footer class="page-footer black">
      <div class="container center">
        <div>
          <p>B-Filmer AB</p>
        </div>
        <div class="footer-text">
          <i class="material-icons tiny">map</i>
          <p>Gladafilmersvägen 69, 225 89 Skärmen, Sverige</p>
        </div>
        <div class="footer-text">
          <i class="material-icons tiny">email</i>
          <p>bfilmer.info@bfilmer.com</p>
        </div>
        <div class="footer-text">
          <i class="material-icons tiny">phone</i>
          <p>+467012346789</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }
  #app {
    background: #ececec;
  }
  .logo {
    width: 5rem;
  }
  footer p {
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
  }
  footer .footer-text {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  footer i {
    margin-right: 0.5rem;
  }
  .page-footer {
    padding-bottom: 20px;
  }
</style>
