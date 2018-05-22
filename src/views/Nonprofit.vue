<template>
  <div class="">
    <AppHeader></AppHeader>
    <section class="nonprofit-hero">
      <div class="hero is-medium nonprofit-hero__hero-wrapper" :style="{backgroundImage: `url(${nonprofit.data.hero})`}">
        <div class="container nonprofit-hero__hero-container">
          <div class="nonprofit-hero__logo-wrapper" :style="{backgroundImage: `url(${nonprofit.data.logo})`}" v-if="nonprofit.data.logo"></div>
          <div class="nonprofit-hero__claim__cta" v-if="!nonprofit.data.about">
            <div class="button is-pulled-right is-small is-centered is-rounded">Manage this nonprofit</div>
          </div>
        </div>
      </div>
      <div class="container columns">
        <div class="nonprofit-hero__nonprofit-name column is-6-tablet is-7-desktop" :class="{'not-claimed': !nonprofit.data.logo}">{{nonprofit.NAME}}</div>
        <div class="nonprofit-hero__cta-wrapper column is-6-tablet is-5-desktop">
          <div class="button nonprofit-hero__cta-fundraise">Fundraise</div>
          <div class="button nonprofit-hero__cta-donate">Donate</div>
          <div class="button nonprofit-hero__cta-share">
            <Icons iconwidth="16px" iconheight="16px" icon="share" color="#ffffff" class="icon" />
            Share
          </div>
        </div>
      </div>
      <div class="container">
        <div class="nonprofit-intro" v-if="common.nonprofit">
          {{common.nonprofit.intro}}
        </div>
      </div>
    </section>

    <div class="container">
      <NonprofitForm submit-button-label="Submit" />
    </div>

    <h2>Basic data</h2>
    <ul>
      <li><strong>EIN</strong>: {{nonprofit.EIN}}</li>
      <li><strong>NAME</strong>: {{nonprofit.NAME}}</li>
      <li><strong>STREET</strong>: {{nonprofit.STREET}}</li>
      <li><strong>CITY</strong>: {{nonprofit.CITY}}</li>
      <li><strong>STATE</strong>: {{nonprofit.STATE}}</li>
      <li><strong>ZIP</strong>: {{nonprofit.ZIP}}</li>
      <li><strong>ACTIVITY</strong>: {{nonprofit.ACTIVITY}}</li>
      <li><strong>NTEE_CD</strong>: {{nonprofit.NTEE_CD}}</li>
      <li><strong>SORT_NAME</strong>: {{nonprofit.SORT_NAME}}</li>
    </ul>
    <h2>Other nonprofits:</h2>
    <ul>
      <li><router-link to="/nonprofits/43138428">43138428 (non-generic)</router-link></li>
      <li><router-link to="/nonprofits/660548326">660548326</router-link></li>
      <li><router-link to="/nonprofits/43063409">43063409</router-link></li>
      <li><router-link to="/nonprofits/43177990">43177990</router-link></li>
      <li><router-link to="/nonprofits/43178037">43178037</router-link></li>
      <li><router-link to="/nonprofits/9999999943178037">99999999943178037</router-link></li>
    </ul>
    <h2>Volunteerathons for this nonprofit:</h2>
    <ul>
      <li v-for="campaign in campaigns">
        <router-link :to="`/campaigns/${campaign.campaign_id}`">{{campaign.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import AppHeader from "Components/general/AppHeader.vue"
import NonprofitForm from "Components/NonprofitForm.vue"
import Icons from "Components/general/Icons.vue"

Vue.use(VueMeta)

export default {
	name: "nonprofit",
  components: {
    AppHeader,
    Icons,
    NonprofitForm
  },
	data () {
		return {
			title: "",
			fields: []
		}
	},
	metaInfo () {
		return {
			title: this.title,
			// override the parent template and just use the above title only
			titleTemplate: null,
			meta: [
				{ vmid: "description", name: "description", content: this.nonprofit.ACTIVITY },
				{ vmid: "og:url", property: "og:url", content: "https://volunteerathon.com/" },
				{ vmid: "og:type", property: "og:type", content: "website" },
				{ vmid: "og:title", property: "og:title", content: this.nonprofit.NAME },
				{ vmid: "og:image", property: "og:image", content: "https://res.cloudinary.com/startics/image/upload/v1523024114/truck_twugdy.png" },
				{ vmid: "og:site_name", property: "og:site_name", content: "volunteerathon - generic nonprofit" },
				{ vmid: "og:description", property: "og:description", content: this.nonprofit.ACTIVITY },
				{ vmid: "twitter:card", property: "twitter:card", content: this.nonprofit.ACTIVITY },
				{ vmid: "twitter:image", property: "twitter:image", content: "https://startcrowd.club/images/startcrowdimage.jpg" }
			]
		}
	},
	computed: {
		nonprofit () {
			return this.$store.state.nonprofit
		},
		campaigns () {
			return this.$store.state.campaigns.data
		},
    common () {
      return this.$store.state.common
    }
	},

	// We only fetch the item itself before entering the view
	asyncData ({ store, route: { params: { ein } } }) {
		return new Promise((resolve, reject) => {
			return store.dispatch("FETCH_NONPROFIT", { ein })
				.then(data => {
					loadCampaigns(store, ein)
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	mounted () {
		loadCampaigns(this.$store, this.$route.params.ein)
	},
	destroyed () {
		this.$store.commit("RESET_CAMPAIGNS")
	}
}
function loadCampaigns (store, ein, paginated = true) {
	return store.dispatch("FETCH_CAMPAIGNS", { ein: ein })
		.then(data => {
			return data
		})
		.catch(err => {
			store.commit("RESET_CAMPAIGNS")
			return err
		})
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    @include breakpoint($desktop) {
      top: unset;
      left: unset;
      bottom: -80px;
      width: 200px;
      height: 200px;
    }
  }

  &__claim__cta {
    position: absolute;
    top: 20px;

    .button {
      border-color: white !important;
      background-color: transparent !important;
      color: $white !important;
      transition: color 0.6s ease-in-out, background-color 0.2s ease-in-out;
      font-size: 1.0rem;

      &:hover {
        background-color: $color-light-gray !important;
        color: $color-dark-gray !important;
      }
    }

    @include breakpoint($desktop) {
      top: unset;
      bottom: 20px;
      right: 0;
    }
  }

  &__nonprofit-name {
    font-size: 30px;
    color: $color-text;
    font-weight: bold;
    margin-top: 20px;
    padding-bottom: 20px;
    padding: 0;

    @include breakpoint($desktop) {
      padding-left: 220px;
      margin-bottom: 30px;

      &.not-claimed {
        padding-left: 0;
      }
    }
    @include breakpoint($widescreen) {
      width: 58.33333%;
    }
  }

  &__cta-wrapper {
    text-align: center;
    position: absolute;
    top: -170px;
    text-align: right;
    display: flex;
    flex-direction: column;
    right: 0;
    margin-right: 0;

    @include breakpoint($tablet) {
      margin-top: 10px;
      text-align: right;
      position: static;
      padding-right: 0;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-end;
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

    .icon {
      margin-right: 10px !important;
      display: block;
    }

    &:hover {
      background-color: rgba($color-text, 0.7);
    }
  }
}

.nonprofit-intro {
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
