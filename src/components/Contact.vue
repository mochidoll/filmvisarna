<template>
  <div class="container">
    <div class="row z-depth-2 ">

      <div class="col s12 m6 l5 left">
        <h5>Kontakt</h5>
        <div class="aside-text">
          <i class="material-icons tiny left">map</i>
          <p>Filmvisarna AB, Gladafilmersvägen 123, 225 89 Småstad, Sverige</p>
        </div>

        <div class="aside-text">
          <i class="material-icons tiny left">email</i>
          <p>info@filmvisarna.com</p>
        </div>

        <div class="aside-text">
          <i class="material-icons tiny left">phone</i>
          <p>+467012346789</p>
        </div>
      </div>

      <div class="col s12 m6 l5 right">
          <div class="col s12 m12 l12">
            <h5>Öppettider</h5>
          </div>
          <div class="col">
            <ul>
              <li>Mån - Tor:</li>
              <li>Fre - Lör:</li>
              <li>Sön:</li>
            </ul>
          </div>
          <div class="col">
            <ul>
              <li>08:00 - 20:00</li>
              <li>08:00 - 24:00</li>
              <li>08:00 - 24:00</li>
            </ul>
          </div>
      </div>
    </div>

    <!--Google Map karta-->
  </div>
</template>

<script>
export default {
  name: "contact"
};
</script>
<style scoped>
.row {
  padding: 7%;
  margin: 2rem;
}
i{
  position: relative;
  bottom:-4px;
}
</style>