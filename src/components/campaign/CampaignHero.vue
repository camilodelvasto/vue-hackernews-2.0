<template>
  <div>
    <div class="container is-fluid white-bg campaign-content__wrapper">
      <div class="columns campaign-content">
        <div class="column is-two-thirds-desktop campaign-content__left">
          <div class="campaign-photo-section">
            <flickity ref="main-carousel" class="main-carousel" :options="mainCarouselOptions">
              <div class="campaign-photo-section__photo" v-for="item in campaign.pictures"
                :style="`background-image: url(${item.imgsrc})`">
              </div>
            </flickity>
          </div>
        </div>
        <div class="column is-one-third-desktop campaign-content__right">
          <div class="campaign-pledge">
            <div class="campaign-pledge__heading">
              <p>{{campaign.campaigner.name}} will volunteer {{campaign.currentStats.hours}} hours {{campaign.communityWork}} to raise money for the nonprofit <a target="_blank" :href="campaign.nonprofit.url">{{campaign.nonprofit.name}}</a></p>
              <p class="campaign-pledge__subheading">Please sponsor {{campaign.campaigner.name}}'s Volunteerathon</p>
            </div>
            <div class="button campaign-pledge__cta is-success is-large">
              Donate now
            </div>
            <div class="progress-bar campaign-pledge__progress-wrapper">
              <ProgressBar :campaign="campaign" size="large" />
            </div>
            <div class="campaign-pledge__more-stats">
              <div class="campaign-pledge__goal">Goal: {{campaign.currentStats.goal | usd}}</div>
              <div class="campaign-pledge__goal">Days left: {{campaign.currentStats.daysLeft}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.campaign-content {
  &__wrapper {
    @include breakpoint($tablet) {
      padding-top: 20px !important;
    }
  }
  &__left {
    padding-left: 0 !important;
  }
}

.campaign-photo-section {
  width: 100vw;

  @include breakpoint($mobile) {
    max-width: $max-flickity-width;
    margin-left: -1.5% !important;
  }

  @include breakpoint($tablet) {
    transform: translateX(0);
    width: calc(100% - 20px);
    height: 0;
    padding-bottom: calc(100% * 2/3 - 60px + 70px);
    overflow: hidden;
  }

  &__photo {
    width: 100vw;
    height: calc(100vw*2/3);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    @include breakpoint($mobile) {
      max-width: $max-flickity-width;
    }

    @include breakpoint($tablet) {
      width: 102%;
      height: 0;
      padding-bottom: calc(100% * 2/3);
      overflow: hidden;
      background-color: $color-lightest-gray;
    }
  }
  &__thumbnail {
    width: 28.3333vw;
    height: calc(28.3333vw*3/4);
    background-size: cover;
    background-position: center;
    margin-right: 2.5vw;

    @include breakpoint($tablet) {
      width: calc(5vw);
      height: calc(5vw*3/4);
      margin-right: 0.5vw;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.campaign-pledge {
  margin-top: 20px;
  font-size: 17px;
  text-align: center;

  @include breakpoint($tablet) {
    text-align: left;
    margin-top: 30px;
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p {
    font-size: 22px;
    &.campaign-pledge__subheading {
      font-size: 18px;
      color: $color-medium-gray;
      font-style: italic;
    }
  }

  &__cta {
    text-transform: uppercase;
    margin-bottom: 20px;
    display: block;
  }

  &__stats {
    text-align: center;
    display: block;
    margin-bottom: 15px;
  }

  &__more-stats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
}

</style>

<script>
import ProgressBar from "Components/general/ProgressBar.vue"
import Flickity from "Components/plugins/Flickity.vue"

export default {
	props: [ "campaign" ],
	components: {
		Flickity,
		ProgressBar
	},
	data () {
		return {
			mainCarouselOptions: {
				initialIndex: 0,
				prevNextButtons: false,
				pageDots: true,
				wrapAround: true,
				autoPlay: 3500
			}
		}
	}
}
</script>
