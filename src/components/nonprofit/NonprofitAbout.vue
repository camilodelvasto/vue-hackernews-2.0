<template>
  <div class="nonprofit-extended">
    <div class="container">
      <div class="nonprofit-extended__separator"></div>
      <div class="columns">
        <div class="column is-12">
          <h2 ref="aboutHeading">About <span v-html="nonprofit.data.name"></span></h2>
          <div NonprofitShareToolbar />
          <div class="columns">
            <div class="nonprofit-extended__about column is-8-desktop">
              <p>{{nonprofit.data.about}}</p>
              <div class="helper-text" v-if="nonprofit.EIN">EMPLOYER ID NUMBER (EIN): {{nonprofit.EIN}}</div>
            </div>
            <div class="nonprofit-extended__icons column is-4-desktop">
              <div class="nonprofit-extended__icon" v-if="nonprofit.data.city">
                <Icons iconwidth="24px" iconheight="24px" icon="location" color="#f0f0f0" class="icon"/>
                <span v-html="nonprofit.data.city"></span>
              </div>
              <div class="nonprofit-extended__icon" v-if="nonprofit.data.website">
                <Icons iconwidth="24px" iconheight="24px" icon="link" color="#f0f0f0" class="icon"/>
                <span v-html="nonprofit.data.website"></span>
              </div>
              <div class="nonprofit-extended__icon" v-if="nonprofit.data.email">
                <Icons iconwidth="24px" iconheight="24px" icon="email" color="#f0f0f0" class="icon"/>
                <span v-html="nonprofit.data.email"></span>
              </div>
              <DonateAction
                :nonprofit-ein="nonprofit.EIN"
                trigger="nonprofit/about/data">
                <button class="button is-success nonprofit-extended__donate" type="submit">
                  Donate
                </button>
              </DonateAction>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="nonprofit-extended__media column is-12-desktop">
          <div class="nonprofit-extended__icon">
            <Icons iconwidth="24px" iconheight="24px" icon="camera" color="#f0f0f0" class="icon"/>
            <span><a>{{nonprofit.data.media.length}} Photos and videos</a></span>
          </div>
          <flickity ref="main-carousel" class="nonprofit-extended__media-wrapper"
            :options="nonprofitMediaCarouselOptions"
            :class="{'short-wrapper': nonprofit.data.media.length < 3}">
            <div class="nonprofit-extended__media-item" v-for="(item, index) in nonprofit.data.media"
              :style="`background-image: url(${item.src})`" v-if="item.type === 'image'">
            </div>
          </flickity>
        </div>
      </div>
      <SharingIconsRow
        :key="$route.fullPath"
        :nonprofit-ein="nonprofit.EIN"
        :route-path="$route.fullPath"
        trigger="nonprofit/about/shareIconsRow" />
    </div>
  </div>
</template>

<script>
import DonateAction from "Components/general/DonateAction.vue"
import SharingIconsRow from "Components/general/SharingIconsRow.vue"
import Icons from "Components/general/Icons.vue"
import Flickity from "Components/plugins/Flickity.vue"

export default {
	props: [ "nonprofit" ],
	components: {
    DonateAction,
		Icons,
		Flickity,
		SharingIconsRow
	},
	data () {
		return {
			nonprofitMediaCarouselOptions: {
				initialIndex: 0,
				prevNextButtons: false,
				pageDots: false,
				wrapAround: true,
				autoPlay: 3500
			}
		}
	}
}
</script>

<style scoped lang="scss">
.nonprofit-extended {
  background-color: rgba($color-light-gray, 0.35);
  padding-bottom: 20px;
  margin-bottom: 40px;

  .helper-text {
    font-size: 12px;
  }

  &__separator {
    padding-top: 60px;
    max-width: 60%;
    margin: auto;
  }
  &__icon {
    display: flex;
    flex-direction: row;
    align-content: center;

    .icon {
      width: 30px;
      text-align: center;
      display: block;
    }
  }
  &__about {
    @include breakpoint($tablet) {
      width: 50%;
    }
    @include breakpoint($widescreen) {
      width: 66.66667%;
    }
  }
  &__icons {
    @include breakpoint($tablet) {
      width: 50%;
    }
    @include breakpoint($widescreen) {
      width: 33.33333%;
    }
  }
  &__media {
    margin-bottom: 20px;

    .icon {
      margin-bottom: 20px;
    }
  }
  &__media-wrapper {
    width: calc(100vw);
    height: calc(100vw*3/4);
    overflow: hidden;
    transform: translateX(-20px);

    @include breakpoint($tablet) {
      transform: translateX(0);
      width: 100%;
      height: 0;
      padding-bottom: 21%;
      text-align: left;
    }
    &.short-wrapper {
      @include breakpoint($tablet) {
        width: calc(990px*0.8/3);
      }

    }
  }
  &__media-item {
    width: 100vw;
    height: calc(100vw*3/4);
    background-size: cover;
    background-position: center;

    @include breakpoint($tablet) {
      width: calc(990px*0.8/3);
      height: calc(990px*0.8/3*3/4);
      border-right: 4px solid $white;
    }
    @include breakpoint($fullhd) {
      width: calc(1140px*0.8/3);
      height: calc(1140px*0.8/3*3/4);
      border-right: 4px solid $white;
    }
  }
  &__share-figure {
    margin: 30px 0;
  }

  th {
    padding-right: 20px;
  }

  &__donate {
    margin-top: 10px;
  }
}

.nonprofit-description {
  margin-bottom: 30px;
  font-size: 20px;
  line-height: 1.5;

  @include breakpoint($tablet) {
    padding: 0 70px;
  }

  &__manage-cta {
    display: flex;
    height: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    button {
      font-size: 1.1rem;
    }
  }
}


</style>
