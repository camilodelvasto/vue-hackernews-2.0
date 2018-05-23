import {
	fetchCampaign,
	fetchCampaigns,
	fetchComments,
	fetchDonations,
	fetchCommonData,
	fetchNonprofit,
	fetchUpdates
} from "../api"

export default {
	FETCH_NONPROFIT: ({ commit, dispatch, state }, { ein }) => {
		return new Promise((resolve, reject) => {
			return fetchNonprofit(ein)
				.then(data => {
					commit("SET_NONPROFIT", { nonprofit: data })
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	FETCH_CAMPAIGN: ({ commit, dispatch, state }, { id }) => {
		return new Promise((resolve, reject) => {
			return fetchCampaign(id)
				.then(data => {
					commit("SET_CAMPAIGN", { campaign: data })
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	FETCH_CAMPAIGNS: ({ commit, dispatch, state }, { ein }) => {
		return new Promise((resolve, reject) => {
			return fetchCampaigns(ein)
				.then(data => {
					commit("SET_CAMPAIGNS", { campaigns: data })
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	FETCH_COMMON_DATA: ({ commit, dispatch, state }) => {
		return new Promise((resolve, reject) => {
			return fetchCommonData()
				.then(data => {
					commit("SET_COMMON_DATA", { common: data })
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	FETCH_UPDATES: ({ commit, dispatch, state }, { campaignId, paginated }) => {
		return new Promise((resolve, reject) => {
			return fetchUpdates(campaignId, state.updates.current, state.updates.limit, paginated)
				.then(data => {
					commit("ADD_UPDATES", { updates: data })
					resolve(data)
				})
				.catch(err => {
					commit("ADD_UPDATES", { updates: [] })
					reject(err)
				})
		})
	},
	FETCH_COMMENTS: ({ commit, dispatch, state }, { campaignId, paginated }) => {
		return new Promise((resolve, reject) => {
			return fetchComments(campaignId, state.comments.current, state.comments.limit, paginated)
				.then(data => {
					commit("ADD_COMMENTS", { comments: data })
					resolve(data)
				})
				.catch(err => {
					commit("ADD_COMMENTS", { comments: [] })
					reject(err)
				})
		})
	},
	FETCH_DONATIONS: ({ commit, dispatch, state }, { campaignId, nonprofitEIN, paginated }) => {
		return new Promise((resolve, reject) => {
			var query = ""
			if (campaignId) {
				query = `campaign_id=${campaignId}`
			}
			if (nonprofitEIN) {
				query = `nonprofit_ein=${nonprofitEIN}`
			}
			return fetchDonations(query, state.donations.current, state.donations.limit, paginated)
				.then(data => {
					commit("ADD_DONATIONS", { donations: data })
					resolve(data)
				})
				.catch(err => {
					commit("ADD_DONATIONS", { donations: [] })
					reject(err)
				})
		})
	}
}
