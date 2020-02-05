<template>
  <div class="container confirm-booking center">
    <div class="row inner-container">
      <h4 class="center col s12">Kontrollera din bokning..</h4>

      <div class="col l6 m6 s12 image-container">
        <img :src="bookingObject.movie.image" alt class="responsive-img" />
      </div>

      <div class="left-align text-container col l6 m6 s12 center">
        <p>Titel: {{ bookingObject.movie.title }}</p>
        <p>Längd: {{ bookingObject.movie.length }} min</p>
        <p>Datum: {{ bookingObject.screening.startTime.toDate().toLocaleDateString() }}</p>
        <p>Tid: {{ bookingObject.screening.startTime.toDate().getHours() }}:00</p>
        <p>Salong: {{ bookingObject.auditorium.name }}</p>
        <p v-if="bookingObject.adultTickets">Vuxenbiljetter: {{ bookingObject.adultTickets}}</p>
        <p v-if="bookingObject.childTickets">Barnbiljetter: {{ bookingObject.childTickets }}</p>
        <p v-if="bookingObject.seniorTickets">Pensionärsbiljetter: {{bookingObject.seniorTickets }}</p>
        <p
          v-for="(seat, id) in bookingObject.seatPositions"
          :key="id"
        >Parkett: rad {{ seat.y + 1 }}, plats {{ seat.x}}</p>
      </div>

      <div v-if="!user" class="extra-info col s12">
        <p class="span">Ange din email för att slutföra bokningen.</p>

        <div class="input-field col m7 offset-m2">
          <i class="material-icons prefix">email</i>
          <input v-model="emailInput" id="icon_prefix" class type="email" />
          <label for="icon_prefix">Email</label>
          <span class="helper-text" data-error="Felaktig email, var god skriv in igen."></span>
        </div>
      </div>
    </div>

    <div class="nav-buttons col s12">
      <button
        @click="backToSelectSeats"
        class="btn waves-effect waves-light red darken-4 col s3 offset-s1"
      >Tillbaka</button>
      <button
        :class="{disabled: !enableContinueButton}"
        @click="confirmBooking"
        class="btn waves-effect waves-light red darken-4 col s3 offset-s4"
      >Bekräfta</button>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
import firebase from "firebase";

export default {
  data() {
    return {
      emailInput: null,
      user: null
    };
  },

  computed: {
    validEmail() {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.emailInput);
    },
    enableContinueButton() {
      return (this.validEmail || this.user)
    },
  },

  props: {
    bookingObject: {
      type: Object,
      required: true
    }
  },

  methods: {
    backToSelectSeats() {
      this.$router.push({
        name: "SelectSeats",
        params: { bookingObject: this.bookingObject }
      });
    },

    confirmBooking() {
      this.bookingObject.email = this.emailInput;

      db.collection("bookings")
        .add({
          adultTickets: this.bookingObject.adultTickets,
          childTickets: this.bookingObject.childTickets,
          seniorTickets: this.bookingObject.seniorTickets,
          numberOfTickets: this.bookingObject.numberOfTickets,
          screeningId: this.bookingObject.screeningId,
          email: this.bookingObject.email,
          seats: this.bookingObject.seatPositions,
          timeStamp: new Date()
        })
        .then(ref => {
          this.bookingObject.id = ref.id;
          /*  window.console.log('In Confirm', this.bookingObject.id) */
          this.$router.push({
            name: "BookingComplete",
            params: { bookingObject: this.bookingObject }
          });
        });
    }
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>
<style>
.confirm-booking .inner-container {
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 1rem;
  padding: 1rem;
}
.confirm-booking h4 {
  margin: 1rem 0 1.5rem !important;
  /* margin-top: 2rem !important; */
}
.confirm-booking .text-container p {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 1rem !important;
  margin: 0 0 0.5rem 0;
}
.confirm-booking img {
  border-radius: 5px;
  max-height: 40vh;
}

.confirm-booking .nav-buttons {
  margin-bottom: 1rem;
}
.span {
  margin: 1rem 0 0 !important;
}
</style>
