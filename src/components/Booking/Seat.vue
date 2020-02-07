<template>
    <button
      @click="onClick()"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :disabled='disableSeat && !isSelected'
      :class="{'red darken-4': isSelected, black: !isSelected && !disableSeat,
       'red lighten-2': hover && !disableSeat, 'grey lighten-2': !isSelected && disableSeat}"
      class="white-text seats"
    ></button>
</template>

<script>
export default {
  props: ["position", "disableSeat"],
  data() {
    return {
      isSelected: false,
      hover: false
    };
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
button{
  border-style: none;
}
@media screen and (min-width: 900px) and (max-width: 1100px) {
  .seats{
   width: 4vmin;
  height: 4vmin;
  }
}

</style>