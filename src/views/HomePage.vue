<template>
  <div class="">
    <AppHeader layout="page"></AppHeader>
    <TopMenu></TopMenu>
    <HomeHero :headline="home.hero.headline" :imgsrc="home.hero.imgsrc" :tagline="home.hero.tagline" :cta="home.hero.cta"/>
    <HomeSection2
      :headline="home.section2.headline"
      :tagline="home.section2.tagline"
      :boxes="home.section2.boxes"
      :results="home.section2.results"></HomeSection2>
    <div style="height: 600px;"></div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import AppFooter from "Components/general/AppFooter.vue"
import AppHeader from "Components/general/AppHeader.vue"
import HomeHero from "Components/home/HomeHero.vue"
import HomeSection2 from "Components/home/HomeSection2.vue"
import TopMenu from "Components/general/TopMenu.vue"

Vue.use(VueMeta)

export default {
	name: "nonprofit",
	components: {
		AppFooter,
		AppHeader,
    HomeHero,
		HomeSection2,
		TopMenu
	},
	data () {
		return {
			bottom: false,
			title: "",
			fields: []
		}
	},
	// We only fetch the item itself before entering the view
	asyncData ({ store, route: { params: { ein } } }) {
		return new Promise((resolve, reject) => {
			return store.dispatch("FETCH_HOME_PAGE")
				.then(data => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	metaInfo () {
		return {
			title: this.title,
			// override the parent template and just use the above title only
			titleTemplate: null
			/*			meta: [
				{ vmid: "description", name: "description", content: this.nonprofit.ACTIVITY },
				{ vmid: "og:url", property: "og:url", content: "https://volunteerathon.com/" },
				{ vmid: "og:type", property: "og:type", content: "website" },
				{ vmid: "og:title", property: "og:title", content: this.nonprofit.NAME },
				{ vmid: "og:image", property: "og:image", content: "https://res.cloudinary.com/startics/image/upload/v1523024114/truck_twugdy.png" },
				{ vmid: "og:site_name", property: "og:site_name", content: "volunteerathon - generic nonprofit" },
				{ vmid: "og:description", property: "og:description", content: this.nonprofit.ACTIVITY },
				{ vmid: "twitter:card", property: "twitter:card", content: this.nonprofit.ACTIVITY },
				{ vmid: "twitter:image", property: "twitter:image", content: "https://startcrowd.club/images/startcrowdimage.jpg" }
			] */
		}
	},
	computed: {
		home () {
			return this.$store.state.home
		}
	}
}
</script>

<style scoped lang="scss">

</style>
