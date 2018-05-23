<template>
  <div class="progress-bar__wrapper">
    <div class="progress-bar campaign-pledge__progress-wrapper">
      <div class="campaign-pledge__progress-bar"
        :style="{width: 100*campaign.currentStats.donated / campaign.currentStats.goal + '%'}"></div>
    </div>
    <p>
      {{campaign.currentStats.donated | usd}} raised of {{campaign.currentStats.goal | usd}}
    </p>
  </div>
</template>

<style scoped lang="scss">
.campaign-pledge {
  &__progress-wrapper {
    display: block;
    background: $color-light-gray;
    height: 20px;
    border-radius: 20px;
    overflow: hidden;
    display: none;

    @include breakpoint($tablet) {
      display: block;
    }

  }
  &__progress-bar {
    display: inline-block;
    background: $color-emphasis-alt;
    height: 20px;
  }
}

p {
  margin-top: 10px;
  font-size: 15px;
  line-height: 15px;
  max-height: 15px;
  overflow: hidden;
}

</style>

<script>
export default {
  props: [ 'campaign' ]
}
</script>
