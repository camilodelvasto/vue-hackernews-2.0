<template>
  <section>
    <div class="container">
      <h2>Volunteerathons to raise money for this nonprofit</h2>
      <div class="volunteerathon__campaign-wrapper columns">
        <div class="volunteerathon__campaign-item column is-one-fifth" v-for="(campaign, index) in campaigns">
          <div class="volunteerathon__campaign-content">
            <figure class="volunteerathon__campaign-image" :style="{backgroundImage: `url(${campaign.pictures[0]})`}">
            </figure>
            <h4>{{campaign.name}}</h4>
            <p>
              By {{campaign.campaigner.fullname}}<br>
            </p>
            <ProgressBar :campaign="campaign" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProgressBar from 'Components/general/ProgressBar.vue'

export default {
  props: ['campaigns'],
  components: {
    ProgressBar
  }
}
</script>

<style scoped lang="scss">
.volunteerathon {
  &__campaign-wrapper {
    margin-top: 20px;
  }
  &__campaign-image {
    width: 100%;
    height: 0;
    margin-bottom: 10px;
    padding-bottom: 75%;
    background-size: cover;
  }
  &__campaign-content {
    h4 {
      font-size: 18px;
      @include breakpoint($desktop) {
        line-height: 18px;
        min-height: 38px;
        max-height: 38px;
        margin-bottom: 0;
        font-size: 18px;
        overflow: hidden;
      }
    }
    p {
      font-size: 15px;
      line-height: 20px;
      max-height: 20px;
      overflow: hidden;
    }
    .progress-bar {
      margin-bottom: 10px;
    }
  }
}

</style>
