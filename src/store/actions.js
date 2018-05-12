import {
	fetchNonprofit,
  fetchCampaign
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
          console.log('setting campaign: ', data)
					resolve(data)
				})
				.catch(err => {
          console.log('rejecting campaign: ', err)
					reject(err)
				})
		})
	}
}
