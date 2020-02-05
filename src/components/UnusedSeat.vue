<template>
<div>
    <a :class="seat" @click="logPosition">({{this.position}})</a>
    <p>{{this.x}} {{this.y}}</p>
 </div>
</template>

<script>
export default {
  props: ["position"],
  data() {
    return {
      x: 0,
      y: 0
    };
  },
  methods: {
    logPosition() {
      this.x = this.position.x;
      this.y = this.position.y;
      window.console.log(this.x + " " + this.y);
      this.$emit("selectedSeat", this.x, this.y);
    }
  }
};
</script>