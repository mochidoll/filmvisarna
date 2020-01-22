<template>
  <div class="container">
    <h2 class="center">Select Tickets</h2>

    <div class="row">
      <div class="col s6 right-align">Adult Tickets</div>
      <div class="col s6">
        <a class="btn-floating red disabled" v-if="adultTickets == 0">
          <i class="material-icons">remove</i>
        </a>
        <a class="btn-floating red" v-else @click="removeAdultTicket()">
          <i class="material-icons">remove</i>
        </a>
        {{adultTickets}}
        <a class="btn-floating red" @click="addAdultTicket()">
          <i class="material-icons">add</i>
        </a>
      </div>

      <div class="col s6 right-align">Child Tickets</div>
      <div class="col s6">
        <a class="btn-floating red disabled" v-if="childTickets == 0">
          <i class="material-icons">remove</i>
        </a>
        <a class="btn-floating red" v-else @click="removeChildTicket()">
          <i class="material-icons">remove</i>
        </a>
        {{childTickets}}
        <a class="btn-floating red" @click="addChildTicket()">
          <i class="material-icons">add</i>
        </a>
      </div>

      <div class="col s6 right-align">Senior Tickets</div>
      <div class="col s6">
        <a class="btn-floating red disabled" v-if="seniorTickets == 0">
          <i class="material-icons">remove</i>
        </a>
        <a class="btn-floating red" v-else @click="removeSeniorTicket()">
          <i class="material-icons">remove</i>
        </a>
        {{seniorTickets}}
        <a class="btn-floating red" @click="addSeniorTicket()">
          <i class="material-icons">add</i>
        </a>
      </div>
      <div class="col s12 center">Total Price: {{totalTicketPrice}}</div>
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
      childTicketPrice: 65,
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
    }
  },
  computed: {
    totalTicketPrice() {
      return this.adultTickets*this.adultTicketPrice + this.childTickets*this.childTicketPrice + this.seniorTickets*this.seniorTicketPrice;
    }
  },
};
</script>

<style scoped>
</style>