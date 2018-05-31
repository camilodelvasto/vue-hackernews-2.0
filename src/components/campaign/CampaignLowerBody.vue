<template>
  <div class="container is-fluid white-bg">
    <div class="campaign-body__tab-section">
      <div class="campaign-lower__body-wrapper">
        <div class="tabs is-toggle">
          <div class="tabs__bottom-line"></div>
          <ul>
            <li @click="currentTab = 1" :class="{'is-active': currentTab === 1}"><a>Home</a></li>
            <li @click="currentTab = 3" :class="{'is-active': currentTab === 3}">
              <a>Donors ({{donations.length}})</a>
            </li>
            <li @click="currentTab = 5" :class="{'is-active': currentTab === 5}">
              <a>Shares ({{campaign.shared_count}})</a>
            </li>
            <li @click="currentTab = 2" :class="{'is-active': currentTab === 2}">
              <a>Comments ({{comments.length}})</a>
            </li>
            <li @click="currentTab = 4" :class="{'is-active': currentTab === 4}">
              <a>Updates ({{campaign.updates_count}})</a>
            </li>
          </ul>
        </div>

        <div class="columns campaign-lower__columns">
          <div class="column is-8 campaign-lower__left-column">
            <transition-group name="stretch">
              <div class="campaign-lower__tabs-tab" v-if="currentTab === 1" key="1">
                <div class="tab-section tab-section__updates">
                  <h2>More Info</h2>
                  <div class="user-generated__intro-text" v-html="campaign.intro_text"></div>
                </div>
                <div class="tab-section tab-section__updates">
                  <h2>Updates</h2>
                  <div class="user-optional__updates-wrapper">
                    <CampaignUpdates :updates="updates" maxchar="700" :count="campaign.updates_count" />
                    <button class="button is-warning is-load-more" @click="loadMoreUpdates()" v-if="moreUpdates">Load more updates</button>
                  </div>
                </div>
                <h2>Nonprofit Organization</h2>
                <div class="tab-section tab-section__header">
                  <p>A Volunteerathon is a fundraiser like a walkathon or bikeathon, except the person's time goes to help a nonprofit or do an independent service project.</p>
                  <p><span v-html="campaign.campaigner.name"></span> is raising money for: </p>
                  <div class="this-nonprofit__wrapper">
                    <figure class="campaign-lower__logo-wrapper">
                      <img :src="campaign.nonprofit.logo_square" class="campaign-lower__logo" width="200"
                        v-if="campaign.nonprofit.logo_square">
                    </figure>
                    <div class="this-nonprofit__right-side">
                      <span class="this-nonprofit__title" v-html="campaign.nonprofit.name"></span>
                      <div class="campaign-lower__button-wrapper">
                        <button class="button button-style is-warning">View profile</button>
                        <button class="button button-style is-info" v-if="campaign.nonprofit.website">Contribute</button>
                      </div>
                      <p class="help">This is an IRS-approved 501(c){{campaign.nonprofit.SUBSECTION}} charity, so<br>your donation is 100% tax deductible</p>
                    </div>
                  </div>
                </div>
                <div class="tab-section tab-section__comments">
                  <h2>Comments</h2>
                  <Comments
                    :comments="comments"
                    :more-comments="moreComments"
                    v-on:loadMoreComments="loadMoreComments()"></Comments>
                  <div class="button campaign-lower__cta-start is-info is-large">
                    Start your own fundraiser
                  </div>
                </div>
              </div>
              <div class="campaign-lower__tabs-tab" v-if="currentTab === 2" key="2">
                <h2>Comments</h2>
                <Comments
                  :comments="comments"
                  :more-comments="moreComments"
                  v-on:loadMoreComments="loadMoreComments()"></Comments>
                <div class="button campaign-lower__cta-start is-info is-large">
                  Start your own fundraiser
                </div>
              </div>
              <div class="campaign-lower__tabs-tab" v-if="currentTab === 3" key="3">
                <DonorsList
                  v-on:loadDonationsTab="loadDonationsTab()"
                  section-title="Donors"
                  view-all-cta="View all"
                  :donations="donations"
                  layout="horizontal"/>
              </div>
              <div class="campaign-lower__tabs-tab" v-if="currentTab === 4" key="4">
                <div class="tab-section tab-section__updates">
                  <h2>Updates</h2>
                  <div class="user-optional__updates-wrapper">
                    <CampaignUpdates :updates="updates" maxchar="700" :count="campaign.updates_count" />
                    <button class="button is-warning is-load-more" @click="loadMoreUpdates()" v-if="moreUpdates">Load more updates</button>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
          <transition name="fade">
            <div class="column is-4 campaign-lower__right-column" key="2" v-if="currentTab === 1">
              <div class="tab-section tab-section__giving-level">
                <h4>Choose a giving level</h4>
                <div class="user-optional__giving-level-wrapper">
                  <CampaignGivingLevel :level="givingLevel" v-for="(givingLevel, index) in campaign.giving_levels" :key="index" ></CampaignGivingLevel>
                </div>
              </div>
              <div class="top-donors">
                <DonorsList
                  v-on:loadDonationsTab="loadDonationsTab()"
                  section-title="Donors"
                  view-all-cta="View all"
                  :donations="donations"
                  layout="top"/>
              </div>
              <div class="recent-donations">
                <DonorsList
                  section-title="Recent Donations"
                  view-all-cta=""
                  :donations="donations"
                  layout="recent"/>
                <button class="button is-warning is-load-more" @click="loadMoreDonations()" v-if="moreDonations">Load more donations</button>
              </div>
              <div class="raised-through-sharing">
                <DonorsList
                  section-title="Raised Through Sharing"
                  view-all-cta=""
                  :donations="donations"
                  layout="sharing"/>
                <button class="button is-warning is-load-more" @click="loadMoreDonations()" v-if="moreDonations">Load more donations</button>
              </div>
              <div class="button campaign-pledge__cta is-success is-large">
                Donate now
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.campaign-lower {
  &__body-wrapper {
    padding-bottom: 20px;

    h1 {
      color: $color-text;
    }

    .tabs {
      position: relative;
      &__bottom-line {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        border-bottom: 1px solid #dbdbdb;
      }
    }
    .tabs.is-toggle li:first-child a {
      border-radius: 9px 0 0 0 !important;
    }
    .tabs.is-toggle li:last-child a {
      border-radius: 0 9px 0 0 !important;
    }

    .tabs {
      @include breakpoint($tablet) {
      }
      ul {
        justify-content: center;

        @include breakpoint($tablet) {
          justify-content: flex-start;
        }
      }
    }
  }

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
  &__cta-start {
    margin: 50px auto;
    border-radius: 10px;
    display: flex;
    @include breakpoint ($tablet) {
      width: 70%;
    }
  }
  &__left-column {
    padding-right: 0.5rem;
  }
  &__right-column {
    @include breakpoint($tablet) {
      padding-left: 2.7rem;
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
import CampaignGivingLevel from "Components/campaign/CampaignGivingLevel.vue"
import CampaignUpdates from "Components/campaign/CampaignUpdates.vue"
import Comments from "Components/general/Comments.vue"
import DonorsList from "Components/general/DonorsList.vue"

export default {
	props: [ "campaign" ],
	components: {
		CampaignGivingLevel,
		CampaignUpdates,
		Comments,
		DonorsList
	},
	data () {
		return {
			bottom: false,
			currentTab: 1
		}
	},
	computed: {
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
		},
		common () {
			return this.$store.state.common
		}
	},
	methods: {
		userHasScrolled () {
			const scrollY = window.scrollY
			return scrollY > 0
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
		},
		loadDonationsTab () {
			this.currentTab = 3
			// scroll to tab bar
		}
	},
	// Data to be fetched asynchronously, only in the client.
	// To be used for the below-the-fold items: comments, donors, recent donations, raised through sharing, updates
	mounted () {
		window.addEventListener("scroll", () => {
			this.bottom = this.userHasScrolled()
		})
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
