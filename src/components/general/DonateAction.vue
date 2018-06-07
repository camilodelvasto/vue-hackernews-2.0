<template>
  <div class="donate" @click="donate()">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">

</style>

<script>

export default {
	props: [ "campaignId", "trigger", "givingLevel", "commentId", "updateId", "nonprofitEin" ],
	methods: {
		donate () {
			var args = {
				campaignId: this.campaignId,
				commentId: this.commentId,
				fullPath: `${window.location.origin}${window.location.pathname}`,
				givingLevel: this.givingLevel,
				nonprofitEin: this.nonprofitEin,
				referrer: window.location.href,
				timestamp: Math.floor(Date.now() / 1000),
				trigger: this.trigger,
				updateId: this.updateId
			}
			console.log(args)
			this.$store.dispatch("START_DONATION", { initiator: args })
			// save donation info in store
			// open donation funnel
			// this.$router.push('/')
		}
	}
}
</script>
