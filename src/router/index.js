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
const Nonprofit = () => import("../views/Nonprofit.vue")
const HomePage = () => import("../views/HomePage.vue")
const Campaign = () => import("../views/Campaign.vue")
const Default404 = () => import("../views/Default404.vue")

export function createRouter () {
	return new Router({
		mode: "history",
		fallback: false,
		saveScrollPosition: true,
		scrollBehavior: () => ({ y: 0 }),
		routes: [
			{
				path: "/",
				name: "home",
				component: HomePage
			},
			{
				path: "/nonprofits/:ein",
				name: "nonprofit",
				component: Nonprofit
			},
			{
				path: "/campaigns/:id",
				name: "campaign",
				component: Campaign
			},
			{
				path: "/404",
				name: "Default",
				component: Default404
			}
		]
	})
}
