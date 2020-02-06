<template>
  <section>
    <section class="select-tickets-wrapper row">

      <h5 class="col s12 m12 l12">Välj Biljetter..</h5>

      <div class="col s12 m6 l6 movie-info-wrapper valign-wrapper">

        <div class="col l6 m6 s6 movie-image">
          <img :src="movieChosen.image" alt class="responsive-img" />
        </div>
        <div class="col s6 m6 l6 movie-info">
          <p>Titel: {{ movieChosen.title }}</p>
          <p>Längd: {{ movieChosen.length }} min</p>
          <p>Datum: {{ screeningChosen.startTime.toDate().toLocaleDateString() }}</p>
          <p>Tid: {{ screeningChosen.startTime.toDate().getHours() }}:00</p>
          <p>Salong: {{ auditorium.name }}</p>
           <p>Totalt pris: {{ totalTicketPrice }}:-</p>
        </div>

      </div>

      <div class="col s12 m6 l6 select-tickets-container">

        <div class="col s12 select-tickets valign-wrapper">
          <span class="col s12 m5 type-of-tickets">Vuxen: {{adultTicketPrice}}:-</span>
          <div class="col s12 m7 buttons">
            <a class="btn-floating disabled btn-small" v-if="adultTickets === 0">
              <i class="material-icons">remove</i>
            </a>
            <a class="btn-floating red btn-small darken-4" v-else @click="removeAdultTicket()">
              <i class="material-icons">remove</i>
            </a>
            <span class="show-nr-of-tickets">{{ adultTickets }}</span>
            <a class="btn-floating red btn-small darken-4" @click="addAdultTicket()">
              <i class="material-icons">add</i>
            </a>
          </div>
        </div>

        <div class="col s12 select-tickets valign-wrapper">
          <span class="col s12 m5 type-of-tickets">Barn: {{childTicketPrice}}:-</span>
          <div class="col s12 m7 buttons">
            <a class="btn-floating disabled btn-small" v-if="childTickets === 0">
              <i class="material-icons">remove</i>
            </a>
            <a class="btn-floating red btn-small darken-4" v-else @click="removeChildTicket()">
              <i class="material-icons">remove</i>
            </a>
            <span class="show-nr-of-tickets">{{ childTickets }}</span>
            <a class="btn-floating red btn-small darken-4" @click="addChildTicket()">
              <i class="material-icons">add</i>
            </a>
          </div>
        </div>

        <div class="col s12 select-tickets valign-wrapper">
          <span class="col s12 m5 type-of-tickets">Pensionär: {{seniorTicketPrice}}:-</span>
          <div class="col s12 m7 buttons">
            <a class="btn-floating disabled btn-small" v-if="seniorTickets === 0">
              <i class="material-icons">remove</i>
            </a>
            <a class="btn-floating red btn-small darken-4" v-else @click="removeSeniorTicket()">
              <i class="material-icons">remove</i>
            </a>
            <span class="show-nr-of-tickets">{{ seniorTickets }}</span>
            <a class="btn-floating red btn-small darken-4" @click="addSeniorTicket()">
              <i class="material-icons">add</i>
            </a>
          </div>
        </div>

      </div>

      <div class="row col s12 nav-buttons">
        <button @click="goBackToHome" class="col s5 m3 l2 offset-m1 offset-l1 btn waves-effect waves-light red darken-4 white-text">Avbryt</button>
        <button
          class="col s5 m3 l2 offset-s2 offset-l6 offset-m4 btn waves-effect waves-light red darken-4 white-text"
          :class="{disabled:numberOfTickets === 0}"
          @click="continueToSelectSeats"
        >Gå vidare</button>
      </div>

    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      adultTickets: 0,
      seniorTickets: 0,
      childTickets: 0,
      adultTicketPrice: 85,
      seniorTicketPrice: 75,
      childTicketPrice: 65,
      movieChosen: null,
      screeningChosen: null,
      auditorium: null
    };
  },
  methods: {
    addAdultTicket() {
      this.adultTickets++;
    },
    removeAdultTicket() {
      this.adultTickets--;
    },
    addChildTicket() {
      this.childTickets++;
    },
    removeChildTicket() {
      this.childTickets--;
    },
    addSeniorTicket() {
      this.seniorTickets++;
    },
    removeSeniorTicket() {
      this.seniorTickets--;
    },
    continueToSelectSeats() {
      this.bookingObject.movie = this.movieChosen;
      this.bookingObject.screening = this.screeningChosen;
      this.bookingObject.auditorium = this.auditorium;
      this.bookingObject.adultTickets = this.adultTickets;
      this.bookingObject.seniorTickets = this.seniorTickets;
      this.bookingObject.childTickets = this.childTickets;
      this.bookingObject.numberOfTickets = this.numberOfTickets;

      this.$router.push({
        name: "SelectSeats",
        params: { bookingObject: this.bookingObject }
      });
    },

    goBackToHome() {
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    numberOfTickets() {
      return this.adultTickets + this.childTickets + this.seniorTickets;
    },
    bookingObject() {
      return this.$store.state.bookingObject;
    },
    totalTicketPrice() {
      return (
        this.adultTickets * this.adultTicketPrice +
        this.childTickets * this.childTicketPrice +
        this.seniorTickets * this.seniorTicketPrice
      );
    },
  },
  created() {
    this.screeningChosen = this.$store.state.screenings.filter(screening => {
      return screening.id === this.bookingObject.screeningId;
    })[0];

    this.auditorium = this.$store.state.auditoriums.filter(auditorium => {
      return auditorium.id === this.screeningChosen.auditoriumId;
    })[0];

    this.movieChosen = this.$store.state.movies.filter(movie => {
      return movie.id === this.screeningChosen.movieId;
    })[0];

    this.adultTickets = this.bookingObject.adultTickets
    this.childTickets = this.bookingObject.childTickets
    this.seniorTickets = this.bookingObject.seniorTickets
  }
};
</script>

<style>
.select-tickets-wrapper {
  position: relative;
  user-select: none;
}
.select-tickets-wrapper h5 {
  margin: 2rem 0;
}
.select-tickets-wrapper .select-tickets {
  margin: 1rem 0 0
}
.select-tickets-wrapper p {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin: 0 0 0.5rem 0;
}

.select-tickets-wrapper .show-nr-of-tickets {
  margin: 0 0.5rem;
}

.select-tickets-wrapper .select-tickets .buttons {
  padding: 0;
}

.select-tickets-wrapper .nav-buttons {
  margin: 2rem 0 1rem !important;
}

@media screen and (max-width: 599px) {
  .select-tickets-wrapper p {
    font-size: 0.9rem;
  }
  .select-tickets-wrapper .select-tickets {
    margin-top: 1rem;
  }
  .select-tickets-wrapper .type-of-tickets {
    font-size: 0.9rem;
  }
}


@media screen and (min-width: 600px) {
  .select-tickets-wrapper .select-tickets-container {
    display: block;
    position: absolute;
    top: 100px;
    left: 275px !important;
  } 
}

@media screen and (min-width: 760px) {
  .select-tickets-wrapper .select-tickets-container {
  display: block;
  position: absolute;
  top: 100px;
  left: 365px !important;
  } 
}

@media screen and (min-width: 800px) {
  .select-tickets-wrapper .select-tickets-container {
  display: block;
  position: absolute;
  top: 120px;
  left: 385px !important;
  } 
}

@media screen and (min-width: 900px) {
  .select-tickets-wrapper .select-tickets-container {
  display: block;
  position: absolute;
  top: 130px;
  left: 440px !important;
  } 
}

@media screen and (min-width: 950px) {
  .select-tickets-wrapper .select-tickets-container {
  display: block;
  position: absolute;
  top: 140px;
  left: 465px !important;
  } 
}

@media screen and (min-width: 1000px) {
  .select-tickets-wrapper .select-tickets-container {
  display: block;
  position: absolute;
  top: 115px;
  left: 390px !important;
  } 
}

@media screen and (min-width: 1050px) {
  .select-tickets-wrapper .select-tickets-container {
  display: block;
  position: absolute;
  top: 120px;
  left: 420px!important;
  } 
}

@media screen and (min-width: 1100px) {
  .select-tickets-wrapper .select-tickets-container {
  display: block;
  position: absolute;
  top: 130px;
  left: 435px!important;
  } 
}

@media screen and (min-width: 1200px) {
  .select-tickets-wrapper .select-tickets-container {
  display: block;
  position: absolute;
  top: 145px;
  left: 480px !important;
  } 
}
</style>