<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content donate-view donate-view__wrapper">
      <h2 class="page-title" v-if="parent === 'nonprofit'">
        <span class="page-title__first">Donate to</span> <span class="page-title__second">{{nonprofit.NAME}}</span>
      </h2>
      <h2 class="page-title" v-if="parent === 'campaign'">
        <span class="page-title__first">Support {{campaign.campaigner.name}}'s Volunteerathon</span> <span class="page-title__second">{{campaign.name}}</span>
      </h2>
      <DonateForm
        :trigger="donationData.initiator.trigger"
      ></DonateForm>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import DonateForm from "Components/donate/DonateForm.vue"

Vue.use(VueMeta)

export default {
  props: [ "parent" ],
  name: "nonprofit",
  components: {
    DonateForm
  },
  data () {
    return {
      bottom: false,
      title: "",
      fields: []
    }
  },
  computed: {
    campaign () {
      return this.$store.state.campaign
    },
    nonprofit () {
      return this.$store.state.nonprofit
    },
    donationData () {
      return this.$store.state.userActions.donation
    },
    common () {
      return this.$store.state.common
    }
  },
  mounted () {
    document.body.classList.add('no-scroll')
  },
  destroyed () {
    document.body.classList.remove('no-scroll')
  }
}

</script>

<style scoped lang="scss">
.modal {
  .modal-background {
    background: rgba($white, 0.9);
  }
  .modal-content {
    margin-top: 5vh;
    box-shadow: 0 0 50px rgba($color-text, 0.3);
    max-height: calc(90vh);
    border: none;
    border-radius: 10px;
    width: 880px;
  }
}

.donate-view {
  .page-title {
    text-align: center;
    color: $color-text;
    font-weight: bold;
    &__first {
      display: block;
      font-weight: normal;
      font-size: 26px;
      margin-bottom: 10px;

      @include breakpoint($tablet) {
        margin-bottom: 0;
      }
    }
    &__second {
      color: $color-emphasis-alt;      
    }
  }
}
</style>
