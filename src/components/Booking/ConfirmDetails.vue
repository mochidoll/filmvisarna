<template>
  <div class="container confirm-booking">
    <div class="row inner-container">
   
      <div class="movie-info-wrapper valign-wrapper">
        <div class="col s5 image-wrapper">
          <img :src="bookingObject.movie.image" alt class="responsive-img" />
        </div>

        <div class="text-wrapper col s7">
          <p class="movie-title">{{ bookingObject.movie.title }}</p>
          <p>Datum: {{ bookingObject.screening.startTime.toDate().toLocaleDateString() }}</p>
          <p>Tid: {{ bookingObject.screening.startTime.toDate().getHours() }}:00</p>
          <p>{{ bookingObject.auditorium.name }}</p>
          <p><b>Totalt pris: {{ bookingObject.totalTicketPrice}} kr</b></p> 
        </div>
      </div>

      <div class="booking-detail-wrapper left-align col s12">
        <div class="ticket-details col s6">
          <p class="tickets"><b>Biljetter:</b></p>
          <p v-if="bookingObject.adultTickets">Vuxenbiljetter: {{ bookingObject.adultTickets}}</p>
          <p v-if="bookingObject.childTickets">Barnbiljetter: {{ bookingObject.childTickets }}</p>
          <p v-if="bookingObject.seniorTickets">Pensionärsbiljetter: {{bookingObject.seniorTickets }}</p>
        </div>
        <div class="seat-details col s6">
          <p class="seats"><b>Platser:</b></p>
          <p
            v-for="(seat, id) in bookingObject.seatPositions"
            :key="id"
          >
          Rad {{ seat.y + 1 }}, Plats {{ seat.x}}
          </p>
        </div>
      </div>

      <div v-if="!user.uid" class="extra-info col s12">
        <div class="input-field col m7 offset-m2">
          <i class="material-icons prefix">email</i>
          <input v-model="emailInput" id="icon_prefix" class type="email" />
          <label for="icon_prefix"><i>Skriv in din email här</i></label>
          <span class="helper-text" data-error="Felaktig email, var god skriv in igen."></span>
        </div>
      </div>
    </div>

    <div class="nav-buttons col s12">
      <button
        @click="backToSelectSeats"
        class="btn b1 waves-effect waves-light black col s6 m4"
      >Tillbaka</button>
      <button
        :class="{disabled: !enableContinueButton}"
        @click="confirmBooking(); updateBookedSeats()"
        class="btn b2 waves-effect waves-light black col s6 m4 push-m4"
      >Bekräfta</button>
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/firebase/firebase";

export default {
  data() {
    return {
      emailInput: null,
      user: {},
      onAuthStateChangedUnsubscribe: null
    };
  },
  props: {
    bookingObject: {
      type: Object,
      required: true
    }
  },

  computed: {
    validEmail() {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.emailInput);
    },
    enableContinueButton() {
      return this.validEmail || this.user.uid;
    },
    bookingUser() {
      this.$store.state.users.forEach( user => {
        if (auth.currentUser.uid === user.id) {
          return user;
        }
      });
      return null;
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
      if(this.enableContinueButton) {
        if (this.user.uid) {
        this.bookingObject.email = this.user.email;
      } else {
        this.bookingObject.email = this.emailInput;
      }
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
          if (this.user.uid) {
            this.user.bookings.push(this.bookingObject.id);

            db.collection("users")
              .doc(this.user.uid)
              .update({
                bookings: this.user.bookings
              });

            this.bookingUser.bookings.push(this.bookingObject.id);

            this.$store.commit("setBookings", this.user.bookings);
          }
          this.$router.push({
            name: "BookingComplete",
            params: { bookingObject: this.bookingObject }
          });
        })
        } else {
          let payload = { component: 3 };
          this.$emit("toggleErrorText", payload);
        }
    },
    updateBookedSeats() {
      //updates the nestled array in the screening on Firebase
      // with the seats that were just booked
      let tempSeats = this.bookingObject.screening.bookedSeats;
      this.bookingObject.seatPositions.forEach(seat => {
        tempSeats[seat.y][seat.x] = true;
      });
      db.collection("screenings")
        .doc(this.bookingObject.screeningId)
        .update({
          bookedSeats: tempSeats
        });
    }
  },
  created() {
    if(!this.bookingObject) {
      this.$router.replace({
        path: "/booking/selectTickets/" + this.$route.params.screeningId
      });
    }
    this.onAuthStateChangedUnsubscribe = auth.onAuthStateChanged(async user => {
      if (user != null) {
        let doc = await db.collection("users").doc(user.uid);

        doc = await doc.get();
        let tempUser = {};
        Object.assign(tempUser, doc.data(), user);
        this.user = tempUser;
      } else {
        this.user = {};
      }
    });
    this.$emit("changeNavText", this.$store.state.navTexts[3]);
  },
  beforeDestroy() {
    this.onAuthStateChangedUnsubscribe();
  }
};
</script>
<style>

  .confirm-booking .text-wrapper {
    text-align: left;
  }
  .confirm-booking .text-wrapper p {
    font-size: 0.8em;
    margin: 0;
  }

  .confirm-booking .text-wrapper .movie-title {
    font-size: 1.5em;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 0.3em;
  }
  .confirm-booking .booking-detail-wrapper p {
    font-size: 0.8em;
    margin: 0 !important;
  }
  .confirm-booking input {
    margin-bottom: 0!important;
  }
  .confirm-booking .input-field {
    margin-bottom: 0!important;
  }
  .confirm-booking .nav-buttons{
    margin-top: 0 !important;
  }
  .confirm-booking .b1{
    border-radius: 12px 0 0 12px;
  }
  .confirm-booking .b2{
    border-radius: 0 12px 12px 0;
    border-left: solid 1px lightgray
  }

  @media screen and (min-width: 600px) {
    .confirm-booking .text-wrapper {
      text-align: center;
    }
    .confirm-booking .text-wrapper p {
      font-size: 1.5em;
    }
    .confirm-booking .text-wrapper .movie-title {
      font-size: 2.5em;
    }
    .confirm-booking .booking-detail-wrapper {
      margin-top: 1em;
      text-align: center
    }
    .confirm-booking .booking-detail-wrapper p {
      font-size: 1.5em;
    }
    .confirm-booking .b1{
      border-radius: 12px;
      border-right: none
    }
    .confirm-booking .b2{
      border-radius: 12px;
      border-left: none;
    }
  }
</style>