<template>
  <div class="container">
    <div class="white-text row" id="transparent">
      <div class="col s12 m6 l5 left">
        <h5>Kontakt</h5>
        <div class="aside-text">
          <i class="material-icons tiny left">map</i>
          <p>Filmvisarna AB, Kalkstensvägen 3, 225 89 Småstad, Sverige</p>
        </div>

        <div class="aside-text">
          <i class="material-icons tiny left">email</i>
          <p>info@bfilmvisarna.com</p>
        </div>

        <div class="aside-text">
          <i class="material-icons tiny left">phone</i>
          <p>+46 70 12 346 789</p>
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

      <div class="col s12 center googlemaps">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2248.842850560424!2d13.20932601582593!3d55.69171988053712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653979677c463cf%3A0xdc335a111238b2d7!2sKalkstensv%C3%A4gen%203%2C%20224%2078%20Lund!5e0!3m2!1sen!2sse!4v1581420074658!5m2!1sen!2sse"
          width="800"
          height="300"
          frameborder="0"
          style="border:0;"
          allowfullscreen
        ></iframe>
      </div>
    </div>
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
i {
  position: relative;
  bottom: -4px;
}

@media screen and (max-width: 363px) {
  .container {
    font-size: 0.7em;
  }
}

@media screen and (min-width: 601px) and (max-width: 670px) {
  .container {
    font-size: 0.8em;
  }
  h5 {
    font-size: 1.5em;
  }
}

.googlemaps {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 300px;
}
.googlemaps iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>