<template>
  <div class="campaign">
    <AppHeader layout="app"></AppHeader>

    <CampaignHeader :campaign="campaign"></CampaignHeader>
    <CampaignHero :campaign="campaign"></CampaignHero>
    <CampaignCampaigner :campaign="campaign"></CampaignCampaigner>
    <CampaignLowerBody :campaign="campaign"></CampaignLowerBody>

    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import AppHeader from "Components/general/AppHeader.vue"
import AppFooter from "Components/general/AppFooter.vue"
import CampaignCampaigner from "Components/campaign/CampaignCampaigner.vue"
import CampaignHeader from "Components/campaign/CampaignHeader.vue"
import CampaignHero from "Components/campaign/CampaignHero.vue"
import CampaignLowerBody from "Components/campaign/CampaignLowerBody.vue"

Vue.use(VueMeta)

export default {
	name: "campaign",
	components: {
		AppHeader,
		AppFooter,
		CampaignCampaigner,
		CampaignHeader,
		CampaignHero,
		CampaignLowerBody
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
			titleTemplate: null
			/*
      TODO: design meta for this type of content.
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
      */
		}
	},
	computed: {
		campaign () {
			return this.$store.state.campaign
		}
	},

	// We only fetch the item itself before entering the view
	asyncData ({ store, route: { params: { id } } }) {
		return new Promise((resolve, reject) => {
			store.dispatch("FETCH_CAMPAIGN", { id })
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.campaign {
  background-color: $color-fundraiser-bg;

  @include breakpoint($tablet) {
    background-color: $color-fundraiser-bg;
  }

  .is-fluid.white-bg {
    background-color: $white;

    @include breakpoint($tablet) {
      padding: 0 50px 20px;
    }
  }
}

</style>
