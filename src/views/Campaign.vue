<template>
  <div class="hello">
    <AppHeader></AppHeader>
    <h2>Basic data</h2>
    <h2>This campaign:</h2>
    {{campaign.name}}
    <ul v-if="campaign.name">
      <li><strong>description</strong>: {{campaign.description}}</li>
      <li><strong>pictures</strong>: {{campaign.pictures}}</li>
      <li><strong>campaigner.fullname</strong>: {{campaign.campaigner.fullname}}</li>
      <li><strong>profilePicUrl</strong>: {{campaign.profilePicUrl}}</li>
      <li><strong>currentStats.hours</strong>: {{campaign.currentStats.hours}}</li>
      <li><strong>currentStats.donated</strong>: {{campaign.currentStats.donated}}</li>
      <li><strong>currentStats.donors</strong>: {{campaign.currentStats.donors}}</li>
      <li><strong>currentStats.goal</strong>: {{campaign.currentStats.goal}}</li>
      <li><strong>currentStats.daysLeft</strong>: {{campaign.currentStats.daysLeft}}</li>
    </ul>

    <li><router-link to="/campaigns/255">255 (non-existent campaign)</router-link></li>

    {{nonprofit.NAME}}
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import AppHeader from "Components/AppHeader.vue"

Vue.use(VueMeta)

/*
load before entering the route:
- campaign main details: name, campaign details
- donated amount
- campaign description

load async after the user has entered the route:
 - updates
 - comments
 - donors?
 - recent donations
 - raised through sharing


*/

export default {
	name: "campaign",
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
    },
		nonprofit () {
			return this.$store.state.nonprofit
		}
	},

	// We only fetch the item itself before entering the view

	asyncData ({ store, route: { params: { id } } }) {
		return new Promise((resolve, reject) => {
			return store.dispatch("FETCH_CAMPAIGN", { id })
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

  // Data to be fetched asynchronously, only in the client.
  beforeMount () {
    const ein = 43138428
    return this.$store.dispatch("FETCH_NONPROFIT", { ein })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
a
  color: orange
</style>
