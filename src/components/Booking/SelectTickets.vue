<template>
  <section class="center">
    <div class="big-container row" v-if="screeningChosen">
      <div class="movie-info col l6 row hide-on-med-and-down left valign-wrapper">
        <div class="col l6 m6 s6 center image-container">
          <img :src="movieChosen.image" alt class="responsive-img" />
        </div>
        <div class="left-align text col l6 m6 s6">
          <p>Titel: {{ movieChosen.title }}</p>
          <p>Längd: {{ movieChosen.length }} min</p>
          <p>Datum: {{ screeningChosen.startTime.toDate().toLocaleDateString() }}</p>
          <p>Tid: {{ screeningChosen.startTime.toDate().getHours() }}:00</p>
          <p>Salong: {{ auditorium.name }}</p>
        </div>
      </div>

      <div class="select-tickets col l6 m12 s12">
        <h4 class="center">Välj Biljetter</h4>
        <div class="row">
          <div class="col s12 m6 right-align">Vuxenbiljetter: {{adultTicketPrice}}:-</div>
          <div class="col s12 m6 left-align">
            <a class="btn-floating disabled btn-small" v-if="adultTickets === 0">
              <i class="material-icons">remove</i>
            </a>
            <a class="btn-floating red btn-small darken-4" v-else @click="removeAdultTicket()">
              <i class="material-icons">remove</i>
            </a>
            {{ adultTickets }}
            <a
              class="btn-floating red btn-small darken-4"
              @click="addAdultTicket()"
            >
              <i class="material-icons">add</i>
            </a>
          </div>

          <div class="col s12 m6 right-align">Barnbiljetter: {{childTicketPrice}}:-</div>
          <div class="col s12 m6 left-align">
            <a class="btn-floating disabled btn-small" v-if="childTickets === 0">
              <i class="material-icons">remove</i>
            </a>
            <a class="btn-floating red btn-small darken-4" v-else @click="removeChildTicket()">
              <i class="material-icons">remove</i>
            </a>
            {{childTickets}}
            <a
              class="btn-floating red btn-small darken-4"
              @click="addChildTicket()"
            >
              <i class="material-icons">add</i>
            </a>
          </div>

          <div class="col s12 m6 right-align">Pensionärsbiljetter: {{seniorTicketPrice}}:-</div>
          <div class="col s12 m6 left-align">
            <a class="btn-floating disabled btn-small" v-if="seniorTickets === 0">
              <i class="material-icons">remove</i>
            </a>
            <a class="btn-floating red btn-small darken-4" v-else @click="removeSeniorTicket()">
              <i class="material-icons">remove</i>
            </a>
            {{seniorTickets}}
            <a
              class="btn-floating red btn-small darken-4"
              @click="addSeniorTicket()"
            >
              <i class="material-icons">add</i>
            </a>
          </div>
          <div class="col s12 center">Totalt: {{totalTicketPrice}}:-</div>
        </div>
      </div>

      <div class="row col s12 nav-buttons">
        <button @click="goBackToHome" class="col s2 offset-s1 btn waves-effect waves-light red darken-4 white-text">Avbryt</button>
        <button
          class="col s2 offset-s6 btn waves-effect waves-light red darken-4 white-text"
          :class="{disabled:numberOfTickets === 0}"
          @click="continueToSelectSeats"
        >Gå vidare</button>
      </div>

    </div>
    <div class="center" v-else>
      <div class="preloader-wrapper active big">
        <div class="spinner-layer spinner-red-only center">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
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
      // if (this.numberOfTickets) {
      //   this.$store.commit("setBookingObject", bookingObject);
      //   this.$router.push({
      //     name: "selectSeats"

      // this.$router.push({ name: "selectSeats" });
    },

    goBackToHome(){
      this.$router.push({name: 'Home'})
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
    movieChosen() {
      return this.$store.state.movieChosen;
    }
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

    // this.adultTickets = this.$store.state.bookingObject.adultTickets; 
  }
};
</script>

<style scoped>

.big-container .nav-buttons {
  margin: 2rem 0 1rem !important;
}
.big-container {
  margin: 2rem 0;
}
.text p {
  margin: 0 0 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
img {
  max-height: 200px;
}
/* .row {
  margin: 0;
} */
.container {
  padding: 20px;
}
h2 {
  margin: 2%;
}
.col {
  margin-bottom: 1%;
}
</style>