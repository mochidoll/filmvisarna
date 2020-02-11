<template>
  <button
    @click="onClick()"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :disabled="isBooked || (disableSeat && !isSelected)"
    :class="{
      'red lighten-2': hover && !disableSeat && !isBooked, 
      'red accent-2':isSelected && hover && !isBooked, 
      'red darken-4': isSelected && !hover,
      'blue': isBooked,
      black: !isSelected && !disableSeat && !isBooked,
      'grey lighten-2': disableSeat && !isSelected && !isBooked}"
    class="white-text seats"
  >
    <!--
    red darken-4: Selected Seat
    black: unselected Seat
    grey lighten-1: Booked seat
    red lighten-2: hover effect
    grey lighten-2: disabled seat

    Vars: disableSeat, isSelected, isBooked, hover
    -->
  </button>
</template>

<script>
export default {
  props: ["position", "disableSeat", "screeningId"],
  data() {
    return {
      isSelected: false,
      isBooked: false,
      hover: false
    };
  },
  computed: {
    bookedSeats() {
      return this.$store.state.bookings.filter(filterBooking => {
        if (filterBooking.screeningId === this.screeningId) {
          //window.console.log(filterBooking)
          return filterBooking;
        }
      });
    }
  },
  methods: {
    onClick() {
      this.changeSelectedState();
      this.changeCurrentTicket();
      this.updateParentPositions();
    },
    changeSelectedState() {
      this.isSelected = !this.isSelected;
    },
    changeCurrentTicket() {
      if (this.isSelected) {
        this.$emit("addToCurrentTicket");
      } else if (!this.isSelected) {
        this.$emit("removeFromCurrentTicket");
      }
    },
    updateParentPositions() {
      if (this.isSelected) {
        this.$emit("pushToPositions", this.position);
      } else if (!this.isSelected) {
        this.$emit("removeFromPositions", this.position);
      }
    },
    checkIfSeatIsBooked() {
      if (this.position.y === 1) {
        this.isBooked = true;
      }
    }
  },
  created() {
    this.checkIfSeatIsBooked();
  }
};
</script>

<style scoped>
.seats {
  margin: 1px;
  border-radius: 5px;
  width: 5vmin;
  height: 5vmin;
}
button {
  border-style: none;
}
@media screen and (min-width: 900px) and (max-width: 1100px) {
  .seats {
    width: 4vmin;
    height: 4vmin;
  }
}
</style>