import {
  fetchNonprofit
} from '../api'

export default {
  FETCH_NONPROFIT: ({ commit, dispatch, state }, { ein }) => {
    return fetchNonprofit(ein)
      .then(data => {
        commit('SET_NONPROFIT', { nonprofit: data })
      })
  }
}
