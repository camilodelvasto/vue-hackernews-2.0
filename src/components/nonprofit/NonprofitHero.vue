<template>
  <div>
    <section class="nonprofit-hero">
      <div class="hero is-medium nonprofit-hero__hero-wrapper" :style="{backgroundImage: `url(${nonprofit.data.hero})`}">
        <div class="container nonprofit-hero__hero-container">
          <div class="nonprofit-hero__logo-wrapper" :style="{backgroundImage: `url(${nonprofit.data.logo})`}" v-if="nonprofit.data.logo"></div>
        </div>
      </div>
      <div class="container columns">
        <div class="nonprofit-hero__nonprofit-name column is-6-tablet is-7-desktop is-7-widescreen is-7-fullhd" :class="{'not-claimed': !nonprofit.data.about}">{{nonprofit.NAME}}</div>
        <div class="nonprofit-hero__cta-wrapper column is-6-tablet is-5-desktop is-5-widescreen is-5-fullhd" :class="{'not-claimed': !nonprofit.data.about}">
          <div class="button nonprofit-hero__cta-fundraise">Fundraise</div>
          <div class="button nonprofit-hero__cta-donate">
            <DonateAction
              :nonprofit-ein="nonprofit.EIN"
              trigger="nonprofit/hero/cta">
              Donate
            </DonateAction>
          </div>
          <div class="button nonprofit-hero__cta-share" @click="share()">
            <transition name="slide-fade">
              <ShareBox
                v-if="openShareBox"
                class="share-box__wrapper"
                :text="shareText"
                :via="siteName"
                :title="shareWindowTitle" />
            </transition>
            <Icons iconwidth="16px" iconheight="16px" icon="share" color="#ffffff" class="share-icon-trigger" />
            Share
          </div>
          <div class="nonprofit-hero__cta-manage" v-if="!nonprofit.data.about"><a>Manage this nonprofit</a></div>
        </div>
      </div>
      <div class="container">
        <div class="nonprofit-intro" v-if="common.nonprofit">
          {{common.nonprofit.intro}}
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.nonprofit-hero {
  &__hero-wrapper {
    background-size: cover;
    background-position: bottom center;
    position: relative;
    max-height: 390px;
  }

  &__hero-container {
    min-height: 390px;
    padding: 0;
    min-width: 90%;

    @include breakpoint($tablet) {
      min-width: 0;
      width: 100vw;
    }
  }

  &__logo-wrapper {
    position: absolute;
    background-size: cover;
    width: 140px;
    height: 140px;
    top: 20px;

    @include breakpoint($tablet) {
      left: 20px;
    }
    @include breakpoint($widescreen) {
      top: unset;
      left: unset;
      bottom: -80px;
      width: 200px;
      height: 200px;
    }
  }

  &__nonprofit-name {
    font-size: 30px;
    color: $color-text;
    font-weight: bold;
    margin-top: 20px;
    padding-bottom: 20px;
    padding: 0;

    @include breakpoint($widescreen) {
      padding-left: 140px;
      margin-bottom: 30px;
    }

    @include breakpoint($fullhd) {
      padding-left: 220px;
      margin-bottom: 30px;
    }

    &.not-claimed {
      padding-left: 0;
    }
  }

  &__cta-wrapper {
    text-align: center;
    position: absolute;
    bottom: 145px;
    text-align: right;
    display: flex;
    flex-direction: column;
    right: 0;
    margin-right: 0;
    flex-wrap: wrap;
    padding-right: 0;

    &.not-claimed {
      bottom: 190px;
    }

    @include breakpoint($tablet) {
      margin-top: 10px;
      text-align: right;
      position: static;
      padding-right: 0;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-end;
    }

    @include breakpoint($desktop) {
      height: 100%;
    }

    .button {
      text-transform: uppercase;
      margin-left: 20px;
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 12px;
      border-radius: 10px;
      padding: 20px 10px;
      min-width: 40vw;
      color: $white;
      border: none;
      box-shadow: 1px 1px 10px rgba($color-text, 0.5);
      transition: background-color 0.2s ease-in-out;

      @include breakpoint($mobile) {
        min-width: 20vw;
        margin-left: 10px;
        padding: 15px 20px;
      }
      @include breakpoint($tablet) {
        min-width: unset;
        margin-left: 10px;
        padding: 15px 20px;
      }
      @include breakpoint($widescreen) {
        margin-left: 10px;
        padding: 15px 20px;
      }
    }
  }

  &__cta-donate {
    background-color: rgba($color-emphasis-alt, 0.8);

    &:hover {
      background-color: rgba($color-emphasis-alt, 1);
    }
  }

  &__cta-fundraise {
    background-color: rgba($color-emphasis, 0.8);

    &:hover {
      background-color: rgba($color-emphasis, 1);
    }
  }

  &__cta-share {
    background-color: rgba($color-text, 0.5);
    position: relative;

    .share-icon-trigger {
      margin-right: 10px !important;
      margin-top: 5px;
      display: block;
    }

    &:hover {
      background-color: rgba($color-text, 0.7);
    }
    .share-box__wrapper {
      position: absolute;
      right: 0;
      top: -20px;

      @include breakpoint($mobile) {
        top: 80px;
      }
    }
  }
  &__cta-manage {
    font-size: 12px;

    @include breakpoint($tablet) {
      background: transparent;
      width: 100%;
    }
  }
}
</style>

<script>
import DonateAction from "Components/general/DonateAction.vue"
import ShareBox from "Components/general/ShareBox.vue"
import Icons from "Components/general/Icons.vue"

export default {
	props: [ "common", "nonprofit" ],
	components: {
		DonateAction,
		Icons,
		ShareBox
	},
	data () {
		return {
			shareText: "Check out this nonprofit!",
			siteName: "Volunteerathon",
			shareWindowTitle: "Share Nonprofit",
			openShareBox: false
		}
	},
	methods: {
		share (commentId) {
			this.openShareBox = !this.openShareBox
		}
	}
}
</script>
