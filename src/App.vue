<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <nav class="fake-menu">
      <router-link to="/nonprofits/43178037">Nonprofit (Generic)</router-link>
      <router-link to="/nonprofits/43138428">Nonprofit (Claimed)</router-link>
    </nav>
  </div>
</template>

<style src='./assets/scss/main.scss'></style>

<script>
import Vue from "vue"
import VueMeta from "vue-meta"
import AppHeader from "Components/general/AppHeader.vue"

Vue.use(VueMeta)

export default {
	name: "App",
  components: {
    AppHeader
  },
  // We only fetch the item itself before entering the view
  beforeCreate () {
    return this.$store.dispatch("FETCH_COMMON_DATA")
      .then(data => {
        return data
      })
      .catch(err => {
        console.log(err)
      })
  },

  computed: {
    common () {
      console.log('this.$store.state.common', this.$store.state.common)
      return this.$store.state.common
    },
  },
  mounted () {
    require("Components/plugins/FacebookSDK.js")
  },
	metaInfo: () => ({
		title: "Basic",
		titleTemplate: "%s | DS SSR Test",
		htmlAttrs: {
			lang: "en",
			amp: undefined
		},
		headAttrs: {
			test: true
		},
		meta: [
			{ vmid: "description", name: "description", content: "Double the results, half the effort" },
			{ vmid: "og:url", property: "og:url", content: "https://volunteerathon.com/" },
			{ vmid: "og:type", property: "og:type", content: "website" },
			{ vmid: "og:title", property: "og:title", content: "Create a volunteerathon and do good!" },
			{ vmid: "og:image", property: "og:image", content: "https://res.cloudinary.com/startics/image/upload/v1523024114/truck_twugdy.png" },
			{ vmid: "og:site_name", property: "og:site_name", content: "volunteerathon" },
			{ vmid: "og:description", property: "og:description", content: "Double the results, half the effort" }
		],
		script: [
			{ innerHTML: "{ \"@context\": \"http://www.schema.org\", \"@type\": \"Organization\" }", type: "application/ld+json" },
			{ innerHTML: "{ \"body\": \"yes\" }", body: true, type: "application/ld+json" }
		],
		__dangerouslyDisableSanitizers: ["script"]
	})
}
</script>

<style scoped lang="scss">
.fake-menu {
  position: absolute;
  top: 140px;
  left: 20px;
  a {
    display: block;
  }
}
</style>