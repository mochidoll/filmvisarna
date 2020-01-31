<template>
  <span>
    <span
      @click="changeSelectedState()"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :class="{'red darken-4': isSelected, black: !isSelected,
       disabled: disableSeat && !isSelected,
       'red lighten-2': hover}"
      class="btn white-text seats"
    >{{this.position.x}}</span>
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
    changeSelectedState() {
      this.isSelected = !this.isSelected;
      if (this.isSelected) {
        this.$emit("addToCurrentTicket");
      } else if (!this.isSelected) {
        this.$emit("removeFromCurrentTicket");
      }
    }
  }
};
</script>

<style scoped>
.seats {
  margin: 1%;
  border-radius: 10px;
}
</style>