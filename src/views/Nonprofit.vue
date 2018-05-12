<template>
  <div class="hello">
    <AppHeader></AppHeader>
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
        <router-link :to="`/campaigns/${campaign.id}`">{{campaign.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import AppHeader from "Components/AppHeader.vue"

Vue.use(VueMeta)

export default {
	name: "nonprofit",
	components: { AppHeader },
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
			return this.$store.state.nonprofit.campaigns
		}
	},

	// We only fetch the item itself before entering the view
	asyncData ({ store, route: { params: { ein } } }) {
		return new Promise((resolve, reject) => {
			return store.dispatch("FETCH_NONPROFIT", { ein })
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	beforeMount () {
		// const ein = this.$route.params.ein
		// this.$store.dispatch('FETCH_NONPROFIT', { ein })
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
a
  color: orange
</style>
