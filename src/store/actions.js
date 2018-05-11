import {
	fetchNonprofit
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
	}
}
