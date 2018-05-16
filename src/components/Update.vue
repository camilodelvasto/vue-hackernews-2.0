<template>
  <li v-if="update" class="update">
    <div class="by">
      <router-link :to="'/user/' + update.name">{{ update.name }}</router-link>
      {{ update.timestamp | timeAgo }} ago
    </div>
    <div class="text" v-html="update.title"></div>
    <div class="text" v-html="update.content"></div>
  </li>
</template>

<script>
export default {
	name: "update",
	props: ["id", "update"],
	data () {
		return {
			open: true
		}
	}
}
</script>

<style lang="stylus">

</style>
