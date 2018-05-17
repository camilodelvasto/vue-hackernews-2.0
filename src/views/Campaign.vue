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
    <div v-for="update in updates">
      <update :update="update"></update>
    </div>
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
import AppHeader from "Components/AppHeader.vue"
import Update from "Components/Update.vue"
import Comment from "Components/Comment.vue"

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
	components: {
    AppHeader,
    Comment,
    Update
  },
	data () {
		return {
      bottom: false,
			title: "",
			fields: [],
      comments: [],
      donations: [],
      updates: []
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
      return this.$store.state.campaign.comments_count !== this.$store.state.comments.current
    },
    moreDonations () {
      return this.$store.state.campaign.donations_count !== this.$store.state.donations.current
    },
    moreUpdates () {
      const limit = this.$store.state.updates.limit
      const current = this.$store.state.updates.current
      const count = this.$store.state.campaign.updates_count
      const totalPages = Math.ceil(count/limit)
      return totalPages >= current
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
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },

  methods: {
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },

    loadMoreComments (paginated = true) {
      const campaign_id = this.$route.params.id
      return this.$store.dispatch("FETCH_COMMENTS", { campaign_id: campaign_id, paginated: paginated })
        .then(data => {
          this.comments = this.$store.state.comments.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadMoreDonations (paginated = true) {
      const campaign_id = this.$route.params.id
      return this.$store.dispatch("FETCH_DONATIONS", { campaign_id: campaign_id, paginated: paginated })
        .then(data => {
          this.donations = this.$store.state.donations.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadMoreUpdates (paginated = true) {
      const campaign_id = this.$route.params.id
      if (this.moreUpdates) {
        return this.$store.dispatch("FETCH_UPDATES", { campaign_id: campaign_id, paginated: paginated })
          .then(data => {
            this.updates = this.$store.state.updates.data
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log('no more updates to fetch')
      }
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom && this.moreUpdates) {
        this.loadMoreComments()
        this.loadMoreDonations()
        this.loadMoreUpdates()
      }
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
a
  color: orange
</style>
