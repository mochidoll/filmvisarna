<template>
  <div class="container center">
    <div class="row z-depth-1 white">
      <div class="nav-wrapper">

        <div class="row nav-choices valign-wrapper">

          <div @click="back" v-if="showOrNot" class="row col s4 nav-buttons backwards left-align valign-wrapper hide-on-small-only">
            <i class="col s2 material-icons left-align">arrow_back_ios</i>
            <h6 class="col s10">{{ before }}</h6>
          </div>

          <h4 v-if="showOrNot" class="col s12 m4 nav-text center">{{navText}}</h4>

          <div @click="forward" v-if="showOrNot" class="row col s4 nav-buttons forward right-align hide-on-small-only">
            <h6 class="col s10">{{ after }}</h6>
            <i class="col s2 material-icons right-align">arrow_forward_ios</i>
          </div>

        </div>
        
        <div v-if="showOrNot" class="divider"></div>
      </div>
      <router-view ref="contentView" @changeNavText="changeNavText"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
    auditorium: Object
  },

  data() {
    return {
      navText: null,
    }
  },

  methods: {
    changeNavText(value) {
      this.navText = value
    },

    back() {
      switch (this.navText) {
        case this.$store.state.navTexts[1]:
          this.$store.state.bookingObject.adultTickets = 0
          this.$store.state.bookingObject.childTickets = 0
          this.$store.state.bookingObject.seniorTickets = 0
          this.$router.push({name: 'Home'})
          break
        case this.$store.state.navTexts[2]:
          this.$refs.contentView.goBackToSelectTickets()
          break
        case this.$store.state.navTexts[3]:
          this.$refs.contentView.backToSelectSeats()
          break
      }
    },

    forward() {
      switch (this.navText) {
        case this.$store.state.navTexts[1]:
          this.$refs.contentView.continueToSelectSeats()
          break
        case this.$store.state.navTexts[2]:
          this.$refs.contentView.goToConfirmDetails()
          break
        case this.$store.state.navTexts[3]:
          this.$refs.contentView.confirmBooking()
          break
      }
    }
  },

  computed: {

    showOrNot() {
      return this.navText !== this.$store.state.navTexts[4]
    },

    after() {
      let index = this.$store.state.navTexts.indexOf(this.navText)

      if(index === 4) {
        return this.$store.state.navTexts[index]
      }
        return this.$store.state.navTexts[index + 1]
    },

    before() {
      let index = this.$store.state.navTexts.indexOf(this.navText)
      return this.$store.state.navTexts[index - 1]
    }
  },
}
</script>

<style>
.nav-choices {
  display: block;
  margin: 1rem 0 0 !important;
}
.nav-buttons h6 {
  margin: 0;
}
.nav-buttons {
  color: grey;
  cursor: pointer;
}
.row {
  margin: 2rem 0;
}
.breadcrumb:before {
  color: black;
}
</style>