<template>
  <div class="container">
    <aside class="z-depth-2">
      <div class="contact left">
        <div>
          <h5>Contact</h5>
        </div>

        <div class="aside-text">
          <i class="material-icons tiny left">map</i>

          <p>B-filmer AB, Gladafilmersvägen 69, 225 89 Skärmen, Sverige</p>
        </div>

        <div class="aside-text">
          <i class="material-icons tiny left">email</i>
          <p>bfilmer.info@bfilmer.com</p>
        </div>

        <div class="aside-text">
          <i class="material-icons tiny left">phone</i>
          <p>+467012346789</p>
        </div>
      </div>

      <div id="business-hours">
        <h5>Business hours</h5>

        <div class="left align">
          <div id="days">
            <ul class="left">
              <li>Mon - Thu:</li>
              <li>Fri - Sat:</li>
              <li>Sun:</li>
            </ul>
          </div>
          <div class="times">
            <ul class="right">
              <li>08:00 - 20:00</li>
              <li>08:00 - 24:00</li>
              <li>08:00 - 24:00</li>
            </ul>
          </div>
        </div>
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
.aside-text {
  display: flex;
  align-items: center;
}
i {
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
  margin-right: 3rem;
  margin-bottom: 2rem;
}
#business-hours {
  display: flex;
  
  flex-flow: column wrap;
}
.align{
  display: flex;
}
</style>