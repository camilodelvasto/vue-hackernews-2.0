import Vue from "vue"
import Router from "vue-router"
import Meta from "vue-meta"
// import { Store } from "../store"
// const store = Store()

Vue.use(Router)
Vue.use(Meta, {
	ssrAttribute: "data-vue-meta-server-rendered"
})

// route-level code splitting
const GenericNonprofit = () => import("../views/GenericNonprofit.vue")
const Default404 = () => import("../views/Default404.vue")

export function createRouter () {
	return new Router({
		mode: "history",
		fallback: false,
		scrollBehavior: () => ({ y: 0 }),
		routes: [
			{
				path: "/nonprofits/:ein",
				name: "nonprofits",
				component: GenericNonprofit
			},
			{
				path: "/404",
				name: "*",
				component: Default404
			}
		]
	})
}
