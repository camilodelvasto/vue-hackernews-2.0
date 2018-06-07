<template>
  <div class="donate" @click="donate()">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">

</style>

<script>

export default {
	props: [ "campaignId", "trigger", "givingLevel", "comment", "update" ],
	methods: {
    donate () {
      var args = {
        campaign: this.campaignId,
        comment: this.comment,
        fullPath: `${window.location.origin}${window.location.pathname}`,
        givingLevel: this.givingLevel,
        referrer: window.location.href,
        timestamp: Math.floor(Date.now() / 1000),
        trigger: this.trigger,
        update: this.update
      }
      console.log(args)
      // save donation info in store
      // open donation funnel
      // this.$router.push('/')
    }
	}
}
</script>
