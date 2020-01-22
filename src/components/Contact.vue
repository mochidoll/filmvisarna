<template>
  <div class="container">
    <aside class="z-depth-2">
      <div class="contact left">
        <div>
          <h5>Contact</h5>
        </div>

        <div class="aside-text">
          <i class="material-icons tiny left">map</i>

          <p> B-filmer AB, Gladafilmersvägen 69, 225 89 Skärmen, Sverige</p>
        </div>

        <div class="aside-text">
          <i class="material-icons tiny left">email</i>
          <p> bfilmer.info@bfilmer.com</p>
        </div>

        <div class="aside-text">
          <i class="material-icons tiny left">phone</i>
          <p> +467012346789</p>
        </div>
      </div>

      <div class="business-hours">
        <h5>Business hours</h5>
        <ul>
          <li>Mon: 08:00-24:00</li>
          <li>Tue: 08:00-24:00</li>
          <li>Wed: 08:00-24:00</li>
          <li>Thu: 08:00-24:00</li>
          <li>Fri: 08:00-24:00</li>
          <li>Sat: 08:00-24:00</li>
          <li>Sun: 08:00-24:00</li>
        </ul>
      </div>
    </aside>
    <!--Google Map karta-->
  </div>
</template>

<script>
export default {
  name: "contact"
};
</script>
<style scoped>
.aside-text{
    display: flex;
    align-items: center;
    
}
i{
    margin-right: 1rem;
}
aside {
  padding: 3rem;
  margin: 3rem;
  display: flex;
  flex-wrap: wrap;
}

ul {
  margin-left: 2rem;
}
.contact {
  margin-right: 5rem;
  margin-bottom: 2rem;
}
</style>