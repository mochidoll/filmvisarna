<template>
    <span
      @click="onClick()"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :class="{'red darken-4': isSelected, black: !isSelected,
       disabled: disableSeat && !isSelected,
       'red lighten-2': hover}"
      class="white-text seats"
    >
    </span>
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
  width: 3px;
  height: 5vmin;

}
</style>