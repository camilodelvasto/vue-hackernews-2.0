import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

export function createStore () {
	return new Vuex.Store({
		state: {
			nonprofit: {/* [ein: number] */},
      campaign: {/* [id: number] */},
      updates: {
        data: [],
        current: 1,
        limit: 1,
        max: 1000
      }
		},
		actions,
		mutations
	})
}
