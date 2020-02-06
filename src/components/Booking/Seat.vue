<template>
    <button
      @click="onClick()"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :disabled='disableSeat && !isSelected'
      :class="{'red darken-4': isSelected, black: !isSelected && !disableSeat,
       'red lighten-2': hover, 'grey': !isSelected && disableSeat}"
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
  width: 3vmin;
  height: 3vmin;

}
</style>