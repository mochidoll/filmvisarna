<template>
  <span>
    <span
      @click="changeColor"
      :class="{'red darken-4': isSelected, black: !isSelected}"
      class="btn white-text seats"
    >
    {{this.position.x}}
    </span>
  </span>
</template>

<script>
export default {
  props: ["position"],
  data() {
    return {
      isSelected: false,
    };
  },
  methods: {
    changeColor() {
      this.isSelected = !this.isSelected;
      this.$emit('showPosition', this.position)
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