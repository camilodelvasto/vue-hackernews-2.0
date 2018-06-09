export default {
	SET_CURRENT_PATH: (state, { fullPath }) => {
		state.fullPath = fullPath
	},
	SET_HOME_PAGE: (state, { home }) => {
		state.home = home
	},
	SET_NONPROFIT: (state, { nonprofit }) => {
		state.nonprofit = nonprofit
	},
	SET_CAMPAIGN: (state, { campaign }) => {
		state.campaign = campaign
	},
	ADD_UPDATES: (state, { updates }) => {
		state.updates.data = state.updates.data.concat(updates)
		state.updates.current++
	},
	RESET_CAMPAIGNS: (state) => {
		state.campaigns.data = []
	},
	RESET_CAMPAIGN: (state) => {
		state.updates.current = 1
		state.updates.data = []
		state.donations.current = 1
		state.donations.data = []
		state.comments.current = 1
		state.comments.data = []
	},
	ADD_COMMENTS: (state, { comments }) => {
		state.comments.data = state.comments.data.concat(comments)
		state.comments.current++
	},
	ADD_DONATIONS: (state, { donations }) => {
		state.donations.data = state.donations.data.concat(donations)
		state.donations.current++
	},
	ADD_TOP_FUNDRAISERS: (state, { fundraisers }) => {
		state.fundraisers.data = state.fundraisers.data.concat(fundraisers)
		state.fundraisers.current++
	},
	SET_CAMPAIGNS: (state, { campaigns }) => {
		state.campaigns.data = campaigns
	},
	SET_COMMON_DATA: (state, { common }) => {
		state.common = common
	},
	UPDATE_COMMENTS: (state, { comment }) => {
		console.log(comment)
	},
	START_DONATION: (state, { initiator }) => {
		state.userActions.donation.status = "started"
		state.userActions.donation.amount = initiator.givingLevel ? initiator.givingLevel.amount : state.userActions.donation.amount
    state.userActions.donation.initiator = initiator
    state.userActions.donation.campaignId = initiator.campaignId
		state.userActions.donation.nonprofitEin = initiator.nonprofitEin
	}
}
