<template>
  <section v-if="campaigns.length">
    <div class="container">
      <h2>Volunteerathons to raise money for this nonprofit</h2>
      <div class="volunteerathon__campaign-wrapper columns">
        <div class="volunteerathon__campaign-item column is-one-fifth" v-for="(campaign, index) in campaigns">
          <div class="volunteerathon__campaign-content">
            <router-link :to="`/campaigns/${campaign.campaign_id}`">
              <figure class="volunteerathon__campaign-image" :style="{backgroundImage: `url(${campaign.pictures[0]})`}">
              </figure>
              <h4 v-html="campaign.name"></h4>
            </router-link>
            <p>
              By <span v-html="campaign.campaigner.fullname"></span><br>
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
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.02);
    }
  }
  &__campaign-content {
    h4 {
      font-size: 18px;
      transition: color 0.2s ease-in-out;

      @include breakpoint($desktop) {
        line-height: 18px;
        min-height: 38px;
        max-height: 38px;
        margin-bottom: 0;
        font-size: 18px;
        overflow: hidden;
      }
      &:hover {
        color: $color-emphasis-alt;
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
