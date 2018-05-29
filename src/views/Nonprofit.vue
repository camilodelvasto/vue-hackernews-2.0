<template>
  <div class="">
    <AppHeader layout="app"></AppHeader>

    <NonprofitHero :nonprofit="nonprofit" :common="common" />
    <NonprofitForm submit-button-label="Submit" />

    <FloatingShareTools />
    <NonprofitIRSData :nonprofit="nonprofit" v-if="!nonprofit.data.about" />
    <NonprofitAbout :nonprofit="nonprofit" v-else />

    <NonprofitCampaigns :campaigns="campaigns" />

    <DonorsList :donations="donations" title="Top Donors"/>

    <DonorsList :donations="fundraisers" title="Top Fundraisers" />

    <section>
      <button class="button is-large is-info is-centered fundraiser_cta">Create your own fundraiser</button>
    </section>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import AppFooter from "Components/general/AppFooter.vue"
import AppHeader from "Components/general/AppHeader.vue"
import DonorsList from "Components/general/DonorsList.vue"
import FloatingShareTools from "Components/general/FloatingShareTools.vue"
import NonprofitForm from "Components/nonprofit/NonprofitForm.vue"
import NonprofitHero from "Components/nonprofit/NonprofitHero.vue"
import NonprofitIRSData from "Components/nonprofit/NonprofitIRSData.vue"
import NonprofitAbout from "Components/nonprofit/NonprofitAbout.vue"
import NonprofitCampaigns from "Components/nonprofit/NonprofitCampaigns.vue"

Vue.use(VueMeta)

export default {
	name: "nonprofit",
	components: {
		AppFooter,
		AppHeader,
		DonorsList,
		FloatingShareTools,
		NonprofitAbout,
		NonprofitCampaigns,
		NonprofitForm,
		NonprofitHero,
		NonprofitIRSData
	},
	data () {
		return {
			bottom: false,
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
		donations () {
			return this.$store.state.donations.data
		},
		fundraisers () {
			return this.$store.state.fundraisers.data
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
		window.addEventListener("scroll", () => {
			this.bottom = this.userHasScrolled()
		})
		loadCampaigns(this.$store, this.$route.params.ein)
	},
	// Load these items only when the user has scrolled down.
	watch: {
		bottom (bottom) {
			if (bottom && this.$store.state.donations.current === 1) {
				this.loadMoreDonations()
				this.loadMoreTopFundraisers()
			}
		}
	},
	destroyed () {
		this.$store.commit("RESET_CAMPAIGN")
	},
	methods: {
		loadMoreDonations (paginated = true) {
			const nonprofitEIN = this.$route.params.ein
			return this.$store.dispatch("FETCH_DONATIONS", { nonprofitEIN: nonprofitEIN, paginated: paginated })
				.then(data => {
					return data
				})
				.catch(err => {
					return err
				})
		},
		loadMoreTopFundraisers (paginated = true) {
			return this.$store.dispatch("FETCH_TOP_FUNDRAISERS", { paginated: paginated })
				.then(data => {
					return data
				})
				.catch(err => {
					return err
				})
		},
		userHasScrolled () {
			const scrollY = window.scrollY
			return scrollY > 0
		}
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
.fundraiser_cta {
  margin: 50px auto;
  border-radius: 10px;
  display: flex;
  @include breakpoint ($tablet) {
    width: 40%;
    max-width: 450px;
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
