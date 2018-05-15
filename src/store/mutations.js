export default {
  SET_NONPROFIT: (state, { nonprofit }) => {
    state.nonprofit = nonprofit
  },
  SET_CAMPAIGN: (state, { campaign }) => {
    state.campaign = campaign
  },
	ADD_UPDATES: (state, { updates }) => {
    if (!updates.length) {
      state.updates.max = state.updates.current
    } else {
      state.updates.data = state.updates.data.concat(updates)
      state.updates.current++
    }
	}
}
