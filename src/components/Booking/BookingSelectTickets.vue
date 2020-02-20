<template>
    <section class="select-tickets-wrapper row">

      <div class="col s12 m6 l6 movie-info-wrapper valign-wrapper left-align">
        <div class="col s6 m6 l6 movie-image">
          <img :src="movieChosen.image" alt class="responsive-img" />
        </div>
        <div class="col s6 m6 l6 movie-info">
          <p class="movie-title">{{ movieChosen.title }}</p>
          <p>Datum: {{ screeningChosen.startTime.toDate().toLocaleDateString() }}</p>
          <p>Tid: {{ screeningChosen.startTime.toDate().getHours() }}:00</p>
          <p>{{ auditorium.name }}</p>
          <p
            v-if="emptyAvailableSeats > 0"
            :class="{'red-text': emptyAvailableSeats < 5}"
            class="disable"
          >{{emptyAvailableSeats}} platser kvar</p>
          <p v-else class="red-text">
            <b>Fullbokat</b>
          </p>
        </div>
      </div>

      <div class="col s12 m6 l6 select-tickets-container">

        <div class="col s12 select-tickets valign-wrapper">
          <span class="col s6 m5 type-of-tickets">Vuxen: {{adultTicketPrice}}:-</span>
          <div class="col s6 m7 buttons">
            <a class="btn-floating disabled btn-small" v-if="adultTickets === 0">
              <i class="material-icons">remove</i>
            </a>
            <a class="btn-floating black btn-small" v-else @click="removeAdultTicket()">
              <i class="material-icons">remove</i>
            </a>
            <span class="show-nr-of-tickets">{{ adultTickets }}</span>
            <a class="btn-floating black btn-small" @click="addAdultTicket()" :class="{disabled: numberOfTickets === emptyAvailableSeats}">
              <i class="material-icons">add</i>
            </a>
          </div>
        </div>

        <div class="col s12 select-tickets valign-wrapper">
          <span class="col s6 m5 type-of-tickets">Barn: {{childTicketPrice}}:-</span>
          <div class="col s6 m7 buttons">
            <a class="btn-floating disabled btn-small" v-if="childTickets === 0">
              <i class="material-icons">remove</i>
            </a>
            <a class="btn-floating black btn-small" v-else @click="removeChildTicket()">
              <i class="material-icons">remove</i>
            </a>
            <span class="show-nr-of-tickets">{{ childTickets }}</span>
            <a class="btn-floating black btn-small" @click="addChildTicket()" :class="{disabled: numberOfTickets === emptyAvailableSeats}">
              <i class="material-icons">add</i>
            </a>
          </div>
        </div>

        <div class="col s12 select-tickets valign-wrapper">
          <span class="col s6 m5 type-of-tickets">Pensionär: {{seniorTicketPrice}}:-</span>
          <div class="col s6 m7 buttons">
            <a class="btn-floating disabled btn-small" v-if="seniorTickets === 0">
              <i class="material-icons">remove</i>
            </a>
            <a class="btn-floating black btn-small" v-else @click="removeSeniorTicket()">
              <i class="material-icons">remove</i>
            </a>
            <span class="show-nr-of-tickets">{{ seniorTickets }}</span>
            <a class="btn-floating black btn-small" @click="addSeniorTicket()" :class="{disabled: numberOfTickets === emptyAvailableSeats}">
              <i class="material-icons">add</i>
            </a>
          </div>
        </div>
      </div>

        <div class="col s12 total-price">
          <p class="col s12 m4 push-m8"> Totalpris: <b>{{ totalTicketPrice }}:-</b></p>
        </div>

      <div class="row col s12 nav-buttons">
        <button
          class="col s12 m4 l4 push-m8 push-l8  btn waves-effect waves-light black white-text"
          :class="{disabled:(numberOfTickets === 0 || numberOfTickets > emptyAvailableSeats)}"
          @click="continueToSelectSeats"
        >Gå vidare</button>
      </div>
    </section>
</template>

<script>
import {
  filterItemFromList,
  returnSumOfEmptySeats
} from "../utils/logicUtils.js";

export default {
  data() {
    return {
      adultTickets: 0,
      seniorTickets: 0,
      childTickets: 0,
      adultTicketPrice: 85,
      seniorTicketPrice: 75,
      childTicketPrice: 65,
      payload: null,
      screeningIDS: null
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
      if (this.numberOfTickets !== 0) {
        this.bookingObject.movie = this.movieChosen;
        this.bookingObject.screening = this.screeningChosen;
        this.bookingObject.auditorium = this.auditorium;
        this.bookingObject.adultTickets = this.adultTickets;
        this.bookingObject.seniorTickets = this.seniorTickets;
        this.bookingObject.childTickets = this.childTickets;
        this.bookingObject.numberOfTickets = this.numberOfTickets;
        this.bookingObject.totalTicketPrice = this.totalTicketPrice;

        this.$router.push({
          name: "SelectSeats",
          params: { bookingObject: this.bookingObject }
        });
      } else {
        let payload = { component: 1 };
        this.$emit("toggleErrorText", payload);
      }
    },

    goBackToHome() {
      this.$router.push({ name: "Home" });
    }
  },
  computed: {
    screeningIDs() {
      return this.$route.params.screeningId;
    },
    movies() {
      return this.$store.state.movies;
    },
    screeningChosen() {
      return filterItemFromList(
        this.$store.state.screenings,
        this.$route.params.screeningId
      );
    },
    auditorium() {
      return filterItemFromList(
        this.$store.state.auditoriums,
        this.screeningChosen.auditoriumId
      );
    },
    movieChosen() {
      return filterItemFromList(
        this.$store.state.movies,
        this.screeningChosen.movieId
      );
    },
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
    emptyAvailableSeats() {
      return returnSumOfEmptySeats(this.screeningChosen.bookedSeats);
    }
  },
  created() {
    this.adultTickets = this.bookingObject.adultTickets;
    this.childTickets = this.bookingObject.childTickets;
    this.seniorTickets = this.bookingObject.seniorTickets;

    this.$emit("changeNavText", this.$store.state.navTexts[1]);
  }
};
</script>

<style>
.select-tickets-wrapper {
  margin: 1rem 0 0 0 !important;
  position: relative;
  user-select: none;
}
.select-tickets-wrapper h5 {
  margin: 2rem 0;
}
.select-tickets-wrapper p {
  font-size: 0.8rem;
  margin: 0 0 0.5rem 0;
}
 .select-tickets-wrapper .select-tickets-container {
   padding: 0 !important;
 }
 .select-tickets-wrapper .select-tickets-container div, .select-tickets-wrapper .select-tickets-container span {
   padding: 0 !important;
 }
.select-tickets-wrapper .movie-info-wrapper{
  margin: 0 0 2em 0!important;
  padding: 0 !important;
}
.select-tickets-wrapper .movie-info{
  line-height: 1;
  margin: 0 0 0 0 !important;
  padding: 0 0 0 0 !important;
}
.select-tickets-wrapper .movie-title{
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.3rem;
}
.select-tickets-wrapper .movie-image{
  margin: 0 1.5rem 0 0 !important;
  padding: 0 0 0 2rem !important;
}
.select-tickets-wrapper .show-nr-of-tickets {
  margin: 0 0.5rem;
}
.select-tickets-wrapper .select-tickets .buttons {
  padding: 0;
}
.select-tickets-wrapper .nav-buttons {
  margin: 0.5rem 0 0 !important;
}
.select-tickets-wrapper .nav-buttons button {
   border-radius: 12px;
}
.select-tickets-wrapper .total-price p{
  font-size: 1.5em;
  margin: 1rem 0 0 0 !important;
}
.movie-image img {
  border-radius: 5px;
}


@media screen and (min-width: 600px) {
  .select-tickets-wrapper .select-tickets-container {
    display: block;
    position: relative;
    top: 20px;
    left: 0px !important;
  }
  .select-tickets-wrapper .movie-title{
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.3rem;
  }
  .select-tickets-wrapper p {
  font-size: 0.8rem;
  margin: 0 0 0.5rem 0;
  }
}

@media screen and (min-width: 750px) {
  .select-tickets-wrapper .select-tickets-container {
    top: 40px;
    left: 10px !important;
  }
  .select-tickets-wrapper .movie-title{
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.3rem;
  }
  .select-tickets-wrapper p {
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  }
}

@media screen and (min-width: 850px) {
  .select-tickets-wrapper .select-tickets-container {
    top: 60px;
    left: 30px !important;
  }
  .select-tickets-wrapper p {
  font-size: 1.2rem;
  line-height: 1;
  }
  .select-tickets-wrapper .type-of-tickets{
    font-size: 1.2rem;
  }
  .select-tickets-wrapper .show-nr-of-tickets {
    font-size: 1.2rem;
}
}

@media screen and (min-width: 950px) {
  .select-tickets-wrapper .select-tickets-container {
    top: 70px;
    left: 20px !important;
  }
}
@media screen and (min-width: 1150px) {
  .select-tickets-wrapper .select-tickets-container {
    top: 75px;
    left: 20px !important;
  }
}

@media screen and (min-width: 1250px) {
  .select-tickets-wrapper .select-tickets-container {
    top: 85px;
    left: 30px !important;
  }
}

@media screen and (min-width: 1350px) {
  .select-tickets-wrapper .select-tickets-container {
    top: 70px;
    left: 50px !important;
  }
}

@media screen and (min-width: 1450px) {
  .select-tickets-wrapper .select-tickets-container {
    top: 115px;
    left: 50px !important;
  }
}
</style>