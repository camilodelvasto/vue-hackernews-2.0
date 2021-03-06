import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

export function createStore () {
	return new Vuex.Store({
		state: {
			fullPath: "",
			common: {},
			nonprofit: {/* [ein: number] */},
			campaign: {/* [id: number] */},
			campaigns: {
				data: [],
				current: 1,
				limit: 6
			},
			updates: {
				data: [],
				current: 1,
				limit: 1
			},
			comments: {
				data: [],
				current: 1,
				limit: 2
			},
			donations: {
				data: [],
				current: 1,
				limit: 6
			},
			fundraisers: {
				data: [],
				current: 1,
				limit: 6
			},
			home: {},
			user: {
        loggedIn: true,
        fullName: null,
        paymentMethods: [
          { id: 123456789, fourDigits: 2301, provider: "AMEX" },
          { id: 765432459, fourDigits: 6452, provider: "VISA" }
        ]
      },
			userActions: {
				donation: {
					status: "",
					amount: 350,
					initiator: {}
				}
			}
		},
		actions,
		mutations
	})
}
