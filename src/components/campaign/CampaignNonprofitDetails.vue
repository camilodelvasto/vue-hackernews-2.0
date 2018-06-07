<template>
  <div class="campaign-nonprofit-organization__wrapper">
    <p>A Volunteerathon is a fundraiser like a walkathon or bikeathon, except the person's time goes to help a nonprofit or do an independent service project.</p>
    <p><span v-html="campaign.campaigner.name"></span> is raising money for: </p>
    <div class="this-nonprofit__wrapper">
      <figure class="campaign-lower__logo-wrapper" v-if="campaign.nonprofit">
        <img :src="campaign.nonprofit.logo_square" class="campaign-lower__logo" width="200">
      </figure>
      <div class="this-nonprofit__right-side">
        <span class="this-nonprofit__title" v-html="campaign.nonprofit.name"></span>
        <div class="campaign-lower__button-wrapper">
          <button class="button button-style is-warning">View profile</button>
          <button
            class="button button-style is-info"
            v-if="campaign.nonprofit.website">
            <DonateAction
              :campaign-id="campaign.campaign_id"
              trigger="campaign/lower/left/organization">
              Contribute
            </DonateAction>
          </button>
        </div>
        <p class="help">This is an IRS-approved 501(c){{campaign.nonprofit.SUBSECTION}} charity, so<br>your donation is 100% tax deductible</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.campaign-lower {
  &__logo-wrapper {
    display: flex;
    flex-direction: column;
    height: 140px;
    width: 140px;
    margin: 15px auto;

    @include breakpoint($tablet) {
      margin: 0 20px 0 0;
    }

    img {
      display: block;
      max-width: 140px;
    }
  }
  &__button-wrapper {
    .button-style {
      margin: 10px 0;
      display: inline-block;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.this-nonprofit {
  &__wrapper {
    text-align: center;
    margin: auto;
    margin-bottom: 40px;
    margin-top: 25px;

    figure {
      align-items: center;
    }

    @include breakpoint($tablet) {
      text-align: left;
      display: flex;
      flex-direction: row;
    }
  }
  .help {
    font-size: 13px;
  }
  &__title {
    font-weight: bold;
    color: $color-dark-gray;
    font-size: 20px;
    text-transform: uppercase;
  }
}

</style>

<script>
import DonateAction from "Components/general/DonateAction.vue"

export default {
	props: [ "campaign" ],
	components: {
		DonateAction
	}
}
</script>
