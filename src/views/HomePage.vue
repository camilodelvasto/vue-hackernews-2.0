<template>
  <div class="">
    <AppHeader layout="page"></AppHeader>

    home page content

    <AppFooter></AppFooter>
  </div>
</template>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import AppFooter from "Components/general/AppFooter.vue"
import AppHeader from "Components/general/AppHeader.vue"

Vue.use(VueMeta)

export default {
	name: "nonprofit",
	components: {
		AppFooter,
		AppHeader
	},
	data () {
		return {
			bottom: false,
			title: "",
			fields: []
		}
	},
	metaInfo () {
		return {
			title: this.title,
			// override the parent template and just use the above title only
			titleTemplate: null,
			meta: [
				{ vmid: "description", name: "description", content: this.nonprofit.ACTIVITY },
				{ vmid: "og:url", property: "og:url", content: "https://volunteerathon.com/" },
				{ vmid: "og:type", property: "og:type", content: "website" },
				{ vmid: "og:title", property: "og:title", content: this.nonprofit.NAME },
				{ vmid: "og:image", property: "og:image", content: "https://res.cloudinary.com/startics/image/upload/v1523024114/truck_twugdy.png" },
				{ vmid: "og:site_name", property: "og:site_name", content: "volunteerathon - generic nonprofit" },
				{ vmid: "og:description", property: "og:description", content: this.nonprofit.ACTIVITY },
				{ vmid: "twitter:card", property: "twitter:card", content: this.nonprofit.ACTIVITY },
				{ vmid: "twitter:image", property: "twitter:image", content: "https://startcrowd.club/images/startcrowdimage.jpg" }
			]
		}
	},
	computed: {
		nonprofit () {
			return this.$store.state.nonprofit
		}
	}
}
</script>

<style scoped lang="scss">

</style>
