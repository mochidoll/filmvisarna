<template>
  <div class="container">
    <h4 class="center">Select Tickets</h4>

    <div class="row">
      <div class="col s12 m6 right-align">Adult Tickets: {{adultTicketPrice}}:-</div>
      <div class="col s12 m6">
        <a class="btn-floating disabled btn-small" v-if="adultTickets == 0">
          <i class="material-icons">remove</i>
        </a>
        <a class="btn-floating red btn-small darken-4" v-else @click="removeAdultTicket()">
          <i class="material-icons">remove</i>
        </a>
        {{adultTickets}}
        <a
          class="btn-floating red btn-small darken-4"
          @click="addAdultTicket()"
        >
          <i class="material-icons">add</i>
        </a>
      </div>

      <div class="col s12 m6 right-align">Child Tickets: {{childTicketPrice}}:-</div>
      <div class="col s12 m6">
        <a class="btn-floating disabled btn-small" v-if="childTickets == 0">
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

      <div class="col s12 m6 right-align">Senior Tickets{{seniorTicketPrice}}:-</div>
      <div class="col s12 m6">
        <a class="btn-floating disabled btn-small" v-if="seniorTickets == 0">
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
      <div class="col s12 center">Total Price: {{totalTicketPrice}}</div>
      <div class="col m12 center">
        <button
          class="m1 btn waves-effect waves-light black white-text"
          :class="{disabled:numberOfTickets === 0}"
          @click="enterToSelectSeats"
        >Next</button>
      </div>
    </div>
  </div>
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
      childTicketPrice: 65
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
    enterToSelectSeats() {
      let bookingObject = {
        adultTickets: this.adultTickets,
        childTickets: this.childTickets,
        seniorTickets: this.seniorTickets,
        numberOfTickets: this.numberOfTickets,
        price: this.totalTicketPrice
      };
      if (this.numberOfTickets) {
        this.$store.commit("setBookingObject", bookingObject);
        this.$router.push({
          name: "selectSeats"
        });
      }
    }
  },
  computed: {
    numberOfTickets() {
      return this.adultTickets + this.childTickets + this.seniorTickets;
    },
    totalTicketPrice() {
      return (
        this.adultTickets * this.adultTicketPrice +
        this.childTickets * this.childTicketPrice +
        this.seniorTickets * this.seniorTicketPrice
      );
    }
  }
};
</script>

<style scoped>
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