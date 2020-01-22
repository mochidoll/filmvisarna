<template>
  <div class="container">
    <h2>Select Tickets</h2>

    <div class="row">
      <div class="col s6">Adult Tickets</div>
      <div class="col s6">
        <a class="btn-floating">
          <i class="material-icons red" @click="removeAdultTicket()">remove</i>
        </a>
        {{adultTickets}}
        <a class="btn-floating" @click="addAdultTicket()">
          <i class="material-icons red">add</i>
        </a>
      </div>

      <div class="col s6">Child Tickets</div>
      <div class="col s6">
        <a class="btn-floating">
          <i class="material-icons red" @click="removeChildTicket()">remove</i>
        </a>
        {{childTickets}}
        <a class="btn-floating" @click="addChildTicket()">
          <i class="material-icons red">add</i>
        </a>
      </div>

      <div class="col s6">Senior Tickets</div>
      <div class="col s6">
        <a class="btn-floating">
          <i class="material-icons red" @click="removeSeniorTicket()">remove</i>
        </a>
        {{seniorTickets}}
        <a class="btn-floating" @click="addSeniorTicket()">
          <i class="material-icons red">add</i>
        </a>
      </div>
      <div class="col s12">Total Price: {{totalTicketPrice}}</div>
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