<template>
  <div :class="`progress-bar__wrapper ${size}`">
    <p v-if="size === 'large'" :class="`${size}`">
      {{campaign.currentStats.donated | usd}} raised of {{campaign.currentStats.goal | usd}}
    </p>
    <div :class="`progress-bar campaign-pledge__progress-wrapper ${size}`">
      <div :class="`campaign-pledge__progress-bar ${size}`"
        :style="{width: 100*campaign.currentStats.donated / campaign.currentStats.goal + '%'}"></div>
    </div>
    <p v-if="size !== 'large'">
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

    @include breakpoint($tablet) {
      display: block;
    }

    &.large {
      height: 30px;
    }
  }
  &__progress-bar {
    display: inline-block;
    background: $color-emphasis-alt;
    height: 20px;

    &.large {
      height: 30px;
    }
  }
}

p {
  margin-top: 10px;
  font-size: 15px;
  line-height: 15px;
  max-height: 15px;
  overflow: hidden;

  &.large {
    text-align: center;
    font-size: 18px;
    margin-bottom: 20px;
  }
}

</style>

<script>
export default {
	props: [ "campaign", "size" ]
}
</script>
