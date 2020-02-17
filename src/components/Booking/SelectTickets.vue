<template>
  <div>
    <p class="white-text hide">{{movieId.length}}</p>
    <section class="select-tickets-wrapper row">
      <div class="col s12 m6 l6 movie-info-wrapper valign-wrapper left-align">
        <div class="col l6 m6 s6 movie-image">
          <img :src="movieChosen.image" alt class="responsive-img" />
        </div>
        <div class="col s6 m6 l6 movie-info">
          <p>Titel: {{ movieChosen.title }}</p>
          <p>Längd: {{ movieChosen.length }} min</p>
          <p>Datum: {{ screeningChosen.startTime.toDate().toLocaleDateString() }}</p>
          <p>Tid: {{ screeningChosen.startTime.toDate().getHours() }}:00</p>
          <p>Salong: {{ auditorium.name }}</p>
          <p
            v-if="emptyAvailableSeats > 0"
            :class="{'red-text': emptyAvailableSeats < 5}"
            class="disable"
          >{{emptyAvailableSeats}} platser kvar</p>
          <p v-else class="red-text">
            <b>Fullbokat</b>
          </p>
          <p>
            <b>Totalt pris: {{ totalTicketPrice }}:-</b>
          </p>
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
        <button
          @click="goBackToHome"
          class="col s5 m3 l2 offset-m1 offset-l1 btn waves-effect waves-light red darken-4 white-text"
        >Avbryt</button>
        <button
          class="col s5 m3 l2 offset-s2 offset-l6 offset-m4 btn waves-effect waves-light red darken-4 white-text"
          :class="{disabled:(numberOfTickets === 0 || numberOfTickets > emptyAvailableSeats)}"
          @click="continueToSelectSeats"
        >Gå vidare</button>
      </div>
    </section>
  </div>
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
    movieId() {
      return filterItemFromList(
        this.$store.state.screenings,
        this.$route.params.screeningId
      );
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

    screenings() {
      return this.$store.state.screenings;
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
  margin-top: 3rem;
  position: relative;
  user-select: none;
}
.movie-image img {
  border-radius: 5px;
}
.select-tickets-wrapper h5 {
  margin: 2rem 0;
}
.select-tickets-wrapper .select-tickets {
  margin: 1rem 0 0;
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

@media screen and (min-width: 600px) {
  .select-tickets-wrapper .select-tickets-container {
    display: block;
    position: absolute;
    top: 100px;
    left: 275px !important;
  }
}
@media screen and (min-width: 600px) {
  .select-tickets-wrapper .select-tickets-container {
    display: block;
    position: relative;
    top: 30px;
    left: 0px !important;
  }
}

@media screen and (min-width: 750px) {
  .select-tickets-wrapper .select-tickets-container {
    display: block;
    position: relative;
    top: 30px;
    left: 40px !important;
  }
}

@media screen and (min-width: 850px) {
  .select-tickets-wrapper .select-tickets-container {
    display: block;
    position: relative;
    top: 30px;
    left: 40px !important;
  }
}

@media screen and (min-width: 950px) {
  .select-tickets-wrapper .select-tickets-container {
    display: block;
    position: relative;
    top: 40px;
    left: 50px !important;
  }
}

@media screen and (min-width: 1150px) {
  .select-tickets-wrapper .select-tickets-container {
    display: block;
    position: relative;
    top: 50px;
    left: 50px !important;
  }
}

@media screen and (min-width: 1250px) {
  .select-tickets-wrapper .select-tickets-container {
    display: block;
    position: relative;
    top: 60px;
    left: 50px !important;
  }
}

@media screen and (min-width: 1350px) {
  .select-tickets-wrapper .select-tickets-container {
    display: block;
    position: relative;
    top: 70px;
    left: 50px !important;
  }
}

@media screen and (min-width: 1450px) {
  .select-tickets-wrapper .select-tickets-container {
    display: block;
    position: relative;
    top: 85px;
    left: 50px !important;
  }
}
</style>