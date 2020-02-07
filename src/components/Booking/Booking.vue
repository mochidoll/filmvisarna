<template>
  <div class="container center">
    <div class="row z-depth-1 white">
      <div class="container center navbar">
        <div class="nav-wrapper">
          <div class="s12">

            <div class="nav-choices">

             <div @click="back" v-if="showOrNot" class="backwards">
                <span class="">
                <i class="material-icons">arrow_back_ios</i>
                </span>
                <h6><i>{{ before }}</i></h6>
              </div>

              <h4 v-if="showOrNot" class="nav-text">{{navText}}</h4>

              <div @click="forward" v-if="showOrNot" class="forward">
                <h6><i>{{ after }}</i></h6>
                <span class="">
                <i class="material-icons">arrow_forward_ios</i>
                </span>
              </div>
            </div>

          </div>
        </div>
        <div class="divider"></div>
      </div>
      <router-view @changeNavText="changeNavText"></router-view>
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
          this.$router.push({name: 'Home'})
          break
        case this.$store.state.navTexts[2]:
          break
        case this.$store.state.navTexts[3]:
          break
      }
    },

    forward() {

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
  }
}
</script>

<style>



.nav-choices {
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
}
.nav-choices h6 {
  margin: 0;
}
.nav-choices .forward {
  display: flex;
}
.nav-choices .backwards {
  display: flex;
}
.row {
  padding-top: 2rem;
  margin: 2rem 0;
}
.breadcrumb:before {
  color: black;
}
</style>