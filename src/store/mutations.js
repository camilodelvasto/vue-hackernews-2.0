export default {
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
  RESET_NONPROFIT: (state) => {
    state.updates.current = 1
    state.donations.current = 1
    state.comments.current = 1
  },
  ADD_COMMENTS: (state, { comments }) => {
    state.comments.data = state.comments.data.concat(comments)
    state.comments.current++
  },
  ADD_DONATIONS: (state, { donations }) => {
    state.donations.data = state.donations.data.concat(donations)
    state.donations.current++
  },
	SET_CAMPAIGNS: (state, { campaigns }) => {
    state.campaigns.data = campaigns
	}
}
