<template>
  <div class="container center">
    <div class="booking-wrapper row z-depth-1 white" v-if="loadTicketContent">
      <div v-if="showOrNot" class="booking nav-wrapper">
        <div v-if="!showErrorText" class="row nav-choices valign-wrapper">
          <div
            @click="back"
            v-if="(showOrNot && !hideArrow)"
            class="row col s2 m4 nav-buttons backwards left-align valign-wrapper"
          >
            <i class="col s2 material-icons left-align">arrow_back_ios</i>
            <h6 class="col s10 hide-on-small-only">{{ before }}</h6>
          </div>

          <h4 v-if="showOrNot" class="col s8 m4 nav-text">{{navText}}</h4>

          <div
            @click="forward"
            v-if="showOrNot"
            class="row col s2 m4 nav-buttons forward right-align"
          >
            <h6 class="col s10 hide-on-small-only">{{ after }}</h6>
            <i class="col s2 material-icons">arrow_forward_ios</i>
          </div>
        </div>

        <div v-if="showErrorText" class="row nav-choices valign-wrapper">
          <h5 class="col s12 nav-text red-text">{{ errorText }}</h5>
        </div>

        <div v-if="showOrNot" class="divider"></div>
      </div>
      <router-view
        @toggleErrorText="toggleErrorText"
        ref="contentView"
        @changeNavText="changeNavText"
      ></router-view>
    </div>
    <div v-else class="valign-wrapper wait-spinner">
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-red-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
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
      feedback: null,
      showErrorText: false,
      errorText: null
    };
  },

  methods: {
    toggleErrorText(payload) {
      switch (payload.component) {
        case 1:
          this.errorText = "Du måste välja minst en biljett..";
          this.showErrorText = true;
          break;
        case 2:
          this.errorText = `Du måste välja minst ${payload.numberOfTickets} plats(er)..`;
          this.showErrorText = true;
          break;
        case 3:
          this.errorText = "Du måste skriva in en giltig email..";
          this.showErrorText = true;
          break;
      }

      setTimeout(() => {
        this.showErrorText = false;
      }, 2000);
    },

    changeNavText(value) {
      this.navText = value;
    },

    back() {
      switch (this.navText) {
        case this.$store.state.navTexts[1]:
          this.$store.state.bookingObject.adultTickets = 0;
          this.$store.state.bookingObject.childTickets = 0;
          this.$store.state.bookingObject.seniorTickets = 0;
          this.$router.push({ name: "Home" });
          break;
        case this.$store.state.navTexts[2]:
          this.$refs.contentView.goBackToSelectTickets();
          break;
        case this.$store.state.navTexts[3]:
          this.$refs.contentView.backToSelectSeats();
          break;
      }
    },

    forward() {
      switch (this.navText) {
        case this.$store.state.navTexts[1]:
          this.$refs.contentView.continueToSelectSeats();
          break;
        case this.$store.state.navTexts[2]:
          this.$refs.contentView.goToConfirmDetails();
          break;
        case this.$store.state.navTexts[3]:
          this.$refs.contentView.confirmBooking();
          break;
      }
    }
  },

  computed: {
    hideArrow() {
      return this.navText === this.$store.state.navTexts[1];
    },
    loadTicketContent() {
      return (
        this.$store.state.screenings[0] &&
        this.$store.state.auditoriums[0] &&
        this.$store.state.movies[0]
      );
    },
    showOrNot() {
      return this.navText !== this.$store.state.navTexts[4];
    },

    after() {
      let index = this.$store.state.navTexts.indexOf(this.navText);

      if (index === 4) {
        return this.$store.state.navTexts[index];
      }
      return this.$store.state.navTexts[index + 1];
    },

    before() {
      let index = this.$store.state.navTexts.indexOf(this.navText);
      return this.$store.state.navTexts[index - 1];
    }
  },

  beforeDestroy() {
    let obj = {
      adultTickets: 0,
      seniorTickets: 0,
      childTickets: 0,
      screeningId: null
    };
    this.$store.commit("setBookingObject", obj);
  }
};
</script>

<style>
.forward i {
  padding: 0 0 0 0 !important;
  margin: 0 0 0 -0.5em !important;
}
.nav-choices {
  display: flex;
  align-items: center;
}

.booking-wrapper {
  border-radius: 15px;
}
.forward i {
  padding: 0 0 0 0 !important;
  margin: 0 0 0 -0.5em !important;
}
.wait-spinner {
  height: 60vh;
  justify-content: center;
}
.booking {
  min-height: 80px;
}
.nav-choices {
  display: block;
  margin: 1rem 0 0 !important;
}
.nav-choices h5 {
  font-weight: bold;
}
.nav-buttons h6 {
  margin: 0;
}
.nav-buttons {
  color: grey;
  cursor: pointer;
}
</style>