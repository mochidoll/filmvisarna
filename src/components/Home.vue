<template>
  <div class="container">
    <MovieList />
  </div>
</template>

<script>
import MovieList from "@/components/MovieList";

export default {
  name: "Home",
  components: {
    MovieList
  },

  created() {
    this.$store.dispatch("getMovies");
    this.$store.dispatch("getScreenings");
  }
};
</script>

<style>
</style>
