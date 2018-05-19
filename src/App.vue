<template>
  <div id="app">
    <AppHeader></AppHeader>
    <header class="header">
      <nav class="inner">
        <router-link to="/nonprofits/43178037">Nonprofit (Generic)</router-link>
        <router-link to="/nonprofits/43138428">Nonprofit (Claimed)</router-link>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
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
