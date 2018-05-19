<template>
  <div class="hello">
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

    <li><router-link to="/nonprofits/43138428">43138428 (nonprofit)</router-link></li>
    <li><router-link to="/nonprofits/43063409">43063409 (nonprofit)</router-link></li>
    <li><router-link to="/campaigns/255">255 (campaign)</router-link></li>

    <h2>Donations</h2>
    <div v-for="donation in donations">
      <div>{{donation.donorName}}</div>
      <div>{{donation.amount}}</div>
    </div>
    <button @click="loadMoreDonations()" v-if="moreDonations">Load more donations</button>

    <h2>Updates</h2>
    <ul>
      <li v-for="update in updates" v-bind:key="update.id">
        <update :update="update"></update>
      </li>
    </ul>
    <button @click="loadMoreUpdates()" v-if="moreUpdates">Load more updates</button>

    <h2>Comments</h2>
    <div v-for="comment in comments">
      <comment :comment="comment"></comment>
    </div>
    <button @click="loadMoreComments()" v-if="moreComments">Load more comments</button>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import Update from "Components/Update.vue"
import Comment from "Components/Comment.vue"

Vue.use(VueMeta)

export default {
	name: "campaign",
	components: {
		Comment,
		Update
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
		moreComments () {
			return showMoreButton(this.$store.state, "comments")
		},
		moreDonations () {
			return showMoreButton(this.$store.state, "donations")
		},
		moreUpdates () {
			return showMoreButton(this.$store.state, "updates")
		},
		donations () {
			return this.$store.state.donations.data
		},
		updates () {
			return this.$store.state.updates.data
		},
		comments () {
			return this.$store.state.comments.data
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
	// To be used for the below-the-fold items: comments, donors, recent donations, raised through sharing, updates
	mounted () {
		window.addEventListener("scroll", () => {
			this.bottom = this.bottomVisible()
		})
	},

	methods: {
		bottomVisible () {
			const scrollY = window.scrollY
			const visible = document.documentElement.clientHeight
			const pageHeight = document.documentElement.scrollHeight
			const bottomOfPage = visible + scrollY >= pageHeight
			return bottomOfPage || pageHeight < visible
		},

		loadMoreComments (paginated = true) {
			if (this.moreComments) {
				const campaignId = this.$route.params.id
				return this.$store.dispatch("FETCH_COMMENTS", { campaignId: campaignId, paginated: paginated })
					.then(data => {
						return data
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		loadMoreDonations (paginated = true) {
			if (this.moreDonations) {
				const campaignId = this.$route.params.id
				return this.$store.dispatch("FETCH_DONATIONS", { campaignId: campaignId, paginated: paginated })
					.then(data => {
						return data
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
		loadMoreUpdates (paginated = true) {
			const campaignId = this.$route.params.id
			if (this.moreUpdates) {
				return this.$store.dispatch("FETCH_UPDATES", { campaignId: campaignId, paginated: paginated })
					.then(data => {
						return data
					})
					.catch(err => {
						console.log(err)
					})
			}
		}
	},

	// Load these items only when the user has scrolled down.
	watch: {
		bottom (bottom) {
      if (bottom && this.moreUpdates && this.$store.state.updates.current === 1) {
        this.loadMoreUpdates()
      }
      if (bottom && this.moreComments && this.$store.state.comments.current === 1) {
        this.loadMoreComments()
      }
			if (bottom && this.moreDonations && this.$store.state.donations.current === 1) {
				this.loadMoreDonations()
			}
		}
	},
	destroyed () {
		this.$store.commit("RESET_CAMPAIGN")
	}
}

function showMoreButton (state, arg) {
	const limit = state[arg].limit
	const current = state[arg].current
	const count = state.campaign[`${arg}_count`]
	const totalPages = Math.ceil(count / limit)
	return totalPages >= current
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: orange;
  font-family: $font-primary;
}
</style>
