<template>
  <button
    @click="onClick()"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :disabled="bookedSeat || (disableSeat && !isSelected)"
    :class="{
      'red lighten-2': hover && !disableSeat && !bookedSeat, 
      'red accent-2':isSelected && hover && !bookedSeat, 
      'red darken-4': isSelected && !hover,
      'grey lighten-1': bookedSeat,
      black: !isSelected && !disableSeat && ! bookedSeat,
      'grey lighten-2': disableSeat && !isSelected && !bookedSeat}"
    class="white-text seats"
  ></button>
</template>

<script>
export default {
  props: {
    position: Object,
    disableSeat: Boolean,
    bookedSeat: Boolean
  },
  data() {
    return {
      isSelected: false,
      hover: false
    };
  },
  computed: {},
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
@media screen and (min-width: 900px) and (max-width: 1251px) {
  .seats {
    width: 4vmin;
    height: 4vmin;
  }
}
</style>