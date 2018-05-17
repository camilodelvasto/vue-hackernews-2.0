import {
  fetchCampaign,
  fetchCampaigns,
  fetchComments,
  fetchDonations,
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
  FETCH_UPDATES: ({ commit, dispatch, state }, { campaign_id, paginated }) => {
    return new Promise((resolve, reject) => {
      return fetchUpdates(campaign_id, state.updates.current, state.updates.limit, paginated)
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
  FETCH_COMMENTS: ({ commit, dispatch, state }, { campaign_id, paginated }) => {
    return new Promise((resolve, reject) => {
      return fetchComments(campaign_id, state.comments.current, state.comments.limit, paginated)
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
  FETCH_DONATIONS: ({ commit, dispatch, state }, { campaign_id, paginated }) => {
    return new Promise((resolve, reject) => {
      return fetchDonations(campaign_id, state.donations.current, state.donations.limit, paginated)
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
