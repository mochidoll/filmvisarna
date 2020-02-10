<template>
  <button
    @click="onClick()"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :disabled="isBooked || (disableSeat && !isSelected)"
    :class="{'red darken-4': isSelected, black: !isSelected && !disableSeat && !isBooked,
        'grey lighten-1': isBooked && !disableSeat,
       'red lighten-2': hover && !disableSeat, 'grey lighten-2': !isSelected && disableSeat}"
    class="white-text seats"
  ></button>
</template>

<script>
export default {
  props: ["position", "disableSeat", "screeningId"],
  data() {
    return {
      isSelected: false,
      isBooked: false,
      hover: false,
    };
  },
  computed: {
    bookedSeats() {
      return this.$store.state.bookings.filter(filterBooking => {
        if (filterBooking.screeningId === this.screeningId) {
          window.console.log(filterBooking)
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
      this.checkIfSeatIsBooked();
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
      //window.console.log("bookings:");
      //window.console.log(this.bookings);
      //let bookedSeats = [];

      //let bookedSeats = []
      this.bookedSeats.filter(seat => {
        window.console.log("x: " + seat.x + " y: " + seat.y)
      })
      
      let bookedSeatsArray = this.bookedSeats
      for (let bookedSeat in bookedSeatsArray) {
        //if (booking.seats === this.position)
        window.console.log("booked seat");
        window.console.log(bookedSeat);
        window.console.log(bookedSeat.x, bookedSeat.y);
      }

      /* this.bookings.forEach(booking => {
        return booking.seats
      });
      */
      if (this.position.y === 1 && this.position.x === 2) {
        this.isBooked = true;
      }
    }
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